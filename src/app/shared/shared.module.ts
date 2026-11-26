import { CommonModule } from '@angular/common';
import { NgModule, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  faAngleDown,
  faArrowLeft,
  faArrowRight,
  faBars,
  faBookOpen,
  faChevronDown,
  faChevronRight,
  faCloud,
  faCloudBolt,
  faCloudRain,
  faCloudSun,
  faCompass,
  faDroplet,
  faEyeSlash,
  faFileLines,
  faGaugeHigh,
  faHouseSignal,
  faLock,
  faMagnifyingGlass,
  faPen,
  faPlus,
  faRightFromBracket,
  faShieldHalved,
  faSliders,
  faSmog,
  faSnowflake,
  faStar,
  faSun,
  faTemperatureHalf,
  faTrashCan,
  faUsers,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { NgbCollapseModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginPromptComponent } from './components/login-prompt/login-prompt.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PageComponent } from './components/page/page.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';
import { HasAccessDirective } from './directives/has-access.directive';
import { CustomDatePipe } from './pipes/custom-date.pipe';

const ngbModules = [NgbCollapseModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    TranslateModule,
    ...ngbModules,
  ],
  declarations: [
    AccessDeniedComponent,
    ConfirmationModalComponent,
    CustomDatePipe,
    FooterComponent,
    HasAccessDirective,
    HeaderComponent,
    LoginPromptComponent,
    NotFoundComponent,
    PageComponent,
    PlaceholderComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FontAwesomeModule,
    TranslateModule,
    ...ngbModules,
    CustomDatePipe,
    FooterComponent,
    HasAccessDirective,
    HeaderComponent,
    PageComponent,
    PlaceholderComponent,
  ],
})
export class SharedModule {
  constructor() {
    inject(FaIconLibrary).addIcons(
      faAngleDown,
      faArrowLeft,
      faArrowRight,
      faBars,
      faBookOpen,
      faChevronDown,
      faChevronRight,
      faCloud,
      faCloudBolt,
      faCloudRain,
      faCloudSun,
      faCompass,
      faDroplet,
      faEyeSlash,
      faFileLines,
      faGaugeHigh,
      faGithub,
      faHouseSignal,
      faLock,
      faMagnifyingGlass,
      faPen,
      faPlus,
      faRightFromBracket,
      faShieldHalved,
      faSliders,
      faSmog,
      faSnowflake,
      faStar,
      faSun,
      faTemperatureHalf,
      faTrashCan,
      faUsers,
      faXmark,
    );
  }
}
