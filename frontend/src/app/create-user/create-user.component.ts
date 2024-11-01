import { Component } from '@angular/core';
import { UserAuth } from '../shared/interfaces/user-auth.interface';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidators } from './password-validators';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {

  private readonly _registerForm : FormGroup;

  private _errorMessage : string;

  constructor(
    private _http: HttpClient, 
    private _router: Router, 
    private _userService: UserService,
    private _authService: AuthService
  ) {
    
    this._registerForm = this._buildForm();
    this._errorMessage = '';
  }

  get registerForm(): FormGroup {
    return this._registerForm;
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  registerUser(user: UserAuth){
    user = {
      id: user.id,
      password: user.password
    }

    return this._userService.register(user as UserAuth).subscribe({
      next: () => {
        this._authService.login(user).subscribe(
          {
            next: () => this._router.navigate(['home']),
            error: () => this._router.navigate(['login'])
          }
        );
      },
      error: (err: HttpErrorResponse) => {
        if(err.status == 409){
          this._errorMessage = "Nom d'utilisateur déjà utilisé";
        }else{
          this._errorMessage = "Une erreur est survenue";
        }
      }
    });
  }
  
  private _buildForm(): FormGroup {
    return new FormGroup({
      id : new FormControl(
        '', 
        Validators.compose([Validators.required, Validators.minLength(3)])
      ),
      password : new FormControl('', 
        Validators.compose([Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/)])
      ),
      confirmPassword : new FormControl('', Validators.compose([Validators.required]))
    
      },
      { validators: PasswordValidators.matchPasswordValidator('password', 'confirmPassword') }
    );
  }
}
