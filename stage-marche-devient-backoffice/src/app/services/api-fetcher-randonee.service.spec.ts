import { TestBed } from '@angular/core/testing';

import { ApiFetcherRandoneeService } from './api-fetcher-randonee.service';

describe('ApiFetcherRandoneeService', () => {
  let service: ApiFetcherRandoneeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFetcherRandoneeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
