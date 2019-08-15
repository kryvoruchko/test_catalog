import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
  }

  canActivate(): boolean {
    if (this._authService.isAuthenticated()) {
      this._router.navigate(['/catalog']);
      return false;
    }
    return true;
  }
}
