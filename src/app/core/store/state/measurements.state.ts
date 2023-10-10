import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { catchError, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Measurement, ParsedMeasurements } from '../models/measurement.model';
import { MeasurementActions } from '../actions/measurement.actions';
import { MeasurementService } from '@app/core/services/measurement.service';

export interface MeasurementStateModel {
  measurements: ParsedMeasurements;
  latest: Measurement | null;
  loading: boolean;
}

@State<MeasurementStateModel>({
  name: 'measurement',
  defaults: {
    measurements: {
      device: '',
      humidity: [],
      temperature: [],
    },
    latest: null,
    loading: false,
  },
})
@Injectable()
export class MeasurementState {
  constructor(private toastr: ToastrService, private measurementService: MeasurementService) {}

  @Action(MeasurementActions.GetLatest)
  getOneMeasurement(ctx: StateContext<MeasurementStateModel>) {
    ctx.patchState({ loading: true });
    return this.measurementService.getLatestMeasurement().pipe(
      tap((measurement) => {
        ctx.patchState({ latest: measurement, loading: false });
      }),
      catchError((error) => {
        ctx.patchState({ loading: false });
        this.toastr.error('Get latest failed');
        return of(error);
      }),
    );
  }

  @Action(MeasurementActions.GetAll)
  getMeasurements(ctx: StateContext<MeasurementStateModel>) {
    ctx.patchState({ loading: true });
    return this.measurementService.getAllMeasurements().pipe(
      tap((measurements) => {
        const parsed: ParsedMeasurements = {
          device: measurements[0]?.device,
          humidity: [],
          temperature: [],
        };

        measurements.forEach((m) => {
          parsed.humidity.push([m.measuredAt, m.humidity + 1]);
          parsed.temperature.push([m.measuredAt, m.temperature]);
        });
        ctx.patchState({ latest: measurements[0], measurements: parsed, loading: false });
      }),
      catchError((error) => {
        ctx.patchState({ loading: false });
        this.toastr.error('Failed to get articles');
        return of(error);
      }),
    );
  }

  @Selector()
  static loading(state: MeasurementStateModel) {
    return state.loading;
  }

  @Selector()
  static latestMeasurement(state: MeasurementStateModel) {
    return state.latest;
  }

  @Selector()
  static allMeasurements(state: MeasurementStateModel) {
    return state.measurements;
  }
}
