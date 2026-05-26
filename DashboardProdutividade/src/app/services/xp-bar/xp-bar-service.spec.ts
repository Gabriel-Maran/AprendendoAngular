import { TestBed } from '@angular/core/testing';

import { XpBarService } from './xp-bar-service';

describe('XpBarService', () => {
  let service: XpBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XpBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
