import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentUrlService {
  public url: string = environment.serverUrl;
  constructor() {}
}
