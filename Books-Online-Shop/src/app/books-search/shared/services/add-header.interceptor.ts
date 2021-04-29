import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AddHeaderInterceptorService implements HttpInterceptor {
  private _API_KEY: string = 'AIzaSyBQ5gtL70XQ48con8rRedbKzX2b13fWCuI';
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: this._API_KEY,
      },
    });
    return next.handle(clonedRequest);
  }
}
