import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user = {
    name: 'Maria Fernanda',
    role: 'Premium User',
    avatar: 'assets/avatar.png', // replace with your image
    details: {
      role: 'Beatmaker',
      experience: 'Intermediate',
      artists: 'Ninho, Travis Scott, Metro Boomin',
      genre: 'Trap',
      software: 'Ableton',
      mood: 'Melancholic',
      region: 'California, USA',
      availability: true,
      badges: ['Administrator'],
      tags: ['Drill', 'Melancholic', 'Rap-US']
    }
  };

  bankForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bankForm = this.fb.group({
      accountNumber: ['', [Validators.required, Validators.pattern(/^\d{10,18}$/)]],
      confirmAccountNumber: ['', Validators.required],
      ifscCode: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]],
      name: ['', Validators.required]
    }, { validators: this.accountNumberMatchValidator });
  }

  get bf() {
    return this.bankForm.controls;
  }

  accountNumberMatchValidator(group: FormGroup) {
    const accountNumber = group.get('accountNumber')?.value;
    const confirmAccountNumber = group.get('confirmAccountNumber')?.value;
    return accountNumber === confirmAccountNumber ? null : { mismatch: true };
  }

  onSubmitBankDetails() {
    if (this.bankForm.valid) {
      console.log('Bank details submitted:', this.bankForm.value);
      // Handle submission
    } else {
      this.bankForm.markAllAsTouched();
    }
  }
}
