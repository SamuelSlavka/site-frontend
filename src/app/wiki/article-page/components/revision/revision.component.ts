import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { SessionService } from '@app/wiki/services/session.service';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-revision',
    templateUrl: './revision.component.html',
    styleUrls: ['./revision.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class RevisionComponent {
  private sessionService = inject(SessionService);

  @Input() text!: string | undefined;
  @Input() title!: string | undefined;

  isAdmin$: BehaviorSubject<boolean> = this.sessionService.isAdmin$;

  isCollapsed = false;
}
