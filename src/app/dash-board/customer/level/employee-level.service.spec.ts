import { TestBed } from '@angular/core/testing';

import { EmployeeLevelService } from './employee-level.service';

describe('EmployeeLevelService', () => {
  let service: EmployeeLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
