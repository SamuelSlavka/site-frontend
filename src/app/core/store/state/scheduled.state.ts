import { Device, SimpleDevice } from '../models';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { tap } from 'rxjs';
import { ToastService } from '@core/services/toast.service';
import { Forecast, Stocks, Weather } from '../models';
import { ScheduledService } from '@app/core/services/scheduled.service';
import { ScheduledActions } from '../actions';
import { ParsedMeasurements } from '../models';
import { BaseState } from '../base.state';

export interface ScheduledStateModel {
  weather: Weather | null;
  forecast: ParsedMeasurements | null;
  stocks: Stocks | null;
  loading: boolean;
  error: string | null;
}

@State<ScheduledStateModel>({
  name: 'scheduled',
  defaults: {
    weather: null,
    forecast: null,
    stocks: null,
    loading: false,
    error: null,
  },
})
@Injectable()
export class ScheduledState extends BaseState<ScheduledStateModel> {
  constructor(protected toastr: ToastService, private scheduledService: ScheduledService) {
    super();
  }

  @Action(ScheduledActions.GetLatestWeather)
  getWeather(ctx: StateContext<ScheduledStateModel>) {
    return this.handleAsyncAction(
      ctx,
      () => this.scheduledService.getWeather(),
      'Failed to get weather',
    ).pipe(
      tap((weather) => {
        ctx.patchState({ weather });
      }),
    );
  }

  @Action(ScheduledActions.GetLatestForecast)
  getForecast(ctx: StateContext<ScheduledStateModel>) {
    return this.handleAsyncAction(
      ctx,
      () => this.scheduledService.getForecast(),
      'Failed to get forecast',
    ).pipe(
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
        ctx.patchState({ forecast: parsed });
      }),
    );
  }

  @Action(ScheduledActions.GetLatestStocks)
  getStocks(ctx: StateContext<ScheduledStateModel>) {
    return this.handleAsyncAction(
      ctx,
      () => this.scheduledService.getStocks(),
      'Failed to get stocks',
    ).pipe(
      tap((stocks) => {
        ctx.patchState({ stocks });
      }),
    );
  }

  @Selector()
  static loading(state: ScheduledStateModel) {
    return state.loading;
  }

  @Selector()
  static error(state: ScheduledStateModel) {
    return state.error;
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
