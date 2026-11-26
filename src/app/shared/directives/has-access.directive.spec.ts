import { TemplateRef, ViewContainerRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from 'src/app/wiki/services/session.service';
import { HasAccessDirective } from './has-access.directive';

describe('HasAccessDirective', () => {
  it('should create an instance', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TemplateRef, useValue: {} },
        { provide: ViewContainerRef, useValue: {} },
        { provide: SessionService, useValue: { isAdmin$: new BehaviorSubject(false) } },
      ],
    });
    const directive = TestBed.runInInjectionContext(() => new HasAccessDirective());
    expect(directive).toBeTruthy();
  });
});
