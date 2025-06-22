import { TestBed } from '@angular/core/testing';

import { GetAllAdhesionsService } from './get-all-adhesions.service';

describe('GetAllAdhesionsService', () => {
  let service: GetAllAdhesionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllAdhesionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
