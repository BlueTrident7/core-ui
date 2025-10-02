import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ApiCallHelper } from '../api/api-call-helper';
import { CommonApiConstant } from './common-api-constant';
import { ApiCallBack } from './api-callback';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MedcareAuthService implements ApiCallBack {
    constructor(
        private http: HttpClient,
        private cookieService: CookieService
    ) {}

    private refreshTokenInProgress = false;

    refreshTokenForHati(refreshToken: string): Observable<any> {
        // Check if refresh token call is already in progress
        if (this.refreshTokenInProgress) {
            return;
        }

        this.refreshTokenInProgress = true;
        const apiObject: ApiCallHelper = {} as ApiCallHelper;
        apiObject.service = `${CommonApiConstant.AUTH_REFRESHTOKEN_FOR_HATI}?refreshToken=${refreshToken}`;
        apiObject.method = 'POST';

        return this.getDataRefreshToken(
            apiObject,
            this,
            CommonApiConstant.AUTH_REFRESHTOKEN_FOR_HATI
        );
        // .subscribe({
        //     next: (response) => {
        //         const headers = response.headers;
        //         const authorizationHeader = headers.get('Authorization');
        //         const token = authorizationHeader
        //             ?.replace('Bearer ', '')
        //             .trim();
        //         this.saveResetToken(token, null);
        //     },
        //     error: (error) => {
        //         console.error('Refresh token failed:', error);
        //     },
        //     complete: () => {
        //         // Reset the flag once the call is completed
        //         this.refreshTokenInProgress = false;
        //     },
        // });
    }

    saveResetToken(authorizationHeader: any, request: HttpRequest<any>): void {
        this.cookieService.set(
            btoa('accessToken'),
            btoa(authorizationHeader),
            1,
            '/'
        );
    }
    getDataRefreshToken(
        apiObject: ApiCallHelper,
        callback: ApiCallBack,
        requestServiceType: any,
        dataToReturn?: any
    ): Observable<HttpResponse<any>> {
        let data: any;
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
            observe: 'response' as 'response',
        };
        return this.http
            .post(
                environment.medcareclienturl + apiObject.service,
                data,
                httpOptions
            )
            .pipe(map((res: HttpResponse<any>) => res));
    }

    onResult(data: any, type: any, other?: any): void {
        switch (type) {
            case CommonApiConstant.AUTH_REFRESHTOKEN_FOR_HATI:
                break;

            default:
                break;
        }
    }
    onError(err: any, type: any, other?: any): void {
        throw new Error('Method not implemented.');
    }
}
