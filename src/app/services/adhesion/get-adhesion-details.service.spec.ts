import { TestBed } from '@angular/core/testing';

import { GetAdhesionDetailsService } from './get-adhesion-details.service';

describe('GetAdhesionDetailsService', () => {
  let service: GetAdhesionDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAdhesionDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
