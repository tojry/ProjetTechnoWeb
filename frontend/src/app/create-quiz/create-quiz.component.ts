import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Category, Quiz } from '../shared/interfaces/quiz.interface';
import { AuthService } from '../shared/services/auth.service';
import { QuizService } from '../shared/services/quiz.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css'
})
export class CreateQuizComponent {

  private readonly _createQuizForm : FormGroup;
  private readonly _categories: Category[] = Object.values(Category);

  private _errorMessage : string;

  constructor(
    private _authService : AuthService, 
    private _quizService : QuizService, 
    private _router : Router
  ) {
    
    this._createQuizForm = this._buildForm();
    this.addQuestion();

    this._errorMessage = '';
  }

  get createQuizForm(): FormGroup {
    return this._createQuizForm;
  }

  get categories(): Category[] {
    return Object.values(this._categories);
  }

  get questions() : FormArray {
    return this._createQuizForm.get('questions') as FormArray;
  }
  
  get errorMessage(): string {
    return this._errorMessage;
  }

  create(quiz: Quiz) {
    console.log(quiz);
    const q : Quiz = { 
      ...quiz, 
      author: this._authService.username! 
    };
    this._quizService.add(q).subscribe({
      next: () => this._router.navigate(['/user']),
      error: () => this._errorMessage = "Une erreur est survenue"
    });

  }

  addQuestion() {
    const questionForm = new FormGroup({
      question: new FormControl('', Validators.required),
      answers: new FormArray([
        new FormControl('', Validators.required),
        new FormControl('', Validators.required),
        new FormControl('', Validators.required),
      ]),
      correctAnswer: new FormControl(null, Validators.required)
    });
    this.questions.push(questionForm);
  }

  deleteQuestion(index: number) {
    this.questions.removeAt(index-1);
  }

  getQuestionFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('', Validators.required),
      category: new FormControl(Category[0]),
      questions: new FormArray([] as FormGroup[]),
    });
  }
}
