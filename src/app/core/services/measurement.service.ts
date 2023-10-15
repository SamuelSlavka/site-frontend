import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Measurement } from '../store/models/measurement.model';
import { Device } from '../store/models/device.model';

@Injectable({
  providedIn: 'root',
})
export class MeasurementService {
  constructor(private http: HttpClient) {}

  getAllMeasurements(): Observable<Device[]> {
    return this.http.get<Device[]>(`${environment.serverUrl}devices`);
  }

  getLatestMeasurement(): Observable<Measurement> {
    return this.http.get<Measurement>(`${environment.serverUrl}measurements/latest`);
  }
}
