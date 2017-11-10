import { TestBed, inject } from '@angular/core/testing';

import { UserTypeService } from './user-type.service';

describe('UserTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserTypeService]
    });
  });

  it('should be created', inject([UserTypeService], (service: UserTypeService) => {
    expect(service).toBeTruthy();
  }));
});
