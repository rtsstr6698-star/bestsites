import { MockPaymentProvider } from '../payments/mock-payment-provider';
import { PaymentProvider } from '../payments/payment-provider';
import { MockObjectStorageService } from '../storage/object-storage';
import { env } from '../config/env';

export const paymentProvider: PaymentProvider = new MockPaymentProvider();
export const objectStorage = new MockObjectStorageService();

if (env.paymentProvider !== 'mock') {
  console.warn('TODO: integrate real payment provider based on PAYMENT_PROVIDER');
}
