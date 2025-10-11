import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('revenueChart', { static: false }) revenueChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('cashFlowChart', { static: false }) cashFlowChart!: ElementRef<HTMLCanvasElement>;

  metrics = {
    monthlyRevenue: 0,
    revenuePercentage: 0,
    cash: 0,
    revenue1: 0,
    revenue2: 0
  };

  revenueChartInstance: Chart | null = null;
  cashFlowChartInstance: Chart | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadMetrics();
    this.loadCharts();

    // Mock data for demo (replace with real API when backend is ready)
    this.metrics = {
      monthlyRevenue: 12345,
      revenuePercentage: 12,
      cash: 900,
      revenue1: 1800,
      revenue2: 15000
    };
  }

  ngAfterViewInit() {
    const mockRevenueData = [
      { month: 'Jan', value: 5000 },
      { month: 'Feb', value: 7000 },
      { month: 'Mar', value: 6000 },
      { month: 'Apr', value: 8000 },
      { month: 'May', value: 9000 },
      { month: 'Jun', value: 10000 },
      { month: 'Jul', value: 11000 },
      { month: 'Aug', value: 12000 }
    ];
    this.createRevenueChart(mockRevenueData);

    const mockCashFlowData = [
      { month: 'Jan', value1: 4000, value2: 1000 },
      { month: 'Feb', value1: 5000, value2: 1500 },
      { month: 'Mar', value1: 4500, value2: 1200 },
      { month: 'Apr', value1: 6000, value2: 1800 },
      { month: 'May', value1: 7000, value2: 2000 },
      { month: 'Jun', value1: 8000, value2: 2200 },
      { month: 'Jul', value1: 9000, value2: 2500 },
      { month: 'Aug', value1: 10000, value2: 2800 }
    ];
    this.createCashFlowChart(mockCashFlowData);
  }

  loadMetrics() {
    this.apiService.getMetrics().subscribe({
      next: (data) => {
        this.metrics = data;
      },
      error: (err) => {
        console.error('Error loading metrics', err);
      }
    });
  }

  loadCharts() {
    this.apiService.getMonthlyRevenue().subscribe({
      next: (data) => {
        this.createRevenueChart(data);
      },
      error: (err) => {
        console.error('Error loading revenue data', err);
      }
    });

    this.apiService.getCashFlow().subscribe({
      next: (data) => {
        this.createCashFlowChart(data);
      },
      error: (err) => {
        console.error('Error loading cash flow data', err);
      }
    });
  }

  createRevenueChart(data: any[]) {
    if (this.revenueChartInstance) {
      this.revenueChartInstance.destroy();
    }

    const ctx = this.revenueChart.nativeElement.getContext('2d');
    if (ctx) {
      this.revenueChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(item => item.month),
          datasets: [{
            label: 'Monthly Revenue',
            data: data.map(item => item.value),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  createCashFlowChart(data: any[]) {
    if (this.cashFlowChartInstance) {
      this.cashFlowChartInstance.destroy();
    }

    const ctx = this.cashFlowChart.nativeElement.getContext('2d');
    if (ctx) {
      this.cashFlowChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(item => item.month),
          datasets: [
            {
              label: 'Inflow',
              data: data.map(item => item.value1),
              backgroundColor: 'rgba(59, 130, 246, 0.8)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 1
            },
            {
              label: 'Outflow',
              data: data.map(item => item.value2),
              backgroundColor: 'rgba(147, 197, 253, 0.8)',
              borderColor: 'rgba(147, 197, 253, 1)',
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }
}
