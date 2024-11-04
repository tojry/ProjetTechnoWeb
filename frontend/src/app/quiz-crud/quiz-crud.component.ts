import { Component, Input } from '@angular/core';
import { Category, Quiz } from '../shared/interfaces/quiz.interface';
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
  private readonly _categories: Category[] = Object.values(Category);
  
  constructor(private _quizService: QuizService, private _router: Router) {
    this._quizList = [];
  }

  get quizList() : Quiz[] {
    return this._quizList;
  }

  get isCrudMode() : boolean {
    return this._isCrudMode;
  }

  get categories(): Category[] {
    return this._categories;
  }

  @Input()
  set quizList(quizList : Quiz[]) {
    this._quizList = quizList;
  }

  @Input()
  set isCrudMode(crudMode: boolean) {
    this._isCrudMode = crudMode;
  }

  getCategoryColor(categoryId: number): string {
    return `var(${this._categories[categoryId].color})`;
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

  answer(quiz : Quiz) {
    this._router.navigate(['/quiz/', quiz.id]);
  }

  update(quiz : Quiz) { 
    this._router.navigate(['/quiz/edit/', quiz.id]);
  }

}
