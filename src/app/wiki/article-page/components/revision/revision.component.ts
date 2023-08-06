import { Component, Input } from '@angular/core';
import { SessionService } from '@app/wiki/services/session.service';
import { RevisionDto } from '@app/wiki/store/models/revision.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.scss'],
})
export class RevisionComponent {
  @Input() text!: string | undefined;
  @Input() title!: string | undefined;

  isEditable$: BehaviorSubject<boolean> = this.sessionService.isEditable$;
  isAdmin$: BehaviorSubject<boolean> = this.sessionService.isAdmin$;

  isCollapsed = false;

  constructor(private sessionService: SessionService) {}
}
