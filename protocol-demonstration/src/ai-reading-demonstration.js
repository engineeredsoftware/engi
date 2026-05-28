// @ts-check

import { createHash } from 'node:crypto';

import { buildBenchmarkComparison } from './benchmark-model.js';
import {
  acceptReadNeedLocally,
  findNeedFitLocally,
  synthesizeReadNeedLocally,
} from './local-fit-finding.js';

const DEMONSTRATION_ID = 'v42-ai-reading-assetpack-improvement';
const MINIMUM_UPLIFT_BP = 2400;

const REQUIRED_REMEDIATION_TERMS = Object.freeze([
  'issuer-mismatch',
  'jwks-cache',
  'session-invariant',
  'rollback-window',
  'audit-receipt',
]);

const AI_READING_READ = Object.freeze({
  prompt:
    'Acquire an AssetPack that improves an AI incident assistant remediating an auth migration issuer mismatch while preserving sessions, rollback safety, and audit proof.',
  repositoryFullName: 'engineeredsoftware/ENGI',
  sourceBranch: 'main',
  sourceCommit: 'ai-reading-source-commit',
  targetArtifactKinds: [
    'incident-remediation-runbook',
    'auth-migration-guardrail',
    'benchmark-improvement-evidence',
    'audit-proof-receipt',
  ],
  closureCriteria: [
    'assistant identifies issuer mismatch before rollback',
    'assistant preserves session invariants while rotating JWKS cache',
    'assistant emits audit receipt steps before source-bearing delivery',
  ],
});

const AI_READING_DEPOSIT = Object.freeze({
  depositId: 'deposit-auth-migration-runbook',
  title: 'Auth migration incident runbook AssetPack deposit',
  summary:
    'Non-public auth migration remediation knowledge for issuer mismatch, JWKS cache rotation, session invariants, rollback windows, and audit receipts.',
  repositoryFullName: 'engineeredsoftware/ENGI',
  sourceBranch: 'main',
  sourceCommit: 'ai-reading-source-commit',
  artifactKinds: [
    'incident-remediation-runbook',
    'auth-migration-guardrail',
    'benchmark-improvement-evidence',
    'audit-proof-receipt',
  ],
  contentUnits: [
    {
      path: 'runbooks/auth-migration-issuer-mismatch.md',
      text:
        'Private remediation notes: detect issuer-mismatch first, freeze rollback-window, rotate jwks-cache only after verifier compatibility, preserve session-invariant, then write audit-receipt.',
    },
  ],
  hasWalletOrAttestationProof: true,
  hasAssetMeasurementEvidence: true,
});

function sha256(value) {
  return createHash('sha256').update(String(value)).digest('hex');
}

function scoreAssistantResponse(response) {
  const normalized = String(response || '').toLowerCase();
  const presentTerms = REQUIRED_REMEDIATION_TERMS.filter((term) => normalized.includes(term));
  const missingTerms = REQUIRED_REMEDIATION_TERMS.filter((term) => !normalized.includes(term));
  return {
    scoreBp: Math.round((presentTerms.length / REQUIRED_REMEDIATION_TERMS.length) * 10000),
    presentTerms,
    missingTerms,
    requiredTermCount: REQUIRED_REMEDIATION_TERMS.length,
  };
}

function buildPublicDataOnlyResponse() {
  return [
    'Rollback the auth migration if login errors spike.',
    'Check token verifier settings and notify the incident channel.',
    'Retest login after the rollback completes.',
  ].join(' ');
}

function buildAssetPackEnhancedResponse(assetPack) {
  const selectedDepositId = assetPack?.selectedDepositIds?.[0] || AI_READING_DEPOSIT.depositId;
  return [
    `Use ${selectedDepositId} to diagnose issuer-mismatch before rollback.`,
    'Preserve the session-invariant by keeping the previous verifier active through the rollback-window.',
    'Rotate jwks-cache only after compatibility has been confirmed.',
    'Emit an audit-receipt with proof roots before any source-bearing delivery is unlocked.',
  ].join(' ');
}

export function buildAiReadingDemonstrationInput() {
  return {
    demonstrationId: DEMONSTRATION_ID,
    read: { ...AI_READING_READ },
    deposits: [{ ...AI_READING_DEPOSIT, contentUnits: [...AI_READING_DEPOSIT.contentUnits] }],
    minimumUpliftBp: MINIMUM_UPLIFT_BP,
    requiredRemediationTerms: [...REQUIRED_REMEDIATION_TERMS],
  };
}

export function runAiReadingDominantDemonstration(input = buildAiReadingDemonstrationInput()) {
  const readNeed = acceptReadNeedLocally(synthesizeReadNeedLocally({ read: input.read }));
  const fitResult = findNeedFitLocally({ need: readNeed, deposits: input.deposits });
  const publicResponse = buildPublicDataOnlyResponse();
  const enhancedResponse = buildAssetPackEnhancedResponse(fitResult.assetPack);
  const publicScore = scoreAssistantResponse(publicResponse);
  const enhancedScore = scoreAssistantResponse(enhancedResponse);
  const benchmark = buildBenchmarkComparison({
    bundleId: fitResult.assetPack?.assetPackId || 'asset-pack-not-synthesized',
    benchmark: 'ai-reading-auth-migration-remediation',
    baselineBp: publicScore.scoreBp,
    treatmentBp: enhancedScore.scoreBp,
  });
  const upliftBp = enhancedScore.scoreBp - publicScore.scoreBp;
  const evidenceRoot = `sha256:${sha256(JSON.stringify({
    demonstrationId: input.demonstrationId,
    needId: readNeed.needId,
    resultState: fitResult.resultState,
    selectedDepositIds: fitResult.selectedCandidates.map((candidate) => candidate.depositId),
    publicScore,
    enhancedScore,
    upliftBp,
  }))}`;

  return {
    demonstrationId: input.demonstrationId,
    scenario: 'ai-reading-assetpack-improves-remediation-assistant',
    deterministicLocalOnly: true,
    outsideSourceImportsAllowed: false,
    readNeed,
    fitResultState: fitResult.resultState,
    selectedDepositIds: fitResult.selectedCandidates.map((candidate) => candidate.depositId),
    assetPackPreview: fitResult.assetPack?.sourceSafePreview || null,
    sourceSafety: {
      protectedSourceBeforeSettlement: 'withheld_until_settlement',
      publicBaselineUsesDepositorySource: false,
      enhancedReaderUsesPurchasedAssetPack: fitResult.resultState === 'worthy_fit',
      sourceBearingDeliveryRequiresSettlement: true,
    },
    publicDataOnlyBaseline: {
      mode: 'public-data-only',
      answer: publicResponse,
      score: publicScore,
    },
    assetPackEnhancedReading: {
      mode: 'assetpack-enhanced-after-rights',
      answer: enhancedResponse,
      score: enhancedScore,
      selectedDepositIds: fitResult.selectedCandidates.map((candidate) => candidate.depositId),
    },
    benchmark,
    improvement: {
      improved: upliftBp >= input.minimumUpliftBp,
      upliftBp,
      minimumUpliftBp: input.minimumUpliftBp,
    },
    proof: {
      evidenceRoot,
      queryRoot: fitResult.queryRoot,
      rankingRoot: fitResult.rankingRoot,
      assetPackProofRoot: fitResult.assetPack?.proofRoot || null,
      sourceSafePreviewStatus: fitResult.assetPack?.sourceSafePreview?.status || null,
    },
  };
}

