import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { SectionActions } from '../store/actions/section.actions';
import { Section } from '../store/models/section.model';
import { SectionState } from '../store/state/section.state';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
})
export class ArticlePageComponent implements OnInit {
  public title!: string;

  @Select(SectionState.current)
  section$!: Observable<Section>;
  constructor(private route: ActivatedRoute, private store: Store, private router: Router) {}

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get('title') ?? '';
    const sectionId = this.route.snapshot.paramMap.get('id') ?? 'default';
    this.store.dispatch(new SectionActions.GetOne(sectionId));
  }

  goBack() {
    this.router.navigate(['wiki']);
  }
}
