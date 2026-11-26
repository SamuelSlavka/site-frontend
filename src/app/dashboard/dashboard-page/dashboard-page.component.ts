import { Component, inject } from '@angular/core';
import { SessionService } from '@app/wiki/services/session.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  standalone: false,
})
export class DashboardPageComponent {
  isAdmin$ = inject(SessionService).isAdmin$;
}
