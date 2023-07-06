import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WikiPageComponent } from './wiki-page/wiki-page.component';
import { ArticlePageComponent } from './article-page/article-page.component';

const routes: Routes = [
  {
    path: '',
    component: WikiPageComponent,
  },
  {
    path: ':id',
    component: ArticlePageComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class WikiRoutingModule {}
