import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  public constructor(private storageService: StorageService) {
  }

  // tslint:disable-next-line no-any
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let route: string = '/' + request.url.split('/')[3];
    if (route === '/api') {
        const token = this.storageService.getCurrentSession()?.TokenAcceso;
        if (token) {
        request = request.clone({
            setHeaders: {
            authorization: `Bearer ${ token }`
            }
        });
        }
    }

    return next.handle(request);
  }
}