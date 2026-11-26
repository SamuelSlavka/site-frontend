import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ScheduledActions } from '@app/core/store/actions/scheduled.actions';
import { ParsedMeasurements } from '@app/core/store/models/measurement.model';
import { ScheduledState } from '@app/core/store/state/scheduled.state';
import { DefaultLabelFormatterCallbackParams, EChartsOption } from 'echarts';
import { Subscription, filter } from 'rxjs';
import { Store } from '@ngxs/store';

@Component({
    selector: 'app-forecast',
    templateUrl: './forecast.component.html',
    styleUrl: './forecast.component.scss',
    standalone: false
})
export class ForecastComponent implements OnInit, OnDestroy {
  private store = inject(Store);

  private subscription: Subscription = new Subscription();
  forecast$ = this.store.select(ScheduledState.forecast);

  public options!: EChartsOption;
  public updateOptions: EChartsOption = {};

  ngOnInit(): void {
    this.store.dispatch(new ScheduledActions.GetLatestForecast());

    this.subscription.add(
      this.forecast$.pipe(filter((f) => f != null)).subscribe((forecast) => {
        console.log(forecast);
        this.refreshOptions(forecast);
      }),
    );

    this.options = {
      xAxis: {
        type: 'time',
      },
      grid: {
        top: 30,
        bottom: 30,
        right: 30,
        left: 30,
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#212529',
        textStyle: {
          color: '#ccccf0',
        },
        formatter: (params) => {
          const [temperature, humidity] = params as DefaultLabelFormatterCallbackParams[];
          const value = (p: DefaultLabelFormatterCallbackParams) => (p.data as [unknown, number])[1];
          return `${value(temperature)} °C </br> ${value(humidity)} %`;
        },
      },
      yAxis: [
        {
          type: 'value',
          name: 'Temp (°C)',
          splitLine: {
            show: false,
          },
        },
        {
          type: 'value',
          name: 'Pop (%)',
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: '',
          type: 'line',
          yAxisIndex: 0,
          color: '#ccccf0',
        },
        {
          name: '',
          type: 'line',
          yAxisIndex: 1,
          color: '#a1a6f5',
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private refreshOptions(forecast: ParsedMeasurements) {
    this.updateOptions = {
      series: [
        {
          smooth: true,
          sampling: 'average',
          name: '',
          type: 'line',
          data: forecast.temperature,
        },
        {
          smooth: true,
          sampling: 'average',
          name: '',
          type: 'line',
          data: forecast.pop,
        },
      ],
    };
  }
}
