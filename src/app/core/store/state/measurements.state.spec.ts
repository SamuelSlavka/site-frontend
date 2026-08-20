import { of, throwError } from 'rxjs';
import { MeasurementState } from './measurements.state';
import { MeasurementActions } from '../actions';
import { Measurement, ParsedMeasurements, SimpleDevice } from '../models';
import { MeasurementService } from '@app/core/services/measurement.service';
import { DevicesService } from '@app/core/services/devices.service';
import { ToastService } from '@core/services/toast.service';

describe('MeasurementState', () => {
  let state: MeasurementState;
  let measurementService: jasmine.SpyObj<MeasurementService>;
  let devicesService: jasmine.SpyObj<DevicesService>;

  const measurement: Measurement = {
    device: 'device-1',
    temperature: 22.5,
    humidity: 45,
    measuredAt: '2024-01-01T12:00:00Z',
  };

  const devices: SimpleDevice[] = [{ id: 'device-1', name: 'Living Room', isMain: true }];

  const createCtx = (initial: any) => {
    const model = { ...initial };
    return {
      getState: () => model,
      patchState: (patch: any) => Object.assign(model, patch),
      state: model,
    } as any;
  };

  beforeEach(() => {
    measurementService = jasmine.createSpyObj('MeasurementService', ['getLatestMeasurement', 'getAllMeasurements']);
    devicesService = jasmine.createSpyObj('DevicesService', ['getAllSmallDevices']);
    state = new MeasurementState(jasmine.createSpyObj('ToastService', ['success', 'error']), measurementService, devicesService);
  });

  it('loads latest measurement', (done) => {
    const ctx = createCtx({ devices: [], measurements: {}, latest: null, loading: false, error: null });
    measurementService.getLatestMeasurement.and.returnValue(of(measurement));

    state.getOneMeasurement(ctx).subscribe(() => {
      expect(ctx.state.latest).toEqual(measurement);
      done();
    });
  });

  it('loads devices', (done) => {
    const ctx = createCtx({ devices: [], measurements: {}, latest: null, loading: false, error: null });
    devicesService.getAllSmallDevices.and.returnValue(of(devices));

    state.fetSimpleDevices(ctx).subscribe(() => {
      expect(ctx.state.devices).toEqual(devices);
      done();
    });
  });

  it('loads measurements', (done) => {
    const ctx = createCtx({ devices: [], measurements: {}, latest: null, loading: false, error: null });
    measurementService.getAllMeasurements.and.returnValue(of([measurement]));

    state.getMeasurements(ctx, new MeasurementActions.GetAll(0, 'device-1')).subscribe(() => {
      expect(ctx.state.measurements['device-1'].device).toBe('device-1');
      expect(ctx.state.measurements['device-1'].temperature.length).toBe(1);
      done();
    });
  });

  it('exposes selectors and errors', (done) => {
    const model = { devices: [], measurements: {}, latest: measurement, loading: true, error: 'x' };
    expect(MeasurementState.latestMeasurement(model as any)).toEqual(measurement);
    expect(MeasurementState.loading(model as any)).toBeTrue();
    expect(MeasurementState.error(model as any)).toBe('x');

    const ctx = createCtx({ devices: [], measurements: {}, latest: null, loading: false, error: null });
    measurementService.getLatestMeasurement.and.returnValue(throwError(() => new Error('x')));
    state.getOneMeasurement(ctx).subscribe({
      complete: () => {
        expect(ctx.state.error).toBe('Failed to get latest measurement');
        done();
      },
    });
  });
});
