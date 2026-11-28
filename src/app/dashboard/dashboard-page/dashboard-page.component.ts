import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@app/wiki/services/session.service';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngxs/store';
import { MeasurementActions } from '@app/core/store/actions/measurement.actions';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss'],
    standalone: false
})
export class DashboardPageComponent implements OnInit {
  private keycloakService = inject(KeycloakService);
  private router = inject(Router);
  private sessionService = inject(SessionService);
  private store = inject(Store);

  isLoggedIn$: BehaviorSubject<boolean> = this.sessionService.isLoggedIn$;
  isAdmin$: BehaviorSubject<boolean> = this.sessionService.isAdmin$;

  ngOnInit(): void {
    this.store.dispatch(new MeasurementActions.GetLatest());
  }

  logout() {
    this.keycloakService.logout();
  }

  goTo(route: string) {
    this.router.navigate([route]);
  }

  openGit() {
    window.open('https://github.com/SamuelSlavka/', '_blank');
  }
}
