import { TestBed } from '@angular/core/testing';

import { ApiFetcherReserverService } from './api-fetcher-reserver.service';

describe('ApiFetcherReserverService', () => {
  let service: ApiFetcherReserverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFetcherReserverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
