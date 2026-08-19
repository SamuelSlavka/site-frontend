import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, LoginComponent, NgbTooltipModule, TranslateModule],
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
