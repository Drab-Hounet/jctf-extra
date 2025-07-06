import { TestBed } from '@angular/core/testing';

import { GetAdherentsFreeService } from './get-adherents-free.service';

describe('GetAdherentsFreeService', () => {
  let service: GetAdherentsFreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAdherentsFreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
