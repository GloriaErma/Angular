import { Injectable } from '@angular/core';
import { LoginRequest } from '../../classes/LoginRequest';
import { LoginResponse } from '../../classes/LoginResponse';
import { ConfirmaLoginRequest } from '../../classes/ConfirmaLoginRequest';
import { ConfirmaLoginResponse } from '../../classes/ConfirmaLoginResponse';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GeneralResponse } from 'src/app/classes/GeneralResponse';

const ROOT_URL = environment.apiEndpoint;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private LoginOp = 'autenticacion/v1/InicioSesion';
  private ConfirmaLoginOp = 'autenticacion/v1/confirmarprimeriniciosesion';

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
  };

  constructor(private http: HttpClient) { }

  public IniciarSesion(usuario: string, password: string): Observable<LoginResponse>{
    const objRequest: LoginRequest = {
      nombreUsuario: usuario,
      password,
      ip: sessionStorage.getItem('ip_cliente')
    };
    return this.http.post<LoginResponse>(ROOT_URL + this.LoginOp, objRequest, this.httpOptions)
    .pipe(
      catchError(err => this.errorHandler(err)),
    );
  }

  public ConfirmarInicioSesion(usuario: string, password: string): Observable<ConfirmaLoginResponse>{
    const objRequest: ConfirmaLoginRequest = {
      Contrasena : password,
      Nombreusuario : usuario
    };
    return this.http.post<ConfirmaLoginResponse>(ROOT_URL + this.ConfirmaLoginOp, objRequest, this.httpOptions)
    .pipe(
      catchError(err => this.errorHandler(err))
    );
  }

  // tslint:disable-next-line: typedef
  private errorHandler(error: HttpErrorResponse) {
    const errResponse: GeneralResponse = {
      error: 'SI',
      transaccionExitosa: 'NO',
      mensaje: 'No se pudo efectuar el inicio de sesión, intente más tarde',
      respuesta: null
    };
    return throwError(errResponse);
  }
}
