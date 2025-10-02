import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @Input() selectedPlan: any;
  selectedMethod: string = '';
  upiForm!: FormGroup;
  amount: number = 1000; // Example amount, can be dynamic

  constructor(private fb: FormBuilder) {
    this.upiForm = this.fb.group({
      upiId: ['', [Validators.required, Validators.pattern(/^[\w\.-]+@[\w\.-]+$/)]]
    });
  }

  ngOnInit() {
    if (this.selectedPlan && this.selectedPlan.amount) {
      this.amount = this.selectedPlan.amount;
    }
  }

  setAmount(amount: number) {
    this.amount = amount;
  }

  selectPaymentMethod(method: string) {
    this.selectedMethod = method;
    if (method === 'gpay') {
      this.processGPayPayment();
    } else if (method === 'phonepay') {
      this.processPhonePayPayment();
    }
    // For UPI, show the form
  }

  processGPayPayment() {
    // Implement GPay integration
    console.log('Processing GPay payment');
    alert('Redirecting to Google Pay...');
  }

  processPhonePayPayment() {
    // Implement PhonePay integration
    console.log('Processing PhonePay payment');
    alert('Redirecting to PhonePe...');
  }

  processUPIPayment() {
    if (this.upiForm.valid) {
      console.log('Processing UPI payment:', this.upiForm.value);
      alert('Payment initiated via UPI ID: ' + this.upiForm.value.upiId);
    }
  }
}
