import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment.local';
import { ApiCallHelper, MessageType } from './api-call-helper';
import { ApiCallBack } from './api-callback';
import { CookieConstant } from './cookie-constant';
import { NetworkService } from './network.service';
import { OfflineQueueService } from './offline-queue.service';
import { ArtifactUtils } from '../../../util/artifact-utils';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public previewFile: any;
  private readonly TOKEN_KEY = 'authToken';

  constructor(
    private http: HttpClient,
    private networkService: NetworkService,
    private offlineQueue: OfflineQueueService
  ) // private messageService: MessageService
  {}

  getToken(): string | null {
    return (
      localStorage.getItem(this.TOKEN_KEY) ||
      sessionStorage.getItem(this.TOKEN_KEY)
    );
  }

  getAuthHeader(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({ Authorization: 'Bearer ' + token });
  }

  // private getAuthHeader(): HttpHeaders {
  //   const token = this.cookieService.get(btoa(CookieConstant.ACCESS_TOKEN));
  //   return new HttpHeaders({ Authorization: 'Bearer ' + atob(token) });
  // }

  getImage(url: string): Observable<Blob> {
    return this.http.get(url, {
      headers: this.getAuthHeader(),
      responseType: 'blob',
    });
  }

  getFileSource(
    apiObject: ApiCallHelper,
    fileName: string,
    isView?: boolean,
    requestServiceType?: any,
    callback?: ApiCallBack,
    isNotSave?: boolean
  ): Observable<any> {
    let data: Observable<any> | undefined;

    const headers = this.getAuthHeader();

    switch (apiObject.method) {
      case 'GET':
        data = this.http
          .get(environment.baseUrl + apiObject.service, {
            headers,
            responseType: 'blob',
          })
          .pipe();
        data.subscribe({
          next: (result) => {
            const blob = new Blob([result], { type: result.type });
            const url = window.URL.createObjectURL(blob);
            let file: File | null = null;
            try {
              file = new File([blob], fileName);
            } catch {}
            callback?.onResult(result, requestServiceType, url);
          },
          error: (err) => {
            callback?.onError(err, requestServiceType, null);
          },
        });
        break;

      case 'POST':
        data = this.http
          .post(environment.baseUrl + apiObject.service, apiObject.params, {
            headers,
            responseType: 'blob',
          })
          .pipe();
        data.subscribe({
          next: (result) => {
            const blob = new Blob([result], { type: result.type });
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              const base64data = reader.result;
              callback?.onResult(base64data, requestServiceType, blob);
            };
          },
          error: (err) => {
            callback?.onError(err, requestServiceType, null);
          },
        });
        break;
      default:
        break;
    }

    return data as Observable<any>;
  }

  getHttpResponse(apiObject: ApiCallHelper): Observable<any> {
    return this.http.get(environment.baseUrl + apiObject.service, {
      params: apiObject.params,
    });
  }

  getData(
    apiObject: ApiCallHelper,
    callback?: ApiCallBack,
    requestServiceType?: any,
    dataToReturn?: any,
    hideMessage?: boolean
  ): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    const httpGetOptions = { params: apiObject.params };

    let data: Observable<any> | undefined;

    switch (apiObject.method) {
      case 'GET':
        data = this.http
          .get(environment.baseUrl + apiObject.service, httpGetOptions)
          .pipe();
        data.subscribe({
          next: (result) =>
            callback?.onResult(result, requestServiceType, dataToReturn),
          error: (err) =>
            callback?.onError(err, requestServiceType, dataToReturn),
        });
        break;

      case 'POST':
        if (this.networkService.isOnline) {
          data = this.http
            .post(
              environment.baseUrl + apiObject.service,
              apiObject.params,
              httpOptions
            )
            .pipe();
          data.subscribe({
            next: (result) => {
              if (apiObject?.message) {
                this.showMessage(
                  apiObject.message,
                  apiObject.messageType ?? MessageType.SUCCESS
                );
              }
              callback?.onResult(result, requestServiceType, dataToReturn);
            },
            error: (err) =>
              callback?.onError(err, requestServiceType, dataToReturn),
          });
        } else {
          this.offlineQueue.addToQueue({
            apiObject,
            callback,
            requestServiceType,
            dataToReturn,
            httpOptions,
          });
        }
        break;

      case 'PUT':
        data = this.http
          .put(environment.baseUrl + apiObject.service, apiObject.params)
          .pipe();
        data.subscribe({
          next: (result) => {
            if (apiObject?.message) {
              this.showMessage(
                apiObject.message,
                apiObject.messageType ?? MessageType.SUCCESS
              );
            }
            callback?.onResult(result, requestServiceType, dataToReturn);
          },
          error: (err) =>
            callback?.onError(err, requestServiceType, dataToReturn),
        });
        break;

      case 'DELETE':
        data = this.http
          .delete(environment.baseUrl + apiObject.service, {
            body: apiObject.params,
          })
          .pipe();
        data.subscribe({
          next: (result) =>
            callback?.onResult(result, requestServiceType, dataToReturn),
          error: (err) =>
            callback?.onError(err, requestServiceType, dataToReturn),
        });
        break;

      default:
        break;
    }

    return data as Observable<any>;
  }

  showMessage(msg: string, msgType: MessageType): void {
    switch (
      msgType
      //   case MessageType.SUCCESS:
      //     ArtifactUtils.showSuccessViaToast(this.messageService, msg);
      //     break;
      //   case MessageType.ERROR:
      //     ArtifactUtils.showErrorViaToast(this.messageService, msg);
      //     break;
      //   case MessageType.WARNING:
      //     ArtifactUtils.showWarnViaToast(this.messageService, msg);
      //     break;
      //   case MessageType.INFO:
      //     ArtifactUtils.showInfoViaToast(this.messageService, msg);
      //     break;
      //   default:
      //     ArtifactUtils.showSuccessViaToast(this.messageService, msg);
      //     break;
    ) {
    }
  }
}
