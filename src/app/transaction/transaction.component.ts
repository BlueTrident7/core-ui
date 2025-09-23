import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';

interface Transaction {
  date: string;
  type: string;
  amount: number;
  status: string;
}

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, TableModule, ChipModule],
  templateUrl: './transaction.component.html',
})
export class TransactionComponent {
  transactions: Transaction[] = [
    {
      date: '2025-09-20',
      type: 'Credit',
      amount: 1500,
      status: 'Completed',
    },
    {
      date: '2025-09-21',
      type: 'Debit',
      amount: 500,
      status: 'Pending',
    },
    {
      date: '2025-09-22',
      type: 'Credit',
      amount: 2000,
      status: 'Completed',
    },
    {
      date: '2025-09-23',
      type: 'Debit',
      amount: 1200,
      status: 'Failed',
    },
  ];
}
