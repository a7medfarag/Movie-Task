import { JwtService } from 'src/app/core/services/jwt.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService, private jwt: JwtService , private _router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      
      catchError(err=>{
        // this.toastr.error(err.error.message,'error');        
        if(err.status==401 || err.status ==403){
          this.jwt.logout();
        }
        return throwError(err);
      })
    );
   
    
  }
}
