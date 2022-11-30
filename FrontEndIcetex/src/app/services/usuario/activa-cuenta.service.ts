import {​​​​​ HttpClient, HttpHeaders }​​​​​ from '@angular/common/http';
import {​​​​​ Injectable }​​​​​ from '@angular/core';
import {​​​​​ ActivarCuenta }​​​​​ from 'src/app/classes/ActivarCuenta';
import {​​​​​ Observable, of }​​​​​ from 'rxjs';
import {​​​​​ catchError}​​​​​ from 'rxjs/operators';
import {​​​​​ environment }​​​​​ from 'src/environments/environment';
import { ActivarCuentaResponse } from 'src/app/classes/ActivarCuentaResponse';
import { VigenciaResponse } from 'src/app/classes/VigenciaResponse';
const ROOT_URL = environment.apiEndpoint;
@Injectable({​​​​​
  providedIn: 'root'
}​​​​​)
export class ActivaCuentaService {​​​​​
  private ActualizarVigenciaOp = 'api/ActualizarVigencia/Validar';
  private CrearActivacionOp = 'api/SolicitudNuevoUsuario/Activar';
  constructor(private http: HttpClient) {​​​​​ }​​​​​
  httpOptions = {​​​​​
    headers: new HttpHeaders({​​​​​
      'Content-Type': 'application/json'
    }​​​​​)
  }​​​​​;
  ValidarVigencia(codigo: string): Observable<VigenciaResponse | null >{​​​​​
    return this.http.get<VigenciaResponse>(ROOT_URL + `${this.ActualizarVigenciaOp}/${codigo}`, this.httpOptions)
    .pipe(
      catchError(this.handleError('ValidarActivaCuenta', null))
    );
  }​​​​​
  ActivarCuenta(activaCuenta: ActivarCuenta): Observable<ActivarCuentaResponse | null >{​​​​​
    return this.http.post<ActivarCuentaResponse>(ROOT_URL + this.CrearActivacionOp, activaCuenta, this.httpOptions)
    .pipe(
      catchError(this.handleError('ActivaCuenta', null))
    );
  }​​​​​
  // tslint:disable-next-line: typedef
  private handleError<T>(operation = 'operation', result?: T){​​​​​
    return (error: any): Observable<T> => {​​​​​
      console.error(error);
      return of(result as T);
    }​​​​​;
  }​​​​​
}​​​​​
