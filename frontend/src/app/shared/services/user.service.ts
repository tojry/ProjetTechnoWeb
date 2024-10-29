import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserAuth } from '../interfaces/user-auth.interface';
import { defaultIfEmpty, Observable } from 'rxjs';
import { BackendRoutesService } from './backend-routes.service';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private _http: HttpClient, private _backend: BackendRoutesService) { 

  }

  /**
   * Function to register a new user
   */
  register(user: UserAuth) : Observable<any>{

    return this._http.post<UserAuth>(
      this._backend.routes.user, 
      user, 
      this._options()
    );
  }

  fetchUser(): Observable<User>{
    
    return this._http.get<User>(
      this._backend.routes.user
    );
  }

  /**
   * Function to return request options
   */
  private _options(headerList: object = {}): any {
    return {
      headers: new HttpHeaders(
        Object.assign({ 'Content-Type': 'application/json' }, headerList)
      ),
    };
  }
}
