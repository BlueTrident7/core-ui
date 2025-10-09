import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; // 👈 import this
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { PaymentService } from '../base/api/payment.service';
import {
  CreateOrderRequest,
  MarkPaymentFailedRequest,
  VerifyPaymentRequest,
} from '../dto/create-order-data';
import { Init } from 'v8';
import { ApiCallBack } from '../base/api/api-callback';
import { ApiConstant } from '../api-constant';
import { CoreService } from '../base/api/core.service';

type PlanType = 'Daily' | 'Weekly' | 'Monthly' | 'Yealy';

interface InvestmentPlan {
  id: number;
  planName: string;
  amount: number;
  description: string;
  planType: PlanType;
}
declare var Razorpay: any;

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css'],
})
export class InvestmentComponent implements ApiCallBack {
  tabs: PlanType[] = ['Daily', 'Weekly', 'Monthly', 'Yealy'];
  activeTab: PlanType = this.tabs[0];
  showDialog: boolean = false;

  investmentPlans: InvestmentPlan[] = [];

  openPanel: InvestmentPlan | null = null;
  selectedPlan: InvestmentPlan | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public coreService: CoreService,
    public paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.getAllInvestmentPlans();
  }

  getPlansByType(type: string): InvestmentPlan[] {
    const upperType = type.toUpperCase();

    return this.investmentPlans.filter((plan) => plan.planType === upperType);
  }

  togglePanel(plan: InvestmentPlan) {
    this.openPanel = this.openPanel === plan ? null : plan;
  }

  openConfirmDialog(plan: InvestmentPlan) {
    this.selectedPlan = plan;
    this.createPaymentOrder();
  }

  createPaymentOrder() {
    const order = new CreateOrderRequest();
    order.amount = this.selectedPlan?.amount;
    order.receipt = 'SJQWIDKM';
    order.userId = 1;
    order.investmentId = this.selectedPlan?.id;
    this.paymentService.createPaymentOrder(this, order);
  }

  confirmInvestment() {
    if (this.selectedPlan) {
      this.router.navigate(['main', 'investment', 'payment'], {
        state: { plan: this.selectedPlan },
      });
    }
    this.selectedPlan = null;
  }

  cancelInvestment() {
    this.selectedPlan = null;
  }

  closeDialog() {
    this.showDialog = false;
    this.selectedPlan = null;
  }

  openTransactionModel(response: any) {
    let options: any = {
      key: response.key,
      order_id: response.orderId, // corrected
      currency: response.currency,
      amount: response.amount, // optional, if your backend sends it
      name: this.selectedPlan?.planName || 'Investment Plan',
      description: this.selectedPlan?.description || '',
      handler: (res: any) => {
        this.processResponse(res);
      },
      prefill: {
        // corrected spelling
        name: this.selectedPlan?.planName,
        email: '', // optional
        contact: '', // optional
      },
      theme: {
        color: '#528FF0',
      },
      notes: {
        userId: 1,
        planId: this.selectedPlan?.id,
      },
      method: {
        card: true,
        netbanking: true,
        upi: true,
        wallet: true,
      },
      modal: {
        escape: true,
        backdropclose: true,
        ondismiss: () => {
          console.warn('Payment dismissed by user');
          // Call method to mark as failed
          this.updateFailedPayment(response.orderId);
        },
      },
    };

    let razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }

  processResponse(resp: any) {
    let request = new VerifyPaymentRequest();
    request.razorpayOrderId = resp.razorpay_order_id;
    request.razorpayPaymentId = resp.razorpay_payment_id;
    request.razorpaySignature = resp.razorpay_signature;

    this.paymentService.verifyPayment(this, request);
  }

  getAllInvestmentPlans() {
    this.coreService.getAllInvestmentPlans(this);
  }
  updateFailedPayment(orderId: string): void {
    let request = new MarkPaymentFailedRequest();
    request.orderId = orderId;
    request.reason = 'User Dismissed';
    this.paymentService.markPaymentAsFailed(this, request);
  }
  onResult(result: any, type: any, other?: any): void {
    switch (type) {
      case ApiConstant.CREATE_PAYMENT_ORDER:
        console.log(result);
        this.openTransactionModel(result.data);
        break;
      case ApiConstant.VERIFY_PAYMENT:
        console.log('success Payment');
        break;
      case ApiConstant.GET_INVESTMENT_PLANS:
        this.investmentPlans = [];
        this.investmentPlans = result.data;
        break;
      default:
        break;
    }
  }

  onError(err: any, type: any, other?: any): void {
    console.error('Payment error:', err);
    alert('Payment failed. Please try again.');
  }
}
