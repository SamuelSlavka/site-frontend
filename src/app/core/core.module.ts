import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { ApiLoaderInterceptor } from './interceptors/api-loader.interceptor';
import { ApiPrefixInterceptor } from './interceptors/api-prefix.interceptor';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule, ToastrModule.forRoot()],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
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
  ],
})
export class CoreModule {}
