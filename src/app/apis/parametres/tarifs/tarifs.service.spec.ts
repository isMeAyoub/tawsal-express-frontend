import { TestBed } from '@angular/core/testing';

import { TarifsService } from './tarifs.service';

describe('TarifsService', () => {
  let service: TarifsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarifsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
