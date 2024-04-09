import { TestBed } from '@angular/core/testing';

import { VillesRamassageService } from './villes-ramassage.service';

describe('VillesRamassageService', () => {
  let service: VillesRamassageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VillesRamassageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
