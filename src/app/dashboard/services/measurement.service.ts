import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Measurement } from '../store/models/measurement.model';

@Injectable({
  providedIn: 'root',
})
export class MeasurementService {
  constructor(private http: HttpClient) {}

  getAllMeasurements(): Observable<Measurement[]> {
    return this.http.get<Measurement[]>(`${environment.serverUrl}measurements/all`);
  }

  getLatestMeasurement(): Observable<Measurement> {
    return this.http.get<Measurement>(`${environment.serverUrl}measurements/latest`);
  }
}
