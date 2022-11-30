import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PadreChildrenComponent } from './padre-children.component';

describe('PadreChildrenComponent', () => {
  let component: PadreChildrenComponent;
  let fixture: ComponentFixture<PadreChildrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PadreChildrenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PadreChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
