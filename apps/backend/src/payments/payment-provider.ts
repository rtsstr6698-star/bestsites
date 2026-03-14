export interface InitiatePaymentInput { purchaseId: string; amount: number; currency: string; }
export interface InitiatePaymentResult { providerRef: string; checkoutUrl?: string; status: 'INITIATED' | 'PENDING'; }

export interface PaymentProvider {
  initiate(input: InitiatePaymentInput): Promise<InitiatePaymentResult>;
  verify(providerRef: string): Promise<{ status: 'SUCCESS' | 'FAILED' | 'PENDING' }>;
}
