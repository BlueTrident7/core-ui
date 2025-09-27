import {
  Component,
  OnInit,
  OnDestroy,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [CommonModule, FormsModule, TabsModule],
  templateUrl: './investment.component.html',
  styleUrls: ['./investment.component.css'],
})
export class InvestmentComponent implements OnInit, OnDestroy {
  invetmentPlans = [
    {
      title: 'Daily Investments',
      value: 2625,
      plans: 'Plan A',
      planType: 'DAILY',
    },
    {
      id: 1,
      name: 'Monthly Investments',
      amount: 10500,
      polycies: 'Stocks',
      planType: 'MONTHLY',
    },
    {
      title: 'Total Investments',
      value: 2625,
      plans: 'Quarterly Bonus',
      planType: 'YEARLY',
    },
    {
      title: 'Total Investments',
      value: 2625,
      plans: 'Quarterly Bonus',
      planType: 'YEARLY',
    },
    {
      title: 'Total Investments',
      value: 2625,
      plans: 'Quarterly Bonus',
      planType: 'YEARLY',
    },
    {
      title: 'Total Investments',
      value: 2625,
      plans: 'Quarterly Bonus',
      planType: 'YEARLY',
    },
    {
      title: 'Total Investments',
      value: 2625,
      plans: 'Quarterly Bonus',
      planType: 'YEARLY',
    },
  ];

  currentSlide: number[] = [];
  private intervalId: any;

  showForm = false;
  newInvestment = { amount: 0, paymentMode: '' };
  paymentModes = ['Debit Card', 'Credit Card', 'UPI'];

  constructor(private renderer: Renderer2, private elRef: ElementRef) {
    this.currentSlide = this.invetmentPlans.map(() => 0);
  }

  ngOnInit(): void {
    // this.startAutoSlide();
    this.createFallingRupees();
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  // startAutoSlide(): void {
  //   this.intervalId = window.setInterval(() => {
  //     this.invetmentPlans.forEach((_, i) => {
  //       const len = this.invetmentPlans[i].plans.length || 1;
  //       this.currentSlide[i] = (this.currentSlide[i] + 1) % len;
  //     });
  //   }, 5000);
  // }

  // nextSlide(index: number): void {
  //   const len = this.invetmentPlans[index]?.plans?.length || 1;
  //   this.currentSlide[index] = (this.currentSlide[index] + 1) % len;
  // }

  prevSlide(index: number): void {
    const len = this.invetmentPlans[index]?.plans?.length || 1;
    this.currentSlide[index] = (this.currentSlide[index] - 1 + len) % len;
  }

  addInvestment(): void {
    if (this.newInvestment.amount > 0 && this.newInvestment.paymentMode) {
      alert(
        `Invested ₹${this.newInvestment.amount} via ${this.newInvestment.paymentMode}`
      );
      this.showForm = false;
      this.newInvestment = { amount: 0, paymentMode: '' };
    } else {
      alert('Please enter amount and select a payment mode.');
    }
  }

  private createFallingRupees(): void {
    const container = this.elRef.nativeElement.querySelector('.money-bg');
    for (let i = 0; i < 40; i++) {
      const rupee = this.renderer.createElement('span');
      rupee.textContent = '₹';
      this.renderer.setStyle(rupee, 'position', 'absolute');
      this.renderer.setStyle(rupee, 'top', `${Math.random() * -20}%`);
      this.renderer.setStyle(rupee, 'left', `${Math.random() * 100}%`);
      this.renderer.setStyle(rupee, 'fontSize', `${20 + Math.random() * 25}px`);
      this.renderer.setStyle(
        rupee,
        'color',
        `rgba(34,197,94,${0.2 + Math.random() * 0.5})`
      );

      // Random animation duration
      const duration = 4 + Math.random() * 6;
      this.renderer.setStyle(rupee, 'animation-duration', `${duration}s`);

      // Random X movement and rotation variables
      const xMove = Math.random() * 200 - 100 + 'px'; // left-right movement (-100 to 100px)
      const rotation = Math.random() * 720 - 360 + 'deg'; // rotation -360 to 360deg
      this.renderer.setStyle(rupee, '--x-move', xMove);
      this.renderer.setStyle(rupee, '--rotation', rotation);

      container.appendChild(rupee);
    }
  }
}
