import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { SectionActions } from '../store/actions/section.actions';
import { SectionState } from '../store/state/section.state';

@Component({
    selector: 'app-article-page',
    templateUrl: './article-page.component.html',
    styleUrls: ['./article-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ArticlePageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private router = inject(Router);

  public title!: string;
  public isPublic = false;

  selected$!: Observable<string | null>;
  loading$!: Observable<boolean>;

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get('title') ?? '';
    this.isPublic = this.route.snapshot.paramMap.get('isPubliclyEditable') === 'true';
    const sectionId = this.route.snapshot.paramMap.get('id') ?? 'default';
    this.store.dispatch(new SectionActions.GetOne(sectionId));

    this.selected$ = this.store.select(SectionState.selectHead);
    this.loading$ = this.store.select(SectionState.loading);
  }

  goBack() {
    this.router.navigate(['wiki']);
  }
}
