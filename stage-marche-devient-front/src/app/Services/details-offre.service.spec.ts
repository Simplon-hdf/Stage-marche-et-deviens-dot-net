import { TestBed } from '@angular/core/testing';

import { DetailsOffreService } from './details-offre.service';

describe('DetailsOffreService', () => {
  let service: DetailsOffreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsOffreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
