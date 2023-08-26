import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { SessionService } from '@app/wiki/services/session.service';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Directive({
  selector: '[appHasAccess]',
})
export class HasAccessDirective {
  @Input() isPublic: boolean = false;

  @Input() set appHasAccess(creatorId: string | undefined) {
    combineLatest([this.isAdmin$, this.sessionService.profile$]).subscribe(([admin, profile]) => {
      if (admin || profile?.id === creatorId || this.isPublic) {
        this.viewContainerRef.clear();
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }

  isAdmin$: BehaviorSubject<boolean> = this.sessionService.isAdmin$;

  constructor(
    private templateRef: TemplateRef<Element>,
    private viewContainerRef: ViewContainerRef,
    private sessionService: SessionService,
  ) {}
}
