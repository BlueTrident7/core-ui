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
import { CoreService } from '../../base/api/core.service';
import { ApiCallBack } from '../../base/api/api-callback';
import { ApiConstant } from '../../api-constant';

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
export class CategoryComponent implements OnInit, ApiCallBack {
  categoriesList: any[] = [];
  showCategoryDialog = false;
  categoryForm!: FormGroup;

  constructor(private fb: FormBuilder, public coreService: CoreService) {}

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

  clearForm(): void {
    this.categoryForm.reset();
  }

  editCategory(category: any): void {
    this.categoryForm.patchValue(category);
    this.showCategoryDialog = true;
  }

  deleteCategory(category: any): void {
    this.categoriesList = this.categoriesList.filter((p) => p !== category);
  }

  setCategoryData() {
    let catagoryData = new CategoryPostDto();
    catagoryData.categoryName = this.categoryForm.value.categoryName;
    catagoryData.description = this.categoryForm.value.description;
    this.coreService.saveCategory(this, catagoryData);
  }
  onResult(result: any, type: any, other?: any): void {
    switch (type) {
      case ApiConstant.SAVE_CATEGORY:
        break;
      default:
        break;
    }
  }
  onError(err: any, type: any, other?: any): void {}
}
