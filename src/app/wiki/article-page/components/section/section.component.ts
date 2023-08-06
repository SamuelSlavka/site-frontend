import { SessionService } from '@app/wiki/services/session.service';
import { Component, Input, OnInit } from '@angular/core';
import { SectionActions } from '@app/wiki/store/actions/section.actions';
import { Section, SectionDto } from '@app/wiki/store/models/section.model';
import { Select, Store } from '@ngxs/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SectionFormComponent } from '../section-form/section-form.component';
import { ConfirmationModalComponent } from '@app/shared/components/confirmation-modal/confirmation-modal.component';
import { BehaviorSubject, Observable, filter, map, mergeMap, of, tap } from 'rxjs';
import { RevisionDto } from '@app/wiki/store/models/revision.model';
import { SectionState } from '@app/wiki/store/state/section.state';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
})
export class SectionComponent implements OnInit {
  isCollapsed: boolean = false;
  isEditable$: BehaviorSubject<boolean> = this.sessionService.isEditable$;
  bsModalRef?: BsModalRef;

  @Input() selected!: string;

  @Select(SectionState.selectHead)
  head$!: Observable<string>;

  @Select(SectionState.selectSections)
  sections$!: Observable<Record<string, SectionDto>>;

  selected$!: Observable<SectionDto | null>;

  constructor(private store: Store, private sessionService: SessionService, private modalService: BsModalService) {}
  ngOnInit(): void {
    this.selected$ = this.sections$.pipe(map((sections) => sections[this.selected]));
  }

  add(selected: string) {
    this.bsModalRef = this.modalService.show(SectionFormComponent, { class: 'modal-lg' });
    this.bsModalRef.content.onClose.subscribe((revision: RevisionDto) => {
      this.store.dispatch(new SectionActions.Create({ superSectionId: selected, revision }));
    });
  }

  edit(selected: string, title: string | undefined, text: string | undefined) {
    this.bsModalRef = this.modalService.show(SectionFormComponent, {
      class: 'modal-lg',
      initialState: { isEdit: true, initData: { title: title ?? '', text: text ?? '' } },
    });

    this.bsModalRef.content.onClose.subscribe((revision: RevisionDto) => {
      this.store.dispatch(new SectionActions.Edit({ superSectionId: selected, revision }));
    });
  }

  delete(selected: string, superSectionId: string | undefined) {
    this.bsModalRef = this.modalService.show(ConfirmationModalComponent, {
      initialState: { label: 'Do you want to delete this section?' },
    });
    this.bsModalRef.content.onClose.pipe(filter((res: boolean) => res)).subscribe(() => {
      this.store.dispatch(new SectionActions.Delete({ id: selected, superSectionId: superSectionId ?? '' }));
    });
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
