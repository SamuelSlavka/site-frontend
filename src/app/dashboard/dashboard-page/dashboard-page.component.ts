import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@app/wiki/services/session.service';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent {
  isAdmin$: BehaviorSubject<boolean> = this.sessionService.isAdmin$;
  isLoggedIn$: BehaviorSubject<boolean> = this.sessionService.isLoggedIn$;

  constructor(
    private keycloakService: KeycloakService,
    private router: Router,
    private sessionService: SessionService,
  ) {}

  logout() {
    this.keycloakService.logout();
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
