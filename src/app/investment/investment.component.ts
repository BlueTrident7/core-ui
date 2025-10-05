import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'; // 👈 import this
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { CoreService } from '../base/api/core.service';
import { PaymentService } from '../base/api/payment.service';
import {
  CreateOrderRequest,
  VerifyPaymentRequest,
} from '../dto/create-order-data';
import { Init } from 'v8';
import { ApiCallBack } from '../base/api/api-callback';
import { ApiConstant } from '../api-constant';
import { Colors } from 'chart.js';

type PlanType = 'Daily' | 'Weekly' | 'Monthly' | 'Yealy';

interface InvestmentPlan {
  id: number;
  name: string;
  rate: number;
  description: string;
  type: PlanType;
}
declare var Razorpay: any; // tell TypeScript this global exists

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

  plans: InvestmentPlan[] = [
    {
      id: 1,
      name: 'Equity Growth',
      rate: 10,
      description: 'High return long-term equity plan.',
      type: 'Daily',
    },
    {
      id: 2,
      name: 'Bluechip Fund',
      rate: 8000,
      description: 'Stable growth with bluechip companies.',
      type: 'Daily',
    },
    {
      id: 3,
      name: 'Tech Innovators',
      rate: 15000,
      description: 'Focused on technology leaders.',
      type: 'Daily',
    },
    {
      id: 4,
      name: 'Green Energy',
      rate: 11000,
      description: 'Invest in sustainable companies.',
      type: 'Daily',
    },
    {
      id: 5,
      name: 'Dividend Kings',
      rate: 7000,
      description: 'Steady dividend paying companies.',
      type: 'Daily',
    },
    {
      id: 6,
      name: 'Dividend Kings',
      rate: 7000,
      description: 'Steady dividend paying companies.',
      type: 'Daily',
    },
    {
      id: 7,
      name: 'Dividend Kings',
      rate: 7000,
      description: 'Steady dividend paying companies.',
      type: 'Daily',
    },
    {
      id: 8,
      name: 'Index Tracker',
      rate: 9000,
      description: 'Follows the Nifty 50 index.',
      type: 'Weekly',
    },
    {
      id: 9,
      name: 'Corporate Bonds',
      rate: 6000,
      description: 'Safe investment in corporate bonds.',
      type: 'Weekly',
    },
    {
      id: 10,
      name: 'Corporate Bonds',
      rate: 6000,
      description: 'Safe investment in corporate bonds.',
      type: 'Monthly',
    },
    {
      id: 11,
      name: 'Real Estate Fund',
      rate: 13000,
      description: 'Invest in commercial real estate.',
      type: 'Monthly',
    },
    {
      id: 12,
      name: 'International Equity',
      rate: 14000,
      description: 'Global market exposure.',
      type: 'Yealy',
    },
    {
      id: 13,
      name: 'Balanced Fund',
      rate: 10000,
      description: 'Mix of equity and debt.',
      type: 'Yealy',
    },
  ];

  openPanel: InvestmentPlan | null = null;
  selectedPlan: InvestmentPlan | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public coreService: CoreService,
    public paymentService: PaymentService
  ) {}

  ngOnInit() {}

  getPlansByType(type: PlanType): InvestmentPlan[] {
    return this.plans.filter((plan) => plan.type === type);
  }

  togglePanel(plan: InvestmentPlan) {
    this.openPanel = this.openPanel === plan ? null : plan;
  }

  openConfirmDialog(plan: InvestmentPlan) {
    this.coreService.selectedPlan = plan;
    this.createPaymentOrder();
  }

  createPaymentOrder() {
    const order = new CreateOrderRequest();
    order.amount = this.coreService.selectedPlan?.rate;
    order.receipt = 'SJQWIDKM';
    order.userId = 1;
    order.investmentId = this.coreService.selectedPlan?.id;
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
      name: this.selectedPlan?.name || 'Investment Plan',
      description: this.selectedPlan?.description || '',
      handler: (res: any) => {
        this.processResponse(res);
      },
      prefill: {
        // corrected spelling
        name: this.selectedPlan?.name,
        email: '', // optional
        contact: '', // optional
      },
      theme: {
        color: '#528FF0',
      },
      notes: {
        userId: 1, // custom fields
        planId: this.selectedPlan?.id,
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
  onResult(result: any, type: any, other?: any): void {
    switch (type) {
      case ApiConstant.CREATE_PAYMENT_ORDER:
        console.log(result);
        this.openTransactionModel(result.data);
        break;
      case ApiConstant.VERIFY_PAYMENT:
        console.log('success Payment');

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
