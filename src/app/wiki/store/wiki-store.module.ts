import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ArticleState, SectionState } from './state';

@NgModule({
  imports: [NgxsModule.forFeature([ArticleState, SectionState])],
})
export class WikiStoreModule {}
