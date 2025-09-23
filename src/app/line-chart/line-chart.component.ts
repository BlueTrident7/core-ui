// src/app/line-chart/line-chart.component.ts
import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  Legend,
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  Legend
);

@Component({
  selector: 'app-line-chart',
  template: `<canvas #chartCanvas></canvas>`,
  styles: [
    `
      canvas {
        max-width: 100%;
        height: 300px;
      }
    `,
  ],
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  ngAfterViewInit(): void {
    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Income',
            data: [1200, 1500, 1800, 2000, 2500, 3000],
            borderColor: '#4caf50',
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Expenditure',
            data: [1000, 1100, 1400, 1600, 2000, 2200],
            borderColor: '#f44336',
            backgroundColor: 'rgba(244, 67, 54, 0.2)',
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: true,
          },
          legend: {
            display: true,
            position: 'bottom',
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
