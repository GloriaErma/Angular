import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(TokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('ObtenerToken() should call http Post method for the given route', () => {
    const generalResponse = {
      error: '',
      transaccionExitosa: '',
      mensaje: '',
      respuesta: {}
    };
    service.ObtenerToken().subscribe((resp) => {
      expect(resp).toEqual(generalResponse);
    });
  });
});
