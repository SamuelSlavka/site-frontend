import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BasePageComponent } from '@app/shared/components/base-page/base-page.component';
import { NavComponent } from '@app/shared/components/nav/nav.component';
import { PlaceholderComponent } from '@app/shared/components/placeholder/placeholder.component';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { SectionActions } from '../store/actions/section.actions';
import { SectionState } from '../store/state/section.state';
import { SectionComponent } from './components/section/section.component';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, BasePageComponent, NavComponent, PlaceholderComponent, SectionComponent],
})
export class ArticlePageComponent implements OnInit {
  public title!: string;
  public isPublic: boolean = false;

  @Select(SectionState.selectHead) selected$!: Observable<string>;
  @Select(SectionState.loading) loading$!: Observable<boolean>;

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
