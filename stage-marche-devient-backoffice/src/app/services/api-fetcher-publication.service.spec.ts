import { TestBed } from '@angular/core/testing';

import { ApiFetcherPublicationService } from './api-fetcher-publication.service';

describe('ApiFetcherPublicationService', () => {
  let service: ApiFetcherPublicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFetcherPublicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
