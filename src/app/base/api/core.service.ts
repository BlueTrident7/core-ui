import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiCallBack } from './api-callback';
import { ApiConstant } from '../../api-constant';
import { CategoryPostDto } from '../../dto/category-post-dto';
import { InvestmentPlanPostDto } from '../../dto/investment-plans-dto';
import { AdminPanelDto } from '../../dto/admin-panel-dto';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }

  get<T>(url: string, callback?: ApiCallBack<T>): Observable<T> {
    return this.http.get<T>(url);
  }

  post<T>(url: string, body: any, callback?: ApiCallBack<T>): Observable<T> {
    return this.http.post<T>(url, body);
  }

  put<T>(url: string, body: any, callback?: ApiCallBack<T>): Observable<T> {
    return this.http.put<T>(url, body);
  }

  delete<T>(url: string, callback?: ApiCallBack<T>): Observable<T> {
    return this.http.delete<T>(url);
  }

  // Category methods
  getAllCategories(callback: ApiCallBack<any>): Observable<any> {
    return this.get(ApiConstant.BASE_URL + ApiConstant.CATEGORY.GET_ALL, callback);
  }

  saveCategory(callback: ApiCallBack<any>, category: CategoryPostDto): Observable<any> {
    return this.post(ApiConstant.BASE_URL + ApiConstant.CATEGORY.CREATE, category, callback);
  }

  updateCategory(callback: ApiCallBack<any>, id: number, category: CategoryPostDto): Observable<any> {
    return this.put(ApiConstant.BASE_URL + ApiConstant.CATEGORY.UPDATE + '/' + id, category, callback);
  }

  deleteCategory(callback: ApiCallBack<any>, id: number): Observable<any> {
    return this.delete(ApiConstant.BASE_URL + ApiConstant.CATEGORY.DELETE + '/' + id, callback);
  }

  // Investment Plans methods
  getAllInvestmentPlans(callback: ApiCallBack<any>): Observable<any> {
    return this.get(ApiConstant.BASE_URL + ApiConstant.INVESTMENT_PLANS.GET_ALL, callback);
  }

  saveInvestmentPlan(callback: ApiCallBack<any>, plan: InvestmentPlanPostDto): Observable<any> {
    return this.post(ApiConstant.BASE_URL + ApiConstant.INVESTMENT_PLANS.CREATE, plan, callback);
  }

  updateInvestmentPlan(callback: ApiCallBack<any>, id: number, plan: InvestmentPlanPostDto): Observable<any> {
    return this.put(ApiConstant.BASE_URL + ApiConstant.INVESTMENT_PLANS.UPDATE + '/' + id, plan, callback);
  }

  deleteInvestmentPlan(callback: ApiCallBack<any>, id: number): Observable<any> {
    return this.delete(ApiConstant.BASE_URL + ApiConstant.INVESTMENT_PLANS.DELETE + '/' + id, callback);
  }

  // Admin Panel methods
  getAdminOverview(callback: ApiCallBack<AdminPanelDto>): Observable<AdminPanelDto> {
    return this.get(ApiConstant.BASE_URL + ApiConstant.ADMIN_PANEL.OVERVIEW, callback);
  }

  // User Profile methods
  getUsersProfile(callback: ApiCallBack<any>, id: number): Observable<any> {
    return this.get(ApiConstant.BASE_URL + '/users/' + id, callback);
  }

  userDetails: any;
}
