import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { MarkdownModule } from 'ngx-markdown';

import { ArticlePageComponent } from './article-page/article-page.component';
import { RevisionComponent } from './article-page/components/revision/revision.component';
import { SectionActionsComponent } from './article-page/components/section-actions/section-actions.component';
import { SectionFormComponent } from './article-page/components/section-form/section-form.component';
import { SectionComponent } from './article-page/components/section/section.component';
import { ArticleState } from './store/state/article.state';
import { SectionState } from './store/state/section.state';
import { ArticleFormComponent } from './wiki-page/components/article-form/article-form.component';
import { ArticleListComponent } from './wiki-page/components/article-list/article-list.component';
import { WikiPageComponent } from './wiki-page/wiki-page.component';
import { WikiRoutingModule } from './wiki-routing.module';

@NgModule({
  declarations: [
    ArticleFormComponent,
    ArticlePageComponent,
    ArticleListComponent,
    RevisionComponent,
    SectionComponent,
    WikiPageComponent,
    SectionFormComponent,
    SectionActionsComponent,
  ],
  imports: [
    SharedModule,
    WikiRoutingModule,
    NgxsModule.forFeature([ArticleState, SectionState]),
    MarkdownModule.forRoot(),
  ],
})
export class WikiModule {}
