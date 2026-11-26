import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ScheduledActions } from '@app/core/store/actions/scheduled.actions';
import { ParsedMeasurements } from '@app/core/store/models/measurement.model';
import { ScheduledState } from '@app/core/store/state/scheduled.state';
import { areaGradient, baseTimeSeriesOptions, chartColors, valueAxis } from '@app/shared/charts/chart-theme';
import { Store } from '@ngxs/store';
import type { EChartsOption } from 'echarts';
import { Subscription, filter } from 'rxjs';

interface TooltipParam {
  axisValue: number;
  seriesIndex: number;
  data: [string, number];
}

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ForecastComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private cdr = inject(ChangeDetectorRef);

  private subscription = new Subscription();
  forecast$ = this.store.select(ScheduledState.forecast);

  readonly options: EChartsOption = {
    ...baseTimeSeriesOptions(),
    tooltip: {
      ...baseTimeSeriesOptions().tooltip,
      formatter: (raw) => {
        const params = raw as unknown as TooltipParam[];
        const time = new Date(params[0].axisValue).toLocaleString(undefined, {
          weekday: 'short',
          hour: '2-digit',
          minute: '2-digit',
        });
        const temp = params.find((p) => p.seriesIndex === 0)?.data[1];
        const pop = params.find((p) => p.seriesIndex === 1)?.data[1];
        return `<div style="color:${chartColors.muted};margin-bottom:4px">${time}</div>
          <b>${temp ?? '–'} °C</b> &nbsp;·&nbsp; ${pop != null ? Math.round(pop * 100) : '–'} %`;
      },
    },
    yAxis: [valueAxis('{value}°'), { ...valueAxis('', false), min: 0, max: 1, show: false }],
    series: [
      {
        name: 'temperature',
        type: 'line',
        yAxisIndex: 0,
        smooth: true,
        showSymbol: false,
        z: 2,
        lineStyle: { width: 2, color: chartColors.primary },
        itemStyle: { color: chartColors.primary },
        areaStyle: { color: areaGradient(chartColors.primary) },
      },
      {
        name: 'precipitation',
        type: 'bar',
        yAxisIndex: 1,
        barMaxWidth: 6,
        itemStyle: { color: 'rgba(112, 169, 161, 0.55)', borderRadius: [3, 3, 0, 0] },
      },
    ],
  };
  updateOptions: EChartsOption = {};

  ngOnInit(): void {
    this.store.dispatch(new ScheduledActions.GetLatestForecast());
    this.subscription.add(
      this.forecast$.pipe(filter((forecast) => forecast != null)).subscribe((forecast) => {
        this.refreshOptions(forecast);
        this.cdr.markForCheck();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private refreshOptions(forecast: ParsedMeasurements) {
    this.updateOptions = {
      series: [{ data: forecast.temperature }, { data: forecast.pop }],
    };
  }
}
