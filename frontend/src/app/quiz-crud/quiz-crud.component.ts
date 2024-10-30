import { Component, Input } from '@angular/core';
import { Quiz } from '../shared/interfaces/quiz.interface';

@Component({
  selector: 'app-quiz-crud',
  templateUrl: './quiz-crud.component.html',
  styleUrl: './quiz-crud.component.css'
})
export class QuizCrudComponent {

  private _quizList : Quiz[];
  
  constructor() {
    this._quizList = [];
  }

  get quizList() : Quiz[] {
    return this._quizList;
  }

  @Input()
  set quizList(quizList : Quiz[]) {
    this._quizList = quizList;
  }

}
