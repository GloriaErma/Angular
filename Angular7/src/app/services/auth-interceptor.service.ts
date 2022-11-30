import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor() { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('Paso por HTTP interceptor');

    // req = req.clone({
    //   setHeaders:{ 'Authorization': 'TOKEN bearer token' }
    // })

    // const headers = new HttpHeaders({
    //   'token-usuario': 'ABC1234567890GECS',
    //   'Authorization': 'bearer token',
    // });
    // req = req.clone({
    //   headers
    // });

    return next.handle(req).pipe(catchError(this.manejarError) );
  }

  manejarError( error:HttpErrorResponse  ){
    console.log('Error AuthInterceptor');
    console.log('Registro en log AuthInterceptor ');
    console.warn(error);
    return throwError('Error Personalizado AuthInterceptor');
  }

}

// @Injectable()
// export class AppInterceptor implements HttpInterceptor {

//   public constructor(private storageService: StorageService) {
//   }

//   // tslint:disable-next-line no-any
//   public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     let route: string = '/' + request.url.split('/')[3];
//     if (route === '/api') {
//         const token = this.storageService.getCurrentSession()?.TokenAcceso;
//         if (token) {
//         request = request.clone({
//             setHeaders: {
//             authorization: `Bearer ${ token }`
//             }
//         });
//         }
//     }

//     return next.handle(request);
//   }
// }
