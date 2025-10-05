export class CreateOrderData {
  orderId?: string;
  amount?: number;
  currency?: string;
  key?: string;
}
export class CreateOrderRequest {
  public amount?: number;
  receipt?: string;
  userId?: number;
  investmentId?: number;
}

export class VerifyPaymentRequest {
  public razorpayOrderId?: string;
  public razorpayPaymentId?: string;
  public razorpaySignature?: string;
}

export class MarkPaymentFailedRequest {
  public orderId?: string;
  public reason?: string;
}
