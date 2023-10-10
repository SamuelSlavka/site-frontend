import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartHomePageComponent } from './smart-home-page/smart-home-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: SmartHomePageComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SmartHomeRoutingModule {}
