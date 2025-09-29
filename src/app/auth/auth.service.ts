import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface AuthResponse {
  token: string;
  expiresIn?: number;
  user?: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'app_token';
  private authSubject = new BehaviorSubject<string | null>(this.getToken());
  auth$ = this.authSubject.asObservable();

  // Replace with your backend base URL
  private baseUrl = 'https://api.example.com/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, { email, password })
      .pipe(
        tap(res => {
          if (res?.token) {
            this.setToken(res.token);
          }
        })
      );
  }

  register(payload: { name?: string; email: string; password: string; }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, payload)
      .pipe(
        tap(res => {
          if (res?.token) {
            this.setToken(res.token);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.authSubject.next(null);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.authSubject.next(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // optional: decode token minimally (not secure replacement for backend validation)
  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) { return null; }
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      return null;
    }
  }
}
