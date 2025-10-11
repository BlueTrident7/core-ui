import { UserData } from './../base/api/user-data';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ApiConstant } from '../api-constant';
import { ApiCallBack } from '../base/api/api-callback';
import { ApiCallHelper } from '../base/api/api-call-helper';
import { ApiService } from '../base/api/api.service';

export interface AuthResponse {
  token: string;
  expiresIn?: number;
  user?: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';

  constructor(
    private http: HttpClient,
    private router: Router,
    public apiService: ApiService,
    public userData: UserData
  ) {}

  // register(userData: any): Observable<any> {
  //   return this.http.post(`${environment.baseUrl}/auth/register`, userData);
  // }

  // login(credentials: any): Observable<any> {
  //   return this.http.post(`${environment.baseUrl}/auth/login`, credentials);
  // }

  login(apiCallBack: ApiCallBack, credentials: any): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = ApiConstant.AUTH_LOGIN;
    apiObject.method = 'POST';
    apiObject.params = credentials;

    this.apiService.getData(
      apiObject,
      apiCallBack,
      ApiConstant.AUTH_LOGIN,
      credentials
    );
  }

  register(apiCallBack: ApiCallBack, userData: any): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = ApiConstant.AUTH_REGISTER;
    apiObject.method = 'POST';
    apiObject.params = userData;

    this.apiService.getData(
      apiObject,
      apiCallBack,
      ApiConstant.AUTH_REGISTER,
      userData
    );
  }

  setTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(this.TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);

    // Decode JWT to extract user info
    const decoded: any = this.decodeToken(accessToken);
    this.userData.setUserProfile(decoded);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  removeTokens() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    this.userData.clear();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.removeTokens();
    this.router.navigate(['/auth/login']);
  }

  decodeToken(token: string): any {
    if (!token) return null;
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }
  getUser(): any {
    return this.userData.getUserProfile();
  }
  refreshAccessToken(apiCallBack: ApiCallBack): void {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      apiCallBack.onResult(
        { error: 'No refresh token' },
        'AUTH_REFRESH_TOKEN_ERROR'
      );
      return;
    }

    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = ApiConstant.AUTH_REFRESH_TOKEN; // define this constant
    apiObject.method = 'POST';
    apiObject.params = { refreshToken };

    this.apiService.getData(
      apiObject,
      apiCallBack,
      ApiConstant.AUTH_REFRESH_TOKEN,
      { refreshToken }
    );
  }
}
