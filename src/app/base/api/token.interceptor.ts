import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import {
  BehaviorSubject,
  Observable,
  map,
  catchError,
  throwError,
  switchMap,
  filter,
  take,
} from 'rxjs';
import { AuthService } from './auth.service';
import { CommonApiConstant } from './common-api-constant';
import { CookieConstant } from './cookie-constant';
import { ExcludeToken } from './exclude-token';
import { MedcareAuthService } from './medcare-auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService,
    public medcareService: MedcareAuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessTokenCookie = this.cookieService.get(
      btoa(CookieConstant.ACCESS_TOKEN)
    );
    const refreshTokenCookie = this.cookieService.get(
      btoa(CookieConstant.REFRESH_TOKEN)
    );
    let accessToken = '';
    let refreshToken = '';
    try {
      accessToken = accessTokenCookie ? atob(accessTokenCookie) : '';
      refreshToken = refreshTokenCookie ? atob(refreshTokenCookie) : '';
    } catch (e) {
      console.error('Error decoding tokens:', e);
    }

    if (request.url.includes(CommonApiConstant.AUTH_REFRESHTOKEN)) {
      console.log('Refresh token request detected');
      this.authService.removeToken();
      if (refreshToken) {
        request = request.clone({
          headers: request.headers.set('Authorization', refreshToken),
        });
      }
      return next.handle(request);
    }

    if (accessToken && !ExcludeToken.isExclude(request)) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + accessToken),
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('HTTP Error:', {
          url: error.url,
          status: error.status,
          statusText: error.statusText,
          message: error.message,
        });
        if (
          error.status === 401 // error.statusText === 'Unauthorized'
        ) {
          return this.handle401Error(request, next, refreshToken);
        }
        return throwError(error);
      })
    );
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler,
    refreshToken: string
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      console.log('Refreshing access token at:', new Date());

      const refreshObservable =
        environment.customer === 'lt'
          ? this.authService.refreshToken()
          : this.medcareService.refreshTokenForHati(refreshToken);

      return refreshObservable.pipe(
        switchMap((response: any) => {
          this.isRefreshing = false;
          console.log('Refresh token response:', response);
          let newAccessToken = '';
          if (environment.customer === 'lt') {
            newAccessToken = response.access_token;
          } else {
            const headers = response.headers;
            const authorizationHeader = headers.get('Authorization');
            newAccessToken = authorizationHeader?.replace('Bearer ', '').trim();
          }

          if (newAccessToken) {
            this.cookieService.set(
              btoa(CookieConstant.ACCESS_TOKEN),
              btoa(newAccessToken)
            );
            this.refreshTokenSubject.next(newAccessToken);
            console.log('New access token obtained:', newAccessToken);
            request = request.clone({
              headers: request.headers.set(
                'Authorization',
                'Bearer ' + newAccessToken
              ),
            });
            return next.handle(request);
          }
          console.error('New access token is empty');
          this.authService.removeToken();
          this.authService.navigateToLogin();
          return throwError(new Error('Token refresh failed'));
        }),
        catchError((err) => {
          console.error('Refresh token error:', err);
          this.isRefreshing = false;
          if (err?.url?.includes(CommonApiConstant.AUTH_REFRESHTOKEN)) {
            this.authService.removeToken();
            this.authService.navigateToLogin();
          }
          return throwError(err);
        })
      );
    } else {
      console.log('Waiting for refresh token to complete');
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((newToken) => {
          request = request.clone({
            headers: request.headers.set(
              'Authorization',
              'Bearer ' + newToken!
            ),
          });
          return next.handle(request);
        })
      );
    }
  }
}
