import { Component, Input } from '@angular/core';
import { Quiz } from '../shared/interfaces/quiz.interface';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-quiz-crud-row',
  templateUrl: './quiz-crud-row.component.html',
  styleUrl: './quiz-crud-row.component.css'
})
export class QuizCrudRowComponent {

  private _quiz : Quiz;

  constructor(private _quizService : QuizService) {
  
    this._quiz = {} as Quiz;
  }

  get quiz() : Quiz {
    return this._quiz;
  }

  @Input()
  set quiz(quiz : Quiz) {
    this._quiz = quiz;
  }

  update(quiz : Quiz) { 
    console.log('Update quiz');
  }

  delete(quiz : Quiz) { 
    console.log('Delete quiz');
  }

}
