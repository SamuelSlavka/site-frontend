import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { MeasurementComponent } from './dashboard-page/components/measurement/measurement.component';
import { WeatherComponent } from './dashboard-page/components/weather/weather.component';
import { ForecastComponent } from './dashboard-page/components/forecast/forecast.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [DashboardPageComponent, MeasurementComponent, WeatherComponent, ForecastComponent],
  imports: [
    SharedModule,
    CommonModule,
    DashboardRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
})
export class DashboardModule {}
