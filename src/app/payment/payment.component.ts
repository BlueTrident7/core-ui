import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiCallBack } from '../base/api/api-callback';
import { CreateOrderRequest } from '../dto/CreateOrderRequest';
import { ApiConstant } from '../api-constant';
import { PaymentVerificationRequest } from '../dto/PaymentVerificationRequest';
import { CoreService } from '../base/api/core.service';
declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit, ApiCallBack {
  @Input() selectedPlan: any;
  selectedMethod: string = '';
  upiForm!: FormGroup;
  amount: number = 1000;
  loading: boolean = false;

  constructor(private fb: FormBuilder, private apiService: CoreService) {}

  ngOnInit() {
    // if (this.selectedPlan && this.selectedPlan.amount) {
    //   this.amount = this.selectedPlan.amount;
    // }
  }

  // setAmount(amount: number) {
  //   this.amount = amount;
  // }

  // selectPaymentMethod(method: string) {
  //   this.selectedMethod = method;
  //   if (method === 'gpay') {
  //     this.processGPayPayment();
  //   } else if (method === 'phonepay') {
  //     this.processPhonePayPayment();
  //   }
  //   // For UPI, show the form
  // }

  // processGPayPayment() {
  //   // Implement GPay integration
  //   console.log('Processing GPay payment');
  //   alert('Redirecting to Google Pay...');
  // }

  // processPhonePayPayment() {
  //   // Implement PhonePay integration
  //   console.log('Processing PhonePay payment');
  //   alert('Redirecting to PhonePe...');
  // }

  // processUPIPayment() {
  //   if (this.upiForm.valid) {
  //     console.log('Processing UPI payment:', this.upiForm.value);
  //     alert('Payment initiated via UPI ID: ' + this.upiForm.value.upiId);
  //   }
  // }
  payNow() {
    this.loading = true;
    const request: CreateOrderRequest = new CreateOrderRequest();
    request.userId = 1;
    request.receipt = 'rcpt_' + new Date().getTime();
    request.amountInPaise = 500;
    this.apiService.createOrder(this, request);
  }

  onResult(result: any, type: any, other?: any): void {
    switch (type) {
      case ApiConstant.CREATE_ORDER:
        this.loading = false;
        const options = {
          key: result.key,
          amount: result.amount,
          currency: result.currency,
          name: 'Investment App',
          description: 'Investment Payment',
          order_id: result.orderId,
          handler: (response: any) => {
            const verifyReq: PaymentVerificationRequest = {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            };
            this.loading = true;
            this.apiService.verifyPayment(this, verifyReq);
          },
          prefill: {
            name: 'John Doe',
            email: 'john@example.com',
            contact: '9876543210',
          },
          theme: {
            color: '#3399cc',
          },
        };

        const rzp = new Razorpay(options);
        rzp.open();
        break;

      case ApiConstant.VERIFY_PAYMENT:
        this.loading = false;
        if (result.status === 'ok') {
          alert('✅ Payment successful!');
        } else {
          alert('❌ Payment verification failed!');
        }
        break;
    }
  }
  onError(err: any, type: any, other?: any): void {}
}
