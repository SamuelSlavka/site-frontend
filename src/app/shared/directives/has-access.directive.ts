import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { SessionService } from '@app/wiki/services/session.service';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Directive({
    selector: '[appHasAccess]',
    standalone: false
})
export class HasAccessDirective {
  private templateRef = inject<TemplateRef<Element>>(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
  private sessionService = inject(SessionService);

  @Input() isPublic = false;

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
}
