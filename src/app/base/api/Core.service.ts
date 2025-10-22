import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';
import { ApiCallHelper } from './api-call-helper';
import { ApiConstant } from '../../api-constant';
import { ApiCallBack } from './api-callback';
import { ApiService } from './api.service';
import { CategoryPostDto } from '../../dto/category-post-dto';
import { CreateOrderRequest } from '../../dto/CreateOrderRequest';
import { PaymentVerificationRequest } from '../../dto/PaymentVerificationRequest';
import { UserDTO } from '../../dto/admin-panel-dto';
import { UserInfo } from 'os';
import { UserProfileDto } from '../../dto/user-profile-dto';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  selectedPlan: any;
  userDetails:UserProfileDto | undefined ;

  constructor(private apiService: ApiService) {}

  getUsersProfile(callback: ApiCallBack, id: any): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = ApiConstant.USER_PROFILE + '/' + id;
    apiObject.method = 'GET';
    this.apiService.getData(apiObject, callback, ApiConstant.USER_PROFILE);
  }

  saveCategory(apiCallBack: ApiCallBack, request: CategoryPostDto): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = ApiConstant.SAVE_CATEGORY;
    apiObject.method = 'POST';
    apiObject.params = request;
    this.apiService.getData(
      apiObject,
      apiCallBack,
      ApiConstant.SAVE_CATEGORY,
      request
    );
  }

  getAllCategories(callback: ApiCallBack): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = ApiConstant.GET_CATEGORIES;
    apiObject.method = 'GET';
    this.apiService.getData(apiObject, callback, ApiConstant.GET_CATEGORIES);
  }

  getCategoriesById(callback: ApiCallBack, id: any): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = ApiConstant.GET_CATEGORY_BY_ID + '/' + id;
    apiObject.method = 'GET';
    this.apiService.getData(
      apiObject,
      callback,
      ApiConstant.GET_CATEGORY_BY_ID
    );
  }
  updateCategory(
    apiCallBack: ApiCallBack,
    id: number,
    request: CategoryPostDto
  ): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = ApiConstant.UPDATE_CATEGORY + '/' + id;
    apiObject.method = 'PUT';
    apiObject.params = request;
    this.apiService.getData(
      apiObject,
      apiCallBack,
      ApiConstant.UPDATE_CATEGORY,
      request
    );
  }
  deleteCategory(callback: ApiCallBack, categoryId: number): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = ApiConstant.DELETE_CATEGORY + '/' + categoryId;
    apiObject.method = 'DELETE';
    this.apiService.getData(apiObject, callback, ApiConstant.DELETE_CATEGORY);
  }

  saveInvestmentPlan(apiCallBack: ApiCallBack, request: CategoryPostDto): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = ApiConstant.SAVE_INVESTMENT_PLAN;
    apiObject.method = 'POST';
    apiObject.params = request;
    this.apiService.getData(
      apiObject,
      apiCallBack,
      ApiConstant.SAVE_INVESTMENT_PLAN,
      request
    );
  }

  getAllInvestmentPlans(callback: ApiCallBack): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = ApiConstant.GET_INVESTMENT_PLANS;
    apiObject.method = 'GET';
    this.apiService.getData(
      apiObject,
      callback,
      ApiConstant.GET_INVESTMENT_PLANS
    );
  }

  getInvestmentPlanById(callback: ApiCallBack, id: any): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = ApiConstant.GET_INVESTMENT_PLAN_ID + '/' + id;
    apiObject.method = 'GET';
    this.apiService.getData(
      apiObject,
      callback,
      ApiConstant.GET_INVESTMENT_PLAN_ID
    );
  }
  updateInvestmentPlan(
    apiCallBack: ApiCallBack,
    id: number,
    request: CategoryPostDto
  ): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = ApiConstant.UPDATE_INVESTMENT_PLAN + '/' + id;
    apiObject.method = 'PUT';
    apiObject.params = request;
    this.apiService.getData(
      apiObject,
      apiCallBack,
      ApiConstant.UPDATE_INVESTMENT_PLAN,
      request
    );
  }
  deleteInvestmentPlan(callback: ApiCallBack, planId: number): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = ApiConstant.DELETE_INVESTMENT_PLAN + '/' + planId;
    apiObject.method = 'DELETE';
    this.apiService.getData(
      apiObject,
      callback,
      ApiConstant.DELETE_INVESTMENT_PLAN
    );
  }

  createOrder(callback: ApiCallBack, request: CreateOrderRequest): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = ApiConstant.CREATE_ORDER;
    apiObject.method = 'POST';
    apiObject.params = request;
    this.apiService.getData(apiObject, callback, ApiConstant.CREATE_ORDER);
  }

  verifyPayment(callback: ApiCallBack, vreq: PaymentVerificationRequest): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = ApiConstant.VERIFY_PAYMENT;
    apiObject.method = 'POST';
    apiObject.params = vreq;
    this.apiService.getData(apiObject, callback, ApiConstant.VERIFY_PAYMENT);
  }
  getAdminPanelInfo(callback: ApiCallBack, userId: any): void {
    const apiObject: ApiCallHelper = {} as ApiCallHelper;
    apiObject.service = ApiConstant.GET_ADMIN_PANEL_INFO + '/' + userId;
    apiObject.method = 'GET';
    this.apiService.getData(
      apiObject,
      callback,
      ApiConstant.GET_ADMIN_PANEL_INFO
    );
  }
}
