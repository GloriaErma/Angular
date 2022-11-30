import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HijoXComponent } from './hijo-x.component';

describe('HijoXComponent', () => {
  let component: HijoXComponent;
  let fixture: ComponentFixture<HijoXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HijoXComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HijoXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
