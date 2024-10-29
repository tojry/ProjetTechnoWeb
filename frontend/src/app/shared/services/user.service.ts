import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserAuth } from '../interfaces/user-auth.interface';
import { Observable } from 'rxjs';
import { BackendRoutesService } from './backend-routes.service';

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
      this._backend.routes.users, 
      user, 
      this._options()
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
