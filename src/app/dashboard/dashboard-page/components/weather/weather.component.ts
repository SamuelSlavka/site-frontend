import { Component, OnInit, OnDestroy } from '@angular/core';
import { ScheduledActions } from '@app/core/store/actions/scheduled.actions';
import { Forecast, Weather } from '@app/core/store/models/scheduled.model';
import { ScheduledState } from '@app/core/store/state/scheduled.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent implements OnInit {
  @Select(ScheduledState.weather) weather$!: Observable<Weather>;
  @Select(ScheduledState.forecast) forecast$!: Observable<Forecast>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new ScheduledActions.GetLatestWeather());
    this.store.dispatch(new ScheduledActions.GetLatestForecast());
  }
}
