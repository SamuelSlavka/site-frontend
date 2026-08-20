import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { MeasurementState, ScheduledState } from './state';

@NgModule({
  imports: [NgxsModule.forFeature([MeasurementState, ScheduledState])],
})
export class CoreStoreModule {}
