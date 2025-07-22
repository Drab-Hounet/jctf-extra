import { TestBed } from '@angular/core/testing';

import { SetCheckoutIntentService } from './set-checkout-intent.service';

describe('SetCheckoutIntentService', () => {
  let service: SetCheckoutIntentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetCheckoutIntentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
