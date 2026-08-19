import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-action-item',
  templateUrl: './action-item.component.html',
  styleUrls: ['./action-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
})
export class ActionItemComponent {
  @Output() action: EventEmitter<void> = new EventEmitter<void>();

  @Input() icon: IconProp = 'plus';
  @Input() text: string | undefined;
  @Input() size: string = 'sm';

  trigger(event: Event) {
    event.stopPropagation();
    this.action.emit();
  }
}
