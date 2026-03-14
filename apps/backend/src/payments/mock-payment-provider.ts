import { PaymentProvider, InitiatePaymentInput } from './payment-provider';

export class MockPaymentProvider implements PaymentProvider {
  async initiate(input: InitiatePaymentInput) {
    return {
      providerRef: `mock_${input.purchaseId}`,
      checkoutUrl: `https://mockpay.local/checkout/${input.purchaseId}`,
      status: 'INITIATED' as const
    };
  }

  async verify(providerRef: string) {
    return { status: providerRef.includes('fail') ? 'FAILED' as const : 'SUCCESS' as const };
  }
}
