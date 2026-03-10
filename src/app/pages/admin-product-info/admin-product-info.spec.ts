import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductInfo } from './admin-product-info';

describe('AdminProductInfo', () => {
  let component: AdminProductInfo;
  let fixture: ComponentFixture<AdminProductInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
