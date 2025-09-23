import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';

interface InvestmentPlan {
  name: string;
  description: string;
  min: number;
  max: number;
}

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    DialogModule,
    InputNumberModule,
    DropdownModule,
    MessageModule,
  ],
})
export class InvestmentComponent {
  plans: InvestmentPlan[] = [
    {
      name: 'Starter Plan',
      description: 'Low-risk entry for beginners.',
      min: 1000,
      max: 10000,
    },
    {
      name: 'Growth Plan',
      description: 'Balanced growth with steady returns.',
      min: 5000,
      max: 50000,
    },
    {
      name: 'Premium Plan',
      description: 'High-yield for experienced investors.',
      min: 25000,
      max: 100000,
    },
  ];

  selectedPlan: InvestmentPlan | null = null;
  openDialog = false;
  investForm: FormGroup;

  paymentOptions = [
    { label: 'Razorpay', value: 'Razorpay' },
    { label: 'UPI', value: 'UPI' },
    { label: 'Card', value: 'Card' },
  ];

  constructor(private fb: FormBuilder) {
    this.investForm = this.fb.group({});
  }

  get isValidInvestment(): boolean {
    return this.investForm.valid;
  }

  get amountErrors(): any {
    return this.investForm.get('amount')?.errors;
  }

  get paymentModeErrors(): any {
    return this.investForm.get('paymentMode')?.errors;
  }

  confirmInvestment(): void {
    if (this.isValidInvestment && this.selectedPlan) {
      const formValue = this.investForm.value;
      console.log('Investment Confirmed:', {
        plan: this.selectedPlan.name,
        amount: formValue.amount,
        paymentMode: formValue.paymentMode,
      });
      alert(`Investing ₹${formValue.amount} via ${formValue.paymentMode}!`);
      this.closeDialog();
    }
  }

  openInvest(plan: InvestmentPlan): void {
    this.selectedPlan = plan; // Store selected plan
    this.openDialog = true; // Open dialog

    this.investForm = this.fb.group({
      amount: [
        plan.min,
        [
          Validators.required,
          Validators.min(plan.min),
          Validators.max(plan.max),
        ],
      ],
      paymentMode: ['', Validators.required],
    });
  }

  closeDialog(): void {
    this.openDialog = false;
    this.selectedPlan = null;
    this.investForm.reset();
  }
}
