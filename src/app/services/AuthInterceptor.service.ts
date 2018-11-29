import { Injectable } from '@angular/core';

import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})


/**
 *  La classe AuthInterceptorService posseder une méhode qui permet de 
 *  recuperer notre token.
 * 
 */
export class AuthInterceptorService implements HttpInterceptor {
  
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = localStorage.getItem('token');

    if (token != null) {
      let authReq = req.clone({
        headers: req.headers.set('Authorization', "Bearer " + token)
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }

}
