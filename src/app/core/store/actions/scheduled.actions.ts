export namespace ScheduledActions {
  export class GetLatestForecast {
    static readonly type = '[Scheduled] Get forecast';
  }

  export class GetLatestWeather {
    static readonly type = '[Scheduled] Get weather';
  }

  export class GetLatestStocks {
    static readonly type = '[Scheduled] Get stocks';
  }
}
