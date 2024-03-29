import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Device, SimpleDevice } from '../store/models/device.model';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  constructor(private http: HttpClient) {}

  createDevice(form: { name: string; isMain: boolean }): Observable<Device> {
    return this.http.post<Device>(`${environment.serverUrl}devices`, form);
  }

  deleteDevice(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${environment.serverUrl}devices/${id}`);
  }

  getAllSmallDevices(): Observable<SimpleDevice[]> {
    return this.http.get<SimpleDevice[]>(`${environment.serverUrl}devices`);
  }
}
