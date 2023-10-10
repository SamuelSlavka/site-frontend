import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartHomePageComponent } from './smart-home-page/smart-home-page.component';
import { SmartHomeRoutingModule } from './smart-home-routing.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  imports: [CommonModule, SmartHomeRoutingModule, SharedModule],
  declarations: [SmartHomePageComponent],
})
export class SmartHomeModule {}
