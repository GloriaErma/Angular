import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpInterpolarComponent } from './emp-interpolar.component';

describe('EmpInterpolarComponent', () => {
  let component: EmpInterpolarComponent;
  let fixture: ComponentFixture<EmpInterpolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpInterpolarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpInterpolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
