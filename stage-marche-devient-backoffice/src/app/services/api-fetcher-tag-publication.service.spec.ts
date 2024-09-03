import { TestBed } from '@angular/core/testing';

import { ApiFetcherTagPublicationService } from './api-fetcher-tag-publication.service';

describe('ApiFetcherTagPublicationService', () => {
  let service: ApiFetcherTagPublicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFetcherTagPublicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
