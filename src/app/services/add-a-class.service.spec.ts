import { TestBed, inject } from '@angular/core/testing';

import { AddAClassService } from './add-a-class.service';

describe('AddAClassService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddAClassService]
    });
  });

  it('should be created', inject([AddAClassService], (service: AddAClassService) => {
    expect(service).toBeTruthy();
  }));
});
