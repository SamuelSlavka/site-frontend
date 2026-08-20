import { of, throwError } from 'rxjs';
import { SectionState } from './section.state';
import { SectionActions } from '../actions';
import { SectionDto } from '../models';
import { SectionService } from '@app/wiki/services/section.service';
import { ToastService } from '@core/services/toast.service';

describe('SectionState', () => {
  let state: SectionState;
  let sectionService: jasmine.SpyObj<SectionService>;

  const section: SectionDto = {
    id: 'sec-1',
    title: 'Section 1',
    text: 'Body',
    latestRevision: 'rev-1',
    superSection: '',
    sectionOrder: 1,
    depth: 0,
    createdBy: 'user-1',
    article: 'article-1',
    subsections: [],
  };

  const child: SectionDto = {
    id: 'sec-2',
    title: 'Section 2',
    text: 'Body',
    latestRevision: 'rev-2',
    superSection: 'sec-1',
    sectionOrder: 2,
    depth: 1,
    createdBy: 'user-1',
    article: 'article-1',
    subsections: [],
  };

  const createCtx = (initial: any) => {
    const model = { ...initial };
    return {
      getState: () => model,
      patchState: (patch: any) => Object.assign(model, patch),
      state: model,
    } as any;
  };

  beforeEach(() => {
    sectionService = jasmine.createSpyObj('SectionService', ['getOneSection', 'createSection', 'editSection', 'deleteSection']);
    state = new SectionState(jasmine.createSpyObj('ToastService', ['success', 'error']), sectionService);
  });

  it('loads and normalizes sections', (done) => {
    const ctx = createCtx({ byHead: {}, selected: null, loading: false, error: null });
    sectionService.getOneSection.and.returnValue(of([section, child]));

    state.fetchSection(ctx, new SectionActions.GetOne('head-1')).subscribe(() => {
      expect(ctx.state.selected).toBe('head-1');
      expect(ctx.state.byHead['head-1'].ids).toEqual(['sec-1', 'sec-2']);
      expect(ctx.state.byHead['head-1'].entities['sec-1'].subsections).toContain('sec-2');
      done();
    });
  });

  it('creates, edits and deletes sections', (done) => {
    const ctx = createCtx({ byHead: { 'head-1': { ids: ['sec-1'], entities: { 'sec-1': section } } }, selected: 'head-1', loading: false, error: null });
    sectionService.createSection.and.returnValue(of(child));
    sectionService.editSection.and.returnValue(of(section));
    sectionService.deleteSection.and.returnValue(of(undefined as void));

    state.createSection(ctx, new SectionActions.Create({ superSectionId: 'sec-1', revision: { text: 'Body', title: 'Section 2' } })).subscribe(() => {
      state.editSection(ctx, new SectionActions.Edit({ superSectionId: 'sec-1', revision: { text: 'Body', title: 'Section 1' } })).subscribe(() => {
        state.removeSection(ctx, new SectionActions.Delete({ id: 'sec-2', superSectionId: 'sec-1' })).subscribe(() => {
          expect(ctx.state.byHead['head-1']).toBeDefined();
          done();
        });
      });
    });
  });

  it('exposes selectors and errors', (done) => {
    const model = { byHead: { head: { ids: ['sec-1'], entities: { 'sec-1': section } } }, selected: 'head', loading: true, error: 'x' };
    expect(SectionState.selectSections(model as any)).toEqual({ 'sec-1': section });
    expect(SectionState.selectHead(model as any)).toBe('head');
    expect(SectionState.loading(model as any)).toBeTrue();
    expect(SectionState.error(model as any)).toBe('x');

    const ctx = createCtx({ byHead: {}, selected: null, loading: false, error: null });
    sectionService.getOneSection.and.returnValue(throwError(() => new Error('x')));
    state.fetchSection(ctx, new SectionActions.GetOne('head-1')).subscribe({
      error: () => {
        expect(ctx.state.error).toBe('Failed to fetch sections');
        done();
      },
    });
  });
});
