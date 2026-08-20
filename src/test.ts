import 'zone.js/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { KeycloakService } from 'keycloak-angular';
import { of } from 'rxjs';
import { ToastService } from '@core/services/toast.service';

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule,
      FontAwesomeModule,
      TranslateModule.forRoot(),
    ],
    providers: [
      {
        provide: ToastService,
        useValue: { success: () => {}, error: () => {} },
      },
      {
        provide: Store,
        useValue: {
          dispatch: () => of(null),
          select: () => of(null),
          selectSnapshot: () => null,
        },
      },
      {
        provide: KeycloakService,
        useValue: {
          isLoggedIn: () => Promise.resolve(false),
          login: () => Promise.resolve(),
          logout: () => Promise.resolve(),
          getUsername: () => '',
          getKeycloakInstance: () => ({ tokenParsed: {} }),
        },
      },
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: { params: {}, queryParams: {}, data: {} },
          params: of({}),
          queryParams: of({}),
          data: of({}),
        },
      },
    ],
    schemas: [NO_ERRORS_SCHEMA],
  });
});
