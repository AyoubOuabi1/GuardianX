import { TestBed } from '@angular/core/testing';

import { ErrorHandlerInterInterceptor } from './error-handler-inter.interceptor';

describe('ErrorHandlerInterInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorHandlerInterInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrorHandlerInterInterceptor = TestBed.inject(ErrorHandlerInterInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
