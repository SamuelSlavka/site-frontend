import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiPageComponent } from './wiki-page.component';

describe('WikiPageComponent', () => {
  let component: WikiPageComponent;
  let fixture: ComponentFixture<WikiPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [WikiPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
