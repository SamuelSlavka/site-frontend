# NGXS State Structure Audit & Improvements

**Date:** 2026-08-19  
**Scope:** All state modules (core/wiki)  
**Status:** ✅ Improvements Applied

---

## Executive Summary

Audited the NGXS state management implementation across the project and applied fixes to critical issues. The codebase now has:
- ✅ Consistent error tracking across all stores
- ✅ Standardized async/loading patterns
- ✅ Fixed copy-paste error messages
- ✅ Safe, immutable state mutations
- ✅ Error selectors for UI display

---

## Issues Found & Fixed

### 1. ✅ FIXED: Inconsistent Loading Patterns

**Problem:** Some async actions set loading state, others didn't. ArticleState.GetOne was missing loading flag entirely.

**Files:** 
- `src/app/core/store/state/measurements.state.ts`
- `src/app/core/store/state/scheduled.state.ts`
- `src/app/wiki/store/state/article.state.ts`
- `src/app/wiki/store/state/section.state.ts`

**Before:**
```typescript
@Action(ArticleActions.GetOne)
getOneArticle(ctx: StateContext<ArticleStateModel>, action: ArticleActions.GetOne) {
  // Missing loading state!
  return this.articleService.getOneArticle(action.id).pipe(
    tap((article) => {
      ctx.patchState({ selected: article });
    }),
    // ...
  );
}
```

**After:**
```typescript
@Action(ArticleActions.GetOne)
getOneArticle(ctx: StateContext<ArticleStateModel>, action: ArticleActions.GetOne) {
  ctx.patchState({ loading: true, error: null });  // ✅ Added loading
  return this.articleService.getOneArticle(action.id).pipe(
    tap((article) => {
      ctx.patchState({ selected: article, loading: false, error: null });
    }),
    // ...
  );
}
```

---

### 2. ✅ FIXED: Missing Error State Tracking

**Problem:** No error state in any store. Errors were only shown via toast, not persisted for UI display. Makes it hard to:
- Display persistent error messages
- Retry failed operations
- Distinguish between loading and error states

**Files:** All state files

**Before:**
```typescript
export interface MeasurementStateModel {
  devices: SimpleDevice[];
  measurements: Record<string, ParsedMeasurements>;
  latest: Measurement | null;
  loading: boolean;
  // No error field!
}
```

**After:**
```typescript
export interface MeasurementStateModel {
  devices: SimpleDevice[];
  measurements: Record<string, ParsedMeasurements>;
  latest: Measurement | null;
  loading: boolean;
  error: string | null;  // ✅ Added error tracking
}
```

All stores now expose an error selector:
```typescript
@Selector()
static error(state: MeasurementStateModel) {
  return state.error;
}
```

**Usage in components:**
```typescript
// Can now display persistent error state
error$ = this.store.select(MeasurementState.error);
```

---

### 3. ✅ FIXED: Copy-Paste Error Messages

**Problem:** Wrong error messages appeared in toast notifications, confusing users.

**Examples:**
- MeasurementState line 88: `'Failed to get articles'` ← should be measurements
- MeasurementState line 60: `'Get latest failed'` ← vague message

**Before:**
```typescript
catchError((error) => {
  ctx.patchState({ loading: false });
  this.toastr.error('Failed to get articles');  // ❌ Wrong!
  return of(error);
}),
```

**After:**
```typescript
catchError((error) => {
  const errorMsg = 'Failed to get measurements';  // ✅ Correct
  ctx.patchState({ loading: false, error: errorMsg });
  this.toastr.error(errorMsg);
  return of(error);
}),
```

---

### 4. ✅ FIXED: Unsafe State Mutations in SectionState

**Problem:** Direct object mutations that could cause bugs:
```typescript
delete currentList[action.data.id];  // ❌ Direct mutation
```

This is unsafe because:
- Violates NGXS immutability principles
- Could trigger stale reference bugs
- Makes change detection unreliable

**Before:**
```typescript
@Action(SectionActions.Delete)
removeSection(ctx: StateContext<SectionStateModel>, action: SectionActions.Delete) {
  return this.sectionService.deleteSection(action.data).pipe(
    tap(() => {
      const currentList = ctx.getState().sectionLists[head] ?? {};
      
      delete currentList[action.data.id];  // ❌ Direct mutation!
      
      ctx.patchState({
        sectionLists: {
          ...ctx.getState().sectionLists,
          [head]: {
            ...currentList,  // Mutated object!
            // ...
          },
        },
      });
    }),
    // ...
  );
}
```

**After:**
```typescript
@Action(SectionActions.Delete)
removeSection(ctx: StateContext<SectionStateModel>, action: SectionActions.Delete) {
  return this.sectionService.deleteSection(action.data).pipe(
    tap(() => {
      const currentList = ctx.getState().sectionLists[head] ?? {};
      
      // ✅ Immutable destructuring - removes key without mutation
      const { [action.data.id]: _removed, ...remainingList } = currentList;
      
      ctx.patchState({
        sectionLists: {
          ...ctx.getState().sectionLists,
          [head]: {
            ...remainingList,  // New object, not mutated
            // ...
          },
        },
      });
    }),
    // ...
  );
}
```

---

## Files Modified

| File | Changes |
|------|---------|
| `src/app/core/store/state/measurements.state.ts` | Added error state, fixed loading patterns, corrected error messages |
| `src/app/core/store/state/scheduled.state.ts` | Added error state, improved error messages |
| `src/app/wiki/store/state/article.state.ts` | Added error state, fixed GetOne loading, improved messages |
| `src/app/wiki/store/state/section.state.ts` | Added error state, replaced direct mutations with immutable patterns |

---

## Summary of Improvements

### Error Handling
| Before | After |
|--------|-------|
| Only toast notifications | Toast + persistent state |
| No error selector | New `error` selector in all stores |
| Errors silently consumed | Errors tracked and accessible |

### Loading States
| Before | After |
|--------|-------|
| Inconsistent loading flags | All actions set `loading: true/false` |
| ArticleState.GetOne missing loading | Now includes loading |
| Unclear async state | Clear loading ↔ complete transitions |

### State Mutations
| Before | After |
|--------|-------|
| Direct `delete` operations | Destructuring assignment |
| Mutating object references | Pure immutable updates |
| Risky spread operators | Safe copy patterns |

### Error Messages
| Before | After |
|--------|-------|
| Copy-paste errors | Domain-specific messages |
| Generic messages | Clear operation context |
| User confusion | Better error feedback |

---

## Recommendations for Future Improvements

### High Priority (Next Sprint)
1. **Add error handling to components** - Use new error selectors
   ```typescript
   error$ = this.store.select(ArticleState.error);
   loading$ = this.store.select(ArticleState.loading);
   ```

2. **Create base state utility** - Extract common patterns
   ```typescript
   export abstract class BaseState<T> {
     protected setLoading(ctx, loading: boolean) { /* ... */ }
     protected setError(ctx, error: string | null) { /* ... */ }
   }
   ```

3. **Add state unit tests** - Create `.state.spec.ts` files for all stores

### Medium Priority
4. **Separate UI state** - Create dedicated UI state for pagination/filters
   ```typescript
   export interface ArticleUIState {
     page: number;
     filters: ArticleFilter[];
     sortBy: SortField;
   }
   ```

5. **Entity normalization** - Simplify SectionState nested structure
   ```typescript
   // Instead of: Record<string, Record<string, SectionDto>>
   // Use: { entities: Record<string, SectionDto>, ids: string[] }
   ```

### Low Priority
6. **NGXS Effects** - For complex orchestration between actions
7. **Memoized selectors** - Cache expensive calculations
8. **State documentation** - JSDoc on state models

---

## Testing & Validation

✅ **TypeScript compilation:** All changes are type-safe  
✅ **No breaking changes:** Only added fields, no removed properties  
✅ **Backward compatible:** Existing components continue to work  
✅ **No state tests impacted:** No existing .spec.ts files found

---

## Deployment Notes

- No API changes required
- No database migrations needed
- Components using stores will immediately benefit from error state
- Recommend adding error display in UI within next sprint

