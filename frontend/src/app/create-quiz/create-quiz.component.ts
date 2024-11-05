import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { Category, Question, Quiz } from '../shared/interfaces/quiz.interface';
import { AuthService } from '../shared/services/auth.service';
import { QuizService } from '../shared/services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { filter, mergeMap } from 'rxjs';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css'
})
export class CreateQuizComponent {

  private _createQuizForm : FormGroup;
  private readonly _categories: Category[] = Object.values(Category);

  private _errorMessage : string;
  private _isUpdateMode : boolean = false;
  private _quizData: Quiz;

  constructor(
    private _authService : AuthService, 
    private _quizService : QuizService, 
    private _router : Router,
    private _route: ActivatedRoute
  ) {
    
    this._createQuizForm = this._buildForm();
    this._errorMessage = '';
    this._quizData = {} as Quiz;
  }

  get createQuizForm(): FormGroup {
    return this._createQuizForm;
  }

  get categories(): string[] {
    return this._categories.map(cat => cat.name);
  }

  get questions() : FormArray {
    return this._createQuizForm.get('questions') as FormArray;
  }
  
  get errorMessage(): string {
    return this._errorMessage;
  }

  get isUpdateMode(): boolean {
    return this._isUpdateMode;
  }

  ngOnInit(): void {
    
    let quizId: number | undefined = undefined;

    this._route.params.pipe(
      filter((params: any) => !!params.id),
      mergeMap((params: any) => quizId = params.id)
    ).subscribe();

    if(!!quizId){
      this._quizService.fetchOne(quizId).subscribe({
        next: (q: Quiz) => {
          if(q.author !== this._authService.username){
            this._router.navigate(['/user']);
          }
          this._quizData = q;
          this.populateFormWithQuizData(q);
          this._isUpdateMode = true;
        },
        error: () => this._router.navigate(['/quiz/new'])
      });
    }else{
      this.addQuestion();
    }
    
  }

  create(quiz: Quiz) {

    const q : Quiz = { 
      ...quiz, 
      category: this._getCategoryIdByName(quiz.category.toString()) || 0,
      author: this._isUpdateMode ? this._quizData.author : this._authService.username!,
    };

    if(this._isUpdateMode){
      this._quizService.update(this._quizData.id!.toString(), q).subscribe({
        next: () => this._router.navigate(['/user']),
        error: (err: HttpErrorResponse) => {
          if(err.status == 401){
            this._router.navigate(['/login']);
          }else{
            this._errorMessage = "Une erreur est survenue"
          }
        }
      });
    } else{
      this._quizService.add(q).subscribe({
        next: () => this._router.navigate(['/user']),
        error: () => this._errorMessage = "Une erreur est survenue"
      });
    }

  }

  populateFormWithQuizData(quiz: Quiz) {
    this.createQuizForm.patchValue({
      title: quiz.title,
      category: this.categories[quiz.category]
    });

    quiz.questions.forEach((question: Question) => {
      this.addQuestion(question);
    });
  }

  addQuestion(questionData?: Question) {

    const questionForm = new FormGroup({
      question: new FormControl(questionData ? questionData.question : '', Validators.required),
      answers: new FormArray(questionData
        ? questionData.answers.map(
          (answer: string) => new FormControl(answer, Validators.required)) 
        : [
          new FormControl('', Validators.required),
          new FormControl('', Validators.required),
          new FormControl('', Validators.required)
        ]),
      correctAnswer: new FormControl(questionData ? Number(questionData.correctAnswer) : undefined, Validators.required)
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
      category: new FormControl(Category[0].name),
      questions: new FormArray([] as FormGroup[]),
    });
  }

  private _getCategoryIdByName(name: string): number | undefined {
    for (const [key, value] of Object.entries(Category)) {
        if (value.name === name) {
            return Number(key);
        }
    }
    return undefined;
  }
}
