import { Revision } from './revision.model';

export interface Section {
  id: string;
  latestRevision: Revision;
  subsections: Section[];
  sectionOrder: number;
  depth: number;
  createdBy: string;
}

export interface SectionCreate {
  superSectionId: string;
  text: string;
}
