import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '**',
    component: AdminComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminRoutingModule {}
