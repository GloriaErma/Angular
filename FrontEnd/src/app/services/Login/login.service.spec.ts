import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('IniciarSesion() should call http Post method for the given route', () => {
    const loginResponse = {
      error: '',
      transaccionExitosa: '',
      mensaje: '',
      respuesta: {}
    };
    service.IniciarSesion('', '').subscribe((resp) => {
      expect(resp).toEqual(loginResponse);
    });
  });

  it('ConfirmarInicioSesion() should call http Post method for the given route', () => {
    const confirmaLoginResponse = {
      nombreusuario: '',
      contrasena: '',
      respuesta: '',
    };
    service.ConfirmarInicioSesion('', '').subscribe((resp) => {
      expect(resp).toEqual(confirmaLoginResponse);
    });
  });
});
