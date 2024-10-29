import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {inject, Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanActivate {

  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot): boolean {

    if (this._authService.isLoggedIn) {
      this._router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}