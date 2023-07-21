import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { SessionService } from '@app/wiki/services/session.service';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Directive({
  selector: '[appHasAccess]',
})
export class HasAccessDirective {
  @Input() set appHasAccess(creatorId: string) {
    combineLatest([this.isAdmin$, this.sessionService.profile$, this.isEditable$]).subscribe(
      ([admin, profile, editable]) => {
        if ((admin || profile?.id === creatorId) && editable) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainerRef.clear();
        }
      },
    );
  }

  isAdmin$: BehaviorSubject<boolean> = this.sessionService.isAdmin$;
  isEditable$: BehaviorSubject<boolean> = this.sessionService.isEditable$;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private sessionService: SessionService,
  ) {}
}
