import { Article, ArticleListItem } from './article.model';
import { ArticleUIState } from './article-ui.model';

/**
 * Data state for articles - what comes from the backend
 * Kept separate from UI state (ArticleUIState) for better separation of concerns
 */
export interface ArticleDataModel {
  /** List of articles currently fetched */
  articles: ArticleListItem[];

  /** Currently selected/displayed article */
  selected: Article | null;
}

/**
 * Combined state model for ArticleState
 * Combines data concerns (ArticleDataModel) with UI concerns (ArticleUIState)
 */
export interface ArticleStateModel extends ArticleDataModel, ArticleUIState {}

/**
 * Default data state for new article state instances
 */
export const DEFAULT_ARTICLE_DATA_STATE: ArticleDataModel = {
  articles: [],
  selected: null,
};
