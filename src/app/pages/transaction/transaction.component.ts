import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

interface Transaction {
  id: string;
  orderId: string;
  paymentId: string;
  amount: number;
  currency: string;
  status: string;
  method: string;
  email: string;
  contact: string;
  createdAt: string;
  description: string;
}

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
  transactions: Transaction[] = [
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
}
