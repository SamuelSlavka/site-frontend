import { Section } from '@app/wiki/store/models/section.model';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { tap } from 'rxjs';
import { SectionService } from '@app/wiki/services/section.service';
import { SectionActions } from '../actions/section.actions';

export interface SectionStateModel {
  section: Section | null;
}

@State<SectionStateModel>({
  name: 'section',
  defaults: { section: null },
})
@Injectable()
export class SectionState {
  constructor(private sectionService: SectionService) {}

  @Action(SectionActions.Create)
  createSection(_ctx: StateContext<SectionStateModel>, action: SectionActions.Create) {
    console.log(action);
    return this.sectionService.createSection(action.data).pipe(
      tap((section) => {
        console.log(action.data, section);
      }),
    );
  }

  @Action(SectionActions.FetchOne)
  fetchSection(ctx: StateContext<SectionStateModel>, action: SectionActions.FetchOne) {
    return this.sectionService.getOneSection(action.id).pipe(
      tap((section) => {
        ctx.patchState({ section });
      }),
    );
  }

  @Selector()
  static current(state: SectionStateModel) {
    return state.section;
  }
}
