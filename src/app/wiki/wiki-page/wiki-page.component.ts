import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

import { ArticleActions } from '../store/actions/article.actions';
import { ArticleListItem, CreateArticle } from '../store/models/article.model';
import { ArticleState } from '../store/state/article.state';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { KeycloakProfile } from 'keycloak-js';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-wiki-page',
  templateUrl: './wiki-page.component.html',
  styleUrls: ['./wiki-page.component.scss'],
})
export class WikiPageComponent implements OnInit {
  private page: number = 0;
  bsModalRef?: BsModalRef;

  isLoggedIn$: Observable<boolean> = this.sessionService.isLoggedIn$;
  profile$: Observable<KeycloakProfile | undefined> = this.sessionService.profile$;

  @Select(ArticleState.articles)
  articles$!: Observable<ArticleListItem[]>;

  constructor(
    private sessionService: SessionService,
    private modalService: BsModalService,
    private router: Router,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new ArticleActions.Get(this.page));
  }

  back() {
    this.router.navigate(['']);
  }

  create() {
    this.bsModalRef = this.modalService.show(ArticleFormComponent);
    this.bsModalRef.content.onClose.subscribe((res: CreateArticle) => {
      this.store.dispatch(new ArticleActions.Create(res));
    });
  }
}
