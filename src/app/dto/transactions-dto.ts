export class TransactionsDto {
  public id?: number;
  public type?: string;
  public transactionNumber?: string;
  public date?: Date;
  public amount?: number;
  public status?: string;
}

export class PaymentTransactionDTO {
  public transactionId?: number;
  public externalTransactionId?: string;
  public amount?: number;
  public transactionStatus?: string;
  public paymentMethod?: string;
  public gatewayResponse?: string;
  public remarks?: string;
  public createdAt?: Date;

  public paymentId?: number;
  public orderId?: string;
  public paymentStatus?: string;
  public errorDescription?: string;

  public investmentId?: number;
  public investmentStatus?: string;

  public userId?: number;
  public fullName?: string;
  public email?: string;
}
