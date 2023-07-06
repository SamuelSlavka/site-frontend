import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Select, Store } from '@ngxs/store';
import { ArticleActions } from '../store/actions/article.actions';
import { Article, ArticleListItem } from '../store/models/article.model';
import { ArticleState } from '../store/state/article.state';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { InputModalComponent } from '@app/shared/components/input-modal/input-modal.component';

@Component({
  selector: 'app-wiki-page',
  templateUrl: './wiki-page.component.html',
  styleUrls: ['./wiki-page.component.css'],
})
export class WikiPageComponent implements OnInit {
  private page: number = 0;
  bsModalRef?: BsModalRef;
  @Select(ArticleState.articles)
  articles$!: Observable<ArticleListItem[]>;

  constructor(private modalService: BsModalService, private router: Router, private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(new ArticleActions.Fetch(this.page));
  }

  back() {
    this.router.navigate(['']);
  }

  create() {
    this.bsModalRef = this.modalService.show(InputModalComponent);
    this.bsModalRef.content.label = 'Input article name';
    this.bsModalRef.content.onClose.subscribe((res: string) => {
      this.store.dispatch(new ArticleActions.Create(res));
    });
  }
}
