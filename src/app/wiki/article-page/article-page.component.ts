import { ArticleActions } from './../store/actions/article.actions';
import { Article } from '@app/wiki/store/models/article.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ArticleState } from '../store/state/article.state';
import { SectionActions } from '../store/actions/section.actions';
import { SectionState } from '../store/state/section.state';
import { Section } from '../store/models/section.model';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css'],
})
export class ArticlePageComponent implements OnInit {
  public title!: string;

  @Select(SectionState.current)
  section$!: Observable<Section>;
  constructor(private route: ActivatedRoute, private store: Store, private router: Router) {}

  ngOnInit() {
    this.title = this.route.snapshot.paramMap.get('title') ?? '';
    const sectionId = this.route.snapshot.paramMap.get('id') ?? 'default';
    this.store.dispatch(new SectionActions.FetchOne(sectionId));
  }

  goBack() {
    this.router.navigate(['wiki']);
  }
}
