import { TestBed } from '@angular/core/testing';

import { TzDatatable } from './tz-datatable.service';

describe('TzDatatable', () => {
  let service: TzDatatable<object>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TzDatatable);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
