import { Device, SimpleDevice } from '@app/core/store/models/device.model';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { catchError, of, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Forecast, Stocks, Weather } from '../models/scheduled.model';
import { ScheduledService } from '@app/core/services/scheduled.service';
import { ScheduledActions } from '../actions/scheduled.actions';
import { ParsedMeasurements } from '../models/measurement.model';

export interface ScheduledStateModel {
  weather: Weather | null;
  forecast: ParsedMeasurements | null;
  stocks: Stocks | null;
  loading: boolean;
}

@State<ScheduledStateModel>({
  name: 'scheduled',
  defaults: {
    weather: null,
    forecast: null,
    stocks: null,
    loading: false,
  },
})
@Injectable()
export class ScheduledState {
  constructor(private toastr: ToastrService, private scheduledService: ScheduledService) {}

  @Action(ScheduledActions.GetLatestWeather)
  getWeather(ctx: StateContext<ScheduledStateModel>) {
    ctx.patchState({ loading: true });
    return this.scheduledService.getWeather().pipe(
      tap((weather) => {
        ctx.patchState({ weather, loading: false });
      }),
      catchError((error) => {
        ctx.patchState({ loading: false });
        this.toastr.error('Get weather failed');
        return of(error);
      }),
    );
  }

  @Action(ScheduledActions.GetLatestForecast)
  getForecast(ctx: StateContext<ScheduledStateModel>) {
    ctx.patchState({ loading: true });
    return this.scheduledService.getForecast().pipe(
      tap((forecast: Forecast) => {
        const parsed: ParsedMeasurements = {
          device: '',
          humidity: [],
          temperature: [],
          pop: [],
        };
        forecast.list.forEach((m) => {
          const date = new Date(m.dt_txt).toISOString();
          parsed.temperature.push([date, m.main.temp]);
          parsed.pop.push([date, m.pop]);
        });
        ctx.patchState({ forecast: parsed, loading: false });
      }),
      catchError((error) => {
        ctx.patchState({ loading: false });
        this.toastr.error('Get forecast failed');
        return of(error);
      }),
    );
  }

  @Action(ScheduledActions.GetLatestStocks)
  getStocks(ctx: StateContext<ScheduledStateModel>) {
    ctx.patchState({ loading: true });
    return this.scheduledService.getStocks().pipe(
      tap((stocks) => {
        ctx.patchState({ stocks, loading: false });
      }),
      catchError((error) => {
        ctx.patchState({ loading: false });
        this.toastr.error('Get stocks failed');
        return of(error);
      }),
    );
  }

  @Selector()
  static loading(state: ScheduledStateModel) {
    return state.loading;
  }

  @Selector()
  static weather(state: ScheduledStateModel) {
    return state.weather;
  }

  @Selector()
  static forecast(state: ScheduledStateModel) {
    return state.forecast;
  }

  @Selector()
  static stocks(state: ScheduledStateModel) {
    return state.stocks;
  }
}
