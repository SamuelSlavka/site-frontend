import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article, ArticleListItem } from '@app/wiki/store/models/article.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  @Input() articles!: ArticleListItem[];
  constructor(private router: Router) {}

  ngOnInit() {}

  viewArticle(article: ArticleListItem) {
    this.router.navigate([`wiki/${article.superSection}`, { title: article.title }]);
  }
}
