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
    ).pipe(
      filter((quizList: Quiz[]) => !!quizList),
      defaultIfEmpty([])
    );
  }

  fetchOne(id: string): Observable<Quiz> {

    return this._http.get<Quiz>(
      this._backend.routes.oneQuiz.replace(':id', id)
    );
  }

  fetchCategory(category: string): Observable<Quiz[]> {

    return this._http.get<Quiz[]>(
      this._backend.routes.category.replace(':category', category.normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
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

  update(quiz: Quiz): Observable<any> {
    
    return this._http.put<Quiz>(
      this._backend.routes.oneQuiz.replace(':id', quiz.id!.toString()),
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
