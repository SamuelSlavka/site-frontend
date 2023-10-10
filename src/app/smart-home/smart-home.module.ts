import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartHomePageComponent } from './smart-home-page/smart-home-page.component';
import { SmartHomeRoutingModule } from './smart-home-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule,
    SmartHomeRoutingModule,
    SharedModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
  ],
  declarations: [SmartHomePageComponent],
})
export class SmartHomeModule {}
