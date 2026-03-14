import { describe, expect, it } from 'vitest';
import { MockPaymentProvider } from '../src/payments/mock-payment-provider';

describe('MockPaymentProvider', () => {
  it('returns success for normal provider refs', async () => {
    const provider = new MockPaymentProvider();
    const init = await provider.initiate({ purchaseId: 'abc', amount: 1000, currency: 'UZS' });
    const verify = await provider.verify(init.providerRef);
    expect(verify.status).toBe('SUCCESS');
  });

  it('returns failed for fail refs', async () => {
    const provider = new MockPaymentProvider();
    const verify = await provider.verify('mock_fail_1');
    expect(verify.status).toBe('FAILED');
  });
});
