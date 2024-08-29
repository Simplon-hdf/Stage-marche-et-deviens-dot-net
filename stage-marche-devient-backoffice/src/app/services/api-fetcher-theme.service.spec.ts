import { TestBed } from '@angular/core/testing';

import { ApiFetcherThemeService } from './api-fetcher-theme.service';

describe('ApiFetcherThemeService', () => {
  let service: ApiFetcherThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFetcherThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
