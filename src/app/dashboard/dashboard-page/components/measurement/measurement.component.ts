import { Component } from '@angular/core';
import { Measurement } from '@app/core/store/models/measurement.model';
import { MeasurementState } from '@app/core/store/state/measurements.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-measurement',
  templateUrl: './measurement.component.html',
  styleUrls: ['./measurement.component.css'],
})
export class MeasurementComponent {
  @Select(MeasurementState.latestMeasurement) latest$!: Observable<Measurement>;
}
