import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorWidget } from './selector-widget';

describe('SelectorWidget', () => {
  let component: SelectorWidget;
  let fixture: ComponentFixture<SelectorWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorWidget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
