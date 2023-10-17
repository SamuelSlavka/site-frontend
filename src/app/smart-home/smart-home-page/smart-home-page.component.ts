import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MeasurementActions } from '@app/core/store/actions/measurement.actions';
import { SimpleDevice } from '@app/core/store/models/device.model';
import { ParsedMeasurements } from '@app/core/store/models/measurement.model';
import { MeasurementState } from '@app/core/store/state/measurements.state';
import { Select, Store } from '@ngxs/store';
import { EChartsOption } from 'echarts';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-smart-home-page',
  templateUrl: './smart-home-page.component.html',
  styleUrls: ['./smart-home-page.component.css'],
})
export class SmartHomePageComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private gridOffset = '35';

  public options!: EChartsOption;
  public updateOptions: Record<string, EChartsOption> = {};

  constructor(private readonly store: Store) {}

  @Select(MeasurementState.loading) loading$!: Observable<boolean>;
  @Select(MeasurementState.allMeasurements) measurements$!: Observable<Record<string, ParsedMeasurements>>;
  @Select(MeasurementState.allDevices) devices$!: Observable<SimpleDevice[]>;

  setOffset(deviceId: string, offset: number = 0) {
    this.store.dispatch(new MeasurementActions.GetAll(offset, deviceId));
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    console.log(window.innerWidth);
    this.refreshOffset();
  }

  ngOnInit() {
    this.store.dispatch(new MeasurementActions.GetDevices());

    this.subscription.add(
      this.devices$.subscribe((devices) => {
        devices.forEach((device) => {
          this.store.dispatch(new MeasurementActions.GetAll(1, device.id));
        });
      }),
    );

    this.subscription.add(
      this.measurements$.subscribe((measurements) => {
        Object.keys(measurements).forEach((key) => {
          this.refreshOptions(measurements[key], key);
        });
      }),
    );

    this.options = {
      legend: {
        data: ['Temperature', 'Humidity'],
        textStyle: {
          color: '#8ecae6',
        },
      },
      xAxis: {
        type: 'time',
      },
      grid: {
        right: 40,
        left: 40,
      },
      tooltip: { trigger: 'axis' },
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
          name: 'Hum (%)',
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

  private refreshOptions(parsed: ParsedMeasurements, key: string) {
    this.updateOptions[key] = {
      grid: {
        right: this.gridOffset,
        left: this.gridOffset,
      },
      series: [
        {
          smooth: true,
          sampling: 'average',
          name: 'Temperature',
          type: 'line',
          data: parsed.temperature,
        },
        {
          smooth: true,
          sampling: 'average',
          name: 'Humidity',
          type: 'line',
          data: parsed.humidity,
        },
      ],
    };
  }

  private refreshOffset() {
    if (window.innerWidth <= 576) {
      this.gridOffset = '32';
    } else {
      this.gridOffset = '40';
    }
  }
}
