import { TestBed, inject } from '@angular/core/testing';

import { StudentinfoService } from './studentinfo.service';

describe('StudentinfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentinfoService]
    });
  });

  it('should be created', inject([StudentinfoService], (service: StudentinfoService) => {
    expect(service).toBeTruthy();
  }));
});
