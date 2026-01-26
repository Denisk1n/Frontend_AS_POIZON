import { TestBed } from '@angular/core/testing';

import { FiltersLogic } from './filters-logic';

describe('FiltersLogic', () => {
  let service: FiltersLogic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiltersLogic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
