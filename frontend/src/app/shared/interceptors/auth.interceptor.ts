import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _router: Router, private _authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const token = this._authService.getToken();

        if (token) {
            const newReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(newReq).pipe(
              catchError(err => {
                if(err.status == 401){
                  this._authService.logout();
                  this._router.navigate(['login']);
                }
                return throwError(() => err);
              })
            );
        }
        return next.handle(req);
    }
}
