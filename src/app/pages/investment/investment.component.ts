import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

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
  imports: [CommonModule, TabViewModule, CardModule, ButtonModule, TooltipModule],
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.scss']
})
export class InvestmentComponent {
  activeIndex: number = 0;

  // Mock payload data for plans
  dailyPlans: Plan[] = [
    { name: 'Daily Starter', amount: 100, duration: 'Daily', returnRate: 0.5, description: 'Low risk daily investment plan' },
    { name: 'Daily Growth', amount: 500, duration: 'Daily', returnRate: 1.2, description: 'Moderate growth daily' },
    { name: 'Daily Premium', amount: 1000, duration: 'Daily', returnRate: 2.0, description: 'High return daily plan' },
    { name: 'Daily Elite', amount: 1500, duration: 'Daily', returnRate: 3.5, description: 'Elite daily returns' },
    { name: 'Daily Ultimate', amount: 2000, duration: 'Daily', returnRate: 5.0, description: 'Ultimate daily plan' },
    { name: 'Daily Pro', amount: 800, duration: 'Daily', returnRate: 2.8, description: 'Professional daily growth' },
    { name: 'Daily Advanced', amount: 1200, duration: 'Daily', returnRate: 4.0, description: 'Advanced daily investment' },
    { name: 'Daily Standard', amount: 600, duration: 'Daily', returnRate: 1.8, description: 'Standard daily plan' },
    { name: 'Daily Basic', amount: 200, duration: 'Daily', returnRate: 0.8, description: 'Basic daily investment' },
    { name: 'Daily Platinum', amount: 2500, duration: 'Daily', returnRate: 6.0, description: 'Platinum daily premium' }
  ];

  weeklyPlans: Plan[] = [
    { name: 'Weekly Basic', amount: 200, duration: 'Weekly', returnRate: 3.0, description: 'Basic weekly investment' },
    { name: 'Weekly Pro', amount: 800, duration: 'Weekly', returnRate: 5.5, description: 'Professional weekly growth' },
    { name: 'Weekly Elite', amount: 1500, duration: 'Weekly', returnRate: 8.0, description: 'Elite weekly returns' },
    { name: 'Weekly Standard', amount: 500, duration: 'Weekly', returnRate: 4.2, description: 'Standard weekly plan' },
    { name: 'Weekly Advanced', amount: 1200, duration: 'Weekly', returnRate: 7.0, description: 'Advanced weekly investment' },
    { name: 'Weekly Premium', amount: 1800, duration: 'Weekly', returnRate: 9.5, description: 'Premium weekly returns' },
    { name: 'Weekly Starter', amount: 300, duration: 'Weekly', returnRate: 3.5, description: 'Starter weekly plan' },
    { name: 'Weekly Growth', amount: 1000, duration: 'Weekly', returnRate: 6.2, description: 'Growth weekly investment' },
    { name: 'Weekly Ultimate', amount: 2200, duration: 'Weekly', returnRate: 11.0, description: 'Ultimate weekly returns' },
    { name: 'Weekly Diamond', amount: 3000, duration: 'Weekly', returnRate: 13.0, description: 'Diamond weekly premium' }
  ];

  monthlyPlans: Plan[] = [
    { name: 'Monthly Standard', amount: 500, duration: 'Monthly', returnRate: 6.0, description: 'Standard monthly plan' },
    { name: 'Monthly Advanced', amount: 1200, duration: 'Monthly', returnRate: 10.0, description: 'Advanced monthly investment' },
    { name: 'Monthly Ultimate', amount: 2500, duration: 'Monthly', returnRate: 15.0, description: 'Ultimate monthly returns' },
    { name: 'Monthly Basic', amount: 300, duration: 'Monthly', returnRate: 4.5, description: 'Basic monthly investment' },
    { name: 'Monthly Pro', amount: 1800, duration: 'Monthly', returnRate: 12.5, description: 'Professional monthly growth' },
    { name: 'Monthly Elite', amount: 3000, duration: 'Monthly', returnRate: 18.0, description: 'Elite monthly returns' },
    { name: 'Monthly Starter', amount: 400, duration: 'Monthly', returnRate: 5.0, description: 'Starter monthly plan' },
    { name: 'Monthly Growth', amount: 1500, duration: 'Monthly', returnRate: 11.0, description: 'Growth monthly investment' },
    { name: 'Monthly Premium', amount: 2200, duration: 'Monthly', returnRate: 14.0, description: 'Premium monthly returns' },
    { name: 'Monthly Platinum', amount: 3500, duration: 'Monthly', returnRate: 20.0, description: 'Platinum monthly premium' }
  ];

  yearlyPlans: Plan[] = [
    { name: 'Yearly Bronze', amount: 1000, duration: 'Yearly', returnRate: 12.0, description: 'Bronze yearly plan' },
    { name: 'Yearly Silver', amount: 3000, duration: 'Yearly', returnRate: 18.0, description: 'Silver yearly investment' },
    { name: 'Yearly Gold', amount: 5000, duration: 'Yearly', returnRate: 25.0, description: 'Gold yearly high returns' },
    { name: 'Yearly Platinum', amount: 7000, duration: 'Yearly', returnRate: 30.0, description: 'Platinum yearly premium' },
    { name: 'Yearly Diamond', amount: 10000, duration: 'Yearly', returnRate: 35.0, description: 'Diamond yearly ultimate' },
    { name: 'Yearly Basic', amount: 1500, duration: 'Yearly', returnRate: 15.0, description: 'Basic yearly investment' },
    { name: 'Yearly Starter', amount: 2000, duration: 'Yearly', returnRate: 16.0, description: 'Starter yearly plan' },
    { name: 'Yearly Advanced', amount: 4000, duration: 'Yearly', returnRate: 22.0, description: 'Advanced yearly investment' },
    { name: 'Yearly Elite', amount: 6000, duration: 'Yearly', returnRate: 28.0, description: 'Elite yearly returns' },
    { name: 'Yearly Ultimate', amount: 8000, duration: 'Yearly', returnRate: 32.0, description: 'Ultimate yearly premium' }
  ];

  onTabChange(event: any) {
    this.activeIndex = event.index;
  }
}
