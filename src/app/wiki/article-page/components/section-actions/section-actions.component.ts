import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SectionDto } from '@app/wiki/store/models/section.model';

@Component({
  selector: 'app-section-actions',
  templateUrl: './section-actions.component.html',
  styleUrls: ['./section-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionActionsComponent {
  @Input() section: SectionDto | null = null;
  @Input() selected: string | undefined;
  @Input() isPublic: boolean | undefined;

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
}
