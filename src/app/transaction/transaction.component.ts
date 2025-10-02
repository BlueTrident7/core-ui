import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { TransactionsDto } from '../dto/transactions-dto';
import { ApiCallBack } from '../base/api/api-callback';
import { TransactionService } from '../transaction.service';
import { ApiConstant } from '../api-constant';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, BadgeModule, ButtonModule],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css'],
})
export class TransactionComponent implements OnInit, ApiCallBack {
  transactionList: TransactionsDto[] = [];
  loading = false;

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.getTransactionList();
  }

  getTransactionList() {
    this.loading = true;
    this.transactionService.getTransactionList(this, 1);
  }

  getTypeSeverity(
    type: string
  ): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
    switch (type) {
      case 'Investment':
        return 'success';
      case 'Payment':
        return 'warn';
      case 'Withdrawal':
        return 'danger';
      case 'Dividend':
        return 'info';
      default:
        return 'secondary';
    }
  }

  getStatusSeverity(
    status: string
  ): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Pending':
        return 'warn';
      case 'Failed':
        return 'danger';
      case 'Processing':
        return 'info';
      default:
        return 'secondary';
    }
  }

  onResult(result: any, type: any): void {
    switch (type) {
      case ApiConstant.TRANSACTION_LIST:
        this.transactionList = (result.data || []).map((tx: any) => ({
          id: tx.id,
          type: tx.type,
          transactionNumber: tx.transactionNumber,
          date: new Date(tx.date),
          amount: tx.amount,
          status: tx.status,
        }));
        this.loading = false;
        break;
    }
  }

  onError(err: any, type: any): void {
    console.error('Error fetching transactions', err);
    this.loading = false;
  }
}
