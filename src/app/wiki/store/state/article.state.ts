import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Article, ArticleListItem, ArticleStateModel, DEFAULT_ARTICLE_DATA_STATE, DEFAULT_ARTICLE_UI_STATE, ArticleFilter } from '../models';
import { ArticleActions } from '../actions';

import { tap } from 'rxjs';
import { ArticleService } from '@app/wiki/services/article.service';
import { ToastService } from '@core/services/toast.service';
import { BaseState } from '@app/core/store/base.state';

@State<ArticleStateModel>({
  name: 'article',
  defaults: { ...DEFAULT_ARTICLE_DATA_STATE, ...DEFAULT_ARTICLE_UI_STATE },
})
@Injectable()
export class ArticleState extends BaseState<ArticleStateModel> {
  constructor(protected toastr: ToastService, private articleService: ArticleService) {
    super();
  }

  @Action(ArticleActions.GetOne)
  getOneArticle(ctx: StateContext<ArticleStateModel>, action: ArticleActions.GetOne) {
    return this.handleAsyncAction(
      ctx,
      () => this.articleService.getOneArticle(action.id),
      'Failed to get article',
    ).pipe(
      tap((article) => {
        ctx.patchState({ selected: article });
      }),
    );
  }

  @Action(ArticleActions.Get)
  getArticles(ctx: StateContext<ArticleStateModel>, action: ArticleActions.Get) {
    return this.handleAsyncAction(
      ctx,
      () => this.articleService.getArticles(action.page),
      'Failed to get articles',
    ).pipe(
      tap((articles) => {
        ctx.patchState({ articles });
      }),
    );
  }

  @Action(ArticleActions.Create)
  createArticle(ctx: StateContext<ArticleStateModel>, action: ArticleActions.Create) {
    return this.handleAsyncAction(
      ctx,
      () => this.articleService.createArticle(action.data),
      'Failed to create article',
    ).pipe(
      tap((article) => {
        const state = ctx.getState();
        ctx.patchState({ articles: [article, ...state.articles] });
        this.toastr.success('Article created');
      }),
    );
  }

  @Action(ArticleActions.Edit)
  editArticle(ctx: StateContext<ArticleStateModel>, action: ArticleActions.Edit) {
    return this.handleAsyncAction(
      ctx,
      () => this.articleService.editArticle(action.id, action.article),
      'Failed to edit article',
    ).pipe(
      tap((article) => {
        const state = ctx.getState();
        const updatedArticles = state.articles.filter((stateArt) => stateArt.id !== article.id);
        ctx.patchState({ articles: [article, ...updatedArticles] });
        this.toastr.success('Article edited');
      }),
    );
  }

  @Action(ArticleActions.Delete)
  deleteArticle(ctx: StateContext<ArticleStateModel>, action: ArticleActions.Delete) {
    return this.handleAsyncAction(
      ctx,
      () => this.articleService.deleteArticle(action.id),
      'Failed to delete article',
    ).pipe(
      tap(() => {
        const state = ctx.getState();
        const updatedArticles = state.articles.filter((stateArt) => stateArt.id !== action.id);
        ctx.patchState({ articles: updatedArticles });
        this.toastr.success('Article deleted');
      }),
    );
  }

  // UI State Actions - no async operations, just state updates
  @Action(ArticleActions.SetPage)
  setPage(ctx: StateContext<ArticleStateModel>, action: ArticleActions.SetPage) {
    ctx.patchState({ currentPage: action.page });
  }

  @Action(ArticleActions.SetPageSize)
  setPageSize(ctx: StateContext<ArticleStateModel>, action: ArticleActions.SetPageSize) {
    ctx.patchState({ pageSize: action.pageSize, currentPage: 1 });
  }

  @Action(ArticleActions.SetSort)
  setSort(ctx: StateContext<ArticleStateModel>, action: ArticleActions.SetSort) {
    ctx.patchState({ sortBy: action.sortBy, sortDirection: action.sortDirection });
  }

  @Action(ArticleActions.SetFilters)
  setFilters(ctx: StateContext<ArticleStateModel>, action: ArticleActions.SetFilters) {
    ctx.patchState({ filters: action.filters, currentPage: 1 });
  }

  @Action(ArticleActions.ClearFilters)
  clearFilters(ctx: StateContext<ArticleStateModel>) {
    ctx.patchState({ filters: [], currentPage: 1 });
  }

  @Selector()
  static articles(state: ArticleStateModel) {
    return state.articles;
  }

  @Selector()
  static loading(state: ArticleStateModel) {
    return state.loading;
  }

  @Selector()
  static error(state: ArticleStateModel) {
    return state.error;
  }

  @Selector()
  static selected(state: ArticleStateModel) {
    return state.selected;
  }

  @Selector()
  static isPubliclyEditable(state: ArticleStateModel) {
    return state.selected?.isPubliclyEditable;
  }

  // UI State Selectors
  @Selector()
  static currentPage(state: ArticleStateModel) {
    return state.currentPage;
  }

  @Selector()
  static pageSize(state: ArticleStateModel) {
    return state.pageSize;
  }

  @Selector()
  static sortBy(state: ArticleStateModel) {
    return state.sortBy;
  }

  @Selector()
  static sortDirection(state: ArticleStateModel) {
    return state.sortDirection;
  }

  @Selector()
  static filters(state: ArticleStateModel) {
    return state.filters;
  }
}
