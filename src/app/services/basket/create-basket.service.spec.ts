import { TestBed } from '@angular/core/testing';

import { CreateBasketService } from './create-basket.service';

describe('CreateBasketService', () => {
  let service: CreateBasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateBasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
