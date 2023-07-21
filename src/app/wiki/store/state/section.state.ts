import { Section } from '@app/wiki/store/models/section.model';
import { Injectable, ViewContainerRef } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { catchError, mergeMap, of, tap } from 'rxjs';
import { SectionService } from '@app/wiki/services/section.service';
import { SectionActions } from '../actions/section.actions';
import { ToastrService } from 'ngx-toastr';
import { ArticleActions } from '../actions/article.actions';

export interface SectionStateModel {
  section: Record<string, Section>;
  selected: string | null;
}

@State<SectionStateModel>({
  name: 'section',
  defaults: { section: {}, selected: null },
})
@Injectable()
export class SectionState {
  constructor(private toastr: ToastrService, private sectionService: SectionService) {}

  @Action(SectionActions.Create)
  createSection(ctx: StateContext<SectionStateModel>, action: SectionActions.Create) {
    return this.sectionService.createSection(action.data).pipe(
      tap(() => {
        this.toastr.success('Section created');
      }),
      mergeMap(() => {
        const sectionId = ctx.getState().selected;
        if (sectionId) {
          return ctx.dispatch(new SectionActions.GetOne(sectionId));
        }
        return of(true);
      }),
      catchError((error) => {
        this.toastr.error('Section creation failed');
        return error;
      }),
    );
  }

  @Action(SectionActions.Edit)
  editSection(ctx: StateContext<SectionStateModel>, action: SectionActions.Edit) {
    return this.sectionService.editSection(action.data).pipe(
      tap(() => {
        this.toastr.success('Section edited');
      }),
      mergeMap(() => {
        const sectionId = ctx.getState().selected;
        if (sectionId) {
          return ctx.dispatch(new SectionActions.GetOne(sectionId));
        }
        return of(true);
      }),
      catchError((error) => {
        this.toastr.error('Section edit failed');
        return error;
      }),
    );
  }

  @Action(SectionActions.Delete)
  removeSection(ctx: StateContext<SectionStateModel>, action: SectionActions.Delete) {
    return this.sectionService.deleteSection(action.id).pipe(
      tap(() => {
        this.toastr.success('Section deleted');
      }),
      mergeMap(() => {
        const sectionId = ctx.getState().selected;
        if (sectionId) {
          return ctx.dispatch(new SectionActions.GetOne(sectionId));
        }
        return of(true);
      }),
      catchError((error) => {
        this.toastr.error('Section delete failed');
        return error;
      }),
    );
  }

  @Action(SectionActions.GetOne)
  fetchSection(ctx: StateContext<SectionStateModel>, action: SectionActions.GetOne) {
    ctx.patchState({ selected: null });
    return this.sectionService.getOneSection(action.id).pipe(
      tap((section) => {
        ctx.patchState({ selected: section.id, section: { ...ctx.getState().section, [section.id]: section } });
      }),
      catchError((error) => {
        setTimeout(() => {
          this.toastr.error('Fetch failed');
        }, 500);

        return of(error);
      }),
    );
  }

  @Selector()
  static current(state: SectionStateModel) {
    return state.section[state.selected ?? ''];
  }
}
