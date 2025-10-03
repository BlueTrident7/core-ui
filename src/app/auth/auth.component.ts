import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLogin = true;
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  showTermsModal = false;
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group(
      {
        fullName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        personType: ['', [Validators.required]],
        mobileNumber: [
          '+91',
          [Validators.required, Validators.pattern(/^\+91\d{10}$/)],
        ],
        termsAccepted: [false, Validators.requiredTrue],
      },
      { validators: this.passwordMatchValidator }
    );

    // Prevent clearing +91 in mobile number input
    const mobileControl = this.registerForm.get('mobileNumber');
    if (mobileControl) {
      mobileControl.valueChanges.subscribe((value) => {
        if (!value || !value.startsWith('+91')) {
          mobileControl.setValue('+91', { emitEvent: false });
        }
      });
    }
  }

  get lf() {
    return this.loginForm.controls;
  }

  get rf() {
    return this.registerForm.controls;
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  toggleAuth() {
    this.isLogin = !this.isLogin;
  }

  onLogin() {
    this.router.navigate(['/main/home_page']);

    if (this.loginForm.invalid) return;

    this.loaderService.showLoader();
    const credentials = this.loginForm.value; // ✅ Get form values

    this.authService.login(credentials).subscribe({
      next: (res: any) => {
        if (res.token) {
          this.authService.setToken(res.token);
          this.loaderService.hideLoader();
          this.router.navigate(['/main/home_page']);
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        this.message = 'Login failed! Please check your credentials.';
        this.loaderService.hideLoader();
      },
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      this.loaderService.showLoader();
      const { confirmPassword, ...payload } = this.registerForm.value;
      this.authService.register(payload).subscribe({
        next: (res) => {
          console.log('✅ Register successful:', res);
          this.loaderService.hideLoader();
          this.router.navigate(['/auth']);
        },
        error: (err) => {
          console.error('Registration failed:', err);
          this.loaderService.hideLoader();
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  onSocialLogin(provider: string) {
    console.log(`Login with ${provider}`);
    // Implement social login logic here
  }
}
