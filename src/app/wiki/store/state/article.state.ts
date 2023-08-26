import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Article, ArticleListItem } from '../models/article.model';
import { ArticleActions } from '../actions/article.actions';

import { catchError, of, tap } from 'rxjs';
import { ArticleService } from '@app/wiki/services/article.service';
import { ToastrService } from 'ngx-toastr';

export interface ArticleStateModel {
  articles: ArticleListItem[];
  selected: Article | null;
}

@State<ArticleStateModel>({
  name: 'article',
  defaults: { articles: [], selected: null },
})
@Injectable()
export class ArticleState {
  constructor(private toastr: ToastrService, private articleService: ArticleService) {}

  @Action(ArticleActions.GetOne)
  getOneArticle(ctx: StateContext<ArticleStateModel>, action: ArticleActions.GetOne) {
    return this.articleService.getOneArticle(action.id).pipe(
      tap((article) => {
        ctx.patchState({ selected: article });
      }),
      catchError((error) => {
        this.toastr.error('Creation failed');
        return of(error);
      }),
    );
  }

  @Action(ArticleActions.Get)
  getArticles(ctx: StateContext<ArticleStateModel>, action: ArticleActions.Get) {
    return this.articleService.getArticles(action.page).pipe(
      tap((articles) => {
        ctx.patchState({ articles });
      }),
      catchError((error) => {
        this.toastr.error('Failed to get articles');
        return of(error);
      }),
    );
  }

  @Action(ArticleActions.Create)
  createArticle(ctx: StateContext<ArticleStateModel>, action: ArticleActions.Create) {
    return this.articleService.createArticle(action.data).pipe(
      tap((article) => {
        const state = ctx.getState();
        ctx.patchState({ articles: [article, ...state.articles] });
        this.toastr.success('Article created');
      }),
      catchError((error) => {
        this.toastr.error('Failed to create article');
        return of(error);
      }),
    );
  }

  @Action(ArticleActions.Edit)
  editArticle(ctx: StateContext<ArticleStateModel>, action: ArticleActions.Edit) {
    return this.articleService.editArticle(action.id, action.article).pipe(
      tap((article) => {
        const state = ctx.getState();
        const updatedArticles = state.articles.filter((stateArt) => stateArt.id !== article.id);
        ctx.patchState({ articles: [article, ...updatedArticles] });
        this.toastr.success('Article edited');
      }),
      catchError((error) => {
        this.toastr.error('Failed to edit article');
        return of(error);
      }),
    );
  }

  @Action(ArticleActions.Delete)
  deleteArticle(ctx: StateContext<ArticleStateModel>, action: ArticleActions.Delete) {
    return this.articleService.deleteArticle(action.id).pipe(
      tap(() => {
        const state = ctx.getState();
        const updatedArticles = state.articles.filter((stateArt) => stateArt.id !== action.id);
        ctx.patchState({ articles: updatedArticles });
        this.toastr.success('Article deleted');
      }),
      catchError((error) => {
        this.toastr.error('Failed to delete article');
        return of(error);
      }),
    );
  }

  @Selector()
  static articles(state: ArticleStateModel) {
    return state.articles;
  }

  @Selector()
  static selected(state: ArticleStateModel) {
    return state.selected;
  }

  @Selector()
  static isPubliclyEditable(state: ArticleStateModel) {
    return state.selected?.isPubliclyEditable;
  }
}
