import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  currentStep = 1; // 1: mobile, 2: otp, 3: new password
  mobileForm: FormGroup;
  otpForm: FormGroup;
  resetForm: FormGroup;
  message = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loaderService: LoaderService,
    private router: Router
  ) {
    this.mobileForm = this.fb.group({
      mobileNumber: ['+91', [Validators.required, Validators.pattern(/^\+91\d{10}$/)]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });

    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });

    // Prevent clearing +91 in mobile number input
    const mobileControl = this.mobileForm.get('mobileNumber');
    if (mobileControl) {
      mobileControl.valueChanges.subscribe((value) => {
        if (!value || !value.startsWith('+91')) {
          mobileControl.setValue('+91', { emitEvent: false });
        }
      });
    }
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSendOTP() {
    if (this.mobileForm.valid) {
      this.isLoading = true;
      const mobileNumber = this.mobileForm.value.mobileNumber;

      // TODO: Call API to send OTP
      console.log('Sending OTP to:', mobileNumber);

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.message = 'OTP sent successfully to your mobile number';
        this.currentStep = 2;
      }, 2000);
    }
  }

  onVerifyOTP() {
    if (this.otpForm.valid) {
      this.isLoading = true;
      const otp = this.otpForm.value.otp;

      // TODO: Call API to verify OTP
      console.log('Verifying OTP:', otp);

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        if (otp === '123456') { // Mock OTP for testing
          this.message = 'OTP verified successfully';
          this.currentStep = 3;
        } else {
          this.message = 'Invalid OTP. Please try again.';
        }
      }, 2000);
    }
  }

  onResetPassword() {
    if (this.resetForm.valid) {
      this.isLoading = true;
      const { newPassword } = this.resetForm.value;
      const mobileNumber = this.mobileForm.value.mobileNumber;

      // TODO: Call API to reset password
      console.log('Resetting password for:', mobileNumber, 'New password:', newPassword);

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        this.message = 'Password reset successfully! You can now log in with your new password.';
        setTimeout(() => {
          this.router.navigate(['/auth']);
        }, 2000);
      }, 2000);
    } else {
      this.resetForm.markAllAsTouched();
    }
  }

  goBack() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.message = '';
    }
  }

  get mf() {
    return this.mobileForm.controls;
  }

  get of() {
    return this.otpForm.controls;
  }

  get rf() {
    return this.resetForm.controls;
  }
}
