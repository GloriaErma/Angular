import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GeneralResponse } from 'src/app/classes/GeneralResponse';
import { ProductosResponse } from 'src/app/classes/ProductosResponse';

const ROOT_URL = environment.apiEndpoint;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private ProductoOp = 'api/Productos/Obtener';

  constructor(private http: HttpClient) { }

  public ObtenerProductos(): Observable<ProductosResponse[]>{
    return this.http.get<ProductosResponse[]>(ROOT_URL + this.ProductoOp)
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
