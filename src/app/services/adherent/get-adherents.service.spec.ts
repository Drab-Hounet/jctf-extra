import { TestBed } from '@angular/core/testing';

import { GetAdherentsService } from './get-adherents.service';

describe('GetAdherentsService', () => {
  let service: GetAdherentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAdherentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
