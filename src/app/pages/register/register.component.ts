import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ApiCallBack } from '../../base/api/api-callback';
import { CoreService } from '../../base/api/core.service';
import { ApiConstant } from '../../api-constant';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements ApiCallBack<any> {
  registerForm: FormGroup;
  showTerms = false;

  constructor(private fb: FormBuilder, private router: Router, private coreService: CoreService) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      personType: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue],
    });
  }

  get passwordMismatch() {
    const { password, confirmPassword } = this.registerForm.value;
    return password && confirmPassword && password !== confirmPassword;
  }

  onSubmit() {
    if (this.registerForm.valid && !this.passwordMismatch) {
      // Call register API
      this.coreService.register(this, this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
      let errorMessage = 'Please fill in all required fields correctly.';
      if (this.passwordMismatch) {
        errorMessage = 'Passwords do not match.';
      }
      alert(errorMessage);
    }
  }

  onResult(result: any, type: any, other?: any): void {
    if (type === ApiConstant.REGISTER) {
      // On successful registration, redirect to home page
      alert('Registration successful! Redirecting to home page.');
      this.router.navigate(['/main/home']);
    }
  }

  onError(err: any, type: any, other?: any): void {
    // On registration failure, stay on register page
    alert(err?.error?.message || 'Registration failed. Please try again.');
    console.error('Registration failed:', err);
  }



  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
