import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { PasswordValidators } from '../create-user/password-validators';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.css'
})
export class CreateQuestionComponent {

  private _questionIndex: number; 
  private _questionForm : FormGroup;

  private readonly _delete$: EventEmitter<number>;

  constructor() {
    
    this._questionIndex = 0;
    this._questionForm = new FormGroup({});
    this._delete$ = new EventEmitter<number>();
  }

  get questionIndex(): number {
    return this._questionIndex;
  }

  get questionForm(): FormGroup {
    return this._questionForm;
  }

  @Input()
  set questionIndex(index: number) {
    this._questionIndex = index;
  }

  @Input()
  set questionForm(questionForm: FormGroup) {
    this._questionForm = questionForm;
  }

  @Output('deleteQuestion') get delete$(): EventEmitter<number> {
    return this._delete$;
  }

  get answers() : FormArray {
    return this._questionForm.get('answers') as FormArray;
  }

  delete(index: number): void {
    this._delete$.emit(index);
  }

}
