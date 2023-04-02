import { TestBed } from '@angular/core/testing';

import { ApiLoaderInterceptor } from './api-loader.interceptor';

describe('ApiLoaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ApiLoaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ApiLoaderInterceptor = TestBed.inject(ApiLoaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
