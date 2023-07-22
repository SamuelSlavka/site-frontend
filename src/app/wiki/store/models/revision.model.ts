export interface Revision {
  id: string;
  text: string;
  title: string;
  createdAt: string;
  deleted: boolean;
  deletedAt: string;
}

export interface RevisionCreate {
  text: string;
  title: string;
}
