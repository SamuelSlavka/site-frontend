import { Injectable } from '@angular/core';
import { environment } from '../../../environments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentUrlService {
  public url: string = environment.serverUrl;
  constructor() {}
}
