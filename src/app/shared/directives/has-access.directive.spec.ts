import { HasAccessDirective } from './has-access.directive';
import { TemplateRef, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from '@app/core/services/session.service';

describe('HasAccessDirective', () => {
  it('should create an instance', () => {
    const templateRef = {} as TemplateRef<Element>;
    const viewContainerRef = {
      clear: jasmine.createSpy('clear'),
      createEmbeddedView: jasmine.createSpy('createEmbeddedView'),
    } as unknown as ViewContainerRef;
    const sessionService = {
      isAdmin$: new BehaviorSubject<boolean>(false),
      profile$: new BehaviorSubject<{ id?: string } | undefined>(undefined),
    } as unknown as SessionService;

    const directive = new HasAccessDirective(templateRef, viewContainerRef, sessionService);
    expect(directive).toBeTruthy();
  });
});
