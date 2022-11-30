import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoFindComponent } from './no-find.component';

describe('NoFindComponent', () => {
  let component: NoFindComponent;
  let fixture: ComponentFixture<NoFindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoFindComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
