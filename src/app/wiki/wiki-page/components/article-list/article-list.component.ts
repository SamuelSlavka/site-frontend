import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActionItemComponent } from '@app/shared/components/action-item/action-item.component';
import { ConfirmationModalComponent } from '@app/shared/components/confirmation-modal/confirmation-modal.component';
import { HasAccessDirective } from '@app/shared/directives/has-access.directive';
import { PlaceholderComponent } from '@app/shared/components/placeholder/placeholder.component';
import { ArticleActions } from '@app/wiki/store/actions';
import { ArticleListItem, CreateArticle } from '@app/wiki/store/models';
import { ArticleState } from '@app/wiki/store/state';
import { TranslateModule } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { filter, Observable } from 'rxjs';

import { ArticleFormComponent } from '../article-form/article-form.component';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslateModule, HasAccessDirective, ActionItemComponent, PlaceholderComponent],
})
export class ArticleListComponent {
  @Input() articles!: ArticleListItem[];
  @Select(ArticleState.loading) loading$!: Observable<boolean>;

  bsModalRef?: BsModalRef;

  constructor(private router: Router, private store: Store, private modalService: BsModalService) {}

  viewArticle(article: ArticleListItem) {
    this.router.navigate([
      `wiki/${article.section}`,
      { title: article.title, isPubliclyEditable: article.isPubliclyEditable },
    ]);
  }

  edit(article: ArticleListItem) {
    this.bsModalRef = this.modalService.show(ArticleFormComponent, {
      initialState: {
        isEdit: true,
        initData: {
          title: article.title,
          isPrivate: article.isPrivate,
          isPubliclyEditable: article.isPubliclyEditable,
        },
      },
    });
    this.bsModalRef.content.onClose.subscribe((res: CreateArticle) => {
      this.store.dispatch(new ArticleActions.Edit(res, article.id));
    });
  }

  stopPropagation(event$: Event) {
    event$.stopPropagation();
  }

  delete(article: ArticleListItem) {
    this.bsModalRef = this.modalService.show(ConfirmationModalComponent, {
      initialState: { label: 'Do you want to delete this article?' },
    });
    this.bsModalRef.content.onClose.pipe(filter((res: boolean) => res)).subscribe(() => {
      this.store.dispatch(new ArticleActions.Delete(article.id));
    });
  }

  dropdown(event: Event) {
    event.stopPropagation();
  }
}
