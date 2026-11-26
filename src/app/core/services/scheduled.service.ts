import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Forecast, Stocks, Weather } from '../store/models/scheduled.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduledService {
  private http = inject(HttpClient);

  getWeather(): Observable<Weather> {
    return this.http.get<Weather>(`${environment.serverUrl}scheduled/weather`);
  }

  getForecast(): Observable<Forecast> {
    return this.http.get<Forecast>(`${environment.serverUrl}scheduled/forecast`);
  }

  getStocks(): Observable<Stocks> {
    return this.http.get<Stocks>(`${environment.serverUrl}scheduled/stocks`);
  }
}
