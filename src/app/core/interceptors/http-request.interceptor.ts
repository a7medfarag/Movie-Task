import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private jwt:JwtService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.jwt.getToken();

    
    request = request.clone({
      setHeaders:{
       'Authorization': `Bearer ${token}`
      }
    })
    return next.handle(request);
  }
}
