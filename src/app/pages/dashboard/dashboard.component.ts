import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      { label: 'Crypto Wallet', data: [1000, 1200, 1500, 1800, 2000, 2200, 2500, 2800, 3000, 3200, 3500, 3800], stack: 'a', backgroundColor: 'rgba(54, 162, 235, 0.8)' },
      { label: 'Personal Wallet', data: [800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400, 2600, 2800, 3000], stack: 'a', backgroundColor: 'rgba(255, 159, 64, 0.8)' },
      { label: 'Corporate Wallet', data: [500, 700, 900, 1100, 1300, 1500, 1700, 1900, 2100, 2300, 2500, 2700], stack: 'a', backgroundColor: 'rgba(75, 192, 192, 0.8)' }
    ]
  };

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: 'top' } },
    scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true } }
  };
}
