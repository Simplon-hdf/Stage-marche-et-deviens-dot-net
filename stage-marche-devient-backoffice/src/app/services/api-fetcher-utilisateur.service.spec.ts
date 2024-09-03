import { TestBed } from '@angular/core/testing';

import { ApiFetcherUtilisateurService } from './api-fetcher-utilisateur.service';

describe('ApiFetcherUtilisateurService', () => {
  let service: ApiFetcherUtilisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFetcherUtilisateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
