import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; // 👈 import this
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

type PlanType = 'Daily' | 'Weekly' | 'Monthly' | 'Yealy' ;

interface InvestmentPlan {
  id: number;
  name: string;
  rate: number;
  description: string;
  type: PlanType;
}

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css'],
})
export class InvestmentComponent {
  tabs: PlanType[] = ['Daily', 'Weekly', 'Monthly', 'Yealy'];
  activeTab: PlanType = this.tabs[0];

  plans: InvestmentPlan[] = [
    { id: 1, name: 'Equity Growth', rate: 12000, description: 'High return long-term equity plan.', type: 'Daily' },
    { id: 2, name: 'Bluechip Fund', rate: 8000, description: 'Stable growth with bluechip companies.', type: 'Daily' },
    { id: 3, name: 'Tech Innovators', rate: 15000, description: 'Focused on technology leaders.', type: 'Daily' },
    { id: 4, name: 'Green Energy', rate: 11000, description: 'Invest in sustainable companies.', type: 'Daily' },
    { id: 5, name: 'Dividend Kings', rate: 7000, description: 'Steady dividend paying companies.', type: 'Daily' },
    { id: 6, name: 'Dividend Kings', rate: 7000, description: 'Steady dividend paying companies.', type: 'Daily' },
    { id: 7, name: 'Dividend Kings', rate: 7000, description: 'Steady dividend paying companies.', type: 'Daily' },
    { id: 8, name: 'Index Tracker', rate: 9000, description: 'Follows the Nifty 50 index.', type: 'Weekly' },
    { id: 9, name: 'Corporate Bonds', rate: 6000, description: 'Safe investment in corporate bonds.', type: 'Weekly' },
    { id: 10, name: 'Corporate Bonds', rate: 6000, description: 'Safe investment in corporate bonds.', type: 'Monthly' },
    { id: 11, name: 'Real Estate Fund', rate: 13000, description: 'Invest in commercial real estate.', type: 'Monthly' },
    { id: 12, name: 'International Equity', rate: 14000, description: 'Global market exposure.', type: 'Yealy' },
    { id: 13, name: 'Balanced Fund', rate: 10000, description: 'Mix of equity and debt.', type: 'Yealy' },
  ];

  openPanel: InvestmentPlan | null = null;
  selectedPlan: InvestmentPlan | null = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  getPlansByType(type: PlanType): InvestmentPlan[] {
    return this.plans.filter(plan => plan.type === type);
  }

  togglePanel(plan: InvestmentPlan) {
    this.openPanel = this.openPanel === plan ? null : plan;
  }

  openConfirmDialog(plan: InvestmentPlan) {
    this.selectedPlan = plan;
  }

  confirmInvestment() {
    if (this.selectedPlan) {
      this.router.navigate(['main', 'investment', 'payment'], { state: { plan: this.selectedPlan } });
    }
    this.selectedPlan = null;
  }

  cancelInvestment() {
    this.selectedPlan = null;
  }

  onInvestClick(plan: InvestmentPlan) {
    const confirmed = confirm('Do you want to proceed to payment for ' + plan.name + '?');
    if (confirmed) {
      this.selectedPlan = plan;
      this.router.navigate(['main', 'investment', 'payment'], { state: { plan: this.selectedPlan } });
    }
  }
}
