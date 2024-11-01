import { Component } from '@angular/core';
import { User } from '../shared/interfaces/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {

  private _user: User;

  constructor(private _userService: UserService, private _router: Router) {

    this._user = {} as User;
  }

  get user(): User {
    return this._user;
  }

  ngOnInit(): void {
    
    this._userService
      .fetchUser()
      .subscribe({
        next: user => this._user = user,
        error: (err: HttpErrorResponse) => {
          if(err.status == 401){
            this._router.navigate(['/login']);
          }else{
            this._router.navigate(['/home']);
          }
        }
      });
  }

}
