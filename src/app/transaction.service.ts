import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { ApiService } from './base/api/api.service';
import { ApiCallBack } from './base/api/api-callback';
import { ApiCallHelper } from './base/api/api-call-helper';
import { ApiConstant } from './api-constant';

@Injectable({ providedIn: 'root' })
export class TransactionService {
  constructor(private apiService: ApiService) {}

  getTransactionList(callback: ApiCallBack, userId: any): void {
    const params = new HttpParams().set('userId', userId);

    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = ApiConstant.TRANSACTION_LIST;
    apiObject.method = 'GET';
    apiObject.params = params;

    this.apiService.getData(apiObject, callback, ApiConstant.TRANSACTION_LIST);
  }
}
