import { ChangeDetectionStrategy, Component, Input, inject, signal } from '@angular/core';
import { ConfirmationModalComponent } from '@app/shared/components/confirmation-modal/confirmation-modal.component';
import { ModalService } from '@app/shared/services/modal.service';
import { ArticleActions } from '@app/wiki/store/actions/article.actions';
import { ArticleListItem, CreateArticle } from '@app/wiki/store/models/article.model';
import { ArticleState } from '@app/wiki/store/state/article.state';
import { Store } from '@ngxs/store';
import { filter } from 'rxjs';

import { ArticleFormComponent } from '../article-form/article-form.component';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ArticleListComponent {
  private store = inject(Store);
  private modalService = inject(ModalService);

  @Input() articles: ArticleListItem[] = [];
  loading$ = this.store.select(ArticleState.loading);
  readonly query = signal('');

  get visibleArticles(): ArticleListItem[] {
    const query = this.query().trim().toLowerCase();
    return query ? this.articles.filter((article) => article.title.toLowerCase().includes(query)) : this.articles;
  }

  articleLink(article: ArticleListItem) {
    return ['/wiki', article.section, { title: article.title, isPubliclyEditable: article.isPubliclyEditable }];
  }

  edit(article: ArticleListItem) {
    this.modalService
      .open(ArticleFormComponent, {
        initialState: {
          isEdit: true,
          initData: {
            title: article.title,
            isPrivate: article.isPrivate,
            isPubliclyEditable: article.isPubliclyEditable,
          },
        },
      })
      .onClose.subscribe((res: CreateArticle) => {
        this.store.dispatch(new ArticleActions.Edit(res, article.id));
      });
  }

  delete(article: ArticleListItem) {
    this.modalService
      .open(ConfirmationModalComponent, {
        initialState: { title: 'label.article.deleteTitle', label: 'label.article.deleteText', confirmLabel: 'button.delete', danger: true },
      })
      .onClose.pipe(filter((res) => res))
      .subscribe(() => {
        this.store.dispatch(new ArticleActions.Delete(article.id));
      });
  }
}
