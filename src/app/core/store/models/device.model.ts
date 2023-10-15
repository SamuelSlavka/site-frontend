import { Measurement } from './measurement.model';

export interface Device {
  id: string;
  name: string;
  isMain: boolean;
  measurements: Measurement[];
}

export interface SimpleDevice {
  id: string;
  name: string;
  isMain: boolean;
}
