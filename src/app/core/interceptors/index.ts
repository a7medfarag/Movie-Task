import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpErrorInterceptor } from "./http-error.interceptor";
import { HttpRequestInterceptor } from "./http-request.interceptor";


export const httpInterceptorsProviders =[
    {provide: HTTP_INTERCEPTORS, useClass:HttpErrorInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi:true}
]