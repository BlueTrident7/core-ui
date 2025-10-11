import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}
  getOverview(): Observable<any> {
    return this.http.get('/api/overview');
  }

  getMetrics(): Observable<any> {
    return this.http.get('/api/metrics');
  }

  getMonthlyRevenue(): Observable<any[]> {
    return this.http.get<any[]>('/api/monthly-revenue');
  }

  getCashFlow(): Observable<any[]> {
    return this.http.get<any[]>('/api/cash-flow');
  }
}
