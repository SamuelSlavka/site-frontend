import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-section-actions',
  templateUrl: './section-actions.component.html',
  styleUrls: ['./section-actions.component.scss'],
})
export class SectionActionsComponent {
  @Input() createdBy!: string;
  @Output() editSection: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteSection: EventEmitter<void> = new EventEmitter<void>();
  @Output() addSection: EventEmitter<void> = new EventEmitter<void>();

  add() {
    this.addSection.emit();
  }

  edit() {
    this.editSection.emit();
  }

  delete() {
    this.deleteSection.emit();
  }

  toggle(event: Event) {
    event.stopPropagation();
  }
}
