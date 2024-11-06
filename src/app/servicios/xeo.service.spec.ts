import { TestBed } from '@angular/core/testing';

import { XeoService } from './xeo.service';

describe('XeoService', () => {
  let service: XeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
