import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CookieConstant } from '../api/cookie-constant';
import { ArtifactUtils } from '../../../util/artifact-utils';

@Injectable({
  providedIn: 'root',
})
export class UserData {
  public userProfile: any;

  profileImageSrc = 'assets/avatar/avatar-70.png';

  constructor(private cookieService: CookieService) {}

  public getUserName(): string {
    return atob(this.cookieService.get(btoa(CookieConstant.USER_NAME)));
  }
  public getUserFullName(): any {
    let fullname = '';

    fullname =
      this.userProfile?.user?.name?.firstname +
      ' ' +
      (ArtifactUtils.isNull(this.userProfile?.user?.name?.middlename)
        ? ''
        : this.userProfile?.user?.name?.middlename) +
      ' ' +
      (ArtifactUtils.isNull(this.userProfile?.user?.name?.lastname)
        ? ''
        : this.userProfile?.user?.name?.lastname);

    return fullname;
  }
}
