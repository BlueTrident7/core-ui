import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieConstant } from '../api/cookie-constant';
import { ArtifactUtils } from '../../../util/artifact-utils';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserData {
  public userProfile: any;

  profileImageSrc = 'assets/avatar/avatar-70.png';

  setUserProfile(user: any) {
    this.userProfile = user;
    localStorage.setItem('userProfile', JSON.stringify(user));
  }

  getUserProfile(): any {
    const storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
      this.userProfile = JSON.parse(storedProfile);
    }
    return this.userProfile;
  }

  clear() {
    this.userProfile = null;
    localStorage.removeItem('userProfile');
  }
}
