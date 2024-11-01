import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quiz } from '../shared/interfaces/quiz.interface';
import { QuizService } from '../shared/services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-crud-row',
  templateUrl: './quiz-crud-row.component.html',
  styleUrl: './quiz-crud-row.component.css'
})
export class QuizCrudRowComponent {

  private _quiz : Quiz;
  private _isCrudMode : boolean = false;
  private readonly _delete$: EventEmitter<Quiz>;

  constructor(private _quizService : QuizService, private _router: Router) {
  
    this._quiz = {} as Quiz;
    this._delete$ = new EventEmitter<Quiz>();
  }

  get quiz() : Quiz {
    return this._quiz;
  }

  get isCrudMode() : boolean {
    return this._isCrudMode;
  }

  @Input()
  set quiz(quiz : Quiz) {
    this._quiz = quiz;
  }

  @Input()
  set isCrudMode(crudMode: boolean) {
    this._isCrudMode = crudMode;
  }

  @Output('deleteQuiz') get delete$(): EventEmitter<Quiz> {
    return this._delete$;
  }

  answer(quiz : Quiz) {
    this._router.navigate(['/quiz/', quiz.id]);
  }

  update(quiz : Quiz) { 
    this._router.navigate(['/quiz/edit/', quiz.id]);
  }

  delete(quiz : Quiz) { 
    this._delete$.emit(quiz);
  }

}
