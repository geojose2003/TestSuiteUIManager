import { TestBed } from '@angular/core/testing';

import { SafeUrl.PipeService } from './safe-url.pipe.service';

describe('SafeUrl.PipeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SafeUrl.PipeService = TestBed.get(SafeUrl.PipeService);
    expect(service).toBeTruthy();
  });
});
