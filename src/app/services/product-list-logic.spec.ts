import { TestBed } from '@angular/core/testing';

import { ProductListLogic } from './product-list-logic';

describe('ProductListLogic', () => {
  let service: ProductListLogic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductListLogic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
