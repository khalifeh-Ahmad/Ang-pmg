import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const newReq = request.clone({
      headers: request.headers.append(
        'Authorization',
        'Bearer ' + localStorage.getItem('token')
      ),
      //.append('test', 'test'),
      // url: request.url.replace('tasks', 'lolo'),
    });

    return next.handle(newReq);
  }
}
