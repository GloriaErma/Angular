import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioSolicitudInicial } from 'src/app/classes/UsuarioSolicitudInicial';
import { UsuarioSolicitudFinal } from 'src/app/classes/UsuarioSolicitudFinal';
import { Observable, of } from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { ValidaSolicitudUsuarioResponse } from 'src/app/classes/ValidaSolicitudUsuarioResponse';
import { environment } from 'src/environments/environment';
import { UsuarioResponse } from 'src/app/classes/UsuarioResponse';

const ROOT_URL = environment.apiEndpoint;

@Injectable({
  providedIn: 'root'
})
export class SolicitudUsuarioService {

  private ValidaSolicitudOp = 'api/SolicitudNuevoUsuario/Validar';
  private CreaSolicitudOp = 'api/SolicitudNuevoUsuario/Crear';
  private EliminarSolicitudOp = 'api/SolicitudNuevoUsuario/Eliminar';
  private ReenviarSolicitudOp = 'api/SolicitudNuevoUsuario/Reenviar';
  private ObtenerDatosOp = 'api/SolicitudNuevoUsuario/ObtenerDatos';
  private ActivarUsuarioOp = 'api/SolicitudNuevoUsuario/Activar';

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  public ValidarSolicitudUsuario(solicitudUsuario: UsuarioSolicitudInicial): Observable<ValidaSolicitudUsuarioResponse>{
    return this.http.post<ValidaSolicitudUsuarioResponse>(ROOT_URL + this.ValidaSolicitudOp, solicitudUsuario, this.httpOptions)
    .pipe(
      catchError(this.handleError('ValidarSolicitudUsuario', null))
    );
  }

  public InsertarSolicitudUsuario(solicitudUsuario: UsuarioSolicitudFinal): Observable<ValidaSolicitudUsuarioResponse>{
    return this.http.post<boolean>(ROOT_URL + this.CreaSolicitudOp, solicitudUsuario, this.httpOptions)
    .pipe(
      catchError(
        this.handleError<any>('InsertarSolicitudUsuario', null)
      )
    );
  }

  public EliminarSolicitudUsuario(solicitudUsuario: UsuarioSolicitudFinal): Observable<ValidaSolicitudUsuarioResponse>{
    return this.http.post<ValidaSolicitudUsuarioResponse>(ROOT_URL + this.EliminarSolicitudOp, solicitudUsuario, this.httpOptions)
    .pipe(
      catchError(
        this.handleError<any>('EliminarSolicitudUsuario', null)
      )
    );
  }

  public ReenviarSolicitudUsuario(solicitudUsuario: UsuarioSolicitudFinal): Observable<ValidaSolicitudUsuarioResponse>{
    return this.http.post<boolean>(ROOT_URL + this.ReenviarSolicitudOp, solicitudUsuario, this.httpOptions)
    .pipe(
      catchError(
        this.handleError<any>('ReenviarSolicitudUsuario', null)
      )
    );
  }

  public ActivarUsuario(request: any): Observable<UsuarioResponse>{
    return this.http.post<UsuarioResponse>(ROOT_URL + this.ActivarUsuarioOp, request, this.httpOptions)
    .pipe(
      catchError(
        this.handleError<any>('ActivarUsuario', null)
      )
    );
  }

  public ObtenerSolicitudUsuario(request: any): Observable<UsuarioResponse>{
    return this.http.post<UsuarioResponse>(ROOT_URL + this.ObtenerDatosOp, request, this.httpOptions)
    .pipe(
      catchError(
        this.handleError<any>('ObtenerSolicitudUsuario', null)
      )
    );
  }

  // tslint:disable-next-line: typedef
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
