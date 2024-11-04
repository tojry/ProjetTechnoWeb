import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { Category } from './shared/interfaces/quiz.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  private _isMenuOpen: boolean = false;
  private readonly _categories: Category[] = Object.values(Category); 

  constructor(private _authService: AuthService, private _router: Router) {

  }

  get isLoggedIn(): boolean {
    return this._authService.isLoggedIn;
  }

  get username(): string | null {
    return this._authService.username;
  }

  get isMenuOpen(): boolean {
    return this._isMenuOpen;
  }

  get categories(): string[] {
    return this._categories.slice(1).map(cat => cat.name);
  }

  logout(): void {
    this._authService.logout();
  }

  toggleMenu(): void {
    this._isMenuOpen = !this._isMenuOpen;
  }

  getCategoryColor(categoryId: number): string {
    return `var(${this._categories[categoryId].color})`;
  }

}
