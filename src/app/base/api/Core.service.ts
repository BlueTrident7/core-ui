import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { ApiCallHelper } from './api-call-helper';
import { ApiConstant } from '../../api-constant';
import { ApiCallBack } from './api-callback';
import { ApiService } from './Api.service';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private apiService: ApiService) {}

  getUsersProfile(callback: ApiCallBack, id: any): void {
    // const params = new HttpParams().set('isPhysician', isPhysician);
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = ApiConstant.USER_PROFILE + '/' + id;
    apiObject.method = 'GET';
    //apiObject.params = params;
    this.apiService.getData(apiObject, callback, ApiConstant.USER_PROFILE);
  }
}
