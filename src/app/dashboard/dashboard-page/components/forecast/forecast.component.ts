import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScheduledActions } from '@app/core/store/actions/scheduled.actions';
import { ParsedMeasurements } from '@app/core/store/models/measurement.model';
import { ScheduledState } from '@app/core/store/state/scheduled.state';
import { Select, Store } from '@ngxs/store';
import { EChartsOption } from 'echarts';
import { Observable, Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss',
})
export class ForecastComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  @Select(ScheduledState.forecast) forecast$!: Observable<ParsedMeasurements>;

  public options!: EChartsOption;
  public updateOptions: EChartsOption = {};

  constructor(private store: Store) {}

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
        formatter: function (params: any) {
          return `${params[0].data[1]} °C </br> ${params[1].data[1]} %`;
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
