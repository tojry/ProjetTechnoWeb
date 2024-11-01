import { Component, Input } from '@angular/core';
import { Quiz } from '../shared/interfaces/quiz.interface';
import { QuizService } from '../shared/services/quiz.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-crud',
  templateUrl: './quiz-crud.component.html',
  styleUrl: './quiz-crud.component.css'
})
export class QuizCrudComponent {

  private _quizList : Quiz[];
  private _isCrudMode: boolean = false;
  
  constructor(private _quizService: QuizService, private _router: Router) {
    this._quizList = [];
  }

  get quizList() : Quiz[] {
    return this._quizList;
  }

  get isCrudMode() : boolean {
    return this._isCrudMode;
  }

  @Input()
  set quizList(quizList : Quiz[]) {
    this._quizList = quizList;
  }

  @Input()
  set isCrudMode(crudMode: boolean) {
    this._isCrudMode = crudMode;
  }

  delete(quiz: Quiz): void {
    this._quizService.delete(quiz).subscribe({
      next: () => this._quizList = this._quizList.filter(q => q.id !== quiz.id),
      error: (err: HttpErrorResponse) => {
        if(err.status == 401){
          this._router.navigate(['/login']);
        }else{
          this._quizList = this._quizList;
        }
      }
    });
  }

}
