import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserAuth } from '../shared/interfaces/user-auth.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly _loginForm : FormGroup;

  private _errorMessage : string;

  constructor(
    private _http: HttpClient, 
    private _router: Router, 
    private _authService: AuthService
  ) {
    this._loginForm = this._buildForm();
    this._errorMessage = '';
  }

  get loginForm(): FormGroup {
    return this._loginForm;
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  login(user: UserAuth){
    this._authService.login(user).subscribe(
      {
        next: () => this._router.navigate(['home']),
        error: (err: HttpErrorResponse) => {
          if(err.status == 401){
            this._errorMessage = "Nom d'utilisateur ou mot de passe incorrect";
          }else{
            this._errorMessage = "Une erreur est survenue";
          }
        }
      }
    )
  }

  private _buildForm(): FormGroup {
    return new FormGroup({
      username : new FormControl(
        '', 
        Validators.compose([Validators.required])
      ),
      password : new FormControl('', 
        Validators.compose([Validators.required])
      )},
    );
  }
}
