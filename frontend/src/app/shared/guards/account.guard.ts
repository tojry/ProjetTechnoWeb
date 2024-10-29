import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const accountGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isLoggedIn) {
    inject(Router).navigate(['/home']);
    return false;
  }
  return true;
};