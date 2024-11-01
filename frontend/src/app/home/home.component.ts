import { Component } from '@angular/core';
import { Category, Quiz } from '../shared/interfaces/quiz.interface';
import { QuizService } from '../shared/services/quiz.service';
import { MenuItem } from 'primeng/api';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private _quizList : Quiz[];
  private _categoryName : string = 'Tous les quiz';
  private _categoryItems: MenuItem[];

  constructor(private _quizService: QuizService) {
    this._quizList = [];

    this._categoryItems = Object.values(Category).slice(1).map(
      category => ({ 
        label: category, 
        command: () => this._quizService.fetchCategory(category).subscribe(
          (q: any) => { this._quizList = q; this._categoryName = category }
        ) })
    );
    this._categoryItems.unshift({ label: 'Tous les quiz', command: () => this._quizService.fetchAll().subscribe(
      (q: any) => { this._quizList = q.quiz; this._categoryName = 'Tous les quiz' }
    )})
  }

  get categoryName(): string {
    return this._categoryName;
  }

  get categories(): MenuItem[] {
    return this._categoryItems;
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
