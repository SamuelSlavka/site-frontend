import { Revision, RevisionDto } from './revision.model';

export interface Section {
  id: string;
  latestRevision: Revision;
  subsections: Section[];
  sectionOrder: number;
  depth: number;
  createdBy: string;
}

export interface SectionDto {
  id: string;
  latestRevision: string;
  superSection: string;
  sectionOrder: number;
  depth: number;
  createdBy: string;
  article: string;
  text: string;
  title: string;
  subsections: string[];
}

export interface SectionCreate {
  superSectionId: string;
  revision: RevisionDto;
}

export interface SectionDelete {
  superSectionId: string;
  id: string;
}
