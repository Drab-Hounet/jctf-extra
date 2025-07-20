import { TestBed } from '@angular/core/testing';

import { GetCheckoutIntentService } from './get-checkout-intent.service';

describe('GetCheckoutIntentService', () => {
  let service: GetCheckoutIntentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCheckoutIntentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
