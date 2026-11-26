import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MeasurementActions } from '@app/core/store/actions/measurement.actions';
import { MeasurementState } from '@app/core/store/state/measurements.state';
import { Store } from '@ngxs/store';
import { Subscription, filter } from 'rxjs';

@Component({
    selector: 'app-measurement',
    templateUrl: './measurement.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MeasurementComponent implements OnInit, OnDestroy {
  private store = inject(Store);

  latest$ = this.store.select(MeasurementState.latestMeasurement);
  subscription = new Subscription();
  timeout!: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.store.dispatch(new MeasurementActions.GetLatest());
    this.subscription.add(
      this.latest$.pipe(filter((latest) => !!latest)).subscribe((latest) => {
        let waitTime = 20000;

        const measuredAt = new Date(latest.measuredAt);
        const now = new Date();
        const difference = now.getTime() - measuredAt.getTime();
        // 15 minute time 900000 in ms
        // wait 5s plus rest of timeout
        // otherwise wait 20s and call
        if (difference < 900000) {
          waitTime += 900000 - difference;
        }

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.store.dispatch(new MeasurementActions.GetLatest());
        }, waitTime);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }
}
