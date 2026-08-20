import { Device, SimpleDevice } from '../models';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { tap } from 'rxjs';
import { ToastService } from '@core/services/toast.service';
import { Measurement, ParsedMeasurements } from '../models';
import { MeasurementActions } from '../actions';
import { MeasurementService } from '@app/core/services/measurement.service';
import { DevicesService } from '@app/core/services/devices.service';
import { BaseState } from '../base.state';

export interface MeasurementStateModel {
  devices: SimpleDevice[];
  measurements: Record<string, ParsedMeasurements>;
  latest: Measurement | null;
  loading: boolean;
  error: string | null;
}

@State<MeasurementStateModel>({
  name: 'measurement',
  defaults: {
    devices: [],
    measurements: {},
    latest: null,
    loading: false,
    error: null,
  },
})
@Injectable()
export class MeasurementState extends BaseState<MeasurementStateModel> {
  constructor(
    protected toastr: ToastService,
    private measurementService: MeasurementService,
    private devicesService: DevicesService,
  ) {
    super();
  }

  @Action(MeasurementActions.GetLatest)
  getOneMeasurement(ctx: StateContext<MeasurementStateModel>) {
    return this.handleAsyncAction(
      ctx,
      () => this.measurementService.getLatestMeasurement(),
      'Failed to get latest measurement',
    ).pipe(
      tap((measurement) => {
        ctx.patchState({ latest: measurement });
      }),
    );
  }

  @Action(MeasurementActions.GetDevices)
  fetSimpleDevices(ctx: StateContext<MeasurementStateModel>) {
    return this.handleAsyncAction(
      ctx,
      () => this.devicesService.getAllSmallDevices(),
      'Failed to get devices',
    ).pipe(
      tap((devices) => {
        ctx.patchState({ devices });
      }),
    );
  }

  @Action(MeasurementActions.GetAll)
  getMeasurements(ctx: StateContext<MeasurementStateModel>, action: MeasurementActions.GetAll) {
    return this.handleAsyncAction(
      ctx,
      () => this.measurementService.getAllMeasurements(action.offset, action.deviceId),
      'Failed to get measurements',
    ).pipe(
      tap((measurements) => {
        const state = ctx.getState();
        const parsed: ParsedMeasurements = {
          device: action.deviceId,
          humidity: [],
          temperature: [],
          pop: [],
        };

        measurements.forEach((m) => {
          parsed.humidity.push([m.measuredAt, m.humidity + 1]);
          parsed.temperature.push([m.measuredAt, m.temperature]);
        });

        ctx.patchState({ measurements: { ...state.measurements, [action.deviceId]: parsed } });
      }),
    );
  }

  @Selector()
  static loading(state: MeasurementStateModel) {
    return state.loading;
  }

  @Selector()
  static error(state: MeasurementStateModel) {
    return state.error;
  }

  @Selector()
  static latestMeasurement(state: MeasurementStateModel) {
    return state.latest;
  }

  @Selector()
  static allMeasurements(state: MeasurementStateModel) {
    return state.measurements;
  }

  @Selector()
  static allDevices(state: MeasurementStateModel) {
    return state.devices;
  }
}
