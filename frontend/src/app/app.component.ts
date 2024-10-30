import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private _authService: AuthService, private _router: Router) {

  }

  get isLoggedIn(): boolean {
    return this._authService.isLoggedIn;
  }

  get username(): string | null {
    return this._authService.username;
  }

  logout(): void {
    this._authService.logout();
  }

}
