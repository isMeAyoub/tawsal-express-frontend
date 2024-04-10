import { TestBed } from '@angular/core/testing';

import { VillesLivraisonService } from './villes-livraison.service';

describe('VillesLivraisonService', () => {
  let service: VillesLivraisonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VillesLivraisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
