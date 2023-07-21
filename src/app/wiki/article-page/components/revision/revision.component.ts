import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserRoles } from '@app/shared/enums/user-roles.enum';
import { SessionService } from '@app/wiki/services/session.service';
import { Revision } from '@app/wiki/store/models/revision.model';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.scss'],
})
export class RevisionComponent {
  @Input() revision!: Revision;
  @Input() createdBy!: string;
  @Output() editSection: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteSection: EventEmitter<void> = new EventEmitter<void>();
  @Output() addSection: EventEmitter<void> = new EventEmitter<void>();

  isEditable$: BehaviorSubject<boolean> = this.sessionService.isEditable$;
  isAdmin$: BehaviorSubject<boolean> = this.sessionService.isAdmin$;

  constructor(private sessionService: SessionService) {}

  add() {
    this.addSection.emit();
  }

  edit() {
    this.editSection.emit();
  }

  delete() {
    this.deleteSection.emit();
  }
}
