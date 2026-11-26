import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ScheduledActions } from '@app/core/store/actions/scheduled.actions';
import { ScheduledState } from '@app/core/store/state/scheduled.state';
import { Store } from '@ngxs/store';

const conditionIcons: Record<string, IconProp> = {
  Clear: 'sun',
  Clouds: 'cloud',
  Rain: 'cloud-rain',
  Drizzle: 'cloud-rain',
  Thunderstorm: 'cloud-bolt',
  Snow: 'snowflake',
};

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class WeatherComponent implements OnInit {
  private store = inject(Store);

  weather$ = this.store.select(ScheduledState.weather);

  ngOnInit(): void {
    this.store.dispatch(new ScheduledActions.GetLatestWeather());
  }

  conditionIcon(condition: string | undefined): IconProp {
    return (condition && conditionIcons[condition]) || (condition ? 'smog' : 'cloud-sun');
  }
}
