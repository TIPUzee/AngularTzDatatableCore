import { TestBed } from '@angular/core/testing';

import { NormalViewPagination } from './normal-view-pagination.service';

describe('NormalViewPaginationService', () => {
  let service: NormalViewPagination;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NormalViewPagination);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
