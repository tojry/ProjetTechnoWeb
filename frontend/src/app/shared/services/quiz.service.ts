import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendRoutesService } from './backend-routes.service';
import { Observable } from 'rxjs';
import { Quiz } from '../interfaces/quiz.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http: HttpClient, private _backend: BackendRoutesService) { }

  add(quiz: Quiz): Observable<any> {

    return this._http.post<Quiz>(
      this._backend.routes.quiz,
      quiz,
      this._options()
    );
  }

  /*
  delete(quiz: Quiz): Observable<any> {
    
    return
    
    return this._http.delete<Quiz>(
      this._backend.routes.oneQuiz.replace(':id', quiz.id.toString()),
    )
      
  }
  */

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
