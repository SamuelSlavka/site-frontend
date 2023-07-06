import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Article, ArticleListItem } from '../models/article.model';
import { ArticleActions } from '../actions/article.actions';

import { catchError, tap } from 'rxjs';
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

  @Action(ArticleActions.FetchOne)
  fetchOneArticle(ctx: StateContext<ArticleStateModel>, action: ArticleActions.FetchOne) {
    return this.articleService.getOneArticle(action.id).pipe(
      tap((article) => {
        ctx.patchState({ selected: article });
      }),
      catchError((error) => {
        this.toastr.error('Creation failed');
        return error;
      }),
    );
  }

  @Action(ArticleActions.Fetch)
  fetchArticles(ctx: StateContext<ArticleStateModel>, action: ArticleActions.Fetch) {
    return this.articleService.getArticles(action.page).pipe(
      tap((articles) => {
        ctx.patchState({ articles });
      }),
      catchError((error) => {
        this.toastr.error('Failed to get articles');
        return error;
      }),
    );
  }

  @Action(ArticleActions.Create)
  createArticle(ctx: StateContext<ArticleStateModel>, action: ArticleActions.Create) {
    return this.articleService.createArticle(action.title).pipe(
      tap((article) => {
        const state = ctx.getState();
        ctx.patchState({ articles: [article, ...state.articles] });
        this.toastr.success('Article created');
      }),
      catchError((error) => {
        this.toastr.error('Failed to create article');
        return error;
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
}
