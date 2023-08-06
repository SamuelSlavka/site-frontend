import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SectionDto } from '@app/wiki/store/models/section.model';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-section-nav',
  templateUrl: './section-nav.component.html',
  styleUrls: ['./section-nav.component.scss'],
})
export class SectionNavComponent {
  @Input() section!: SectionDto | null;
  @Input() isCollapsed: boolean = false;
  @Output() editSection: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteSection: EventEmitter<void> = new EventEmitter<void>();
  @Output() addSection: EventEmitter<void> = new EventEmitter<void>();
  @Output() collapseSection: EventEmitter<void> = new EventEmitter<void>();

  bsModalRef?: BsModalRef;

  add() {
    this.addSection.emit();
  }

  edit() {
    this.editSection.emit();
  }

  delete() {
    this.deleteSection.emit();
  }

  collapse() {
    this.collapseSection.emit();
  }
}
