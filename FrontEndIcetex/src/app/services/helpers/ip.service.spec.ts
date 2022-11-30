import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IpService } from './ip.service';

describe('IpService', () => {
  let service: IpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(IpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('obtenerIp() should call http Get method for the given route', () => {
    service.obtenerIp();
    const req = httpMock.expectOne('http://api.ipify.org/?format=json');
    expect(req.request.method).toEqual('GET');
    httpMock.verify();
  });
});
