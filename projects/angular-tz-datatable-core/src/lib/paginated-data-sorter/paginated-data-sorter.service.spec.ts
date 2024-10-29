import { TestBed } from '@angular/core/testing';

import { PaginatedDataSorter } from './paginated-data-sorter.service';

describe('PaginatedDataSorterService', () => {
  let service: PaginatedDataSorter<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginatedDataSorter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
