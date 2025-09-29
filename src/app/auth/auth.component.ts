import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLogin = true;
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  showTermsModal = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      personType: ['', [Validators.required]],
      mobileNumber: ['+91', [Validators.required, Validators.pattern(/^\+91\d{10}$/)]],
      termsAccepted: [false, Validators.requiredTrue],
    }, { validators: this.passwordMatchValidator });

    // Prevent clearing +91 in mobile number input
    const mobileControl = this.registerForm.get('mobileNumber');
    if (mobileControl) {
      mobileControl.valueChanges.subscribe(value => {
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
    if (this.loginForm.valid) {
      console.log('✅ Login successful:', this.loginForm.value);
      this.router.navigate(['/main/investment']);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { confirmPassword, ...payload } = this.registerForm.value;
      this.authService.register(payload).subscribe({
        next: (res) => {
          console.log('✅ Register successful:', res);
          this.router.navigate(['/main/investment']);
        },
        error: (err) => {
          console.error('Registration failed:', err);
        }
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
