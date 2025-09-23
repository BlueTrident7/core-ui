import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

interface Transaction {
  date: string;
  type: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './transaction.component.html'
})
export class TransactionComponent {
  transactions: Transaction[] = [
    { date: '2025-09-01', type: 'Investment', amount: 10000, status: 'Completed' },
    { date: '2025-09-10', type: 'Withdrawal', amount: 5000, status: 'Pending' },
    { date: '2025-09-15', type: 'Dividend', amount: 2000, status: 'Completed' }
  ];
}

