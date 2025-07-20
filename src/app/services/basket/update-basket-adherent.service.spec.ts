import { TestBed } from '@angular/core/testing';

import { UpdateBasketAdherentService } from './update-basket-adherent.service';

describe('UpdateBasketAdherentService', () => {
  let service: UpdateBasketAdherentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateBasketAdherentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
