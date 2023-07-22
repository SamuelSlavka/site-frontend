import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { InputModalComponent } from './components/input-modal/input-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './components/login/login.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './components/nav/nav.component';
import { HasAccessDirective } from './directives/has-access.directive';

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot({ timeOut: 1500, progressBar: true, positionClass: 'toast-bottom-right' }),
  ],
  declarations: [
    LoginComponent,
    ConfirmationModalComponent,
    InputModalComponent,
    NotFoundComponent,
    NavComponent,
    AccessDeniedComponent,
    HasAccessDirective,
  ],
  exports: [LoginComponent, NavComponent, HasAccessDirective],
})
export class SharedModule {}
