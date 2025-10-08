import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ApiCallHelper } from '../api/api-call-helper';
import { ApiService } from '../api/api.service';
import { ApiCallBack } from './api-callback';
import { CommonApiConstant } from './common-api-constant';
import { CookieConstant } from './cookie-constant';

import { Observable } from 'rxjs';
import { EncryptionService } from './encryption.service';
import { UserData } from './user-data';
import { ArtifactUtils } from '../../../util/artifact-utils';
import { PasscodeDto } from '../../dto/passcode-dto';
import { environment } from '../../../environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements ApiCallBack {
  static USER_NAME = 'USER_NAME';
  static PASSWORD = 'PASSWORD';

  channel = new BroadcastChannel('authChannel');
  returnUrl = 'home';
  appService: any;
  constructor(
    private apiService: ApiService,
    private userData: UserData,
    private router: Router,
    private cookieService: CookieService,
    private encryptionService: EncryptionService,
    private http: HttpClient
  ) {
    this.channel.onmessage = (event) => {
      console.log('channel - onmessage', event.data);
      if (event.data.type === 'TOKEN_UPDATE') {
        this.notifyTokenUpdate(event.data.token);
      }
    };
  }

  onLoginCallBack(data: any, other: any) {
    if (data?.token) {
      const loginDetails = data.token;

      this.saveToken(loginDetails);
      this.saveRefreshToken(loginDetails);
      this.saveLogin(other.username.toLowerCase(), other.password);

      this.appService.initialize();
      this.router.navigate([this.returnUrl]);
    }
  }

  onPasscodeLoginCallBack(data: any, other: any) {
    if (data?.token) {
      const loginDetails = data.token;

      this.saveToken(loginDetails);
      this.saveRefreshToken(loginDetails);
      this.saveLogin(data.username.toLowerCase(), other.password);

      this.appService.initialize();
      this.router.navigate([this.returnUrl]);
    }
  }

  onResult(data: any, type: any, other?: any): void {
    switch (type) {
      case CommonApiConstant.AUTH_LOGIN:
        this.onLoginCallBack(data, other);
        break;

      case CommonApiConstant.AUTH_IDENTITY_LOGIN:
        if (data?.token) {
          const loginDetails = data.token;

          this.saveToken(loginDetails);
          this.saveRefreshToken(loginDetails);
          this.saveLogin(other.username.toLowerCase(), other.password);
        }
        break;

      case CommonApiConstant.AUTH_REFRESHTOKEN:
        if (data?.access_token) {
          this.saveToken(data);
          this.saveRefreshToken(data);
        } else {
          this.logout(false);
        }
        break;

      default:
        break;
    }
  }

  onError(err: any, type: any, other?: any): void {
    switch (type) {
      case CommonApiConstant.AUTH_LOGIN:
        console.error('Login error:', err);
        break;

      default:
        break;
    }
  }

  login(inputVal: any, returnUrl: any, callBack: ApiCallBack): void {
    this.returnUrl = returnUrl;
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = CommonApiConstant.AUTH_LOGIN;
    apiObject.method = 'POST';
    inputVal.username = inputVal.username.toLowerCase();
    inputVal.password = btoa(inputVal.password);
    apiObject.params = inputVal;

    this.apiService.getData(
      apiObject,
      ArtifactUtils.isNull(callBack) ? this : callBack,
      CommonApiConstant.AUTH_LOGIN,
      inputVal
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = atob(
      this.cookieService.get(atob(CookieConstant.REFRESH_TOKEN))
    );

    const httpGetOptions = {
      headers: new HttpHeaders({
        Authorization: refreshToken,
      }),
    };

    return this.http.get(
      environment.baseUrl + CommonApiConstant.AUTH_REFRESHTOKEN,
      httpGetOptions
    );
  }

  loginAuthentication(callback: ApiCallBack): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = CommonApiConstant.AUTH_LOGIN_AUTHENTICATION;
    apiObject.method = 'GET';

    this.apiService.getData(
      apiObject,
      callback,
      CommonApiConstant.AUTH_LOGIN_AUTHENTICATION
    );
  }

  saveToken(loginDetails: any): void {
    this.channel.postMessage({
      type: 'TOKEN_UPDATE',
      token: null, // token is set to null here, maybe intentional?
    });

    const expiryDate = new Date();
    expiryDate.setSeconds(
      expiryDate.getSeconds() + Number(loginDetails.expires_in)
    );

    this.cookieService.set(
      btoa(CookieConstant.ACCESS_TOKEN),
      btoa(loginDetails.access_token),
      1,
      '/'
    );
    this.cookieService.set(
      btoa(CookieConstant.ACCESS_TOKEN_EXPIRY_DATE),
      btoa(expiryDate.toString()),
      1,
      '/'
    );
  }

  private notifyTokenUpdate(token: string | null): void {
    console.log('Token updated:', token, ':::', this.router.url);
    if (ArtifactUtils.isNull(token) && !this.router.url.includes('login')) {
      this.logout(true);
    }
  }

  saveRefreshToken(loginDetails: any): void {
    const expiryDate = new Date();
    expiryDate.setSeconds(
      expiryDate.getSeconds() + Number(loginDetails.refresh_expires_in)
    );

    this.cookieService.set(
      btoa(CookieConstant.REFRESH_TOKEN),
      btoa(loginDetails.refresh_token),
      1,
      '/'
    );
    this.cookieService.set(
      btoa(CookieConstant.REFRESH_TOKEN_EXPIRY_DATE),
      btoa(expiryDate.toString()),
      1,
      '/'
    );
  }

  removeToken(): void {
    this.cookieService.delete(btoa(CookieConstant.ACCESS_TOKEN), '/');
    this.cookieService.delete(
      btoa(CookieConstant.ACCESS_TOKEN_EXPIRY_DATE),
      '/'
    );
  }

  removeRefreshToken(): void {
    this.cookieService.delete(btoa(CookieConstant.REFRESH_TOKEN), '/');
    this.cookieService.delete(
      btoa(CookieConstant.REFRESH_TOKEN_EXPIRY_DATE),
      '/'
    );
  }

  saveLogin(username: string, password: string): void {
    this.cookieService.set(
      btoa(CookieConstant.USER_NAME),
      btoa(username),
      1,
      '/'
    );
    this.cookieService.set(
      btoa(CookieConstant.PASSWORD),
      btoa(password),
      1,
      '/'
    );
  }

  removeLogin(): void {
    this.cookieService.delete(btoa(CookieConstant.USER_NAME), '/');
    this.cookieService.delete(btoa(CookieConstant.PASSWORD), '/');
  }

  logout(clearSession: boolean): void {
    if (!clearSession) {
      localStorage.removeItem(btoa('identifier'));
      this.userData.userProfile = null;
      this.removeToken();
      this.removeRefreshToken();
      this.channel.postMessage({ type: 'TOKEN_UPDATE', token: null });
    }
    this.navigateToLogin();
  }

  removeActiveSessions(callback: ApiCallBack, username: string): void {
    const params = new HttpParams().set('username', username);
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = CommonApiConstant.REMOVE_USER_ACTIVE_SESSIONS;
    apiObject.method = 'PUT';
    apiObject.params = params;

    this.apiService.getData(
      apiObject,
      callback,
      CommonApiConstant.REMOVE_USER_ACTIVE_SESSIONS
    );
  }

  navigateToMainLogin(): void {
    const target = '_self';
    window.open(window.location.origin, target);
  }

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
