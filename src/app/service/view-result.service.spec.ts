import { TestBed } from '@angular/core/testing';

import { ViewResultService } from './view-result.service';

describe('ViewResultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewResultService = TestBed.get(ViewResultService);
    expect(service).toBeTruthy();
  });
});
