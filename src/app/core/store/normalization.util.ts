/**
 * Entity normalization utilities for NGXS state management.
 * Provides patterns for storing collections as normalized {ids, entities} structures.
 *
 * Benefits:
 * - Easier to add/remove/update entities
 * - Cleaner mutations (no deep nesting)
 * - Better performance (direct lookups by ID)
 * - Reusable across different entity types
 */

/**
 * Normalized entity collection structure
 * Separates IDs list from entity map for easier operations
 */
export interface NormalizedCollection<T> {
  /** Ordered list of entity IDs */
  ids: string[];
  /** Map of entities by ID for O(1) lookups */
  entities: Record<string, T>;
}

/**
 * Normalize an array of entities into {ids, entities} structure
 *
 * @example
 * const sections = [{ id: '1', name: 'Intro' }, { id: '2', name: 'Conclusion' }];
 * const normalized = normalizeEntities(sections);
 * // { ids: ['1', '2'], entities: { '1': {...}, '2': {...} } }
 */
export function normalizeEntities<T extends Record<string, any>>(
  items: T[],
  idField: keyof T = 'id' as keyof T,
): NormalizedCollection<T> {
  return {
    ids: items.map((item) => String(item[idField])),
    entities: items.reduce(
      (acc, item) => {
        acc[String(item[idField])] = item;
        return acc;
      },
      {} as Record<string, T>,
    ),
  };
}

/**
 * Add or replace an entity in normalized collection
 * If entity with same ID exists, replaces it and maintains position
 * If not, adds at the beginning
 *
 * @example
 * const normalized = { ids: ['1', '2'], entities: {...} };
 * const updated = upsertNormalized(normalized, { id: '3', name: 'New' });
 * // ids: ['3', '1', '2']
 */
export function upsertNormalized<T extends Record<string, any>>(
  collection: NormalizedCollection<T>,
  item: T,
  idField: keyof T = 'id' as keyof T,
): NormalizedCollection<T> {
  const id = String(item[idField]);
  const existingIndex = collection.ids.indexOf(id);

  if (existingIndex >= 0) {
    // Update existing entity
    return {
      ids: collection.ids,
      entities: { ...collection.entities, [id]: item },
    };
  }

  // Add new entity at beginning
  return {
    ids: [id, ...collection.ids],
    entities: { ...collection.entities, [id]: item },
  };
}

/**
 * Remove an entity from normalized collection
 *
 * @example
 * const normalized = { ids: ['1', '2', '3'], entities: {...} };
 * const updated = removeNormalized(normalized, '2');
 * // ids: ['1', '3']
 */
export function removeNormalized<T>(
  collection: NormalizedCollection<T>,
  id: string,
): NormalizedCollection<T> {
  const { [id]: _removed, ...remainingEntities } = collection.entities;
  return {
    ids: collection.ids.filter((itemId) => itemId !== id),
    entities: remainingEntities,
  };
}

/**
 * Update a single field on an entity in normalized collection
 *
 * @example
 * const normalized = { ids: ['1', '2'], entities: { '1': { id: '1', name: 'A' } } };
 * const updated = updateNormalized(normalized, '1', { name: 'Updated A' });
 */
export function updateNormalized<T extends Record<string, any>>(
  collection: NormalizedCollection<T>,
  id: string,
  updates: Partial<T>,
): NormalizedCollection<T> {
  const entity = collection.entities[id];
  if (!entity) {
    return collection;
  }

  return {
    ids: collection.ids,
    entities: {
      ...collection.entities,
      [id]: { ...entity, ...updates },
    },
  };
}

/**
 * Get a single entity from normalized collection
 *
 * @example
 * const entity = getNormalized(normalized, '1'); // { id: '1', name: 'A' }
 */
export function getNormalized<T>(collection: NormalizedCollection<T>, id: string): T | undefined {
  return collection.entities[id];
}

/**
 * Get all entities in ID order
 *
 * @example
 * const items = denormalizeEntities(normalized);
 * // [{ id: '1', name: 'A' }, { id: '2', name: 'B' }]
 */
export function denormalizeEntities<T>(collection: NormalizedCollection<T>): T[] {
  return collection.ids.map((id) => collection.entities[id]).filter((item) => item !== undefined);
}

/**
 * Get multiple entities by IDs
 *
 * @example
 * const items = getMultipleNormalized(normalized, ['1', '3']);
 * // [{ id: '1', name: 'A' }, { id: '3', name: 'C' }]
 */
export function getMultipleNormalized<T>(collection: NormalizedCollection<T>, ids: string[]): T[] {
  return ids.map((id) => collection.entities[id]).filter((item) => item !== undefined);
}

/**
 * Check if entity exists in normalized collection
 *
 * @example
 * const exists = hasNormalized(normalized, '1'); // true
 */
export function hasNormalized<T>(collection: NormalizedCollection<T>, id: string): boolean {
  return collection.ids.includes(id);
}

/**
 * Get count of entities in normalized collection
 *
 * @example
 * const count = countNormalized(normalized); // 2
 */
export function countNormalized<T>(collection: NormalizedCollection<T>): number {
  return collection.ids.length;
}
