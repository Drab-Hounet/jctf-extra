import { TestBed } from '@angular/core/testing';

import { DeleteBasketService } from './delete-basket.service';

describe('DeleteBasketService', () => {
  let service: DeleteBasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteBasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
