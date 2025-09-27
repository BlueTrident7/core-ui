import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css'],
})
export class InvestmentComponent {
  tabs = ['Daywise', 'Weekwise', 'Monthly','Yearly'];
  activeTab = 'Daywise';

  plans = [
    { name: 'Plan A', rate: 500, type: 'Daywise', description: 'Daily growth plan A' },
    { name: 'Plan B', rate: 700, type: 'Daywise', description: 'Daily growth plan B' },
    { name: 'Plan C', rate: 1000, type: 'Daywise', description: 'Daily secure plan C' },
    { name: 'Plan D', rate: 1200, type: 'Daywise', description: 'Daily premium plan D' },
    { name: 'Plan E', rate: 1500, type: 'Daywise', description: 'Daily special plan E' },
    { name: 'Plan E', rate: 1500, type: 'Daywise', description: 'Daily special plan E' },
    { name: 'Plan E', rate: 1500, type: 'Daywise', description: 'Daily special plan E' },
    { name: 'Plan E', rate: 1500, type: 'Daywise', description: 'Daily special plan E' },

    { name: 'Plan W1', rate: 3000, type: 'Weekwise', description: 'Weekly secure plan' },
    { name: 'Plan W2', rate: 4500, type: 'Weekwise', description: 'Weekly premium plan' },

    { name: 'Plan M1', rate: 10000, type: 'Monthly', description: 'Monthly growth plan' },
    { name: 'Plan M2', rate: 15000, type: 'Monthly', description: 'Monthly secure plan' },

    { name: 'Plan K1', rate: 20000, type: 'Yearly', description: 'Yearly growth plan' },
    { name: 'Plan K1', rate: 23000, type: 'Yearly', description: 'Yearly premium plan' },
  ];

  selectedPlan: any = null;
  openPanel: any = null;

  getPlansByType(type: string) {
    return this.plans.filter((p) => p.type === type);
  }

  openConfirmDialog(plan: any) {
    this.selectedPlan = plan;
  }

  confirmInvestment() {
    alert(`Invested ₹${this.selectedPlan.rate} in ${this.selectedPlan.name}`);
    this.selectedPlan = null;
  }

  cancelInvestment() {
    this.selectedPlan = null;
  }

  togglePanel(plan: any) {
    this.openPanel = this.openPanel === plan ? null : plan;
  }
}
