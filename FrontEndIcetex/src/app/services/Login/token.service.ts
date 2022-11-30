import { Injectable } from '@angular/core';
import { TokenRequest } from '../../classes/TokenRequest';
import { GeneralResponse } from '../../classes/GeneralResponse';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private TokenOp = 'autenticacion/v1/Token';

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  public ObtenerToken(): Observable<GeneralResponse> {
    const objRequest: TokenRequest = {
      nombreUsuario : sessionStorage.getItem('nomUsuario')!,
      password : sessionStorage.getItem('passUsuario')!
    };
    return this.http.post<GeneralResponse>(environment.apiEndpoint + this.TokenOp, objRequest, this.httpOptions)
    .pipe(
      catchError(err => this.errorHandler(err))
    );
  }

  // tslint:disable-next-line: typedef
  private errorHandler(error: HttpErrorResponse){
    const errResponse: GeneralResponse = {
      error: 'SI',
      transaccionExitosa: 'NO',
      mensaje: 'No se pudo efectuar el inicio de sesión, intente más tarde',
      respuesta: null
    };
    return throwError(errResponse);
  }
}
