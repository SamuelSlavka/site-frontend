import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { SectionActions } from '../store/actions/section.actions';
import { SectionState } from '../store/state/section.state';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePageComponent implements OnInit {
  public title!: string;
  public isPublic: boolean = false;

  @Select(SectionState.selectHead)
  selected$!: Observable<string>;

  constructor(private route: ActivatedRoute, private store: Store, private router: Router) {}

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get('title') ?? '';
    this.isPublic = this.route.snapshot.paramMap.get('isPubliclyEditable') === 'true';
    const sectionId = this.route.snapshot.paramMap.get('id') ?? 'default';
    this.store.dispatch(new SectionActions.GetOne(sectionId));
  }

  goBack() {
    this.router.navigate(['wiki']);
  }
}
