import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminImagesWidget } from './admin-images-widget';

describe('AdminImagesWidget', () => {
  let component: AdminImagesWidget;
  let fixture: ComponentFixture<AdminImagesWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminImagesWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminImagesWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
