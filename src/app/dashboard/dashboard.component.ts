import { Component } from '@angular/core';
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
export class DashboardComponent {
  // Line Chart Data
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
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
    datasets: [
      {
        data: [
          95000, 98000, 99000, 100000, 102682, 101000, 103000, 104000, 105500,
          107000, 108500, 110000,
        ],
        label: 'Primary',
        fill: true,
        borderColor: '#3755a4',
        backgroundColor: 'rgba(79, 110, 164, 0.2)',
        pointBackgroundColor: '#3755a4',
        pointBorderColor: '#fff',
        tension: 0.4,
      },
    ],
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        ticks: { callback: (value: number | string) => `$${value}` },
      },
    },
  };

  // Bar Chart Data
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
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
    datasets: [
      {
        data: [
          2000, 2200, 3000, 3200, 3100, 3300, 2900, 3100, 3400, 4200, 4400,
          4800,
        ],
        label: 'Cash In',
        backgroundColor: '#3755a4',
      },
      {
        data: [
          800, 900, 1000, 1200, 1000, 1100, 950, 970, 1200, 1300, 1400, 1500,
        ],
        label: 'Cash Out',
        backgroundColor: 'rgba(79, 110, 164, 0.4)',
      },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (value: number | string) => `$${value}` },
      },
    },
  };
}
