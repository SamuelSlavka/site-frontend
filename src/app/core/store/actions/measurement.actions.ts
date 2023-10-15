export namespace MeasurementActions {
  export class GetAll {
    static readonly type = '[Measurements] Get all';
    constructor(public offset: number, public deviceId: string) {}
  }

  export class GetDevices {
    static readonly type = '[Measurements] Get devices';
  }

  export class GetLatest {
    static readonly type = '[Measurements] Get latest';
  }
}
