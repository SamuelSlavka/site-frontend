import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent {
  title = 'keycloak-demo';
  constructor(private keycloakService: KeycloakService, private router: Router) {}
  logout() {
    this.keycloakService.logout();
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }
}
