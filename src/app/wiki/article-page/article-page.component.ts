import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { APP_NAME } from '@app/core/routing/app-title.strategy';
import { Store } from '@ngxs/store';

import { SectionActions } from '../store/actions/section.actions';
import { SectionState } from '../store/state/section.state';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ArticlePageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private documentTitle = inject(Title);

  title = '';
  isPublic = false;

  selected$ = this.store.select(SectionState.selectHead);
  loading$ = this.store.select(SectionState.loading);

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    this.title = params.get('title') ?? '';
    this.isPublic = params.get('isPubliclyEditable') === 'true';
    if (this.title) {
      this.documentTitle.setTitle(`${this.title} · Wiki · ${APP_NAME}`);
    }
    this.store.dispatch(new SectionActions.GetOne(params.get('id') ?? 'default'));
  }
}
