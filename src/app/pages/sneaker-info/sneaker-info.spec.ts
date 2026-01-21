import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SneakerInfo } from './sneaker-info';

describe('SneakerInfo', () => {
  let component: SneakerInfo;
  let fixture: ComponentFixture<SneakerInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SneakerInfo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SneakerInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
