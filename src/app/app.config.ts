import {
  APP_INITIALIZER,
  ApplicationConfig,
  ENVIRONMENT_INITIALIZER,
  importProvidersFrom,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr,
} from '@angular/common/http';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faAngleDown, faAngleUp, faCircleQuestion, faPen, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { provideClientHydration, withNoIncrementalHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { KeycloakAngularModule, KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import { NgxsModule } from '@ngxs/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MarkdownModule } from 'ngx-markdown';
import { NgxEchartsModule } from 'ngx-echarts';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { appRoutes } from './app.routes';
import { initializer } from '@utils/app-init';
import { MeasurementState } from './core/store/state/measurements.state';
import { ScheduledState } from './core/store/state/scheduled.state';
import { ApiLoaderInterceptor } from './core/interceptors/api-loader.interceptor';
import { ApiPrefixInterceptor } from './core/interceptors/api-prefix.interceptor';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withComponentInputBinding(), withViewTransitions()),
    importProvidersFrom(
      KeycloakAngularModule,
      NgxsModule.forRoot([MeasurementState]),
      NgxsModule.forFeature([ScheduledState]),
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      MarkdownModule.forRoot(),
      NgxEchartsModule.forRoot({
        echarts: () => import('echarts'),
      }),
    ),
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
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakBearerInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService],
    },
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
    provideClientHydration(withNoIncrementalHydration()),
    provideAnimations(),
    {
      provide: ENVIRONMENT_INITIALIZER,
      multi: true,
      useValue: () => {
        inject(FaIconLibrary).addIcons(faAngleDown, faAngleUp, faCircleQuestion, faPlus, faTrashCan, faPen);
      },
    },
  ],
};
