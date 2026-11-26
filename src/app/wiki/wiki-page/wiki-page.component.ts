import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { LoginPromptComponent } from '@app/shared/components/login-prompt/login-prompt.component';
import { ModalService } from '@app/shared/services/modal.service';
import { Store } from '@ngxs/store';

import { SessionService } from '../services/session.service';
import { ArticleActions } from '../store/actions/article.actions';
import { EditArticle } from '../store/models/article.model';
import { ArticleState } from '../store/state/article.state';
import { ArticleFormComponent } from './components/article-form/article-form.component';

@Component({
  selector: 'app-wiki-page',
  templateUrl: './wiki-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class WikiPageComponent implements OnInit {
  private sessionService = inject(SessionService);
  private modalService = inject(ModalService);
  private store = inject(Store);

  private page = 0;

  articles$ = this.store.select(ArticleState.articles);

  ngOnInit(): void {
    this.store.dispatch(new ArticleActions.Get(this.page));
  }

  create() {
    if (!this.sessionService.isLoggedIn$.getValue()) {
      this.modalService.open(LoginPromptComponent);
      return;
    }
    this.modalService.open(ArticleFormComponent).onClose.subscribe((res: EditArticle) => {
      this.store.dispatch(new ArticleActions.Create(res));
    });
  }
}
