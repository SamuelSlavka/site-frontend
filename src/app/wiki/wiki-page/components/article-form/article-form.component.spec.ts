import { TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateArticle } from '@app/wiki/store/models/article.model';
import { WikiModule } from 'src/app/wiki/wiki.module';

import { ArticleFormComponent } from './article-form.component';

describe('ArticleFormComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [WikiModule] }).compileComponents();
  });

  const create = (initData?: CreateArticle) => {
    const fixture = TestBed.createComponent(ArticleFormComponent);
    fixture.componentInstance.initData = initData;
    fixture.detectChanges();
    return fixture.componentInstance;
  };

  it('derives the visibility option from the existing flags', () => {
    expect(create().form.value.visibility).toBe('public');
    expect(create({ title: 'a', isPrivate: true, isPubliclyEditable: false }).form.value.visibility).toBe('private');
    expect(create({ title: 'a', isPrivate: false, isPubliclyEditable: true }).form.value.visibility).toBe('open');
  });

  it('emits the API flags for the chosen visibility and closes', () => {
    const component = create();
    const close = vi.spyOn(TestBed.inject(NgbActiveModal), 'close');
    const emitted: CreateArticle[] = [];
    component.onClose.subscribe((value) => emitted.push(value));

    component.form.setValue({ title: 'Notes', visibility: 'open' });
    component.save();

    expect(emitted).toEqual([{ title: 'Notes', isPrivate: false, isPubliclyEditable: true }]);
    expect(close).toHaveBeenCalled();
  });

  it('does not submit without a title', () => {
    const component = create();
    const emitted: CreateArticle[] = [];
    component.onClose.subscribe((value) => emitted.push(value));
    component.save();
    expect(emitted).toEqual([]);
  });
});
