import { TestBed, inject } from '@angular/core/testing';

import { CaptionerUtilsService } from './captioner-utils.service';

describe('CaptionerUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaptionerUtilsService]
    });
  });

  it('should be created', inject([CaptionerUtilsService], (service: CaptionerUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
