import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  @Output() action = new EventEmitter();
  @Input() actionLabel: string | undefined;
  @Input() title: string | undefined;
  @Input() backUrl: string = '';
  @Input() showBack = true;

  constructor(private router: Router) {}

  actionTrigger() {
    this.action.emit();
  }

  back() {
    this.router.navigate([this.backUrl]);
  }
}
