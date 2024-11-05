import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendRoutesService } from './backend-routes.service';
import { defaultIfEmpty, filter, Observable } from 'rxjs';
import { Quiz } from '../interfaces/quiz.interface';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private _http: HttpClient, private _backend: BackendRoutesService) { }

  fetchAll(): Observable<Quiz[]> {

    return this._http.get<Quiz[]>(
      this._backend.routes.quiz
    );;
  }

  fetchOne(id: string): Observable<Quiz> {

    return this._http.get<Quiz>(
      this._backend.routes.oneQuiz.replace(':id', id)
    );
  }

  fetchCategory(category: number): Observable<Quiz[]> {

    return this._http.get<Quiz[]>(
      this._backend.routes.category.replace(':category', category)
    ).pipe(
      filter((quizList: Quiz[]) => !!quizList),
      defaultIfEmpty([])
    );
  }
  
  add(quiz: Quiz): Observable<any> {

    return this._http.post<Quiz>(
      this._backend.routes.quiz,
      quiz,
      this._options()
    );
  }

  update(id: string, quiz: Quiz): Observable<any> {
    
    return this._http.put<Quiz>(
      this._backend.routes.oneQuiz.replace(':id', id),
      quiz,
      this._options()
    );
  }

  delete(quiz: Quiz): Observable<any> {
    
    return this._http.delete<Quiz>(
      this._backend.routes.oneQuiz.replace(':id', quiz.id!.toString())
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
