import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaEditComponent } from './grilla-edit.component';

describe('GrillaEditComponent', () => {
  let component: GrillaEditComponent;
  let fixture: ComponentFixture<GrillaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrillaEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
