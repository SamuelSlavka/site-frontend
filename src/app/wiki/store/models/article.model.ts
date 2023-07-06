import { Category } from './category.model';
import { Section } from './section.model';

export interface Article {
  id: string;
  title: string;
  creatorId: string;
  categories: Category[];
  section: Section;
  deleted: boolean;
  deletedAt: string;
}

export interface ArticleListItem {
  id: string;
  title: string;
  superSection: string;
}
