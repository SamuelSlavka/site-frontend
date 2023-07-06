import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserRoles } from '@app/shared/enums/user-roles.enum';
import { Revision } from '@app/wiki/store/models/revision.model';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.css'],
})
export class RevisionComponent {
  @Input() revision!: Revision;
  @Output() editSection: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteSection: EventEmitter<void> = new EventEmitter<void>();

  isAdmin: boolean = false;

  constructor(private keycloakService: KeycloakService) {
    this.isAdmin = this.keycloakService.isUserInRole(UserRoles.ADMIN);
  }

  triggerEdit() {
    this.editSection.emit();
  }

  triggerDelete() {
    this.deleteSection.emit();
  }
}
