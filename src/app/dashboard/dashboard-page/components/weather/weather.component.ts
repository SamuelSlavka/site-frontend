import { Component, OnInit, inject } from '@angular/core';
import { ScheduledActions } from '@app/core/store/actions/scheduled.actions';
import { Weather } from '@app/core/store/models/scheduled.model';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ScheduledState } from '@app/core/store/state/scheduled.state';

@Component({
    selector: 'app-weather',
    templateUrl: './weather.component.html',
    styleUrls: ['./weather.component.css'],
    standalone: false
})
export class WeatherComponent implements OnInit {
  private store = inject(Store);

  weather$!: Observable<Weather | null>;

  constructor() {
    this.weather$ = this.store.select(ScheduledState.weather);
  }

  ngOnInit(): void {
    this.store.dispatch(new ScheduledActions.GetLatestWeather());
  }
}
