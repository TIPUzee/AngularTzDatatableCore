import { TestBed } from '@angular/core/testing';

import { TzSelect } from './select.service';

describe('SelectService', () => {
  let service: TzSelect;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TzSelect);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
