import { TestBed } from '@angular/core/testing';

import { ApiFetcherPossederService } from './api-fetcher-posseder.service';

describe('ApiFetcherPossederService', () => {
  let service: ApiFetcherPossederService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFetcherPossederService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
