import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ApiConstant } from '../../api-constant';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let clonedReq = req;

    if (token) {
      clonedReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    return new Observable<HttpEvent<any>>((observer) => {
      next.handle(clonedReq).subscribe({
        next: (event) => observer.next(event),
        error: (err: HttpErrorResponse) => {
          // If 401 and refresh token exists
          if (err.status === 401 && this.authService.getRefreshToken()) {
            this.authService.refreshAccessToken({
              onResult: (result: any, type: any) => {
                if (type === ApiConstant.AUTH_REFRESH_TOKEN && result.data?.accessToken) {
                  // Update token in local storage and UserData
                  this.authService.setTokens(result.data.accessToken, result.data.refreshToken);

                  // Retry original request
                  const retryReq = req.clone({
                    setHeaders: { Authorization: `Bearer ${result.data.accessToken}` }
                  });

                  next.handle(retryReq).subscribe({
                    next: (res) => observer.next(res),
                    error: (error) => observer.error(error),
                    complete: () => observer.complete()
                  });
                } else {
                  // Refresh failed, logout
                  this.authService.logout();
                  observer.error(err);
                }
              },
              onError: function (err: any, type: any, other?: any): void {
                throw new Error('Function not implemented.');
              }
            });
          } else {
            observer.error(err);
          }
        },
        complete: () => observer.complete()
      });
    });
  }
}
