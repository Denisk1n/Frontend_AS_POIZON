import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sneakers } from './sneakers';

describe('Sneakers', () => {
  let component: Sneakers;
  let fixture: ComponentFixture<Sneakers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sneakers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sneakers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
