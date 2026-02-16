import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductsTable } from './admin-products-table';

describe('AdminProductsTable', () => {
  let component: AdminProductsTable;
  let fixture: ComponentFixture<AdminProductsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminProductsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminProductsTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
