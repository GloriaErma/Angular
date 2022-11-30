import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SolicitudUsuarioService } from './solicitud-usuario.service';

describe('SolicitudUsuarioService', () => {
  let service: SolicitudUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(SolicitudUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('ValidarSolicitudUsuario() should call http Post method for the given route', () => {
    const validaSolicitudUsuarioResponse = {
      error: '',
      solicitudYaExiste: '',
      mensaje: '',
      codigo: ''
    };
    service.ValidarSolicitudUsuario({
      idTipoDocumento: 1,
      numeroDocumento: '',
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      fechaNacimiento: 1,
      fechaExpedicionDocumento: 1,
      codigo: '',
    }).subscribe((resp) => {
      expect(resp).toEqual(validaSolicitudUsuarioResponse);
    });
  });

  it('InsertarSolicitudUsuario() should call http Post method for the given route', () => {
    const validaSolicitudUsuarioResponse = {
      error: '',
      solicitudYaExiste: '',
      mensaje: '',
      codigo: ''
    };
    service.InsertarSolicitudUsuario({
      idTipoDocumento: 1,
      numeroDocumento: '',
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      fechaNacimiento: 1,
      fechaExpedicionDocumento: 1,
      email: '',
    }).subscribe((resp1) => {
      expect(resp1).toEqual(validaSolicitudUsuarioResponse);
    });
  });

  it('EliminarSolicitudUsuario() should call http Post method for the given route', () => {
    const validaSolicitudUsuarioResponse = {
      error: '',
      solicitudYaExiste: '',
      mensaje: '',
      codigo: ''
    };
    service.EliminarSolicitudUsuario({
      idTipoDocumento: 1,
      numeroDocumento: '',
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      fechaNacimiento: 1,
      fechaExpedicionDocumento: 1,
      email: '',
    }).subscribe((resp1) => {
      expect(resp1).toEqual(validaSolicitudUsuarioResponse);
    });
  });
});
