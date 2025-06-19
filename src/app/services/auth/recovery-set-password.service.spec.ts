import { TestBed } from '@angular/core/testing';

import { RecoverySetPasswordService } from './recovery-set-password.service';

describe('RecoverySetPasswordService', () => {
  let service: RecoverySetPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoverySetPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
