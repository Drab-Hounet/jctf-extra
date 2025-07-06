import { TestBed } from '@angular/core/testing';

import { DeleteAllBasketsService } from './delete-all-baskets.service';

describe('DeleteAllBasketsService', () => {
  let service: DeleteAllBasketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteAllBasketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
