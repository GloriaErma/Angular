import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BasicoService } from './basico.service';

describe('BasicoService', () => {
  let service: BasicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(BasicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('ObtenerListaTiposDocumento() should call http Get method for the given route', () => {
    const generalResponse = {
      error: '',
      transaccionExitosa: '',
      mensaje: '',
      respuesta: {}
    };
    service.ObtenerListaTiposDocumento().subscribe((resp) => {
      expect(resp).toEqual(generalResponse);
    });
  });
});
