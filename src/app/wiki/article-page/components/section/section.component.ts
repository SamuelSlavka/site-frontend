import { Component, Input, OnInit } from '@angular/core';
import { SectionActions } from '@app/wiki/store/actions/section.actions';
import { Section } from '@app/wiki/store/models/section.model';
import { Store } from '@ngxs/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { SectionFormComponent } from '../section-form/section-form.component';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
})
export class SectionComponent implements OnInit {
  @Input() section!: Section;
  bsModalRef?: BsModalRef;
  constructor(private modalService: BsModalService, private store: Store) {}

  ngOnInit() {}

  addSection() {
    console.log(this.section.id);
    this.bsModalRef = this.modalService.show(SectionFormComponent);
    this.bsModalRef.content.onClose.subscribe((text: string) => {
      console.log({ superSectionId: this.section.id, text });
      this.store.dispatch(new SectionActions.Create({ superSectionId: this.section.id, text }));
    });
  }

  editSection() {
    this.bsModalRef = this.modalService.show(SectionFormComponent);
  }

  deleteSection() {}
}
