import { TestBed } from '@angular/core/testing';

import { DbconfigService } from './dbconfig.service';

describe('DbconfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbconfigService = TestBed.get(DbconfigService);
    expect(service).toBeTruthy();
  });
});
