import { of, throwError } from 'rxjs';
import { ArticleState } from './article.state';
import { ArticleActions } from '../actions';
import { Article, ArticleListItem } from '../models';
import { ArticleService } from '@app/wiki/services/article.service';
import { ToastService } from '@core/services/toast.service';

describe('ArticleState', () => {
  let state: ArticleState;
  let articleService: jasmine.SpyObj<ArticleService>;
  let toastr: jasmine.SpyObj<ToastService>;

  const article: Article = {
    id: '1',
    title: 'Article 1',
    createdBy: 'user-1',
    isPrivate: false,
    isPubliclyEditable: true,
    categories: [],
    section: {
      id: 'sec-1',
      latestRevision: { id: 'rev-1', text: 'Body', title: 'Section', createdAt: '2024-01-01T00:00:00Z', deleted: false, deletedAt: '' },
      subsections: [],
      sectionOrder: 1,
      depth: 0,
      createdBy: 'user-1',
    },
    deleted: false,
    deletedAt: '',
  };

  const listItem: ArticleListItem = {
    id: '1',
    title: 'Article 1',
    isPrivate: false,
    isPubliclyEditable: true,
    section: 'sec-1',
    createdBy: 'user-1',
  };

  const createCtx = (initial: any) => {
    const model = { ...initial };
    return {
      getState: () => model,
      patchState: (patch: any) => Object.assign(model, patch),
      state: model,
    } as any;
  };

  beforeEach(() => {
    articleService = jasmine.createSpyObj('ArticleService', ['getOneArticle', 'getArticles', 'createArticle', 'editArticle', 'deleteArticle']);
    toastr = jasmine.createSpyObj('ToastService', ['success', 'error']);
    state = new ArticleState(toastr, articleService);
  });

  it('loads articles and selects one', (done) => {
    const ctx = createCtx({ articles: [], selected: null, loading: false, error: null, currentPage: 1, pageSize: 20, sortBy: 'title', sortDirection: 'asc', filters: [] });
    articleService.getOneArticle.and.returnValue(of(article));

    state.getOneArticle(ctx, new ArticleActions.GetOne('1')).subscribe(() => {
      expect(ctx.state.selected).toEqual(article);
      done();
    });
  });

  it('loads list and mutates ui state', (done) => {
    const ctx = createCtx({ articles: [], selected: null, loading: false, error: null, currentPage: 1, pageSize: 20, sortBy: 'title', sortDirection: 'asc', filters: [] });
    articleService.getArticles.and.returnValue(of([listItem]));
    articleService.createArticle.and.returnValue(of(listItem));
    articleService.editArticle.and.returnValue(of(listItem));
    articleService.deleteArticle.and.returnValue(of(undefined as void));

    state.getArticles(ctx, new ArticleActions.Get(1)).subscribe(() => {
      expect(ctx.state.articles).toEqual([listItem]);
      state.createArticle(ctx, new ArticleActions.Create({ title: 'A', isPrivate: false, isPubliclyEditable: true })).subscribe(() => {
        state.editArticle(ctx, new ArticleActions.Edit({ title: 'B', isPrivate: false, isPubliclyEditable: true }, '1')).subscribe(() => {
          state.deleteArticle(ctx, new ArticleActions.Delete('1')).subscribe(() => {
            state.setPage(ctx, new ArticleActions.SetPage(3));
            state.setPageSize(ctx, new ArticleActions.SetPageSize(10));
            state.setSort(ctx, new ArticleActions.SetSort('title', 'desc'));
            state.setFilters(ctx, new ArticleActions.SetFilters([{ field: 'author', value: 'x' }] as any));
            state.clearFilters(ctx);
            expect(ctx.state.currentPage).toBe(1);
            expect(ctx.state.pageSize).toBe(10);
            expect(ctx.state.sortDirection).toBe('desc');
            expect(ctx.state.filters).toEqual([]);
            done();
          });
        });
      });
    });
  });

  it('exposes selectors', () => {
    const model = { articles: [listItem], selected: article, loading: true, error: 'x', currentPage: 2, pageSize: 10, sortBy: 'title', sortDirection: 'asc', filters: [] };
    expect(ArticleState.articles(model as any)).toEqual([listItem]);
    expect(ArticleState.selected(model as any)).toEqual(article);
    expect(ArticleState.loading(model as any)).toBeTrue();
    expect(ArticleState.error(model as any)).toBe('x');
    expect(ArticleState.currentPage(model as any)).toBe(2);
  });

  it('handles errors', (done) => {
    const ctx = createCtx({ articles: [], selected: null, loading: false, error: null, currentPage: 1, pageSize: 20, sortBy: 'title', sortDirection: 'asc', filters: [] });
    articleService.getOneArticle.and.returnValue(throwError(() => new Error('x')));

    state.getOneArticle(ctx, new ArticleActions.GetOne('1')).subscribe({
      complete: () => {
        expect(ctx.state.error).toBe('Failed to get article');
        done();
      },
    });
  });
});
