import { Category } from './category.model';
import { Section } from './section.model';

export interface Article {
  id: string;
  title: string;
  createdBy: string;
  isPrivate: boolean;
  categories: Category[];
  section: Section;
  deleted: boolean;
  deletedAt: string;
}

export interface ArticleListItem {
  id: string;
  title: string;
  isPrivate: boolean;
  superSection: string;
  createdBy: string;
}

export interface CreateArticle {
  title: string;
  isPrivate: boolean;
}

export interface CreateArticle {
  title: string;
  isPrivate: boolean;
}
