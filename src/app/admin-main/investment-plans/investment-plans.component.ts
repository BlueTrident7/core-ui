import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-investment-plans',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    TableModule,
    InputTextModule,
    AutoCompleteModule,
    CheckboxModule,
    CardModule,
    DropdownModule
  ],
  templateUrl: './investment-plans.component.html',
  styleUrl: './investment-plans.component.css',
})
export class InvestmentPlansComponent implements OnInit {
  investmentPlans: any[] = [];
  showInvestmentDialog = false;
  investmentForm!: FormGroup;
  planPolicyOptions = [
    { label: 'Standard', value: 'standard' },
    { label: 'Premium', value: 'premium' },
    { label: 'VIP', value: 'vip' }
  ];
  planTypes:any []=[];
  filteredPlanPolicies: any[] = [];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.investmentPlans = [
      { planName: 'Growth Plus', amount: 50000, lockPeriod: 12 },
      { planName: 'Secure Future', amount: 75000, lockPeriod: 24 },
      { planName: 'Wealth Builder', amount: 100000, lockPeriod: 36 },
    ];

 this. planTypes = [
    { name: 'Day', identifierCode: 'DAILY' },
    { name: 'Week', identifierCode: 'WEEKLY' },
     { name: 'Month', identifierCode: 'MONTHLY' },
    { name: 'Year', identifierCode: 'YEARLY' },
  ]
    this.initializeForm();
  }

  initializeForm(): void {
    this.investmentForm = this.fb.group({
      planName: ['', Validators.required],
      policy: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      lockPeriod: [null, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      planType: ['', Validators.required],
      acceptedTerms: [false, Validators.requiredTrue],
    });
  }

  openAddInvestmentPlanDialog(): void {
    this.investmentForm.reset();
    this.showInvestmentDialog = true;
  }

  closeDialog(): void {
    this.showInvestmentDialog = false;
  }

  saveInvestmentPlan(): void {
    if (this.investmentForm.valid) {
      this.investmentPlans.push(this.investmentForm.value);
      this.closeDialog();
    }
  }

  clearForm(): void {
    this.investmentForm.reset();
  }

  editInvestmentPlan(plan: any): void {
    this.investmentForm.patchValue(plan);
    this.showInvestmentDialog = true;
  }

  deleteInvestmentPlan(plan: any): void {
    this.investmentPlans = this.investmentPlans.filter((p) => p !== plan);
  }

  filterPlanPolicies(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredPlanPolicies = this.planPolicyOptions.filter(option =>
      option.label.toLowerCase().includes(query)
    );
  }
}
