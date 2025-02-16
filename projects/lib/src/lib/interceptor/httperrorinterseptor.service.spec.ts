import { TestBed } from '@angular/core/testing';

import { HttperrorinterseptorService } from './httperrorinterseptor.service';

describe('HttperrorinterseptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttperrorinterseptorService = TestBed.get(HttperrorinterseptorService);
    expect(service).toBeTruthy();
  });
});
