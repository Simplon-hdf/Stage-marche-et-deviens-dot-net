import { TestBed } from '@angular/core/testing';

import { ApiFetcherSessionService } from './api-fetcher-session.service';

describe('ApiFetcherSessionService', () => {
  let service: ApiFetcherSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFetcherSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
