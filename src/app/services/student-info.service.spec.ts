import { TestBed, inject } from '@angular/core/testing';

import { StudentInfoService } from './student-info.service';

describe('StudentinfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentInfoService]
    });
  });

  it('should be created', inject([StudentInfoService], (service: StudentInfoService) => {
    expect(service).toBeTruthy();
  }));
});
