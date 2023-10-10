export interface Measurement {
  device: string;
  temperature: number;
  measuredAt: string;
  humidity: number;
}

export interface ParsedMeasurements {
  device: string;
  humidity: [string, number][];
  temperature: [string, number][];
}
