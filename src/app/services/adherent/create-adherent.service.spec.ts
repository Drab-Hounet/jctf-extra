import { TestBed } from '@angular/core/testing';

import { CreateAdherentService } from './create-adherent.service';

describe('CreateAdherentService', () => {
  let service: CreateAdherentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAdherentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
