import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DashboardRoutingModule {}
