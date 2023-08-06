import { Injectable } from '@angular/core';
import { SectionService } from '@app/wiki/services/section.service';
import { Section, SectionDto } from '@app/wiki/store/models/section.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, mergeMap, of, tap } from 'rxjs';

import { SectionActions } from '../actions/section.actions';

export interface SectionStateModel {
  sectionLists: Record<string, Record<string, SectionDto>>;
  selected: string | null;
}

@State<SectionStateModel>({
  name: 'section',
  defaults: { selected: null, sectionLists: {} },
})
@Injectable()
export class SectionState {
  constructor(private toastr: ToastrService, private sectionService: SectionService) {}

  @Action(SectionActions.GetOne)
  fetchSection(ctx: StateContext<SectionStateModel>, action: SectionActions.GetOne) {
    ctx.patchState({ selected: null });
    return this.sectionService.getOneSection(action.id).pipe(
      tap((sections) => {
        const head = action.id;
        ctx.patchState({
          selected: head,
          sectionLists: {
            ...ctx.getState().sectionLists,
            [head]: this.getSectionList(sections),
          },
        });
      }),
      catchError((error) => {
        this.toastr.error('Fetch failed');
        return of(error);
      }),
    );
  }

  // transform section list to map by their ids and set subsections for their parents
  private getSectionList(sections: SectionDto[]): Record<string, SectionDto> {
    return sections.reduce((acc, current) => {
      // create child section item
      acc[current.id] = { ...(acc[current.id] ?? {}), ...current };
      // handle parent (sections are ordered from backend, no need to add nonexistent super handling)
      if (acc[current.superSection]) {
        acc[current.superSection] = {
          ...acc[current.superSection],
          subsections: [current.id, ...(acc[current.superSection].subsections ?? [])],
        };
      }
      return acc;
    }, {} as Record<string, SectionDto>);
  }

  @Action(SectionActions.Create)
  createSection(ctx: StateContext<SectionStateModel>, action: SectionActions.Create) {
    return this.sectionService.createSection(action.data).pipe(
      tap((subsection) => {
        const head = ctx.getState().selected;
        if (!head) {
          throw new Error('Problem initializing sections');
        }
        const currentList = ctx.getState().sectionLists[head] ?? {};
        const superSectionId = action.data.superSectionId;
        // add new section to map and add its id to superSection children
        ctx.patchState({
          sectionLists: {
            ...(ctx.getState().sectionLists ?? {}),
            [head]: {
              ...currentList,
              [subsection.id]: subsection,
              [superSectionId]: {
                ...(currentList[superSectionId] ?? {}),
                subsections: [...(currentList[superSectionId]?.subsections ?? []), subsection.id],
              },
            },
          },
        });
        this.toastr.success('Section created');
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
      tap((section) => {
        const head = ctx.getState().selected;
        if (!head) {
          throw new Error('Problem initializing sections');
        }
        // update sections value in map
        const currentList = ctx.getState().sectionLists[head] ?? {};
        // keep old subsections
        const subsections = currentList[section.id].subsections;

        ctx.patchState({
          sectionLists: {
            ...ctx.getState().sectionLists,
            [head]: {
              ...currentList,
              [section.id]: { ...section, subsections },
            },
          },
        });

        this.toastr.success('Section edited');
      }),
      catchError((error) => {
        this.toastr.error('Section edit failed');
        return error;
      }),
    );
  }

  @Action(SectionActions.Delete)
  removeSection(ctx: StateContext<SectionStateModel>, action: SectionActions.Delete) {
    return this.sectionService.deleteSection(action.data).pipe(
      tap(() => {
        const head = ctx.getState().selected;
        if (!head) {
          throw new Error('Problem initializing sections');
        }
        const currentList = ctx.getState().sectionLists[head] ?? {};
        const superSectionId = action.data.superSectionId;

        // remove section from list
        delete currentList[action.data.id];
        // remove section from superSections children
        ctx.patchState({
          sectionLists: {
            ...ctx.getState().sectionLists,
            [head]: {
              ...currentList,
              [superSectionId]: {
                ...currentList[superSectionId],
                subsections: [...currentList[superSectionId].subsections.filter((sec) => sec !== action.data.id)],
              },
            },
          },
        });

        this.toastr.success('Section deleted');
      }),
      catchError((error) => {
        this.toastr.error('Section delete failed');
        return error;
      }),
    );
  }

  @Selector()
  static selectSections(state: SectionStateModel) {
    return state.sectionLists[state.selected ?? ''];
  }

  @Selector()
  static selectHead(state: SectionStateModel) {
    return state.selected;
  }
}
