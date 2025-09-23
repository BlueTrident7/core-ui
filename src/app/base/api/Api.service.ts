import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { ApiCallBack } from './api-callback';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public previewFile: any;
  constructor(private http: HttpClient) {}

  // getImage(url: string): Observable<Blob> {
  //   const headers = new HttpHeaders().set(
  //     'Authorization',
  //     `Bearer ${atob(
  //       this.cookieService.get(btoa(CookieConstant.ACCESS_TOKEN))
  //     )}`
  //   );
  //   return this.http.get(url, { headers, responseType: 'blob' });
  // }
  // getFileSource(
  //   apiObject: ApiCallHelper,
  //   fileName: string,
  //   isView?: boolean,
  //   requestServiceType?: any,
  //   callback?: ApiCallBack,
  //   isNotSave?: boolean
  // ): Observable<any> {
  //   let data: any;

  //   switch (apiObject.method) {
  //     case 'GET':
  //       {
  //         data = this.http
  //           .get(environment.baseUrl + apiObject.service, {
  //             headers: new HttpHeaders({
  //               Authorization:
  //                 'Bearer ' + atob(this.cookieService.get(btoa('accessToken'))),
  //             }),
  //             responseType: 'blob',
  //           })
  //           .subscribe(
  //             (result) => {
  //               let blob: any = new Blob([result], {
  //                 type: result.type,
  //               });
  //               const url = window.URL.createObjectURL(blob);
  //               let file: File = null;
  //               try {
  //                 file = new File([blob], fileName);
  //               } catch (error) {}

  //               callback.onResult(result, requestServiceType, url);
  //             },
  //             (err) => {
  //               callback.onError(err, requestServiceType, null);
  //             },
  //             () => {
  //               console.info('File downloaded successfully');
  //             }
  //           );
  //       }
  //       break;

  //     case 'POST':
  //       {
  //         data = this.http
  //           .post(environment.baseUrl + apiObject.service, apiObject.params, {
  //             headers: new HttpHeaders({
  //               Authorization:
  //                 'Bearer ' + atob(this.cookieService.get(btoa('accessToken'))),
  //             }),
  //             responseType: 'blob',
  //           })
  //           .subscribe(
  //             (result) => {
  //               let blob: any = new Blob([result], {
  //                 type: result.type,
  //               });
  //               const url = window.URL.createObjectURL(blob);

  //               let base64data;
  //               const reader = new FileReader();
  //               reader.readAsDataURL(blob);
  //               reader.onloadend = function () {
  //                 base64data = reader.result;
  //                 callback.onResult(base64data, requestServiceType, blob);
  //               };
  //             },
  //             (err) => {
  //               callback.onError(err, requestServiceType, null);
  //             },
  //             () => {
  //               console.info('File downloaded successfully');
  //             }
  //           );
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  //   return data;
  // }
  // getHttpResponse(apiObject: ApiCallHelper): Observable<any> {
  //   const httpGetOptions = {
  //     params: apiObject.params,
  //   };
  //   return this.http.get(
  //     environment.baseUrl + apiObject.service,
  //     httpGetOptions
  //   );
  // }

  // getData(
  //   apiObject: ApiCallHelper,
  //   callback: ApiCallBack,
  //   requestServiceType: any,
  //   dataToReturn?: any,
  //   hideMessage?: boolean
  // ): Observable<any> {
  //   let data: any;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   };
  //   const httpGetOptions = {
  //     params: apiObject.params,
  //   };
  //   switch (apiObject.method) {
  //     case 'GET':
  //       {
  //         data = this.http
  //           .get(environment.baseUrl + apiObject.service, httpGetOptions)
  //           ?.subscribe({
  //             next: (result: any) => {
  //               callback.onResult(result, requestServiceType, dataToReturn);
  //             },
  //             error: (err: any) => {
  //               callback.onError(err, requestServiceType, dataToReturn);
  //             },
  //             complete: () => {},
  //           });
  //       }
  //       break;
  //     case 'POST':
  //       if (this.networkService.isOnline) {
  //         data = this.http
  //           .post(
  //             environment.baseUrl + apiObject.service,
  //             apiObject.params,
  //             httpOptions
  //           )
  //           .subscribe({
  //             next: (result: any) => {
  //               if (!ArtifactUtils.isNull(apiObject?.message)) {
  //                 this.showMessage(apiObject.message, apiObject.messageType);
  //               }
  //               callback.onResult(result, requestServiceType, dataToReturn);
  //             },
  //             error: (err: any) => {
  //               callback.onError(err, requestServiceType, dataToReturn);
  //             },
  //             complete: () => {},
  //           });
  //       } else {
  //         this.offlineQueue.addToQueue({
  //           apiObject: apiObject,
  //           callback: callback,
  //           requestServiceType: requestServiceType,
  //           dataToReturn: dataToReturn,
  //           httpOptions: httpOptions,
  //         });
  //         console.log(this.offlineQueue.getQueue());
  //       }

  //       break;
  //     case 'PUT':
  //       data = this.http
  //         .put<any>(environment.baseUrl + apiObject.service, apiObject.params)
  //         .subscribe({
  //           next: (result: any) => {
  //             if (!ArtifactUtils.isNull(apiObject?.message)) {
  //               this.showMessage(apiObject.message, apiObject.messageType);
  //             }
  //             callback.onResult(result, requestServiceType, dataToReturn);
  //           },
  //           error: (err: any) => {
  //             callback.onError(err, requestServiceType, dataToReturn);
  //           },
  //           complete: () => {},
  //         });
  //       break;
  //     case 'DELETE':
  //       {
  //         data = this.http
  //           .delete(environment.baseUrl + apiObject.service + apiObject.params)
  //           .subscribe({
  //             next: (result: any) => {
  //               if (result?.code === '200' || result?.code === '201') {
  //                 if (!hideMessage) {
  //                   if (ArtifactUtils.isNull(apiObject?.message)) {
  //                     ArtifactUtils.showSuccessViaToast(
  //                       this.messageService,
  //                       'Item Deleted Successfully'
  //                       // this.translateService.instant("Item Deleted Successfully")
  //                     );
  //                   } else {
  //                     ArtifactUtils.showSuccessViaToast(
  //                       this.messageService,
  //                       apiObject?.message
  //                     );
  //                   }
  //                 }
  //               }
  //               callback.onResult(result, requestServiceType, dataToReturn);
  //             },
  //             error: (err: any) => {
  //               callback.onError(err, requestServiceType, dataToReturn);
  //             },
  //             complete: () => {},
  //           });
  //       }
  //       break;

  //     case 'DELETE2':
  //       {
  //         data = this.http
  //           .delete(environment.baseUrl + apiObject.service, {
  //             params: apiObject.params,
  //           })
  //           .subscribe({
  //             next: (result: any) => {
  //               callback.onResult(result, requestServiceType, dataToReturn);
  //             },
  //             error: (err: any) => {
  //               callback.onError(err, requestServiceType, dataToReturn);
  //             },
  //             complete: () => {},
  //           });
  //       }
  //       break;
  //     case 'DELETE_BODY':
  //       {
  //         data = this.http
  //           .delete(environment.baseUrl + apiObject.service, {
  //             body: apiObject.params,
  //           })
  //           .subscribe({
  //             next: (result: any) => {
  //               callback.onResult(result, requestServiceType, dataToReturn);
  //             },
  //             error: (err: any) => {
  //               callback.onError(err, requestServiceType, dataToReturn);
  //             },
  //             complete: () => {},
  //           });
  //       }
  //       break;
  //     case 'DOWNLOAD_EXCEL':
  //       {
  //         data = this.http
  //           .get(environment.baseUrl + apiObject.service, {
  //             responseType: 'arraybuffer' as 'json',
  //           })
  //           .subscribe({
  //             next: (result: any) => {
  //               callback.onResult(result, requestServiceType, dataToReturn);
  //             },
  //             error: (err: any) => {
  //               callback.onError(err, requestServiceType, dataToReturn);
  //             },
  //             complete: () => {},
  //           });
  //       }
  //       break;
  //     case 'UPLOAD_EXCEL':
  //       {
  //         // tslint:disable-next-line: max-line-length
  //         data = this.http
  //           .post(environment.baseUrl + apiObject.service, apiObject.formData, {
  //             params: { customerId: apiObject.params },
  //           })
  //           .subscribe({
  //             next: (result: any) => {
  //               callback.onResult(result, requestServiceType, dataToReturn);
  //             },
  //             error: (err: any) => {
  //               callback.onError(err, requestServiceType, dataToReturn);
  //             },
  //             complete: () => {},
  //           });
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  //   return data;
  // }

  // getFileStoreData(
  //   apiObject: ApiCallHelper,
  //   callback: ApiCallBack,
  //   requestServiceType: any,
  //   dataToReturn?: any
  // ): Observable<any> {
  //   let data: any;
  //   const httpOptions = {
  //     // Remove "Content-Type": "application/json"
  //   };

  //   switch (apiObject.method) {
  //     case 'GET':
  //       data = this.http
  //         .get(environment.baseUrl + apiObject.service, {
  //           params: apiObject.params,
  //         })
  //         .subscribe({
  //           next: (result: any) =>
  //             callback.onResult(result, requestServiceType, dataToReturn),
  //           error: (err: any) =>
  //             callback.onError(err, requestServiceType, dataToReturn),
  //           complete: () => {},
  //         });
  //       break;
  //     case 'POST':
  //       if (apiObject.formData) {
  //         data = this.http
  //           .post(environment.baseUrl + apiObject.service, apiObject.formData) // No header needed for FormData
  //           .subscribe({
  //             next: (result: any) =>
  //               callback.onResult(result, requestServiceType, dataToReturn),
  //             error: (err: any) =>
  //               callback.onError(err, requestServiceType, dataToReturn),
  //             complete: () => {},
  //           });
  //       } else {
  //         data = this.http
  //           .post(
  //             environment.baseUrl + apiObject.service,
  //             apiObject.params,
  //             httpOptions
  //           )
  //           .subscribe({
  //             next: (result: any) =>
  //               callback.onResult(result, requestServiceType, dataToReturn),
  //             error: (err: any) =>
  //               callback.onError(err, requestServiceType, dataToReturn),
  //             complete: () => {},
  //           });
  //       }
  //       break;
  //     // Handle other cases like PUT, DELETE, etc.
  //     default:
  //       break;
  //   }
  //   return data;
  // }

  // getRefreshToken() {
  //   this.http.get(environment.baseUrl + 'ltauth/refreshtoken');
  // }

  // getFile(url: string, httpParams: HttpParams): Observable<any> {
  //   return this.http.get(environment.baseUrl + url, {
  //     headers: new HttpHeaders({
  //       Authorization:
  //         'Bearer ' + atob(this.cookieService.get(btoa('accessToken'))),
  //     }),
  //     responseType: 'blob', // Fetch as blob
  //     observe: 'response',
  //     params: httpParams,
  //   });
  // }

  // downloadExcel(
  //   apiObject: ApiCallHelper,
  //   fileName: string,
  //   isView?: boolean,
  //   requestServiceType?: any,
  //   callback?: ApiCallBack,
  //   isNotSave?: boolean
  // ): Observable<any> {
  //   let data: any;
  //   const httpGetOptions = {
  //     params: apiObject.params,
  //   };
  //   switch (apiObject.method) {
  //     case 'GET':
  //       {
  //         data = this.http
  //           .get(environment.baseUrl + apiObject.service, {
  //             responseType: 'blob',
  //           })
  //           .subscribe({
  //             next: (result: any) => {
  //               let blob: any = new Blob([result], {
  //                 type: result.type,
  //               });
  //               const url = window.URL.createObjectURL(blob);
  //               let file: File = null;
  //               try {
  //                 file = new File([blob], fileName);
  //               } catch (error) {}

  //               if (isView) {
  //                 window.open(url);
  //               } else if (!isNotSave) {
  //                 saveAs(blob, fileName);
  //               }
  //               callback.onResult(result, requestServiceType, file);
  //             },
  //             error: (err: any) => {
  //               callback.onError(err, requestServiceType, null);
  //             },
  //             complete: () => {
  //               console.info('File downloaded successfully');
  //             },
  //           });
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  //   return data;
  // }
  // downLoadFile(
  //   apiObject: ApiCallHelper,
  //   fileName: string,
  //   isView?: boolean,
  //   requestServiceType?: any,
  //   callback?: ApiCallBack,
  //   isNotSave?: boolean
  // ): Observable<any> {
  //   let data: any;

  //   switch (apiObject.method) {
  //     case 'GET':
  //       {
  //         data = this.http
  //           .get(environment.baseUrl + apiObject.service, {
  //             headers: new HttpHeaders({
  //               Authorization:
  //                 'Bearer ' +
  //                 atob(
  //                   this.cookieService.get(btoa(CookieConstant.ACCESS_TOKEN))
  //                 ),
  //             }),
  //             responseType: 'blob',
  //           })
  //           .subscribe({
  //             next: (result: any) => {
  //               let blob: any = new Blob([result], {
  //                 type: result.type,
  //               });
  //               const url = window.URL.createObjectURL(blob);
  //               let file: File = null;
  //               try {
  //                 file = new File([blob], fileName);
  //               } catch (error) {}

  //               if (isView) {
  //                 window.open(url);
  //               } else if (!isNotSave) {
  //                 saveAs(blob, fileName);
  //               }
  //               //window.location.href = response.url;
  //               callback.onResult(result, requestServiceType, file);
  //             },
  //             error: (err: any) => {
  //               callback.onError(err, requestServiceType, null);
  //             },
  //             complete: () => {
  //               console.info('File downloaded successfully');
  //             },
  //           });
  //       }
  //       break;

  //     case 'POST':
  //       {
  //         data = this.http
  //           .post(environment.baseUrl + apiObject.service, apiObject.params, {
  //             headers: new HttpHeaders({
  //               Authorization:
  //                 'Bearer ' + atob(this.cookieService.get(btoa('accessToken'))),
  //             }),
  //             responseType: 'blob',
  //           })
  //           .subscribe(
  //             (result) => {
  //               let blob: any = new Blob([result], {
  //                 type: result.type,
  //               });
  //               const url = window.URL.createObjectURL(blob);
  //               window.open(url);
  //               //window.location.href = response.url;
  //               callback.onResult(result, requestServiceType, blob);
  //               // saveAs(blob, fileName);
  //               // this.summaryFile = this.blobToFile(blob, fileName);
  //             },
  //             (err) => {
  //               callback.onError(err, requestServiceType, null);
  //             },
  //             () => {
  //               console.info('File downloaded successfully');
  //             }
  //           );
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  //   return data;
  // }

  // downloadReportPdf(
  //   apiObject: ApiCallHelper,
  //   fileName: string,
  //   requestServiceType?: any,
  //   callback?: ApiCallBack,
  //   isNotSave?: boolean
  // ): Observable<any> {
  //   let data: any;

  //   switch (apiObject.method) {
  //     case 'GET':
  //       {
  //         data = this.http
  //           .get(environment.baseUrl + apiObject.service, {
  //             headers: new HttpHeaders({
  //               Authorization:
  //                 'Bearer ' +
  //                 atob(
  //                   this.cookieService.get(btoa(CookieConstant.ACCESS_TOKEN))
  //                 ),
  //             }),
  //             responseType: 'blob',
  //           })
  //           .subscribe({
  //             next: (result: any) => {
  //               let blob: any = new Blob([result], {
  //                 type: result.type,
  //               });
  //               const url = window.URL.createObjectURL(blob);
  //               let file: File = null;
  //               try {
  //                 file = new File([blob], fileName);
  //               } catch (error) {}

  //               saveAs(blob, fileName);
  //               window.open(url);

  //               //window.location.href = response.url;
  //               callback.onResult(result, requestServiceType, file);
  //             },
  //             error: (err: any) => {
  //               callback.onError(err, requestServiceType, null);
  //             },
  //             complete: () => {
  //               console.info('File downloaded successfully');
  //             },
  //           });
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  //   return data;
  // }
  // downloadReportExcel(
  //   apiObject: ApiCallHelper,
  //   fileName: string,
  //   requestServiceType?: any,
  //   callback?: ApiCallBack
  // ): Observable<any> {
  //   let data: any;

  //   switch (apiObject.method) {
  //     case 'GET':
  //       {
  //         data = this.http
  //           .get(environment.baseUrl + apiObject.service, {
  //             headers: new HttpHeaders({
  //               Authorization:
  //                 'Bearer ' +
  //                 atob(
  //                   this.cookieService.get(btoa(CookieConstant.ACCESS_TOKEN))
  //                 ),
  //             }),
  //             responseType: 'blob',
  //           })
  //           .subscribe({
  //             next: (result: any) => {
  //               let blob: any = new Blob([result], {
  //                 type: result.type,
  //               });

  //               let file: File = null;
  //               try {
  //                 file = new File([blob], fileName);
  //               } catch (error) {}

  //               saveAs(blob, fileName);

  //               callback.onResult(result, requestServiceType, file);
  //             },
  //             error: (err: any) => {
  //               callback.onError(err, requestServiceType, null);
  //             },
  //             complete: () => {
  //               console.info('File downloaded successfully');
  //             },
  //           });
  //       }
  //       break;

  //     default:
  //       break;
  //   }
  //   return data;
  // }

  // getDataDelete(
  //   apiObject: ApiCallHelper,
  //   callback: ApiCallBack,
  //   requestServiceType: any,
  //   dataToReturn?: any
  // ): Observable<any> {
  //   let data: any;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //     }),
  //   };
  //   const httpGetOptions = {
  //     params: apiObject.params,
  //   };
  //   switch (apiObject.method) {
  //     case 'DELETE':
  //       {
  //         data = this.http
  //           .delete(environment.baseUrl + apiObject.service, apiObject.params)
  //           .subscribe(
  //             (result) => {
  //               callback.onResult(result, requestServiceType, dataToReturn);
  //             },
  //             (err) => {
  //               callback.onError(err, requestServiceType, dataToReturn);
  //             }
  //           );
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  //   return data;
  // }

  // showMessage(msg: string, msgType: MessageType): void {
  //   switch (msgType) {
  //     case MessageType.SUCCESS:
  //       ArtifactUtils.showSuccessViaToast(this.messageService, msg);
  //       break;
  //     case MessageType.ERROR:
  //       ArtifactUtils.showErrorViaToast(this.messageService, msg);
  //       break;
  //     case MessageType.WARNING:
  //       ArtifactUtils.showWarnViaToast(this.messageService, msg);
  //       break;
  //     case MessageType.INFO:
  //       ArtifactUtils.showInfoViaToast(this.messageService, msg);
  //       break;

  //     default:
  //       ArtifactUtils.showSuccessViaToast(this.messageService, msg);
  //       break;
  //   }
  // }
}
