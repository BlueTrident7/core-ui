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
import { ApiCallBack } from '../base/api/api-callback';
import { ApiCallHelper } from '../base/api/api-call-helper';
import { ApiConstant } from '../api-constant';
import { RegisterRequest } from '../dto/register-request';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ArtifactUtils } from '../../util/artifact-utils';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [ConfirmationService],
})
export class AuthComponent implements ApiCallBack {
  isLogin = true;
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  message: string = '';
  currentDate = new Date();
  showTermsModal = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loaderService: LoaderService,
    private messageService: MessageService
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
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loaderService.showLoader();
    const credentials = this.loginForm.value;

    this.authService.login(this, credentials);
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.loaderService.showLoader();
    const formValues = this.registerForm.value;

    let payload = new RegisterRequest();
    payload.confirmPassword = formValues.confirmPassword;
    payload.email = formValues.email;
    payload.fullName = formValues.fullName;
    payload.phoneNumber = formValues.phoneNumber;
    payload.password = formValues.password;
    payload.categoryId = formValues.category;
    payload.termsAccepted = formValues.termsAccepted;
    this.authService.register(this, payload);
  }

  onResult(result: any, type: any, other?: any): void {
    this.loaderService.hideLoader();

    switch (type) {
      case ApiConstant.AUTH_LOGIN:
        if (result.data.token) {
          this.authService.setToken(result.data.token);
          this.router.navigate(['/main/home_page']);
          ArtifactUtils.showSuccessViaToast(
            this.messageService,
            'Item Added Successfully'
          );
        } else {
          this.message = 'Login failed: invalid token.';
        }
        break;

      case ApiConstant.AUTH_REGISTER:
        this.message = 'Registration successful! Please login.';
        this.authService.setToken(result.data.token);
        this.toggleAuth();
        this.registerForm.reset();
        break;

      default:
        break;
    }
  }

  onError(err: any, type: any, other?: any): void {
    this.loaderService.hideLoader();
    if (type === ApiConstant.AUTH_LOGIN) {
    } else if (type === ApiConstant.AUTH_REGISTER) {
    }
  }
}
