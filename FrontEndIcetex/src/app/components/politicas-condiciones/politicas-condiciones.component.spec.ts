import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/Login/login.service';
import { TokenService } from 'src/app/services/Login/token.service';
import { LoginServiceMock } from 'src/app/shared/mocks/login.service.mock';
import { RouterMockService } from 'src/app/shared/mocks/router.service.mock';

import { PoliticasCondicionesComponent } from './politicas-condiciones.component';

describe('PoliticasCondicionesComponent', () => {
  let component: PoliticasCondicionesComponent;
  let fixture: ComponentFixture<PoliticasCondicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticasCondicionesComponent ],
      providers: [
        { provide: LoginService, useClass: LoginServiceMock },
        { provide: TokenService, useClass: LoginServiceMock },
        { provide: Router, useClass: RouterMockService },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticasCondicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
