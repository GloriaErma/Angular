import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GeneralResponse } from 'src/app/classes/GeneralResponse';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasicoService {
  private tabTipoDocumento = 'TipoDocumento';
  private tabGenero = 'genero';
  private tabGrupoEtnico = 'grupoetnico';
  private tabEstrato = 'estrato';
  private tabPais = 'pais';
  private tabDepartamento = 'departamento';
  private tabCiudad = 'ciudad';
  private tablaOp = 'params/ObtenerListado';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
  };

  constructor(private http: HttpClient) { }

  public ObtenerListaTiposDocumento(): Observable<GeneralResponse>{
    return this.http.get<GeneralResponse>(`${environment.apiEndpoint}${this.tablaOp}/${this.tabTipoDocumento}`).pipe(
      catchError(this.handleError('ObtenerListTipoDocumento', null))
    );
  }

  public ObtenerListaGenero(): Observable<GeneralResponse>{
    return this.http.get<GeneralResponse>(`${environment.apiEndpoint}${this.tablaOp}/${this.tabGenero}`).pipe(
      catchError(this.handleError('ObtenerListGenero', null))
    );
  }

  public ObtenerListaGrupoEtnico(): Observable<GeneralResponse>{
    return this.http.get<GeneralResponse>(`${environment.apiEndpoint}${this.tablaOp}/${this.tabGrupoEtnico}`).pipe(
      catchError(this.handleError('ObtenerListaGrupoEtnico', null))
    );
  }

  public ObtenerListaEstrato(): Observable<GeneralResponse>{
    return this.http.get<GeneralResponse>(`${environment.apiEndpoint}${this.tablaOp}/${this.tabEstrato}`).pipe(
      catchError(this.handleError('ObtenerListaEstrato', null))
    );
  }

  public ObtenerListaPais(): Observable<GeneralResponse>{
    return this.http.get<GeneralResponse>(`${environment.apiEndpoint}${this.tablaOp}/${this.tabPais}`).pipe(
      catchError(this.handleError('ObtenerListaPais', null))
    );
  }

  public ObtenerListaDepartamento(): Observable<GeneralResponse>{
    return this.http.get<GeneralResponse>(`${environment.apiEndpoint}${this.tablaOp}/${this.tabDepartamento}`).pipe(
      catchError(this.handleError('ObtenerListaDepartamento', null))
    );
  }

  public ObtenerListaCiudad(idDepartamento): Observable<GeneralResponse>{
    return this.http.get<GeneralResponse>(`${environment.apiEndpoint}${this.tablaOp}/${this.tabCiudad}/${idDepartamento}`).pipe(
      catchError(this.handleError('ObtenerListaCiudad', null))
    );
  }

  // tslint:disable-next-line: typedef
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
