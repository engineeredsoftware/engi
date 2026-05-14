import {
  mergeBitcodeProfileSettings,
  readBitcodeProfileSettings,
} from '../profile-contract';

describe('Bitcode profile wallet binding contract', () => {
  it('retains wallet provider metadata when normalizing profile settings', () => {
    const settings = readBitcodeProfileSettings({
      bitcodeProfile: {
        walletBinding: {
          address: 'tb1pauthaddressqqqqqqqqqqqqqqqqqqqqqqqq',
          provider: 'leather',
          status: 'pending',
          boundAt: '2026-05-14T16:03:52.251Z',
          network: 'testnet',
          proofKind: 'bitcoin_message_signature',
          authAddress: 'tb1pauthaddressqqqqqqqqqqqqqqqqqqqqqqqq',
          paymentAddress: 'tb1qpaymentaddressqqqqqqqqqqqqqqqqqqq',
          addressType: 'p2tr',
        },
      },
    });

    expect(settings.walletBinding).toEqual(
      expect.objectContaining({
        address: 'tb1pauthaddressqqqqqqqqqqqqqqqqqqqqqqqq',
        provider: 'leather',
        status: 'pending',
        boundAt: '2026-05-14T16:03:52.251Z',
        network: 'testnet',
        proofKind: 'bitcoin_message_signature',
        authAddress: 'tb1pauthaddressqqqqqqqqqqqqqqqqqqqqqqqq',
        paymentAddress: 'tb1qpaymentaddressqqqqqqqqqqqqqqqqqqq',
        addressType: 'p2tr',
      }),
    );
  });

  it('preserves wallet provider metadata through unrelated profile setting merges', () => {
    const merged = mergeBitcodeProfileSettings(
      {
        bitcodeProfile: {
          walletBinding: {
            address: 'tb1pauthaddressqqqqqqqqqqqqqqqqqqqqqqqq',
            provider: 'leather',
            status: 'pending',
            boundAt: '2026-05-14T16:03:52.251Z',
            network: 'testnet',
            proofKind: 'bitcoin_message_signature',
            authAddress: 'tb1pauthaddressqqqqqqqqqqqqqqqqqqqqqqqq',
            paymentAddress: 'tb1qpaymentaddressqqqqqqqqqqqqqqqqqqq',
            addressType: 'p2tr',
          },
        },
      },
      {
        email: 'qa@example.com',
      },
    );

    const bitcodeProfile = merged.bitcodeProfile as Record<string, unknown>;
    expect(bitcodeProfile).toEqual(
      expect.objectContaining({
        email: 'qa@example.com',
        walletBinding: expect.objectContaining({
          network: 'testnet',
          proofKind: 'bitcoin_message_signature',
          authAddress: 'tb1pauthaddressqqqqqqqqqqqqqqqqqqqqqqqq',
          paymentAddress: 'tb1qpaymentaddressqqqqqqqqqqqqqqqqqqq',
          addressType: 'p2tr',
        }),
      }),
    );
  });
});
