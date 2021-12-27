import { TestBed } from '@angular/core/testing';

import { AngularCoreService } from './angular-core.service';

describe('AngularCoreService', () => {
  let service: AngularCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
