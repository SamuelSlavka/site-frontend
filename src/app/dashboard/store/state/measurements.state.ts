import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { catchError, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Measurement } from '../models/measurement.model';
import { MeasurementService } from '@app/dashboard/services/measurement.service';
import { MeasurementActions } from '../actions/measurement.actions';

export interface MeasurementStateModel {
  measurements: Measurement[];
  latest: Measurement | null;
}

@State<MeasurementStateModel>({
  name: 'measurement',
  defaults: { measurements: [], latest: null },
})
@Injectable()
export class MeasurementState {
  constructor(private toastr: ToastrService, private measurementService: MeasurementService) {}

  @Action(MeasurementActions.GetLatest)
  getOneMeasurement(ctx: StateContext<MeasurementStateModel>) {
    return this.measurementService.getLatestMeasurement().pipe(
      tap((measurement) => {
        ctx.patchState({ latest: measurement });
      }),
      catchError((error) => {
        this.toastr.error('Get latest failed');
        return of(error);
      }),
    );
  }

  @Action(MeasurementActions.GetAll)
  getMeasurements(ctx: StateContext<MeasurementStateModel>) {
    return this.measurementService.getAllMeasurements().pipe(
      tap((measurements) => {
        ctx.patchState({ latest: measurements[0], measurements });
      }),
      catchError((error) => {
        this.toastr.error('Failed to get articles');
        return of(error);
      }),
    );
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
