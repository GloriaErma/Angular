import { Injectable } from '@angular/core';
import { LoginRequest } from '../../classes/LoginRequest';
import { LoginResponse } from '../../classes/LoginResponse';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GeneralResponse } from 'src/app/classes/GeneralResponse';
import { PermisosConRolesResponse } from 'src/app/classes/PermisoConRoles';

const ROOT_URL = environment.apiEndpoint;

@Injectable({
  providedIn: 'root'
})
export class JerarquiaService {
  private JerarquiaOp = 'api/Jerarquia';

  constructor(private http: HttpClient) { }

  public ObtenerJerarquia(jerarquiaRequest: any): Observable<PermisosConRolesResponse[]>{
    return this.http.post<PermisosConRolesResponse[]>(ROOT_URL + this.JerarquiaOp, jerarquiaRequest)
    .pipe(
      catchError(err => this.errorHandler(err)),
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
