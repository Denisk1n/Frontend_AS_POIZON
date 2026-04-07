import { TestBed } from '@angular/core/testing';

import { AdminProductInfoLogic } from './admin-product-info-logic';

describe('AdminProductInfoLogic', () => {
  let service: AdminProductInfoLogic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminProductInfoLogic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
