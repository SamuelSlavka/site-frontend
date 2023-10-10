import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared/shared.module';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faAngleDown, faAngleUp, faCircleQuestion, faPen, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxsModule } from '@ngxs/store';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MarkdownModule } from 'ngx-markdown';

import { ArticlePageComponent } from './article-page/article-page.component';
import { RevisionComponent } from './article-page/components/revision/revision.component';
import { SectionFormComponent } from './article-page/components/section-form/section-form.component';
import { SectionComponent } from './article-page/components/section/section.component';
import { ArticleState } from './store/state/article.state';
import { SectionState } from './store/state/section.state';
import { ArticleFormComponent } from './wiki-page/components/article-form/article-form.component';
import { ArticleListComponent } from './wiki-page/components/article-list/article-list.component';
import { WikiPageComponent } from './wiki-page/wiki-page.component';
import { WikiRoutingModule } from './wiki-routing.module';
import { SectionActionsComponent } from './article-page/components/section-actions/section-actions.component';

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
    NgbTooltipModule,
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
    library.addIcons(faAngleDown, faAngleUp, faCircleQuestion, faPlus, faTrashCan, faPen);
  }
}
