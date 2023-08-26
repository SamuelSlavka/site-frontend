import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-action-item',
  templateUrl: './action-item.component.html',
  styleUrls: ['./action-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
