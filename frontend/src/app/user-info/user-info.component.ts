import { Component } from '@angular/core';
import { User } from '../shared/interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {

  private _user: User;

  constructor(private _userService: UserService) {

    this._user = {} as User;
  }

  get user(): User {
    return this._user;
  }

  ngOnInit(): void {
    
    this._userService
      .fetchUser()
      .subscribe(user => this._user = user);
  }

}
