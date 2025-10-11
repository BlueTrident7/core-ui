import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

interface Sale {
  product: string;
  lastYearSale: number;
  thisYearSale: number;
  lastYearProfit: number;
  thisYearProfit: number;
}

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
  sales: Sale[] = [
    { product: 'Bamboo Watch', lastYearSale: 51, thisYearSale: 40, lastYearProfit: 54.06, thisYearProfit: 43.20 },
    { product: 'Blue Band', lastYearSale: 83, thisYearSale: 9, lastYearProfit: 232.10, thisYearProfit: 501.20 },
    { product: 'Blue T-Shirt', lastYearSale: 49, thisYearSale: 27, lastYearProfit: 453.20, thisYearProfit: 905.30 },
    { product: 'Brown Bracelet', lastYearSale: 17, thisYearSale: 69, lastYearProfit: 641.42, thisYearProfit: 503.50 },
    { product: 'Galaxy Earrings', lastYearSale: 82, thisYearSale: 16, lastYearProfit: 312.10, thisYearProfit: 1050.40 },
    { product: 'Game Controller', lastYearSale: 44, thisYearSale: 45, lastYearProfit: 664.20, thisYearProfit: 326.00 },
    { product: 'Gaming Set', lastYearSale: 90, thisYearSale: 56, lastYearProfit: 157.42, thisYearProfit: 523.00 }
  ];

  lastYearTotal: number = this.sales.reduce((sum, sale) => sum + sale.lastYearProfit, 0);
  thisYearTotal: number = this.sales.reduce((sum, sale) => sum + sale.thisYearProfit, 0);
}
