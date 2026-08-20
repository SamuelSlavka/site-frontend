import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionItemComponent } from '@app/shared/components/action-item/action-item.component';
import { HasAccessDirective } from '@app/shared/directives/has-access.directive';
import { TranslateModule } from '@ngx-translate/core';
import { SectionDto } from '@app/wiki/store/models/section.model';

@Component({
  selector: 'app-section-actions',
  templateUrl: './section-actions.component.html',
  styleUrls: ['./section-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslateModule, HasAccessDirective, ActionItemComponent],
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
