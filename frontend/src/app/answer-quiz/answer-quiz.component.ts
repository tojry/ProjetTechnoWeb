import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Quiz } from '../shared/interfaces/quiz.interface';
import { QuizService } from '../shared/services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, merge, mergeMap } from 'rxjs';

@Component({
  selector: 'app-answer-quiz',
  templateUrl: './answer-quiz.component.html',
  styleUrl: './answer-quiz.component.css'
})
export class AnswerQuizComponent {

  private _quizForm? : FormGroup;
  private _quiz? : Quiz;
  private _currentQuestion : number = 0;
  private _answers : number[] = [];
  private _score : number = 0;

  constructor(private _quizService : QuizService, private _router: Router, private _route: ActivatedRoute) {

    this._quizForm = this._buildQuestionForm();
  }

  ngOnInit(): void {
    
    this._route.params.pipe(
      filter((params: any) => !!params.id),
      mergeMap((params: any) => this._quizService.fetchOne(params.id))
    ).subscribe({
      next: (q: Quiz) => this._quiz = q,
      error: () => this._router.navigate(['/home'])
    })
  }

  get quizForm() : FormGroup | void {
    return this._quizForm;
  }

  get quiz() : Quiz | void {
    return this._quiz;
  }

  get currentQuestion() : number {
    return this._currentQuestion;
  }

  get score() : number {
    return this._score;
  }

  submitAnswer(answer: number): void {

    if(!this._quiz) {
      this._router.navigate(['/home']);
      return;
    }
    this._answers.push(answer);
    this._currentQuestion++;

    if(this._currentQuestion < this._quiz.questions.length) {
      this._quizForm = this._buildQuestionForm();
    } else {
      this._finishQuiz();
    }
  }

  private _buildQuestionForm(): FormGroup {

    return new FormGroup({
      answer: new FormControl('', Validators.required)
    });
  }

  private _finishQuiz(): void {

    if(!this._quiz) {
      this._router.navigate(['/home']);
      return;
    }

    this._quizForm = undefined;

    for(let i = 0; i < this._quiz.questions.length; i++) {
      if(this._answers[i] == this._quiz.questions[i].correctAnswer.valueOf()) {
        this._score++;
      }
    }
  }

}
