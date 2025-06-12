import { TestBed } from '@angular/core/testing';

import { RecoveryPasswordMailService } from './recovery-password-mail.service';

describe('RecoveryPasswordMailService', () => {
  let service: RecoveryPasswordMailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoveryPasswordMailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
