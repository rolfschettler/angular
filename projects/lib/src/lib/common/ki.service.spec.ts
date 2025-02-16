import { TestBed } from '@angular/core/testing';

import { KIService } from './ki.service';

describe('KIService', () => {
  let service: KIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
