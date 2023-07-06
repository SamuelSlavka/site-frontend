import { ModalModule } from 'ngx-bootstrap/modal';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { ApiLoaderInterceptor } from './interceptors/api-loader.interceptor';
import { ApiPrefixInterceptor } from './interceptors/api-prefix.interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { KeycloakService } from 'keycloak-angular';
import { initializer } from 'src/utils/app-init';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticleState } from '@app/wiki/store/state/article.state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    NgxsModule.forRoot([ArticleState]),
  ],
  providers: [
    KeycloakService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiLoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [KeycloakService],
      multi: true,
    },
  ],
})
export class CoreModule {}
