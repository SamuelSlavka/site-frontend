import { Component, OnInit, OnDestroy } from '@angular/core';
import { MeasurementActions } from '@app/core/store/actions/measurement.actions';
import { Measurement } from '@app/core/store/models/measurement.model';
import { MeasurementState } from '@app/core/store/state/measurements.state';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css'],
})
export class MeasurementComponent implements OnInit, OnDestroy {
  @Select(MeasurementState.latestMeasurement) latest$!: Observable<Measurement>;
  subscription = new Subscription();
  timeout!: ReturnType<typeof setTimeout>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscription.add(
      this.latest$.pipe(filter((latest) => !!latest)).subscribe((latest) => {
        let waitTime = 5000;

        const measuredAt = new Date(latest.measuredAt);
        const now = new Date();
        const difference = now.getTime() - measuredAt.getTime();
        // 15 minute time 900000 in ms
        // wait 5s plus rest of timeout
        // otherwise wait 5s and call
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
