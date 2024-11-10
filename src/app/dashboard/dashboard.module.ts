import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { MeasurementComponent } from './dashboard-page/components/measurement/measurement.component';
import { WeatherComponent } from './dashboard-page/components/weather/weather.component';

@NgModule({
  declarations: [DashboardPageComponent, MeasurementComponent, WeatherComponent],
  imports: [SharedModule, CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
