import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@app/wiki/services/session.service';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { MeasurementState } from '../store/state/measurements.state';
import { Select, Store } from '@ngxs/store';
import { Measurement } from '../store/models/measurement.model';
import { MeasurementActions } from '../store/actions/measurement.actions';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  isAdmin$: BehaviorSubject<boolean> = this.sessionService.isAdmin$;
  isLoggedIn$: BehaviorSubject<boolean> = this.sessionService.isLoggedIn$;

  @Select(MeasurementState.latestMeasurement) latest$!: Observable<Measurement>;

  constructor(
    private keycloakService: KeycloakService,
    private router: Router,
    private sessionService: SessionService,
    private store: Store,
  ) {}

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
