import { Component, OnDestroy, OnInit } from '@angular/core';
import { MeasurementActions } from '@app/core/store/actions/measurement.actions';
import { Measurement, ParsedMeasurements } from '@app/core/store/models/measurement.model';
import { MeasurementState } from '@app/core/store/state/measurements.state';
import { Select, Store } from '@ngxs/store';
import { EChartsOption } from 'echarts';
import { Observable, Subscription } from 'rxjs';

type DataT = {
  name: string;
  value: [string, number];
};

@Component({
  selector: 'app-smart-home-page',
  templateUrl: './smart-home-page.component.html',
  styleUrls: ['./smart-home-page.component.css'],
})
export class SmartHomePageComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  public options!: EChartsOption;
  public updateOptions!: EChartsOption;

  constructor(private readonly store: Store) {}

  @Select(MeasurementState.allMeasurements) all$!: Observable<Measurement>;
  @Select(MeasurementState.loading) loading$!: Observable<boolean>;
  @Select(MeasurementState.allMeasurements) measurements$!: Observable<ParsedMeasurements>;

  ngOnInit() {
    this.store.dispatch(new MeasurementActions.GetAll());
    this.subscription.add(
      this.measurements$.subscribe((measurements) => {
        this.updateOptions = {
          series: [
            {
              smooth: true,
              sampling: 'average',
              name: 'Temperature',
              type: 'line',
              data: measurements.temperature,
            },
            {
              smooth: true,
              sampling: 'average',
              name: 'Humidity',
              type: 'line',
              data: measurements.humidity,
            },
          ],
        };
      }),
    );

    this.options = {
      legend: {
        data: ['Temperature', 'Humidity'],
      },
      xAxis: {
        type: 'time',
        name: 'Time',
      },
      tooltip: { trigger: 'axis' },
      yAxis: [
        {
          type: 'value',
          name: 'Temperature (°C)',
          splitLine: {
            show: false,
          },
        },
        {
          type: 'value',
          name: 'Humidity (%)',
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: 'Temperature',
          type: 'line',
          yAxisIndex: 0,
        },
        {
          name: 'Humidity',
          type: 'line',
          yAxisIndex: 1,
        },
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
