import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nieto2Component } from './nieto2.component';

describe('Nieto2Component', () => {
  let component: Nieto2Component;
  let fixture: ComponentFixture<Nieto2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Nieto2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Nieto2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
