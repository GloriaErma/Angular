import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrillaUpdComponent } from './grilla-upd.component';

describe('GrillaUpdComponent', () => {
  let component: GrillaUpdComponent;
  let fixture: ComponentFixture<GrillaUpdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrillaUpdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillaUpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
