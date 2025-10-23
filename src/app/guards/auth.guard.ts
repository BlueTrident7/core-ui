import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { CoreService } from '../base/api/core.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private coreService: CoreService, private router: Router) {}

  canActivate(): boolean {
    if (this.coreService.userDetails) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
