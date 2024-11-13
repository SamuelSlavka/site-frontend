export interface Weather {
  id: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    feels_like: number;
    humidity: number;
  };

  sys: {
    sunrise: number;
    sunset: number;
  };

  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  dt_txt: string;
  pop: number;
}

export interface Forecast {
  id: string;
  list: Weather[];
}

export interface Stocks {
  id: string;
  ticker: string;
  value: number;
}
