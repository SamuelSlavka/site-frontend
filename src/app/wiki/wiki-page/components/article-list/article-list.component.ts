import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleListItem, CreateArticle } from '@app/wiki/store/models/article.model';
import { SessionService } from '@app/wiki/services/session.service';
import { ArticleFormComponent } from '../article-form/article-form.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ArticleActions } from '@app/wiki/store/actions/article.actions';
import { Store } from '@ngxs/store';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent {
  @Input() articles!: ArticleListItem[];
  @Input() currentUserId: string | undefined;
  isAdmin$: BehaviorSubject<boolean> = this.sessionService.isAdmin$;
  bsModalRef?: BsModalRef;

  constructor(
    private router: Router,
    private store: Store,
    private sessionService: SessionService,
    private modalService: BsModalService,
  ) {}

  viewArticle(article: ArticleListItem) {
    this.router.navigate([`wiki/${article.superSection}`, { title: article.title }]);
  }

  edit(article: ArticleListItem, event: Event) {
    event.stopPropagation();
    this.bsModalRef = this.modalService.show(ArticleFormComponent, {
      initialState: { title: article.title, isPrivate: article.isPrivate },
    });
    this.bsModalRef.content.onClose.subscribe((res: CreateArticle) => {
      this.store.dispatch(new ArticleActions.Edit(res, article.id));
    });
  }

  delete(event: Event) {
    event.stopPropagation();
  }
}
