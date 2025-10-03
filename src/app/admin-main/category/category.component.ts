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
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { environment } from '../../../environments/environment.local';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryPostDto } from '../../dto/category-post-dto';

@Component({
  selector: 'app-category',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    TableModule,
    InputTextModule,
    CheckboxModule,
    CardModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  categoriesList: any[] = [];
  showCategoryDialog = false;
  categoryForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.categoriesList = [
      { planName: 'General', amount: 50000, identifier: 'GEN' },
      { planName: 'Women', amount: 75000, identifier: 'WOM' },
      { planName: 'Farmers', amount: 100000, identifier: 'FARM' },
    ];
    this.initializeForm();
  }

  initializeForm(): void {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      description: [null],
    });
  }

  openAddCategoryPlanDialog(): void {
    this.categoryForm.reset();
    this.showCategoryDialog = true;
  }

  closeDialog(): void {
    this.showCategoryDialog = false;
  }

  saveInvestmentPlan(): void {
    if (this.categoryForm.valid) {
      this.categoriesList.push(this.categoryForm.value);
      this.closeDialog();
    }
  }

  clearForm(): void {
    this.categoryForm.reset();
  }

  editInvestmentPlan(plan: any): void {
    this.categoryForm.patchValue(plan);
    this.showCategoryDialog = true;
  }

  deleteInvestmentPlan(plan: any): void {
    this.categoriesList = this.categoriesList.filter((p) => p !== plan);
  }

  setCategoryData() {
    let catagoryData = new CategoryPostDto();
    catagoryData.categoryName = this.categoryForm.value.categoryName;
    catagoryData.description = this.categoryForm.value.description;
    this.save(catagoryData);
  }

  save(catagoryData: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/master/category`,
      catagoryData
    );
  }
}
