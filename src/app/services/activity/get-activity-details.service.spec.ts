import { TestBed } from '@angular/core/testing';

import { GetActivityDetailsService } from './get-activity-details.service';

describe('GetActivityDetailsService', () => {
  let service: GetActivityDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetActivityDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
