import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.local';
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
  private readonly TOKEN_KEY = 'authToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';

  constructor(
    private http: HttpClient,
    private router: Router,
    public apiService: ApiService
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
    apiObject.service = ApiConstant.AUTH_REGISTER; // define e.g. '/auth/register'
    apiObject.method = 'POST';
    apiObject.params = userData;

    this.apiService.getData(
      apiObject,
      apiCallBack,
      ApiConstant.AUTH_REGISTER,
      userData
    );
  }

  setToken(token: string, remember: boolean = true): void {
    if (remember) {
      localStorage.setItem(this.TOKEN_KEY, token);
    } else {
      sessionStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getToken(): string | null {
    return (
      localStorage.getItem(this.TOKEN_KEY) ||
      sessionStorage.getItem(this.TOKEN_KEY)
    );
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.removeToken();
    this.router.navigate(['/auth/login']);
  }
}
