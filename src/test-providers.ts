import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { importProvidersFrom } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { KeycloakService } from 'keycloak-angular';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';

/**
 * Global providers for every unit test (configured via `providersFile` in angular.json).
 *
 * Do not import application code here: it would be bundled into a chunk that loads before
 * `@angular/core/testing` initialises the compiler. Register app NGXS states in the specs instead.
 */
const noop = (): void => undefined;

// jsdom has no ResizeObserver; ECharts needs one to initialise.
globalThis.ResizeObserver ??= class {
  observe = noop;
  unobserve = noop;
  disconnect = noop;
};

const testProviders = [
  provideHttpClient(),
  provideHttpClientTesting(),
  provideRouter([]),
  provideNoopAnimations(),
  importProvidersFrom(
    NgxsModule.forRoot([]),
    TranslateModule.forRoot(),
    ToastrModule.forRoot(),
  ),
  KeycloakService,
  BsModalRef,
  { provide: ModalOptions, useValue: { initialState: {} } },
];

export default testProviders;
