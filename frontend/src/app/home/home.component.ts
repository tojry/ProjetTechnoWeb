import { Component } from '@angular/core';
import { Quiz } from '../shared/interfaces/quiz.interface';
import { QuizService } from '../shared/services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private _quizList : Quiz[];

  constructor(private _quizService: QuizService) {
    this._quizList = [];
  }

  ngOnInit(): void {
    
    this._quizService.fetchAll().subscribe({
      next: (q: any) => this._quizList = q.quiz
    });
  }

  get quizList(): Quiz[] {
    return this._quizList;
  }
}
