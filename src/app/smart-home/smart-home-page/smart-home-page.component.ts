import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { MeasurementActions } from '@app/core/store/actions/measurement.actions';
import { ParsedMeasurements } from '@app/core/store/models/measurement.model';
import { MeasurementState } from '@app/core/store/state/measurements.state';
import { areaGradient, baseTimeSeriesOptions, chartColors, valueAxis } from '@app/shared/charts/chart-theme';
import { Store } from '@ngxs/store';
import type { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';

interface Range {
  /** Days of history requested from the API; 0 means everything. */
  offset: number;
  label: string;
}

@Component({
  selector: 'app-smart-home-page',
  templateUrl: './smart-home-page.component.html',
  styleUrls: ['./smart-home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SmartHomePageComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly cdr = inject(ChangeDetectorRef);

  private subscription = new Subscription();

  readonly ranges: Range[] = [
    { offset: 1, label: 'label.smartHome.today' },
    { offset: 7, label: 'label.smartHome.week' },
    { offset: 0, label: 'label.smartHome.all' },
  ];
  selectedRange: Record<string, number> = {};

  readonly options: EChartsOption = {
    ...baseTimeSeriesOptions(),
    yAxis: [valueAxis('{value}°'), valueAxis('{value}%', false)],
    series: [
      {
        name: 'Temperature',
        type: 'line',
        yAxisIndex: 0,
        smooth: true,
        showSymbol: false,
        sampling: 'average',
        lineStyle: { width: 2, color: chartColors.primary },
        itemStyle: { color: chartColors.primary },
        areaStyle: { color: areaGradient(chartColors.primary, 0.22) },
      },
      {
        name: 'Humidity',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        showSymbol: false,
        sampling: 'average',
        lineStyle: { width: 1.5, color: chartColors.info, type: 'dashed' },
        itemStyle: { color: chartColors.info },
      },
    ],
  };
  updateOptions: Record<string, EChartsOption> = {};

  measurements$ = this.store.select(MeasurementState.allMeasurements);
  devices$ = this.store.select(MeasurementState.allDevices);

  ngOnInit() {
    this.store.dispatch(new MeasurementActions.GetDevices());

    this.subscription.add(
      this.devices$.subscribe((devices) => {
        devices.forEach((device) => this.setRange(device.id, this.selectedRange[device.id] ?? 1));
      }),
    );

    this.subscription.add(
      this.measurements$.subscribe((measurements) => {
        Object.entries(measurements).forEach(([deviceId, parsed]) => this.refreshOptions(parsed, deviceId));
        this.cdr.markForCheck();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setRange(deviceId: string, offset: number) {
    this.selectedRange[deviceId] = offset;
    this.store.dispatch(new MeasurementActions.GetAll(offset, deviceId));
  }

  latest(parsed: ParsedMeasurements | undefined, key: 'temperature' | 'humidity'): number | undefined {
    return parsed?.[key].at(-1)?.[1];
  }

  private refreshOptions(parsed: ParsedMeasurements, deviceId: string) {
    this.updateOptions[deviceId] = {
      series: [{ data: parsed.temperature }, { data: parsed.humidity }],
    };
  }
}
