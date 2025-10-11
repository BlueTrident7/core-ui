import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';

interface Plan {
  name: string;
  amount: number;
  duration: string;
  returnRate: number;
  description: string;
}

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [CommonModule, TabViewModule, CardModule],
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.scss']
})
export class InvestmentComponent {
  activeIndex: number = 0;

  // Mock payload data for plans
  dailyPlans: Plan[] = [
    { name: 'Daily Starter', amount: 100, duration: 'Daily', returnRate: 0.5, description: 'Low risk daily investment plan' },
    { name: 'Daily Growth', amount: 500, duration: 'Daily', returnRate: 1.2, description: 'Moderate growth daily' },
    { name: 'Daily Premium', amount: 1000, duration: 'Daily', returnRate: 2.0, description: 'High return daily plan' }
  ];

  weeklyPlans: Plan[] = [
    { name: 'Weekly Basic', amount: 200, duration: 'Weekly', returnRate: 3.0, description: 'Basic weekly investment' },
    { name: 'Weekly Pro', amount: 800, duration: 'Weekly', returnRate: 5.5, description: 'Professional weekly growth' },
    { name: 'Weekly Elite', amount: 1500, duration: 'Weekly', returnRate: 8.0, description: 'Elite weekly returns' }
  ];

  monthlyPlans: Plan[] = [
    { name: 'Monthly Standard', amount: 500, duration: 'Monthly', returnRate: 6.0, description: 'Standard monthly plan' },
    { name: 'Monthly Advanced', amount: 1200, duration: 'Monthly', returnRate: 10.0, description: 'Advanced monthly investment' },
    { name: 'Monthly Ultimate', amount: 2500, duration: 'Monthly', returnRate: 15.0, description: 'Ultimate monthly returns' }
  ];

  yearlyPlans: Plan[] = [
    { name: 'Yearly Bronze', amount: 1000, duration: 'Yearly', returnRate: 12.0, description: 'Bronze yearly plan' },
    { name: 'Yearly Silver', amount: 3000, duration: 'Yearly', returnRate: 18.0, description: 'Silver yearly investment' },
    { name: 'Yearly Gold', amount: 5000, duration: 'Yearly', returnRate: 25.0, description: 'Gold yearly high returns' }
  ];

  onTabChange(event: any) {
    this.activeIndex = event.index;
  }
}
