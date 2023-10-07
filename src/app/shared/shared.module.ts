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
import { NavComponent } from './components/nav/nav.component';
import { HasAccessDirective } from './directives/has-access.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BasePageComponent } from './components/base-page/base-page.component';
import { LoginPromptComponent } from './components/login-prompt/login-prompt.component';
import { ActionItemComponent } from './components/action-item/action-item.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({ timeOut: 1500, progressBar: true, positionClass: 'toast-bottom-right' }),
  ],
  declarations: [
    LoginComponent,
    LoginPromptComponent,
    ConfirmationModalComponent,
    InputModalComponent,
    NotFoundComponent,
    NavComponent,
    AccessDeniedComponent,
    HasAccessDirective,
    BasePageComponent,
    ActionItemComponent,
    CustomDatePipe,
  ],
  exports: [
    FontAwesomeModule,
    LoginComponent,
    NavComponent,
    HasAccessDirective,
    BasePageComponent,
    LoginPromptComponent,
    ActionItemComponent,
    CustomDatePipe,
  ],
})
export class SharedModule {}
