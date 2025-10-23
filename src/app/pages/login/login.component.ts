import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallBack } from '../../base/api/api-callback';
import { CoreService } from '../../base/api/core.service';
import { ApiConstant } from '../../api-constant';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements ApiCallBack<any> {
  showPassword = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private coreService: CoreService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit() {
    // if (this.loginForm.valid) {
    //   this.coreService.login(this, this.loginForm.value);
    // } else {
    //   this.loginForm.markAllAsTouched();
    //   alert('Please fill in all required fields correctly.');
    // }
    if (this.loginForm.get('email')?.value && this.loginForm.get('password')?.value) {
      this.coreService.login(this, this.loginForm.value);
    } else {
      alert('Please enter email and password.');
    }
  }

  onResult(result: any, type: any, other?: any): void {
    if (type === ApiConstant.LOGIN) {
      this.coreService.userDetails = result.user;
      alert('Login successful!');
      this.router.navigate(['/main/portfolio']);
    }
  }

  onError(err: any, type: any, other?: any): void {
    alert(err?.error?.message || 'Login failed. Please try again.');
    console.error('Login failed:', err);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
