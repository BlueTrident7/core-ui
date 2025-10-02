import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { ChatService } from 'src/app/chat/service/chat.service';
import { ApiCallHelper } from '../api/api-call-helper';
import { ApiService } from '../api/api.service';
import { AppData } from '../service/app-data';
import { AppService } from '../service/app.service';
import { UmsBaseService } from '../service/ums-base.service';
import { UserData } from '../service/user-data';
import { ArtifactUtils } from '../util/artifact-utils';
import { ApiCallBack } from './api-callback';
import { CommonApiConstant } from './common-api-constant';
import { CookieConstant } from './cookie-constant';

import { Observable } from 'rxjs';
import { EncryptionService } from './encryption.service';
import { PasscodeDto } from '../model/passcode-dto';

@Injectable({
    providedIn: 'root',
})
export class AuthService implements ApiCallBack {
    static USER_NAME = 'USER_NAME';
    static PASSWORD = 'PASSWORD';

    channel = new BroadcastChannel('authChannel');

    returnUrl = 'home';

    constructor(
        private apiService: ApiService,
        private userData: UserData,
        private appData: AppData,
        private router: Router,
        private cookieService: CookieService,
        private umsBaseService: UmsBaseService,
        private chatService: ChatService,
        private encryptionService: EncryptionService,
        private appService: AppService,
        private http: HttpClient
    ) {
        this.channel.onmessage = (event) => {
            console.log('channel - onmessage' + event.data);
            if (event.data.type === 'TOKEN_UPDATE') {
                this.notifyTokenUpdate(event.data.token);
            }
        };
    }

    getUserSiteRoleList(): string[] {
        let roleIdentifier = [];
        this.userData.userProfile.user?.sites?.forEach((site) => {
            if (site.id === Number(this.appData.getSiteId())) {
                site.roles.forEach((role) => {
                    roleIdentifier.push(role.identifier);
                });
            }
        });
        return roleIdentifier;
    }

    onLoginCallBack(data: any, other: any) {
        if (data.hasOwnProperty('token')) {
            const loginDetails = data.token;

            this.saveToken(loginDetails);
            this.saveRefreshToken(loginDetails);

            this.saveLogin(other.username.toLocaleLowerCase(), other.password);

            this.appData.customer = data;

            this.appService.initialize();
            this.router.navigate([this.returnUrl]);
            // this.umsBaseService.getUserProfile(
            //     this,
            //     atob(
            //         this.cookieService.get(
            //             btoa(CookieConstant.USER_NAME)
            //         )
            //     )
            // );
        }
    }

    onPasscodeLoginCallBack(data: any, other: any) {
        if (data.hasOwnProperty('token')) {
            const loginDetails = data.token;

            this.saveToken(loginDetails);
            this.saveRefreshToken(loginDetails);

            this.saveLogin(data.username.toLocaleLowerCase(), other.password);

            this.appData.customer = data;

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
                if (data.hasOwnProperty('token')) {
                    const loginDetails = data.token;

                    this.saveToken(loginDetails);
                    this.saveRefreshToken(loginDetails);

                    this.saveLogin(
                        other.username.toLocaleLowerCase(),
                        other.password
                    );

                    this.appData.customer = data;

                    this.appService.initialize();
                    this.router.navigate([this.returnUrl]);
                    // this.umsBaseService.getUserProfile(
                    //     this,
                    //     atob(
                    //         this.cookieService.get(
                    //             btoa(CookieConstant.USER_NAME)
                    //         )
                    //     )
                    // );
                }
                break;
            case CommonApiConstant.AUTH_IDENTITY_LOGIN:
                if (data.hasOwnProperty('token')) {
                    const loginDetails = data.token;

                    this.saveToken(loginDetails);
                    this.saveRefreshToken(loginDetails);

                    this.saveLogin(
                        other.username.toLocaleLowerCase(),
                        other.password
                    );

                    this.appData.customer = data;

                    this.umsBaseService.getUserProfile(
                        this,
                        atob(
                            this.cookieService.get(
                                btoa(CookieConstant.USER_NAME)
                            )
                        )
                    );
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
            case CommonApiConstant.UM_USER_PROFILE_:
                this.userData.userProfile = data?.data;
                if (!ArtifactUtils.isNull(this.userData.userProfile?.user)) {
                    this.appService.saveCustomerAttributesToStorage();
                    this.umsBaseService.getAllApplications(
                        this,
                        this.appData.getCustomerBusinessId(),
                        this.getUserSiteRoleList(),
                        this.userData.userProfile?.user?.coreUserId
                    );
                }
                break;
            case CommonApiConstant.UMS_APPLICATION_COMPONENTS:
                // Filter active components for the current application
                this.appData.applicationComponents = [];
                this.appData.applicationComponents = data.data;
                this.userData.userAccess = [];
                this.userData.noAccess = [];

                this.appData.applicationComponents.forEach((element) => {
                    if (element?.asAccess) {
                        this.userData.userAccess.push(element);
                    } else {
                        this.userData.noAccess.push(element);
                    }
                });
                this.router.navigate([this.returnUrl]);
                break;

            default:
                break;
        }
    }

    onError(err: any, type: any, other?: any): void {
        switch (type) {
            case CommonApiConstant.AUTH_LOGIN:
                console.log('Login error:', err);
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
        inputVal.username = inputVal.username.toLocaleLowerCase();
        inputVal.password = btoa(inputVal.password);
        apiObject.params = inputVal;
        this.apiService.getData(
            apiObject,
            ArtifactUtils.isNull(callBack) ? this : callBack,
            CommonApiConstant.AUTH_LOGIN,
            inputVal
        );
    }

    loginWithPasscode(passcode: PasscodeDto, callBack: ApiCallBack): void {
        const apiObject: ApiCallHelper = {} as ApiCallHelper;
        apiObject.service = CommonApiConstant.LTAUTH_PASSCODE_VERIFICATION;
        apiObject.method = 'POST';
        apiObject.params = passcode;
        this.apiService.getData(
            apiObject,
            ArtifactUtils.isNull(callBack) ? this : callBack,
            CommonApiConstant.LTAUTH_PASSCODE_VERIFICATION,
            passcode
        );
    }
    // login(inputVal: any, returnUrl: any): void {

    //     this.returnUrl = returnUrl;
    //     const apiObject: ApiCallHelper = {} as ApiCallHelper;
    //     apiObject.service = CommonApiConstant.AUTH_IDENTITY_LOGIN;
    //     apiObject.method = 'POST';
    //     inputVal.username = inputVal.username.toLocaleLowerCase();
    //     inputVal.password = this.encryptionService.encryptPassword(inputVal).encrypted;
    //     apiObject.params = inputVal;
    //     this.apiService.getData(

    //         apiObject,
    //         this,
    //         CommonApiConstant.AUTH_IDENTITY_LOGIN,
    //         inputVal
    //     )

    // }

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

        // const apiObject: ApiCallHelper = {} as ApiCallHelper;
        // apiObject.service = CommonApiConstant.AUTH_REFRESHTOKEN;
        // apiObject.method = 'GET';

        // apiObject.params = atob(
        //     this.cookieService.get(atob(CookieConstant.REFRESH_TOKEN))
        // );
        // this.apiService.getData(
        //     apiObject,
        //     this,
        //     CommonApiConstant.AUTH_REFRESHTOKEN
        // );
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
            token: null, // loginDetails?.access_token,
        });
        var t = new Date();
        t.setSeconds(t.getSeconds() + Number(loginDetails.expires_in));

        this.cookieService.set(
            btoa(CookieConstant.ACCESS_TOKEN),
            btoa(loginDetails.access_token),
            1,
            '/'
        );
        this.cookieService.set(
            btoa(CookieConstant.ACCESS_TOKEN_EXPIRY_DATE),
            btoa(t.toString()),
            1,
            '/'
        );
    }

    // Handle token updates
    private notifyTokenUpdate(token: string | null): void {
        console.log('Token updated:', token + ':::' + this.router.url);
        // Here you can implement further logic to handle token updates,
        // such as refreshing the user's session or redirecting to login page
        if (ArtifactUtils.isNull(token) && !this.router.url.includes('login')) {
            this.logout(true);
        }
    }

    saveRefreshToken(loginDetails: any): void {
        var t = new Date();
        t.setSeconds(t.getSeconds() + Number(loginDetails.refresh_expires_in));

        this.cookieService.set(
            btoa(CookieConstant.REFRESH_TOKEN),
            btoa(loginDetails.refresh_token),
            1,
            '/'
        );
        this.cookieService.set(
            btoa(CookieConstant.REFRESH_TOKEN_EXPIRY_DATE),
            btoa(t.toString()),
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

    saveLogin(username: any, password: any): void {
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

    // logout(): void {
    //   this.userData.userProfile = null;
    //   this.removeActiveSessions(this, this.userData.getUserName());
    //   this.removeToken();
    //   this.removeRefreshToken();
    //   this.removeShiftLogin();

    //   if (this.appData.currentApplication === Application.MAIN) {
    //     this.navigateToLogin();
    //   } else {
    //     this.navigateToMainLogin();
    //   }
    //   this.generalSettingsService.settingsWorkFlowList = [];
    // }
    logout(value): void {
        if (!value) {
            localStorage.removeItem(btoa('identifier'));
            this.userData.userProfile = null;
            this.removeToken();
            this.removeRefreshToken();
            this.removeShiftLogin();
            // this.generalSettingsService.settingsWorkFlowList = [];
            this.channel.postMessage({ type: 'TOKEN_UPDATE', token: null });
            this.chatService.disconnect();
        }
        this.navigateToLogin();
        // if (
        //   this.appData.currentApplication === Application.MAIN ||
        //   environment.customer !== "lt"
        // ) {
        //   this.navigateToLogin();
        // } else {
        //   this.navigateToMainLogin();
        // }
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
        let target = '_self';
        window.open(window.location.origin, target);
    }
    navigateToLogin(): void {
        this.router.navigate(['/auth/login']);
    }

    removeShiftLogin(): void {
        this.cookieService.delete(CookieConstant.SHIFT_ID, '/');
        this.cookieService.delete(CookieConstant.SHIFT_NUMBER, '/');
        this.cookieService.delete(CookieConstant.SHIFT_USER_NAME, '/');
        this.cookieService.delete(CookieConstant.SHIFT_LOGIN_TOKEN, '/');
    }
}
