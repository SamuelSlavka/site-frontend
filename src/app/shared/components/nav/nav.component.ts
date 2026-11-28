import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class NavComponent {
  private router = inject(Router);

  @Output() action = new EventEmitter();
  @Input() actionLabel: string | undefined;
  @Input() title: string | undefined;
  @Input() backUrl = '';
  @Input() showBack = true;

  actionTrigger() {
    this.action.emit();
  }

  back() {
    this.router.navigate([this.backUrl]);
  }
}
