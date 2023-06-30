import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule } from './core/core.module';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { SharedModule } from './shared/shared.module';
import { RootStoreModule } from './root-store';
import { initializer } from 'src/utils/app-init';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    CoreModule,
    SharedModule,
    RootStoreModule,
  ],
  providers: [
    KeycloakService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [KeycloakService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
