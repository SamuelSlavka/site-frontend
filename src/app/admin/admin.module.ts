import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '@app/shared/shared.module';
@NgModule({
  imports: [CommonModule, AdminRoutingModule, SharedModule],
  declarations: [AdminComponent],
  providers: [],
})
export class AdminModule {}
