import { CanLoad, Route, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanLoad {

  constructor(private authService: AuthService, private router: Router) {
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
