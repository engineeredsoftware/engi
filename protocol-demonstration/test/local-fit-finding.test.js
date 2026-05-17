import assert from 'node:assert/strict';
import test from 'node:test';

import {
  createDepository,
  findReadFitLocally,
} from '../src/local-fit-finding.js';

const sourceBoundRead = {
  prompt: 'Read the deposited Terminal source and fit Deposit Read Fit AssetPack proof reconciliation evidence.',
  repositoryFullName: 'engineeredsoftware/ENGI',
  sourceBranch: 'main',
  sourceCommit: 'source-commit',
  targetArtifactKinds: ['repository-revision', 'asset-pack-evidence', 'proof-root'],
  closureCriteria: ['candidate is source-bound', 'proof and measurement are present'],
};

test('local fit finding synthesizes a minimal source-bound AssetPack', () => {
  const result = findReadFitLocally({ read: sourceBoundRead });

  assert.equal(result.resultState, 'worthy_fit');
  assert.equal(result.selectedCandidates[0].depositId, 'deposit-terminal-source');
  assert.equal(result.assetPack.selectedDepositIds[0], 'deposit-terminal-source');
  assert.match(result.assetPack.proofRoot, /^sha256:/u);
  assert.match(result.assetPack.journalRoot, /^sha256:/u);
  assert.equal(result.assetPack.journal.length, 3);
  assert.equal(result.assetPack.ledgerPreview.serverCustody, false);
  assert.equal(result.assetPack.ledgerPreview.btcFee.payer, 'reader');
  assert.equal(result.assetPack.ledgerPreview.btcFee.finalityState, 'not_broadcast');
  assert.equal(result.embeddingPolicy.provider, 'local');
  assert.equal(result.embeddingPolicy.model, 'deterministic-token-hash');
  assert.match(result.queryRoot, /^sha256:/u);
  assert.match(result.rankingRoot, /^sha256:/u);
});

test('local fit finding returns no-worthy-fit for unrelated reads', () => {
  const result = findReadFitLocally({
    read: {
      ...sourceBoundRead,
      prompt: 'Find a Solana wallet settlement AssetPack for a mobile exchange.',
      repositoryFullName: 'engineeredsoftware/mobile-wallet',
      targetArtifactKinds: ['wallet-settlement'],
      closureCriteria: ['Solana wallet evidence is present'],
    },
  });

  assert.equal(result.resultState, 'no_worthy_fit');
  assert.equal(result.assetPack, null);
  assert.equal(result.selectedCandidates.length, 0);
});

test('local fit finding blocks when proof evidence is missing', () => {
  const deposits = createDepository().map((deposit) =>
    deposit.depositId === 'deposit-terminal-source'
      ? { ...deposit, hasWalletOrAttestationProof: false }
      : deposit
  );
  const result = findReadFitLocally({ read: sourceBoundRead, deposits });

  assert.equal(result.resultState, 'blocked_readiness');
  assert.equal(result.assetPack, null);
  assert.ok(result.resultReasons.includes('wallet_or_attestation_proof_missing'));
});
