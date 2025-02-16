import { TestBed } from '@angular/core/testing';

import { HttpauthinterseptorService } from './httpauthinterseptor.service';

describe('HttpauthinterseptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpauthinterseptorService = TestBed.get(HttpauthinterseptorService);
    expect(service).toBeTruthy();
  });
});
