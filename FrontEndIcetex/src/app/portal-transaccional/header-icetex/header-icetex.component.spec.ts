import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderIcetexComponent } from './header-icetex.component';

describe('HeaderIcetexComponent', () => {
  let component: HeaderIcetexComponent;
  let fixture: ComponentFixture<HeaderIcetexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderIcetexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderIcetexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
