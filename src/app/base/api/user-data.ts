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
  }

  getUserProfile(): any {
    return this.userProfile;
  }

  clear() {
    this.userProfile = null;
  }
}
