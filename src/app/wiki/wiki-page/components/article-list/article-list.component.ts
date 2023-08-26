import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleListItem, CreateArticle } from '@app/wiki/store/models/article.model';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ArticleActions } from '@app/wiki/store/actions/article.actions';
import { Store } from '@ngxs/store';
import { filter } from 'rxjs';
import { ConfirmationModalComponent } from '@app/shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleListComponent {
  @Input() articles!: ArticleListItem[];
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
