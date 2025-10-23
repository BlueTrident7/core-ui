import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [ReactiveFormsModule, CommonModule],
})
export class DashboardComponent implements OnInit {
  period: string = 'Monthly';
  rangeForm: FormGroup;

  months = [
    { name: 'Jan', personal: 17100, corporate: 7, investment: 17 },
    { name: 'Feb', personal: 42, corporate: 175, investment: 1550 },
    { name: 'Mar', personal: 8, corporate: 110, investment: 2100 },
    { name: 'Apr', personal: 5000, corporate: 3000, investment: 2000 },
    { name: 'May', personal: 6000, corporate: 4000, investment: 2500 },
    { name: 'Jun', personal: 7000, corporate: 3500, investment: 3000 },
    { name: 'Jul', personal: 8000, corporate: 4500, investment: 3500 },
    { name: 'Aug', personal: 9000, corporate: 5000, investment: 4000 },
    { name: 'Sep', personal: 10000, corporate: 5500, investment: 4500 },
    { name: 'Oct', personal: 11000, corporate: 6000, investment: 5000 },
    { name: 'Nov', personal: 12000, corporate: 6500, investment: 5500 },
    { name: 'Dec', personal: 13000, corporate: 7000, investment: 6000 },
  ];

  transactions = [
    { id: 'txn_1234567890', orderId: 'order_ABC123', paymentId: 'pay_DEF456', amount: 17100.0, currency: 'INR', status: 'captured', method: 'card', email: 'user1@example.com', contact: '+919876543210', createdAt: '2024-10-14T18:12:45Z', description: 'Investment Deposit' },
    { id: 'txn_0987654321', orderId: 'order_XYZ789', paymentId: 'pay_GHI012', amount: 7.0, currency: 'INR', status: 'captured', method: 'netbanking', email: 'user2@example.com', contact: '+919876543211', createdAt: '2024-10-14T15:50:23Z', description: 'Portfolio Transfer' },
    { id: 'txn_1122334455', orderId: 'order_MNO345', paymentId: 'pay_JKL678', amount: 17.0, currency: 'INR', status: 'failed', method: 'upi', email: 'user3@example.com', contact: '+919876543212', createdAt: '2024-10-13T09:34:17Z', description: 'Transaction Fee' },
    { id: 'txn_5566778899', orderId: 'order_PQR901', paymentId: 'pay_STU234', amount: 42.0, currency: 'INR', status: 'captured', method: 'wallet', email: 'user4@example.com', contact: '+919876543213', createdAt: '2024-10-12T14:43:08Z', description: 'Investment Plan' },
    { id: 'txn_9988776655', orderId: 'order_VWX567', paymentId: 'pay_YZA890', amount: 175.0, currency: 'INR', status: 'captured', method: 'card', email: 'user5@example.com', contact: '+919876543214', createdAt: '2024-10-11T10:22:33Z', description: 'Deposit' },
    { id: 'txn_4433221100', orderId: 'order_BCD123', paymentId: 'pay_EFG456', amount: 1550.0, currency: 'INR', status: 'captured', method: 'netbanking', email: 'user6@example.com', contact: '+919876543215', createdAt: '2024-10-10T08:15:21Z', description: 'Withdrawal' },
    { id: 'txn_7788990011', orderId: 'order_HIJ789', paymentId: 'pay_KLM012', amount: 8.0, currency: 'INR', status: 'captured', method: 'upi', email: 'user7@example.com', contact: '+919876543216', createdAt: '2024-10-09T12:45:19Z', description: 'Transfer' },
    { id: 'txn_3344556677', orderId: 'order_NOP345', paymentId: 'pay_QRS678', amount: 110.0, currency: 'INR', status: 'failed', method: 'wallet', email: 'user8@example.com', contact: '+919876543217', createdAt: '2024-10-08T18:11:49Z', description: 'Investment' },
    { id: 'txn_8899001122', orderId: 'order_TUV901', paymentId: 'pay_WXY234', amount: 2100.0, currency: 'INR', status: 'captured', method: 'card', email: 'user9@example.com', contact: '+919876543218', createdAt: '2024-10-07T18:34:12Z', description: 'Deposit' }
  ];

  walletBreakdown: { method: string; percent: number; value: number }[] = [];

  constructor(private fb: FormBuilder) {
    this.rangeForm = this.fb.group({
      dateRange: [''],
    });
  }

  ngOnInit(): void {
    this.calculateWalletBreakdown();
  }

  calculateWalletBreakdown(): void {
    const methodTotals: { [key: string]: number } = {};
    let totalAmount = 0;

    this.transactions.forEach(t => {
      if (t.status === 'captured') {
        methodTotals[t.method] = (methodTotals[t.method] || 0) + t.amount;
        totalAmount += t.amount;
      }
    });

    this.walletBreakdown = Object.keys(methodTotals).map(method => ({
      method: method.charAt(0).toUpperCase() + method.slice(1),
      percent: Math.round((methodTotals[method] / totalAmount) * 100),
      value: methodTotals[method]
    }));
  }

  setPeriod(period: string): void {
    this.period = period;
  }

  onDownload(): void {
    // Simple CSV generation
    const csvData = this.transactions
      .map(
        (t) => `${t.id},${t.orderId},${t.paymentId},${t.amount},${t.currency},${t.status},${t.method},${t.email},${t.contact},${t.createdAt},${t.description}`
      )
      .join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  getSegmentHeight(value: number): string {
    // Assuming max height is 100px for 30000
    const maxValue = 30000;
    const maxHeight = 100;
    return `${(value / maxValue) * maxHeight}px`;
  }
}
