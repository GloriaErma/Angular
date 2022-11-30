import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestablecePassComponent } from './restablece-pass.component';

describe('RestablecePassComponent', () => {
  let component: RestablecePassComponent;
  let fixture: ComponentFixture<RestablecePassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestablecePassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestablecePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
