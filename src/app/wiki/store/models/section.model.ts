import { Revision } from './revision.model';

export interface Section {
  id: string;
  latestRevision: Revision;
  subsections: Section[];
  sectionOrder: number;
  depth: number;
}

export interface SectionCreate {
  superSectionId: string;
  text: string;
}
