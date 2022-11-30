import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nieto1Component } from './nieto1.component';

describe('Nieto1Component', () => {
  let component: Nieto1Component;
  let fixture: ComponentFixture<Nieto1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Nieto1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Nieto1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
