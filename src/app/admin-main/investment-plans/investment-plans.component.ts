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
import { ApiConstant } from '../../api-constant';
import {
  InvestmentGETDTO,
  InvestmentPlansDTO,
} from '../../dto/investment-plans-dto';
import { CoreService } from '../../base/api/core.service';
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
    DropdownModule,
  ],
  templateUrl: './investment-plans.component.html',
  styleUrl: './investment-plans.component.css',
})
export class InvestmentPlansComponent implements OnInit {
  investmentPlans: InvestmentGETDTO[] = [];
  showInvestmentDialog = false;
  investmentForm!: FormGroup;
  buttonLabel: string = 'Save';
  selectedPlan: any;
  constructor(private fb: FormBuilder, public coreService: CoreService) {}

  ngOnInit(): void {
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

  deleteInvestmentPlan(plan: any): void {
    this.investmentPlans = this.investmentPlans.filter((p) => p !== plan);
  }

  getAllInvestmentPlans() {
    this.coreService.getAllInvestmentPlans(this);
  }

  editInvestmentPlan(plan: any): void {
    this.buttonLabel = 'Update';
    this.selectedPlan = plan;
    this.investmentForm.patchValue(plan);
    this.showInvestmentDialog = true;
  }

  deleteCategory(category: any): void {
    this.coreService.deleteCategory(this, category.id);
  }

  setCategoryData() {
    let investment = new InvestmentPlansDTO();
    investment.name = this.investmentForm.value.planName;
    investment.description = this.investmentForm.value.description;
    if (this.buttonLabel === 'Update') {
      this.coreService.updateCategory(this, this.selectedPlan.id, investment);
    } else {
      this.coreService.saveInvestmentPlan(this, investment);
    }
  }

  onResult(result: any, type: any, other?: any): void {
    switch (type) {
      case ApiConstant.SAVE_INVESTMENT_PLAN:
        this.showInvestmentDialog = false;
        this.buttonLabel = 'Save';
        this.getAllInvestmentPlans();
        break;
      case ApiConstant.GET_INVESTMENT_PLANS:
        this.investmentPlans = [];
        this.investmentPlans = result.data;

        break;
      case ApiConstant.DELETE_INVESTMENT_PLAN:
        this.getAllInvestmentPlans();
        break;
      case ApiConstant.UPDATE_INVESTMENT_PLAN:
        this.showInvestmentDialog = false;
        this.getAllInvestmentPlans();
        this.buttonLabel = 'Save';
        break;
      default:
        break;
    }
  }
  onError(err: any, type: any, other?: any): void {}
  filterPlanPolicies(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredPlanPolicies = this.planPolicyOptions.filter((option) =>
      option.label.toLowerCase().includes(query)
    );
  }
}
