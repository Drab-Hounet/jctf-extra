import { TestBed } from '@angular/core/testing';

import { CreateAuthService } from './create-auth.service';

describe('CreateAuthService', () => {
  let service: CreateAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
