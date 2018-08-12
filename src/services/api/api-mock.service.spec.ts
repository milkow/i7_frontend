import { TestBed, inject } from '@angular/core/testing';

import { ApiMockService } from './api-mock.service';

describe('ApiMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiMockService]
    });
  });

  it('should be created', inject([ApiMockService], (service: ApiMockService) => {
    expect(service).toBeTruthy();
  }));
});
