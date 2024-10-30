import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Quiz } from '../shared/interfaces/quiz.interface';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-quiz-crud-row',
  templateUrl: './quiz-crud-row.component.html',
  styleUrl: './quiz-crud-row.component.css'
})
export class QuizCrudRowComponent {

  private _quiz : Quiz;
  private readonly _delete$: EventEmitter<Quiz>;

  constructor(private _quizService : QuizService) {
  
    this._quiz = {} as Quiz;
    this._delete$ = new EventEmitter<Quiz>();
  }

  get quiz() : Quiz {
    return this._quiz;
  }

  @Input()
  set quiz(quiz : Quiz) {
    this._quiz = quiz;
  }

  @Output('deleteQuiz') get delete$(): EventEmitter<Quiz> {
    return this._delete$;
  }

  update(quiz : Quiz) { 
    console.log('Update quiz');
  }

  delete(quiz : Quiz) { 
    this._delete$.emit(quiz);
  }

}
