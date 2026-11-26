import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Measurement } from '../store/models/measurement.model';

@Injectable({
  providedIn: 'root',
})
export class MeasurementService {
  private http = inject(HttpClient);

  getAllMeasurements(offset: number, deviceId: string): Observable<Measurement[]> {
    return this.http.get<Measurement[]>(`${environment.serverUrl}measurements?offset=${offset}&deviceId=${deviceId}`);
  }

  getLatestMeasurement(): Observable<Measurement> {
    return this.http.get<Measurement>(`${environment.serverUrl}measurements/latest`);
  }
}
