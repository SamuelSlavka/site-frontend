/**
 * Utility functions for state management patterns and immutable operations.
 */

/**
 * Create an immutable copy of an object with a key removed.
 * Uses destructuring assignment to safely remove properties without mutation.
 *
 * @example
 * const items = { a: 1, b: 2, c: 3 };
 * const updated = removeKey(items, 'b'); // { a: 1, c: 3 }
 */
export function removeKey<T extends Record<string, any>>(
  obj: T,
  key: string | number | symbol,
): Partial<T> {
  const { [key]: _removed, ...rest } = obj;
  return rest;
}

/**
 * Create an immutable copy of an object with updated property.
 *
 * @example
 * const user = { id: 1, name: 'John', age: 30 };
 * const updated = updateKey(user, 'age', 31); // { id: 1, name: 'John', age: 31 }
 */
export function updateKey<T extends Record<string, any>>(
  obj: T,
  key: keyof T,
  value: any,
): T {
  return { ...obj, [key]: value };
}

/**
 * Immutably add or update an item in a collection by ID.
 * If item exists, replaces it. If not, prepends to collection.
 *
 * @example
 * const items = [{ id: 1, name: 'A' }, { id: 3, name: 'C' }];
 * const updated = upsertItem(items, { id: 2, name: 'B' }, 'id');
 * // [{ id: 2, name: 'B' }, { id: 1, name: 'A' }, { id: 3, name: 'C' }]
 */
export function upsertItem<T extends Record<string, any>>(
  items: T[],
  item: T,
  idField: keyof T = 'id' as keyof T,
): T[] {
  const filtered = items.filter((i) => i[idField] !== item[idField]);
  return [item, ...filtered];
}

/**
 * Immutably remove an item from a collection by ID.
 *
 * @example
 * const items = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
 * const updated = removeItem(items, 2, 'id');
 * // [{ id: 1, name: 'A' }]
 */
export function removeItem<T extends Record<string, any>>(
  items: T[],
  id: any,
  idField: keyof T = 'id' as keyof T,
): T[] {
  return items.filter((i) => i[idField] !== id);
}

/**
 * Deep merge two objects (one level only).
 * Useful for merging state slices while preserving other properties.
 *
 * @example
 * const state = { data: { a: 1 }, loading: false };
 * const updated = mergeState(state, { data: { b: 2 } });
 * // { data: { a: 1, b: 2 }, loading: false }
 */
export function mergeState<T extends Record<string, any>>(
  state: T,
  updates: Partial<T>,
): T {
  return {
    ...state,
    ...Object.fromEntries(
      Object.entries(updates).map(([key, value]) => [
        key,
        typeof value === 'object' && value !== null && typeof state[key] === 'object'
          ? { ...state[key], ...value }
          : value,
      ]),
    ),
  } as T;
}

/**
 * Create a normalized entity map from an array.
 * Useful for storing collections in state.
 *
 * @example
 * const items = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
 * const normalized = normalize(items, 'id');
 * // { 1: { id: 1, name: 'A' }, 2: { id: 2, name: 'B' } }
 */
export function normalize<T extends Record<string, any>>(
  items: T[],
  idField: keyof T = 'id' as keyof T,
): Record<string | number, T> {
  return items.reduce(
    (acc, item) => {
      acc[item[idField]] = item;
      return acc;
    },
    {} as Record<string | number, T>,
  );
}

/**
 * Denormalize an entity map back into an array, optionally in a specific order.
 *
 * @example
 * const entities = { 1: { id: 1, name: 'A' }, 2: { id: 2, name: 'B' } };
 * const denormalized = denormalize(entities);
 * // [{ id: 1, name: 'A' }, { id: 2, name: 'B' }]
 */
export function denormalize<T extends Record<string, any>>(
  entities: Record<string | number, T>,
  ids?: (string | number)[],
): T[] {
  if (ids) {
    return ids.map((id) => entities[id]).filter((item) => item !== undefined);
  }
  return Object.values(entities);
}
