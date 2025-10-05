import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.local';
import {
  CreateOrderData,
  CreateOrderRequest,
  VerifyPaymentRequest,
} from '../../dto/create-order-data';
import { ApiConstant } from '../../api-constant';
import { ApiCallHelper } from './api-call-helper';
import { ApiCallBack } from './api-callback';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient, public apiService: ApiService) {}

  finalizeInvestment(
    intentId: number,
    payload: { orderId: string; paymentId: string }
  ) {
    return this.http.post<any>(
      `${this.base}/investments/${intentId}/confirm`,
      payload
    );
  }

  createPaymentOrder(
    apiCallBack: ApiCallBack,
    request: CreateOrderRequest
  ): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = ApiConstant.CREATE_PAYMENT_ORDER;
    apiObject.method = 'POST';
    apiObject.params = request;
    this.apiService.getData(
      apiObject,
      apiCallBack,
      ApiConstant.CREATE_PAYMENT_ORDER,
      request
    );
  }

  verifyPayment(apiCallBack: ApiCallBack, request: VerifyPaymentRequest): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;

    apiObject.service = ApiConstant.VERIFY_PAYMENT;
    apiObject.method = 'POST';
    apiObject.params = request;
    this.apiService.getData(apiObject, apiCallBack, ApiConstant.VERIFY_PAYMENT);
  }
}
