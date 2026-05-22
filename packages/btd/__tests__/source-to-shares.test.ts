import {
  assertSourceToSharesSettlementAdmissible,
  buildSourceToSharesProof,
  reviewBtdAncestorEdges,
  sourceToSharesProofToSettlementConservationCheck,
} from '../src';

const issuedAt = '2026-05-06T00:00:00.000Z';

function baseProofInput(overrides: Record<string, unknown> = {}) {
  return {
    readId: 'read-source-to-shares-1',
    assetPackId: 'asset-pack-source-to-shares-1',
    acceptedNeedRoot: 'accepted-need-root-1',
    findingFitsResultRoot: 'finding-fits-root-1',
    fitDeposits: [
      {
        depositId: 'deposit-a',
        assetPackId: 'fit-asset-a',
        depositorWalletId: 'wallet-depositor-a',
        sourceManifestRoot: 'source-root-a',
        findingFitsResultRoot: 'finding-fits-root-a',
        measurementRoot: 'measurement-root-a',
        normalizedMeasurementUnits: 30_000n,
        fitQualityBps: 10_000,
        provenanceBps: 10_000,
        accepted: true as const,
      },
      {
        depositId: 'deposit-b',
        assetPackId: 'fit-asset-b',
        depositorWalletId: 'wallet-depositor-b',
        sourceManifestRoot: 'source-root-b',
        findingFitsResultRoot: 'finding-fits-root-b',
        measurementRoot: 'measurement-root-b',
        normalizedMeasurementUnits: 10_000n,
        fitQualityBps: 10_000,
        provenanceBps: 10_000,
        accepted: true as const,
      },
    ],
    btdRange: {
      assetPackId: 'asset-pack-source-to-shares-1',
      rangeStart: 100,
      rangeEndExclusive: 103,
      tokenCount: 3,
      rangeRoot: 'range-root-1',
      measureMintReceiptRoot: 'measuremint-root-1',
    },
    feeQuote: {
      quoteId: 'quote-source-to-shares-1',
      quoteRoot: 'quote-root-1',
      grossSats: 10_001n,
    },
    paymentObservation: {
      paymentReceiptRoot: 'payment-root-1',
      observedDebitSats: 10_001n,
      observedCreditSats: 10_001n,
      finalityState: 'confirmed' as const,
      txid: 'txid-source-to-shares-1',
    },
    issuedAt,
    ...overrides,
  };
}

describe('source-to-shares proof cleanup', () => {
  it('binds measurements, fit deposits, BTD range slices, fee quote, and exact BTC allocation', () => {
    const proof = buildSourceToSharesProof(baseProofInput());

    expect(proof.kind).toBe('btd.source_to_shares_proof');
    expect(proof.contributionWeights.map((entry) => [entry.depositId, entry.shareBps])).toEqual([
      ['deposit-a', 7500],
      ['deposit-b', 2500],
    ]);
    expect(proof.rangeSlices.map((entry) => [entry.depositId, entry.tokenCount])).toEqual([
      ['deposit-a', 2],
      ['deposit-b', 1],
    ]);
    expect(proof.settlementAllocations.map((entry) => [entry.depositId, entry.allocatedSats])).toEqual([
      ['deposit-a', 7501n],
      ['deposit-b', 2500n],
    ]);
    expect(proof.settlementConservation).toMatchObject({
      state: 'balanced',
      settlementAdmissible: true,
      allocationConserved: true,
      blockerReasons: [],
    });
    expect(proof.settlementConservation.noOverpayment.passed).toBe(true);
    expect(proof.settlementConservation.noUnderpayment.passed).toBe(true);
    expect(proof.zeroCellRefitTail).toMatchObject({
      state: 'no_zero_cell_tail',
      refitRequired: false,
      rangeTokenCount: 3,
    });
    expect(proof.proofRoot).toMatch(/^btd-proof-root:source-to-shares:/);

    const check = sourceToSharesProofToSettlementConservationCheck(proof);
    expect(check).toMatchObject({
      checkId: proof.proofId,
      expectedDebitSats: 10001,
      observedDebitSats: 10001,
      expectedCreditSats: 10001,
      observedCreditSats: 10001,
      feeQuoteRoot: 'quote-root-1',
      paymentReceiptRoot: 'payment-root-1',
    });
  });

  it('keeps no-underpayment and no-overpayment invariants independently testable', () => {
    const underpaid = buildSourceToSharesProof(
      baseProofInput({
        paymentObservation: {
          paymentReceiptRoot: 'payment-root-underpaid',
          observedDebitSats: 9_999n,
          observedCreditSats: 9_999n,
          finalityState: 'confirmed',
        },
      }),
    );
    const overpaid = buildSourceToSharesProof(
      baseProofInput({
        paymentObservation: {
          paymentReceiptRoot: 'payment-root-overpaid',
          observedDebitSats: 10_002n,
          observedCreditSats: 10_002n,
          finalityState: 'confirmed',
        },
      }),
    );

    expect(underpaid.settlementConservation.state).toBe('underpayment');
    expect(underpaid.settlementConservation.noOverpayment.passed).toBe(true);
    expect(underpaid.settlementConservation.noUnderpayment.passed).toBe(false);
    expect(() => assertSourceToSharesSettlementAdmissible(underpaid)).toThrow(
      /not admissible/,
    );

    expect(overpaid.settlementConservation.state).toBe('overpayment');
    expect(overpaid.settlementConservation.noOverpayment.passed).toBe(false);
    expect(overpaid.settlementConservation.noUnderpayment.passed).toBe(true);
    expect(() => assertSourceToSharesSettlementAdmissible(overpaid)).toThrow(
      /not admissible/,
    );
  });

  it('records zero-cell refit tail posture and ancestry evidence without changing settlement supply', () => {
    const ancestryReview = reviewBtdAncestorEdges({
      reviewId: 'ancestry-review-source-to-shares-1',
      childAssetPackId: 'asset-pack-source-to-shares-1',
      edges: [
        {
          parentAssetPackId: 'asset-pack-parent-1',
          childAssetPackId: 'asset-pack-source-to-shares-1',
          edgeKind: 'proof_dependency',
          evidenceRoot: 'ancestry-evidence-root-1',
          confidenceBps: 9_000,
          timelessnessBps: 8_000,
          depth: 1,
          createdAfterChildFit: true,
          conflictDisclosure: [],
        },
      ],
      issuedAt,
    });
    const proof = buildSourceToSharesProof(
      baseProofInput({
        btdRange: {
          assetPackId: 'asset-pack-source-to-shares-1',
          tokenCount: 0,
          measureMintReceiptRoot: 'measuremint-zero-cell-root-1',
          zeroCellReason: 'tail_exhausted',
        },
        ancestryReview,
      }),
    );

    expect(proof.zeroCellRefitTail).toMatchObject({
      state: 'zero_cell_refit_tail',
      tailPolicy: 'zero_cell_receipt_then_refit_only',
      zeroCellReason: 'tail_exhausted',
      refitRequired: true,
      zeroCellDepositIds: ['deposit-a', 'deposit-b'],
    });
    expect(proof.rangeSlices.every((slice) => slice.tokenCount === 0)).toBe(true);
    expect(proof.ancestryEvidence).toMatchObject({
      state: 'reviewed',
      reviewId: 'ancestry-review-source-to-shares-1',
      payableEdgeCount: 1,
      recordedUnpaidEdgeCount: 0,
      rejectedEdgeCount: 0,
    });
    expect(proof.ancestryEvidence.payableRouteWeight).toBe('18000000');
    expect(proof.settlementConservation.settlementAdmissible).toBe(true);
  });

  it('fails closed on duplicate or unaccepted fit deposits', () => {
    expect(() =>
      buildSourceToSharesProof(
        baseProofInput({
          fitDeposits: [
            baseProofInput().fitDeposits[0],
            {
              ...baseProofInput().fitDeposits[0],
              assetPackId: 'duplicate-fit-asset',
            },
          ],
        }),
      ),
    ).toThrow(/Duplicate source-to-shares fit deposit/);

    expect(() =>
      buildSourceToSharesProof(
        baseProofInput({
          fitDeposits: [
            {
              ...baseProofInput().fitDeposits[0],
              accepted: false,
            },
          ],
        }),
      ),
    ).toThrow(/only accepts admitted fit deposits/);
  });
});
