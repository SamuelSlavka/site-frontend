import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Device } from '../store/models/device.model';
import { Forecast, Stocks, Weather } from '../store/models/scheduled.model';

@Injectable({
  providedIn: 'root',
})
export class ScheduledService {
  constructor(private http: HttpClient) {}

  getWeather(): Observable<Weather> {
    console.log(`${environment.serverUrl}scheduled/weather`);
    return this.http.get<Weather>(`${environment.serverUrl}scheduled/weather`);
  }

  getForecast(): Observable<Forecast> {
    return this.http.get<Forecast>(`${environment.serverUrl}scheduled/forecast`);
  }

  getStocks(): Observable<Stocks> {
    return this.http.get<Stocks>(`${environment.serverUrl}scheduled/stocks`);
  }
}
