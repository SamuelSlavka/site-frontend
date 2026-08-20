import { of, throwError } from 'rxjs';
import { ScheduledState } from './scheduled.state';
import { ScheduledActions } from '../actions';
import { Forecast, Stocks, Weather } from '../models';
import { ScheduledService } from '@app/core/services/scheduled.service';
import { ToastService } from '@core/services/toast.service';

describe('ScheduledState', () => {
  let state: ScheduledState;
  let scheduledService: jasmine.SpyObj<ScheduledService>;

  const weather: Weather = {
    id: '1',
    main: { temp: 22, temp_max: 23, temp_min: 21, feels_like: 22, humidity: 45 },
    sys: { sunrise: 1, sunset: 2 },
    weather: [{ id: 800, main: 'Clear', description: 'Sunny', icon: '01d' }],
    dt_txt: '2024-01-01 12:00:00',
    pop: 0,
  };

  const forecast: Forecast = { id: '1', list: [weather] };
  const stocks: Stocks = { id: '1', ticker: 'AAPL', value: 123 };

  const createCtx = (initial: any) => {
    const model = { ...initial };
    return {
      getState: () => model,
      patchState: (patch: any) => Object.assign(model, patch),
      state: model,
    } as any;
  };

  beforeEach(() => {
    scheduledService = jasmine.createSpyObj('ScheduledService', ['getWeather', 'getForecast', 'getStocks']);
    state = new ScheduledState(jasmine.createSpyObj('ToastService', ['success', 'error']), scheduledService);
  });

  it('loads weather, forecast and stocks', (done) => {
    const ctx = createCtx({ weather: null, forecast: null, stocks: null, loading: false, error: null });
    scheduledService.getWeather.and.returnValue(of(weather));
    scheduledService.getForecast.and.returnValue(of(forecast));
    scheduledService.getStocks.and.returnValue(of(stocks));

    state.getWeather(ctx).subscribe(() => {
      state.getForecast(ctx).subscribe(() => {
        state.getStocks(ctx).subscribe(() => {
          expect(ctx.state.weather).toEqual(weather);
          expect(ctx.state.forecast.temperature.length).toBe(1);
          expect(ctx.state.stocks).toEqual(stocks);
          done();
        });
      });
    });
  });

  it('exposes selectors and errors', (done) => {
    const model = { weather, forecast: null, stocks: null, loading: true, error: 'x' };
    expect(ScheduledState.weather(model as any)).toEqual(weather);
    expect(ScheduledState.loading(model as any)).toBeTrue();
    expect(ScheduledState.error(model as any)).toBe('x');

    const ctx = createCtx({ weather: null, forecast: null, stocks: null, loading: false, error: null });
    scheduledService.getWeather.and.returnValue(throwError(() => new Error('x')));
    state.getWeather(ctx).subscribe({
      complete: () => {
        expect(ctx.state.error).toBe('Failed to get weather');
        done();
      },
    });
  });
});
