import {
  advanceBtcFeeQuote,
  advanceBtcFeeTransactionReceipt,
  buildBtcFeeNetworkPolicy,
  buildBtcFeeOperationPosture,
  buildBtcFeeQuote,
  buildBtcFeeTaprootPsbtPosture,
  buildPreparedBtcFeeTransactionReceipt,
  buildWalletSignerSessionRecovery,
  createWalletSignerSession,
} from '../src';

const issuedAt = '2026-05-20T12:00:00.000Z';
const expiresAt = '2026-05-20T12:30:00.000Z';

function authorizedSession(overrides = {}) {
  return createWalletSignerSession({
    walletSessionId: 'wallet-session-1',
    walletId: 'wallet-reader',
    userId: 'reader-1',
    address: 'tb1qbitcodereader0000000000000000000000000',
    network: 'testnet',
    nonce: 'nonce-1',
    capabilities: ['psbt_sign', 'message_sign'],
    authorizationProof: {
      proofKind: 'message_signature',
      message: 'Authorize Bitcode BTC fee settlement.',
      signature: 'signature-1',
      verifiedAt: issuedAt,
    },
    expiresAt,
    ...overrides,
  });
}

function acceptedQuote(overrides = {}) {
  return advanceBtcFeeQuote(
    buildBtcFeeQuote({
      quoteId: 'quote-1',
      feePurpose: 'licensed_read',
      network: 'testnet',
      sats: 1200n,
      satsPerVbyte: 4,
      measurementRoot: 'need-fit-measurement-root',
      relatedAssetPackId: 'asset-pack-1',
      issuedAt,
      expiresAt,
      ...overrides,
    }),
    { state: 'accepted' },
  );
}

function preparedReceipt() {
  return buildPreparedBtcFeeTransactionReceipt({
    receiptId: 'btc-fee-1',
    feePurpose: 'licensed_read',
    payerSession: authorizedSession(),
    psbt: 'cHNidP8BAHECAAAAA',
    satsPaid: 1200n,
    satsPerVbyte: 4,
    exchangeSequence: 10n,
    terminalJournalRoot: 'terminal-journal-root',
    relatedAssetPackId: 'asset-pack-1',
    issuedAt,
  });
}

describe('BTC fee quote lifecycle', () => {
  it('builds a BTC quote with deterministic pricing and quote root posture', () => {
    const quote = buildBtcFeeQuote({
      quoteId: 'quote-1',
      feePurpose: 'licensed_read',
      network: 'testnet',
      sats: '1200',
      measurementRoot: 'need-fit-measurement-root',
      issuedAt,
      expiresAt,
    });

    expect(quote).toMatchObject({
      kind: 'btc.fee_quote',
      feeAsset: 'BTC',
      pricingVersion: 'measurement-weight-volume',
      state: 'quoted',
      quoteRoot: expect.stringMatching(/^btc-fee-quote-/),
    });
    expect(quote.sats).toBe(1200n);
  });

  it('allows quote acceptance and rejects invalid terminal transitions', () => {
    const quote = acceptedQuote();
    expect(quote.state).toBe('accepted');
    expect(() => advanceBtcFeeQuote(quote, { state: 'accepted' })).toThrow(
      /Invalid BTC fee quote transition/,
    );
  });

  it('fails closed when quote timestamps cannot support PSBT preparation', () => {
    expect(() =>
      buildBtcFeeQuote({
        quoteId: 'quote-expired-at-issue',
        feePurpose: 'licensed_read',
        network: 'testnet',
        sats: 1200n,
        measurementRoot: 'need-fit-measurement-root',
        issuedAt,
        expiresAt: issuedAt,
      }),
    ).toThrow('BTC fee quote expiresAt must be after issuedAt.');
  });

  it('models PSBT handoff, replacement, and reorg repair states explicitly', () => {
    const prepared = preparedReceipt();
    expect(() =>
      advanceBtcFeeTransactionReceipt(prepared, { finalityState: 'signed' } as never),
    ).toThrow('signedPsbt must be a non-empty string.');

    const signed = advanceBtcFeeTransactionReceipt(prepared, {
      finalityState: 'signed',
      psbt: 'signed-psbt',
    });
    const broadcast = advanceBtcFeeTransactionReceipt(signed, {
      finalityState: 'broadcast',
      txid: 'txid-repair',
    });
    const replaced = advanceBtcFeeTransactionReceipt(broadcast, {
      finalityState: 'replaced',
      txid: 'replacement-txid',
    });

    expect(buildBtcFeeTaprootPsbtPosture({ network: 'testnet', receipt: prepared })).toMatchObject({
      psbtHandoffState: 'prepared_unsigned',
      broadcastState: 'not_broadcast',
      taprootRequired: true,
    });
    expect(buildBtcFeeTaprootPsbtPosture({ network: 'testnet', receipt: signed })).toMatchObject({
      psbtHandoffState: 'signed_ready_to_broadcast',
      broadcastState: 'not_broadcast',
    });
    expect(buildBtcFeeTaprootPsbtPosture({ network: 'testnet', receipt: replaced })).toMatchObject({
      psbtHandoffState: 'replacement_or_reorg_repair_required',
      broadcastState: 'replaced',
    });
  });

  it('blocks value-bearing mainnet settlement unless operationally approved', () => {
    expect(
      buildBtcFeeNetworkPolicy({
        network: 'mainnet',
        environment: 'production-mainnet',
      }),
    ).toMatchObject({
      admitted: false,
      operationalApprovalRequired: true,
      mainnet: true,
      proofRoot: expect.stringMatching(/^btc-fee-network-policy-/),
    });

    const mainnetQuote = acceptedQuote({ network: 'mainnet', quoteId: 'quote-mainnet-1' });
    const mainnetSession = authorizedSession({
      walletSessionId: 'wallet-session-mainnet',
      walletId: 'wallet-mainnet',
      address: 'bc1qbitcodereader0000000000000000000000000',
      network: 'mainnet',
    });
    const blocked = buildBtcFeeOperationPosture({
      quote: mainnetQuote,
      payerSession: mainnetSession,
      environment: 'production-mainnet',
      at: issuedAt,
    });
    expect(blocked).toMatchObject({
      phase: 'blocked',
      networkPolicy: {
        admitted: false,
        blocker: 'Value-bearing BTC fee settlement on mainnet requires explicit operational approval.',
      },
      blockedReadiness: {
        blockerId: 'network-policy',
        noServerCustody: true,
      },
    });

    expect(
      buildBtcFeeOperationPosture({
        quote: mainnetQuote,
        payerSession: mainnetSession,
        environment: 'production-mainnet',
        valueBearingMainnetApproved: true,
        at: issuedAt,
      }),
    ).toMatchObject({
      phase: 'quoted',
      networkPolicy: {
        admitted: true,
        operationalApprovalRequired: true,
      },
    });
  });
});

describe('wallet signer recovery', () => {
  it('recovers live authorized PSBT signing without server custody', () => {
    const recovery = buildWalletSignerSessionRecovery({
      session: authorizedSession(),
      network: 'testnet',
      at: issuedAt,
    });

    expect(recovery).toMatchObject({
      state: 'live_authorized',
      canSign: true,
      serverCustody: false,
      walletSessionId: 'wallet-session-1',
    });
  });

  it('blocks stale stored or mismatched signer sessions with actionable reasons', () => {
    expect(
      buildWalletSignerSessionRecovery({
        session: authorizedSession(),
        network: 'signet',
        at: issuedAt,
      }),
    ).toMatchObject({
      state: 'network_mismatch',
      canSign: false,
    });

    expect(
      buildWalletSignerSessionRecovery({
        session: authorizedSession({ expiresAt: '2026-05-20T11:00:00.000Z' }),
        network: 'testnet',
        at: issuedAt,
      }),
    ).toMatchObject({
      state: 'expired',
      canSign: false,
    });
  });

  it('rejects server-custody signer sessions before PSBT handoff', () => {
    const recovery = buildWalletSignerSessionRecovery({
      session: {
        ...authorizedSession(),
        serverCustody: true,
      } as never,
      network: 'testnet',
      at: issuedAt,
    });

    expect(recovery).toMatchObject({
      state: 'server_custody_rejected',
      canSign: false,
      blocker: 'Wallet signer session implies server custody.',
    });
  });
});

describe('BTC fee operation posture', () => {
  it('returns blocked-readiness when signer, quote, or quote acceptance is missing', () => {
    const noSigner = buildBtcFeeOperationPosture({
      quote: acceptedQuote(),
      at: issuedAt,
    });
    expect(noSigner).toMatchObject({
      phase: 'blocked',
      blockedReadiness: {
        blockerId: 'wallet-signer-session',
        noServerCustody: true,
      },
      canPreparePsbt: false,
    });

    const unacceptedQuote = buildBtcFeeQuote({
      quoteId: 'quote-2',
      feePurpose: 'licensed_read',
      network: 'testnet',
      sats: 1200n,
      measurementRoot: 'measurement-root',
      issuedAt,
      expiresAt,
    });
    expect(
      buildBtcFeeOperationPosture({
        quote: unacceptedQuote,
        payerSession: authorizedSession(),
        at: issuedAt,
      }),
    ).toMatchObject({
      phase: 'blocked',
      blockedReadiness: { blockerId: 'fee-quote-not-accepted' },
    });
  });

  it('moves from accepted quote to PSBT, broadcast, and confirmed settlement posture', () => {
    const quote = acceptedQuote();
    const quoted = buildBtcFeeOperationPosture({
      quote,
      payerSession: authorizedSession(),
      at: issuedAt,
    });
    expect(quoted).toMatchObject({
      phase: 'quoted',
      canPreparePsbt: true,
      canSettle: false,
    });

    const prepared = preparedReceipt();
    const psbtReady = buildBtcFeeOperationPosture({
      quote,
      payerSession: authorizedSession(),
      receipt: prepared,
      at: issuedAt,
    });
    expect(psbtReady).toMatchObject({
      phase: 'psbt_ready',
      canSignPsbt: true,
      canBroadcast: false,
      psbtHandoffState: 'prepared_unsigned',
      broadcastState: 'not_broadcast',
    });

    const signed = advanceBtcFeeTransactionReceipt(prepared, {
      finalityState: 'signed',
      psbt: 'signed-psbt',
    });
    const broadcast = advanceBtcFeeTransactionReceipt(signed, {
      finalityState: 'broadcast',
      txid: 'txid-1',
    });
    const confirmed = advanceBtcFeeTransactionReceipt(broadcast, {
      finalityState: 'confirmed',
      confirmations: 2,
    });

    expect(
      buildBtcFeeOperationPosture({
        quote,
        payerSession: authorizedSession(),
        receipt: broadcast,
        at: issuedAt,
      }),
    ).toMatchObject({
      phase: 'broadcast',
      canObserveFinality: true,
      psbtHandoffState: 'broadcast_submitted',
      broadcastState: 'broadcast',
      taprootScriptPosture: {
        commitmentMethod: 'taproot',
        taprootAdmitted: true,
      },
    });
    expect(
      buildBtcFeeOperationPosture({
        quote,
        payerSession: authorizedSession(),
        receipt: confirmed,
        at: issuedAt,
      }),
    ).toMatchObject({
      phase: 'confirmed',
      canSettle: true,
      noServerCustody: true,
      psbtHandoffState: 'finality_observed',
      broadcastState: 'confirmed',
    });
  });
});
