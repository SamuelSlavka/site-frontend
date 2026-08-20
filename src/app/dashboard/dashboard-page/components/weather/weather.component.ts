import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduledActions } from '@app/core/store/actions';
import { Forecast, Weather } from '@app/core/store/models';
import { ScheduledState } from '@app/core/store/state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class WeatherComponent implements OnInit {
  @Select(ScheduledState.weather) weather$!: Observable<Weather>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new ScheduledActions.GetLatestWeather());
  }
}
