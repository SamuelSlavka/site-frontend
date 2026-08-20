import { NormalizedCollection } from '@app/core/store/normalization.util';
import { SectionDto } from './section.model';

/**
 * Normalized sections collection for a specific article
 * Each article head has its own normalized collection of sections
 */
export interface NormalizedSections extends NormalizedCollection<SectionDto> {
  ids: string[];
  entities: Record<string, SectionDto>;
}

/**
 * Sections organized by article head
 * This replaces the deeply nested Record<string, Record<string, SectionDto>>
 */
export interface SectionsByHeadModel {
  [articleHead: string]: NormalizedSections;
}

/**
 * Data state for sections
 */
export interface SectionDataModel {
  /** Sections organized by their article head */
  byHead: SectionsByHeadModel;

  /** Currently selected article head */
  selected: string | null;
}

/**
 * Combined state model with data + async concerns
 */
export interface SectionStateModel extends SectionDataModel {
  loading: boolean;
  error: string | null;
}

/**
 * Default section data state
 */
export const DEFAULT_SECTION_DATA_STATE: SectionDataModel = {
  byHead: {},
  selected: null,
};

/**
 * Default UI state for sections
 */
export const DEFAULT_SECTION_UI_STATE = {
  loading: false,
  error: null,
};

/**
 * Helper to get normalized sections for a specific head
 * Returns empty collection if head not found
 */
export function getNormalizedSectionsForHead(state: SectionStateModel): NormalizedSections | undefined {
  if (!state.selected) {
    return undefined;
  }
  return state.byHead[state.selected];
}

/**
 * Helper to get all sections for a specific head as array
 */
export function getSectionsArrayForHead(state: SectionStateModel): SectionDto[] {
  const sections = getNormalizedSectionsForHead(state);
  if (!sections) {
    return [];
  }
  return sections.ids.map((id) => sections.entities[id]).filter((s) => s !== undefined);
}
