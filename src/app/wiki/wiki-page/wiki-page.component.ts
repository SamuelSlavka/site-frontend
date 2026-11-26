import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';

import { ArticleActions } from '../store/actions/article.actions';
import { EditArticle } from '../store/models/article.model';
import { ArticleState } from '../store/state/article.state';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { KeycloakProfile } from 'keycloak-js';
import { SessionService } from '../services/session.service';
import { LoginPromptComponent } from '@app/shared/components/login-prompt/login-prompt.component';

@Component({
    selector: 'app-wiki-page',
    templateUrl: './wiki-page.component.html',
    styleUrls: ['./wiki-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class WikiPageComponent implements OnInit {
  private sessionService = inject(SessionService);
  private modalService = inject(BsModalService);
  private router = inject(Router);
  private store = inject(Store);

  private page = 0;
  bsModalRef?: BsModalRef;

  isLoggedIn$: Observable<boolean> = this.sessionService.isLoggedIn$;
  profile$: Observable<KeycloakProfile | undefined> = this.sessionService.profile$;

  articles$ = this.store.select(ArticleState.articles);

  ngOnInit(): void {
    this.store.dispatch(new ArticleActions.Get(this.page));
  }

  back() {
    this.router.navigate(['']);
  }

  create() {
    const sub: Subscription = this.isLoggedIn$.subscribe((logged) => {
      if (logged) {
        this.bsModalRef = this.modalService.show(ArticleFormComponent, { class: 'modal-dialog-centered' });
        this.bsModalRef.content.onClose.subscribe((res: EditArticle) => {
          this.store.dispatch(new ArticleActions.Create(res));
        });
      } else {
        this.bsModalRef = this.modalService.show(LoginPromptComponent, { class: 'modal-dialog-centered' });
      }
    });
    sub.unsubscribe();
  }
}
