import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SessionService } from '@app/core/services/session.service';
import { KeycloakService } from 'keycloak-angular';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngxs/store';
import { MeasurementActions } from '@app/core/store/actions/measurement.actions';
import { BasePageComponent } from '@app/shared/components/base-page/base-page.component';
import { NavComponent } from '@app/shared/components/nav/nav.component';
import { TranslateModule } from '@ngx-translate/core';
import { MeasurementComponent } from './components/measurement/measurement.component';
import { WeatherComponent } from './components/weather/weather.component';
import { PictureComponent } from './components/picture/picture.component';
import { ForecastComponent } from './components/forecast/forecast.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    BasePageComponent,
    NavComponent,
    MeasurementComponent,
    WeatherComponent,
    PictureComponent,
    ForecastComponent,
  ],
})
export class DashboardPageComponent implements OnInit {
  isLoggedIn$: BehaviorSubject<boolean> = this.sessionService.isLoggedIn$;
  isAdmin$: BehaviorSubject<boolean> = this.sessionService.isAdmin$;

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
