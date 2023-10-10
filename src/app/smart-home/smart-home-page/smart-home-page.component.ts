import { Component, OnInit } from '@angular/core';
import { MeasurementActions } from '@app/core/store/actions/measurement.actions';
import { Measurement } from '@app/core/store/models/measurement.model';
import { MeasurementState } from '@app/core/store/state/measurements.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-smart-home-page',
  templateUrl: './smart-home-page.component.html',
  styleUrls: ['./smart-home-page.component.css'],
})
export class SmartHomePageComponent implements OnInit {
  constructor(private readonly store: Store) {}

  @Select(MeasurementState.allMeasurements) all$!: Observable<Measurement>;

  ngOnInit() {
    this.store.dispatch(new MeasurementActions.GetAll());
  }
}
