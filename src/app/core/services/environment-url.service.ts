import { Injectable } from '@angular/core';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {
  public url: string = environment.serverUrl;
  constructor() { }
}
