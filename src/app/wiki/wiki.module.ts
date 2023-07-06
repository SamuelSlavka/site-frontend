import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WikiRoutingModule } from './wiki-routing.module';
import { NgxsModule } from '@ngxs/store';
import { ArticleState } from './store/state/article.state';
import { SectionComponent } from './article-page/components/section/section.component';
import { WikiPageComponent } from './wiki-page/wiki-page.component';
import { RevisionComponent } from './article-page/components/revision/revision.component';
import { MarkdownModule } from 'ngx-markdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleListComponent } from './wiki-page/components/article-list/article-list.component';
import { ArticlePageComponent } from './article-page/article-page.component';
import { SectionFormComponent } from './article-page/components/section-form/section-form.component';
import { SharedModule } from '@app/shared/shared.module';
import { SectionState } from './store/state/section.state';

@NgModule({
  declarations: [
    ArticlePageComponent,
    ArticleListComponent,
    RevisionComponent,
    SectionComponent,
    WikiPageComponent,
    SectionFormComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
    CommonModule,
    WikiRoutingModule,
    NgxsModule.forFeature([ArticleState]),
    NgxsModule.forFeature([SectionState]),
    FormsModule,
  ],
})
export class WikiModule {}
