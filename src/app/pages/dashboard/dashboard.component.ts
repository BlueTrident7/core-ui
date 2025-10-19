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
    { name: 'Jan', personal: 5000, corporate: 3000, investment: 2000 },
    { name: 'Feb', personal: 6000, corporate: 4000, investment: 2500 },
    { name: 'Mar', personal: 7000, corporate: 3500, investment: 3000 },
    { name: 'Apr', personal: 8000, corporate: 4500, investment: 3500 },
    { name: 'May', personal: 9000, corporate: 5000, investment: 4000 },
    { name: 'Jun', personal: 10000, corporate: 5500, investment: 4500 },
    { name: 'Jul', personal: 11000, corporate: 6000, investment: 5000 },
    { name: 'Aug', personal: 12000, corporate: 6500, investment: 5500 },
    { name: 'Sep', personal: 13000, corporate: 7000, investment: 6000 },
    { name: 'Oct', personal: 14000, corporate: 7500, investment: 6500 },
    { name: 'Nov', personal: 15000, corporate: 8000, investment: 7000 },
    { name: 'Dec', personal: 16000, corporate: 8500, investment: 7500 },
  ];

  transactions = [
    {
      id: 1,
      name: 'John Doe',
      coin: 'BTC',
      date: '2023-01-01',
      process: 'Buy',
      amount: 1000,
    },
    {
      id: 2,
      name: 'Jane Smith',
      coin: 'ETH',
      date: '2023-01-02',
      process: 'Sell',
      amount: 500,
    },
    {
      id: 3,
      name: 'Bob Johnson',
      coin: 'ADA',
      date: '2023-01-03',
      process: 'Buy',
      amount: 200,
    },
  ];

  walletBreakdown = [
    { symbol: 'BTC', percent: 40, value: 4000 },
    { symbol: 'ETH', percent: 30, value: 3000 },
    { symbol: 'ADA', percent: 30, value: 3000 },
  ];

  constructor(private fb: FormBuilder) {
    this.rangeForm = this.fb.group({
      dateRange: [''],
    });
  }

  ngOnInit(): void {}

  setPeriod(period: string): void {
    this.period = period;
  }

  onDownload(): void {
    // Simple CSV generation
    const csvData = this.transactions
      .map(
        (t) => `${t.id},${t.name},${t.coin},${t.date},${t.process},${t.amount}`
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
