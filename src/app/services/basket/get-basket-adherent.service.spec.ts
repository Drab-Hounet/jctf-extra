import { TestBed } from '@angular/core/testing';

import { GetBasketAdherentService } from './get-basket-adherent.service';

describe('GetBasketAdherentService', () => {
  let service: GetBasketAdherentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBasketAdherentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
