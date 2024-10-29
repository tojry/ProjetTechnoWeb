import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuth } from '../interfaces/user-auth.interface';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { BackendRoutesService } from './backend-routes.service';
import { JWTToken } from '../interfaces/jwt.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn: boolean = this._hasToken();

  constructor(private _http: HttpClient, private _backend: BackendRoutesService) { }

  get username(): string | null {
    return localStorage.getItem('username');
  }

  login(user: UserAuth): Observable<any> {
    return this._http.post<JWTToken>(this._backend.routes.login, user)
      .pipe(
        tap(resp => { 
          localStorage.setItem('token', resp.token); 
          localStorage.setItem('username', user.id);
          this._isLoggedIn = true;
        }),
        catchError(err => throwError(() => err))
      );
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this._isLoggedIn = false;
  }

  private _hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
