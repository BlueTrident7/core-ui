export class CreateOrderData {
  orderId?: string;
  amount?: number;
  currency?: string;
  key?: string;
}
export class CreateOrderRequest {
  amount?: number;
  receipt?: string;
  userId?: number;
  investmentId?: number;
}

export class VerifyPaymentRequest {
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
}
