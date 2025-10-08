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
import { CategoryGetDTO, CategoryPostDto } from '../../dto/category-post-dto';
import { CoreService } from '../../base/api/core.service';
import { ApiCallBack } from '../../base/api/api-callback';
import { ApiConstant } from '../../api-constant';

@Component({
  selector: 'app-category',
  standalone: true,
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
  categoriesList: CategoryGetDTO[] = [];
  showCategoryDialog = false;
  categoryForm!: FormGroup;
  selectedCategory: any;
  buttonLabel: string = 'Save';
  constructor(private fb: FormBuilder, public coreService: CoreService) {}

  ngOnInit(): void {
    this.getAllCategories();

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
    this.buttonLabel = 'Update';
    this.selectedCategory = category;
    this.categoryForm.patchValue(category);
    this.showCategoryDialog = true;
  }

  deleteCategory(category: any): void {
    this.coreService.deleteCategory(this, category.id);
  }

  setCategoryData() {
    let catagoryData = new CategoryPostDto();
    catagoryData.categoryName = this.categoryForm.value.categoryName;
    catagoryData.description = this.categoryForm.value.description;
    if (this.buttonLabel === 'Update') {
      this.coreService.updateCategory(
        this,
        this.selectedCategory.id,
        catagoryData
      );
    } else {
      this.coreService.saveCategory(this, catagoryData);
    }
  }

  getAllCategories() {
    this.coreService.getAllCategories(this);
  }
  onResult(result: any, type: any, other?: any): void {
    switch (type) {
      case ApiConstant.SAVE_CATEGORY:
        this.showCategoryDialog = false;
        this.buttonLabel = 'Save';
        this.getAllCategories();
        break;
      case ApiConstant.GET_CATEGORIES:
        this.categoriesList = [];
        this.categoriesList = result.data;

        break;
      case ApiConstant.DELETE_CATEGORY:
        this.getAllCategories();
        break;
      case ApiConstant.UPDATE_CATEGORY:
        this.showCategoryDialog = false;
        this.getAllCategories();
        this.buttonLabel = 'Save';
        break;
      default:
        break;
    }
  }
  onError(err: any, type: any, other?: any): void {}
}
