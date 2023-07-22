import { SessionService } from '@app/wiki/services/session.service';
import { Component, Input } from '@angular/core';
import { SectionActions } from '@app/wiki/store/actions/section.actions';
import { Section } from '@app/wiki/store/models/section.model';
import { Store } from '@ngxs/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SectionFormComponent } from '../section-form/section-form.component';
import { ConfirmationModalComponent } from '@app/shared/components/confirmation-modal/confirmation-modal.component';
import { BehaviorSubject, filter } from 'rxjs';
import { RevisionCreate } from '@app/wiki/store/models/revision.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent {
  @Input() section!: Section;
  isCollapsed: boolean = false;
  isEditable$: BehaviorSubject<boolean> = this.sessionService.isEditable$;
  bsModalRef?: BsModalRef;

  constructor(private sessionService: SessionService, private modalService: BsModalService, private store: Store) {}

  add() {
    this.bsModalRef = this.modalService.show(SectionFormComponent, { class: 'modal-lg' });
    this.bsModalRef.content.onClose.subscribe((revision: RevisionCreate) => {
      this.store.dispatch(new SectionActions.Create({ superSectionId: this.section.id, revision }));
    });
  }
  edit() {
    this.bsModalRef = this.modalService.show(SectionFormComponent, {
      class: 'modal-lg',
      initialState: { isEdit: true, initData: this.section.latestRevision },
    });

    this.bsModalRef.content.onClose.subscribe((revision: RevisionCreate) => {
      this.store.dispatch(new SectionActions.Edit({ superSectionId: this.section.id, revision }));
    });
  }

  delete() {
    this.bsModalRef = this.modalService.show(ConfirmationModalComponent, {
      initialState: { label: 'Do you want to delete this section?' },
    });
    this.bsModalRef.content.onClose.pipe(filter((res: boolean) => res)).subscribe(() => {
      this.store.dispatch(new SectionActions.Delete(this.section.id));
    });
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
