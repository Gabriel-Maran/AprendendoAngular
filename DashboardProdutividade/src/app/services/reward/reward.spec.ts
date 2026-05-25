import { TestBed } from '@angular/core/testing';

import { RewardService } from './reward-service';

describe('Compras', () => {
  let service: RewardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RewardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
