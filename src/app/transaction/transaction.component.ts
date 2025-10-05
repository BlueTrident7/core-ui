import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import {
  PaymentTransactionDTO,
  TransactionsDto,
} from '../dto/transactions-dto';
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
  transactionList: PaymentTransactionDTO[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit() {
    this.getTransactionList();
  }

  getTransactionList() {
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
  mapStatus(status: string): string {
    switch ((status || '').toUpperCase()) {
      case 'SUCCESS':
      case 'REFUNDED':
        return 'Completed';
      case 'FAILED':
        return 'Failed';
      case 'CREATED':
      case 'INITIATED':
        return 'Pending';
      default:
        return 'Processing';
    }
  }

  mapTransactionType(status: string): string {
    switch ((status || '').toUpperCase()) {
      case 'INVESTMENT':
        return 'Investment';
      case 'INVESTMENT':
        return 'WithDrawl';
      case 'REFUNDED':
        return 'Refund';
      default:
        return 'Investment';
    }
  }

  onResult(result: any, type: any): void {
    switch (type) {
      case ApiConstant.TRANSACTION_LIST:
        this.transactionList = (result.data || []).map((tx: any) => ({
          id: tx.transactionId || tx.paymentId,
          type: this.mapTransactionType(tx.transactionType),
          transactionNumber: tx.externalTransactionId || tx.orderId || '-',
          date: tx.createdAt ? new Date(tx.createdAt) : null,
          amount: tx.amount || 0,
          status: this.mapStatus(tx.transactionStatus || tx.paymentStatus),
        }));
        break;
    }
  }

  onError(err: any, type: any): void {
    console.error('Error fetching transactions', err);
  }
}
