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
import { ArticleFormComponent } from './wiki-page/components/article-form/article-form.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    ArticleFormComponent,
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
    CommonModule,
    WikiRoutingModule,
    NgxsModule.forFeature([ArticleState]),
    NgxsModule.forFeature([SectionState]),
    FormsModule,
    BsDropdownModule.forRoot(),
    MarkdownModule.forRoot(),
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
  ],
})
export class WikiModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faAngleDown, faAngleUp);
  }
}
