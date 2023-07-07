import { Component, Input, OnInit } from '@angular/core';
import { SectionActions } from '@app/wiki/store/actions/section.actions';
import { Section } from '@app/wiki/store/models/section.model';
import { Store } from '@ngxs/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { SectionFormComponent } from '../section-form/section-form.component';
import { ConfirmationModalComponent } from '@app/shared/components/confirmation-modal/confirmation-modal.component';
import { Observable, filter } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { UserRoles } from '@app/shared/enums/user-roles.enum';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  @Input() section!: Section;
  isAdmin: boolean = false;
  bsModalRef?: BsModalRef;
  constructor(private keycloakService: KeycloakService, private modalService: BsModalService, private store: Store) {
    this.isAdmin = this.keycloakService.isUserInRole(UserRoles.ADMIN);
  }

  ngOnInit() {}

  addSection() {
    this.bsModalRef = this.modalService.show(SectionFormComponent, { class: 'modal-lg' });
    this.bsModalRef.content.onClose.subscribe((text: string) => {
      console.log({ superSectionId: this.section.id, text });
      this.store.dispatch(new SectionActions.Create({ superSectionId: this.section.id, text }));
    });
  }

  editSection() {
    this.bsModalRef = this.modalService.show(SectionFormComponent, {
      class: 'modal-lg',
      initialState: { isEdit: true, initText: this.section.latestRevision.text },
    });

    this.bsModalRef.content.onClose.subscribe((text: string) => {
      console.log({ superSectionId: this.section.id, text });
      this.store.dispatch(new SectionActions.Edit({ superSectionId: this.section.id, text }));
    });
  }

  deleteSection() {
    this.bsModalRef = this.modalService.show(ConfirmationModalComponent);
    this.bsModalRef.content.onClose.pipe(filter((res) => !!res)).subscribe(() => {
      this.store.dispatch(new SectionActions.Remove(this.section.id));
    });
  }
}
