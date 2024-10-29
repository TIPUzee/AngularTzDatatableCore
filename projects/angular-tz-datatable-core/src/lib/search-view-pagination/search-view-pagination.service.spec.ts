import { TestBed } from '@angular/core/testing';

import { SearchViewPagination } from './search-view-pagination.service';

describe('SearchViewPaginationService', () => {
  let service: SearchViewPagination;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchViewPagination);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
