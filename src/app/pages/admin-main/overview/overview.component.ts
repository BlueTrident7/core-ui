import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CoreService } from '../../../base/api/core.service';
import { ApiCallBack } from '../../../base/api/api-callback';
import { ApiConstant } from '../../../api-constant';
import { AdminPanelDto } from '../../../dto/admin-panel-dto';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    TableModule,
    CheckboxModule,
    DropdownModule,
    ButtonModule,
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent implements OnInit, ApiCallBack<any> {
  adminData?: AdminPanelDto;

  constructor(public coreService: CoreService) {}
  ngOnInit(): void {
    this.getAllDetails();
  }
  // payload = {
  //   stats: {
  //     totalUsers: 150,
  //     activeSessions: 45,
  //     totalTransactions: 1200,
  //   },
  //   users: [
  //     { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  //     { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  //   ],
  //   settings: {
  //     notifications: true,
  //     twoFactor: false,
  //     theme: 'dark',
  //   },
  // };

  getAllDetails() {
    this.coreService.getAdminOverview(this);
  }
  onResult(result: any, type: any, other?: any): void {
    switch (type) {
      case ApiConstant.GET_ADMIN_OVERVIEW:
        this.adminData = result.data;

        break;

      default:
        break;
    }
  }
  onError(err: any, type: any, other?: any): void {}
}
