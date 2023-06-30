import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NotFoundComponent, AccessDeniedComponent],
})
export class SharedModule {}
