/**
 * UI state for articles - presentation concerns like pagination, sorting, filtering
 * Kept separate from data state (ArticleDataModel) for better separation of concerns
 */
export interface ArticleUIState {
  /** Async operation state */
  loading: boolean;

  /** Error message if operation failed, null if no error */
  error: string | null;

  /** Current page number for pagination (1-indexed) */
  currentPage: number;

  /** Number of items per page */
  pageSize: number;

  /** Field to sort by */
  sortBy: 'title' | 'date' | 'author';

  /** Sort direction */
  sortDirection: 'asc' | 'desc';

  /** Active filters */
  filters: ArticleFilter[];
}

/**
 * Filter configuration for article list
 */
export interface ArticleFilter {
  /** Filter field */
  field: 'category' | 'author' | 'privacy';

  /** Filter value */
  value: string;
}

/**
 * Default UI state for new article state instances
 */
export const DEFAULT_ARTICLE_UI_STATE: ArticleUIState = {
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 20,
  sortBy: 'date',
  sortDirection: 'desc',
  filters: [],
};
