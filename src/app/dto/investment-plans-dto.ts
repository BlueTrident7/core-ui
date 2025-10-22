export interface InvestmentPlanGetDTO {
  id: number;
  name: string;
  amount: number;
  duration: string;
  returnRate: number;
  description: string;
}

export class InvestmentPlanPostDto {
  name: string;
  description: string;
  planType: string;
  planPolicy: string;
  lockPeriod: number;
  amount: number;

  constructor() {
    this.name = '';
    this.description = '';
    this.planType = '';
    this.planPolicy = '';
    this.lockPeriod = 0;
    this.amount = 0;
  }
}
