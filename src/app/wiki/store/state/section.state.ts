import { Injectable } from '@angular/core';
import { SectionService } from '@app/wiki/services/section.service';
import { SectionDto, SectionStateModel, DEFAULT_SECTION_DATA_STATE, DEFAULT_SECTION_UI_STATE, getNormalizedSectionsForHead } from '../models';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ToastService } from '@core/services/toast.service';
import { tap } from 'rxjs';

import { SectionActions } from '../actions';
import { BaseState } from '@app/core/store/base.state';
import { normalizeEntities, upsertNormalized, removeNormalized, NormalizedCollection } from '@app/core/store/normalization.util';

@State<SectionStateModel>({
  name: 'section',
  defaults: { ...DEFAULT_SECTION_DATA_STATE, ...DEFAULT_SECTION_UI_STATE },
})
@Injectable()
export class SectionState extends BaseState<SectionStateModel> {
  constructor(protected toastr: ToastService, private sectionService: SectionService) {
    super();
  }

  @Action(SectionActions.GetOne)
  fetchSection(ctx: StateContext<SectionStateModel>, action: SectionActions.GetOne) {
    ctx.patchState({ selected: null, loading: true, error: null });
    return this.handleAsyncAction(
      ctx,
      () => this.sectionService.getOneSection(action.id),
      'Failed to fetch sections',
    ).pipe(
      tap((sections) => {
        const head = action.id;
        const normalized = normalizeEntities(this.buildSectionHierarchy(sections));
        ctx.patchState({
          selected: head,
          byHead: {
            ...ctx.getState().byHead,
            [head]: normalized,
          },
        });
      }),
    );
  }

  /**
   * Build section hierarchy with parent-child relationships
   * Sections come ordered from backend, we just need to establish links
   */
  private buildSectionHierarchy(sections: SectionDto[]): SectionDto[] {
    const sectionMap = new Map<string, SectionDto>();
    const result: SectionDto[] = [];

    // First pass: create map and initialize subsections
    sections.forEach((section) => {
      const copy = { ...section, subsections: section.subsections ?? [] };
      sectionMap.set(section.id, copy);
      result.push(copy);
    });

    // Second pass: set up parent-child relationships
    result.forEach((section) => {
      if (section.superSection && sectionMap.has(section.superSection)) {
        const parent = sectionMap.get(section.superSection)!;
        if (!parent.subsections) {
          parent.subsections = [];
        }
        if (!parent.subsections.includes(section.id)) {
          parent.subsections = [section.id, ...parent.subsections];
        }
      }
    });

    return result;
  }

  @Action(SectionActions.Create)
  createSection(ctx: StateContext<SectionStateModel>, action: SectionActions.Create) {
    return this.handleAsyncAction(
      ctx,
      () => this.sectionService.createSection(action.data),
      'Failed to create section',
    ).pipe(
      tap((subsection) => {
        const head = ctx.getState().selected;
        if (!head) {
          throw new Error('Problem initializing sections');
        }
        const currentCollection = ctx.getState().byHead[head];
        if (!currentCollection) {
          throw new Error('Sections not initialized for head');
        }

        const superSectionId = action.data.superSectionId;
        const superSection = currentCollection.entities[superSectionId];

        // Add new section to collection
        let updated = upsertNormalized(currentCollection, subsection);

        // Add to parent's subsections
        if (superSection) {
          const parentWithChildren = {
            ...superSection,
            subsections: [subsection.id, ...(superSection.subsections ?? [])],
          };
          updated = upsertNormalized(updated, parentWithChildren);
        }

        ctx.patchState({
          byHead: {
            ...ctx.getState().byHead,
            [head]: updated,
          },
        });
        this.toastr.success('Section created');
      }),
    );
  }

  @Action(SectionActions.Edit)
  editSection(ctx: StateContext<SectionStateModel>, action: SectionActions.Edit) {
    return this.handleAsyncAction(
      ctx,
      () => this.sectionService.editSection(action.data),
      'Failed to edit section',
    ).pipe(
      tap((section) => {
        const head = ctx.getState().selected;
        if (!head) {
          throw new Error('Problem initializing sections');
        }
        const currentCollection = ctx.getState().byHead[head];
        if (!currentCollection) {
          throw new Error('Sections not initialized for head');
        }

        const existing = currentCollection.entities[section.id];
        const updated = upsertNormalized(currentCollection, {
          ...section,
          subsections: existing?.subsections ?? [],
        });

        ctx.patchState({
          byHead: {
            ...ctx.getState().byHead,
            [head]: updated,
          },
        });
        this.toastr.success('Section edited');
      }),
    );
  }

  @Action(SectionActions.Delete)
  removeSection(ctx: StateContext<SectionStateModel>, action: SectionActions.Delete) {
    return this.handleAsyncAction(
      ctx,
      () => this.sectionService.deleteSection(action.data),
      'Failed to delete section',
    ).pipe(
      tap(() => {
        const head = ctx.getState().selected;
        if (!head) {
          throw new Error('Problem initializing sections');
        }
        const currentCollection = ctx.getState().byHead[head];
        if (!currentCollection) {
          throw new Error('Sections not initialized for head');
        }

        const superSectionId = action.data.superSectionId;
        const superSection = currentCollection.entities[superSectionId];

        // Remove section from collection
        let updated = removeNormalized(currentCollection, action.data.id);

        // Remove from parent's subsections
        if (superSection) {
          const parentWithoutChild = {
            ...superSection,
            subsections: superSection.subsections?.filter((sec) => sec !== action.data.id) ?? [],
          };
          updated = upsertNormalized(updated, parentWithoutChild);
        }

        ctx.patchState({
          byHead: {
            ...ctx.getState().byHead,
            [head]: updated,
          },
        });
        this.toastr.success('Section deleted');
      }),
    );
  }

  @Selector()
  static selectSections(state: SectionStateModel) {
    const selectedHead = state.selected ?? '';
    const collection = state.byHead[selectedHead];
    return collection ? collection.entities : {};
  }

  @Selector()
  static loading(state: SectionStateModel) {
    return state.loading;
  }

  @Selector()
  static error(state: SectionStateModel) {
    return state.error;
  }

  @Selector()
  static selectHead(state: SectionStateModel) {
    return state.selected;
  }
}
