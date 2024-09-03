import { TestBed } from '@angular/core/testing';

import { SelecteurBoiteCommandeAdminService } from './selecteur-boite-commande-admin.service';

describe('SelecteurBoiteCommandeAdminService', () => {
  let service: SelecteurBoiteCommandeAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelecteurBoiteCommandeAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
