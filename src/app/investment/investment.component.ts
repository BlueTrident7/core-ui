import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.css',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    DialogModule,
    DropdownModule,
    ButtonModule,
  ],
})
export class InvestmentComponent {
  plans: InvestmentPlan[] = [
    {
      name: 'Plan A',
      description: 'High Growth Fund',
      min: 10000,
      max: 100000,
    },
    { name: 'Plan B', description: 'Balanced Fund', min: 5000, max: 50000 },
    { name: 'Plan C', description: 'Income Fund', min: 2500, max: 25000 },
  ];

  selectedPlan?: InvestmentPlan;
  investAmount: number = 0;
  paymentMode: string = '';

  openDialog: boolean = false;

  openInvest(plan: InvestmentPlan) {
    this.selectedPlan = plan;
    this.investAmount = plan.min;
    this.openDialog = true; // open dialog
  }

  confirmInvestment() {
    console.log(
      'Invested in:',
      this.selectedPlan,
      'Amount:',
      this.investAmount,
      'Mode:',
      this.paymentMode
    );
    this.selectedPlan = undefined;
    this.openDialog = false; // close dialog
  }
}

export interface InvestmentPlan {
  name: string;
  description: string;
  min: number;
  max: number;
}
