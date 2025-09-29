import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  dashboardData!: DashboardResponse;

  lineChartData!: ChartConfiguration<'line'>['data'];
  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { ticks: { callback: (value) => `₹${value}` } },
    },
  };

  barChartData!: ChartConfiguration<'bar'>['data'];
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    scales: {
      y: { beginAtZero: true, ticks: { callback: (value) => `₹${value}` } },
    },
  };

  ngOnInit() {
    this.dashboardData = dashboardResponse;

    this.lineChartData = {
      labels: this.dashboardData.charts.months,
      datasets: [
        {
          data: this.dashboardData.charts.monthlyRevenue,
          label: 'Revenue',
          fill: true,
          borderColor: '#3755a4',
          backgroundColor: 'rgba(79, 110, 164, 0.2)',
          pointBackgroundColor: '#3755a4',
          pointBorderColor: '#fff',
          tension: 0.4,
        },
      ],
    };

    this.barChartData = {
      labels: this.dashboardData.charts.months,
      datasets: [
        {
          data: this.dashboardData.charts.cashIn,
          label: 'Cash In',
          backgroundColor: '#3755a4',
        },
        {
          data: this.dashboardData.charts.cashOut,
          label: 'Cash Out',
          backgroundColor: 'rgba(79, 110, 164, 0.4)',
        },
      ],
    };
  }
}
const dashboardResponse: DashboardResponse = {
  portfolio: {
    totalInvested: 212642.12,
    profitPercentage: 12.5,
    profitAmount: 1200,
    totalAmount: 239800,
    balanceAmount: 150000,
    lastUpdated: '2025-09-30',
    accountNo: 'XXXX1234',
  },
  charts: {
    months: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    monthlyRevenue: [
      95000, 98000, 99000, 100000, 102682, 101000, 103000, 104000, 105500,
      107000, 108500, 110000,
    ],
    cashIn: [
      2000, 2200, 3000, 3200, 3100, 3300, 2900, 3100, 3400, 4200, 4400, 4800,
    ],
    cashOut: [
      800, 900, 1000, 1200, 1000, 1100, 950, 970, 1200, 1300, 1400, 1500,
    ],
  },
  plans: [
    {
      id: 1,
      name: 'Equity Growth',
      rate: 12000,
      description: 'High return long-term equity plan.',
      type: 'Daily',
    },
    {
      id: 2,
      name: 'Bluechip Fund',
      rate: 8000,
      description: 'Stable growth with bluechip companies.',
      type: 'Daily',
    },
    {
      id: 3,
      name: 'Tech Innovators',
      rate: 15000,
      description: 'Focused on technology leaders.',
      type: 'Daily',
    },
    {
      id: 4,
      name: 'Green Energy',
      rate: 11000,
      description: 'Invest in sustainable companies.',
      type: 'Daily',
    },
    {
      id: 8,
      name: 'Index Tracker',
      rate: 9000,
      description: 'Follows the Nifty 50 index.',
      type: 'Weekly',
    },
    {
      id: 9,
      name: 'Corporate Bonds',
      rate: 6000,
      description: 'Safe investment in corporate bonds.',
      type: 'Weekly',
    },
    {
      id: 10,
      name: 'Corporate Bonds',
      rate: 6000,
      description: 'Safe investment in corporate bonds.',
      type: 'Monthly',
    },
    {
      id: 11,
      name: 'Real Estate Fund',
      rate: 13000,
      description: 'Invest in commercial real estate.',
      type: 'Monthly',
    },
    {
      id: 12,
      name: 'International Equity',
      rate: 14000,
      description: 'Global market exposure.',
      type: 'Yealy',
    },
    {
      id: 13,
      name: 'Balanced Fund',
      rate: 10000,
      description: 'Mix of equity and debt.',
      type: 'Yealy',
    },
  ],
};

export interface DashboardResponse {
  portfolio: {
    totalInvested: number;
    profitPercentage: number;
    profitAmount: number;
    totalAmount: number;
    balanceAmount: number;
    lastUpdated: string;
    accountNo: string;
  };
  charts: {
    monthlyRevenue: number[];
    cashIn: number[];
    cashOut: number[];
    months: string[];
  };
  plans: {
    id: number;
    name: string;
    rate: number;
    description: string;
    type: 'Daily' | 'Weekly' | 'Monthly' | 'Yealy';
  }[];
}
