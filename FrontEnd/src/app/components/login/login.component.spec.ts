import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { IpService } from 'src/app/services/helpers/ip.service';
import { LoginService } from 'src/app/services/Login/login.service';
import { TokenService } from 'src/app/services/Login/token.service';
import { IpServiceMock } from 'src/app/shared/mocks/ip.service.mock';
import { LoginServiceMock } from 'src/app/shared/mocks/login.service.mock';
import { RouterMockService } from 'src/app/shared/mocks/router.service.mock';
import { TokenServiceMock } from 'src/app/shared/mocks/token.service.mock';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        { provide: LoginService, useClass: LoginServiceMock },
        { provide: TokenService, useClass: TokenServiceMock },
        { provide: IpService, useClass: IpServiceMock },
        { provide: Router, useClass: RouterMockService },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
