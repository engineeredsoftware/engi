import type { KeyValueRow, Metric } from './terminal-shell-reading';

type ClosureCandidateSnapshot = {
  assetId?: string | null;
  title?: string | null;
  artifactKind?: string | null;
  score?: number | null;
  useTier?: string | null;
  strongestSignals?: string[] | null;
  branchEligible?: boolean | null;
  settlementEligible?: boolean | null;
};

type ClosureProofFamilySnapshot = {
  proofFamily?: string | null;
  proofArtifactPath?: string | null;
  allTheoremsPassed?: boolean | null;
  memberCount?: number | null;
  theoremCount?: number | null;
  replayArtifactCount?: number | null;
};

type ClosureReadReviewSnapshot = {
  label?: string | null;
  readId?: string | null;
  protocolFocus?: string | null;
  reviewStage?: string | null;
  reviewAction?: string | null;
  reviewStatus?: string | null;
  reviewer?: string | null;
  decisionMode?: string | null;
  fitSearchAdmitted?: boolean | null;
  admissionReason?: string | null;
  allowedActions?: string[] | null;
  measuredTask?: string | null;
  measurementHash?: string | null;
  reviewableReadRef?: string | null;
};

type ClosureFitQualitySnapshot = {
  label?: string | null;
  qualityId?: string | null;
  value?: string | null;
  weightBp?: number | null;
  evidenceClass?: string | null;
};

type ClosureLedgerAccountSnapshot = {
  label?: string | null;
  value?: string | null;
};

type ClosureRunHistorySnapshot = {
  runId?: string | null;
  repo?: string | null;
  branchName?: string | null;
  bundleId?: string | null;
  status?: string | null;
  creditedAssetCount?: number | null;
};

type ClosureSurfaceSnapshot = {
  readReview?: ClosureReadReviewSnapshot | null;
  verification?: {
    label?: string | null;
    candidateCount?: number | null;
    selectedAssetCount?: number | null;
    branchEligibleCount?: number | null;
    settlementEligibleCount?: number | null;
    verificationState?: string | null;
    summary?: string | null;
    topCandidates?: ClosureCandidateSnapshot[] | null;
  } | null;
  branch?: {
    label?: string | null;
    branchName?: string | null;
    branchMode?: string | null;
    readLifecycle?: string | null;
    confidentiality?: string | null;
    projectionPrincipal?: string | null;
    visibleArtifactCount?: number | null;
    visibleArtifacts?: string[] | null;
    proofFamilyCount?: number | null;
    replayArtifactCount?: number | null;
    summary?: string | null;
  } | null;
  settlement?: {
    label?: string | null;
    bundleId?: string | null;
    creditedAssetCount?: number | null;
    participatingAssetCount?: number | null;
    debitCount?: number | null;
    settlementEntryCount?: number | null;
    proofFamilyCount?: number | null;
    proofFamilies?: ClosureProofFamilySnapshot[] | null;
    protocolFocus?: string | null;
    reviewStage?: string | null;
    quantizedObjectiveContractId?: string | null;
    sourceToSharesRef?: string | null;
    fitQualityHash?: string | null;
    receiptRefs?: string[] | null;
    fitQualities?: ClosureFitQualitySnapshot[] | null;
    settlementIntentSummary?: string | null;
  } | null;
  ledger?: {
    label?: string | null;
    accountCount?: number | null;
    historyCount?: number | null;
    accounts?: ClosureLedgerAccountSnapshot[] | null;
    recentRuns?: ClosureRunHistorySnapshot[] | null;
  } | null;
} | null;

type ShellSnapshot = {
  canonLabel?: string | null;
  closureSurface?: ClosureSurfaceSnapshot;
} | null;

export type TerminalClosureCandidate = {
  title: string;
  artifactKind: string;
  score: string;
  rights: string;
  strongestSignals: string[];
};

export type TerminalClosureProofFamily = {
  label: string;
  artifactPath: string;
  theoremStatus: string;
  replayArtifacts: string;
};

export type TerminalClosureFitQuality = {
  label: string;
  value: string;
  detail: string;
};

export type TerminalClosureHistoryEntry = {
  label: string;
  summary: string;
};

export type TerminalClosurePanel = {
  id: 'read-review' | 'verification' | 'branch' | 'settlement' | 'ledger';
  label: string;
  summary: string;
  metrics: Metric[];
  rows: KeyValueRow[];
  chips: string[];
  candidates?: TerminalClosureCandidate[];
  proofFamilies?: TerminalClosureProofFamily[];
  fitQualities?: TerminalClosureFitQuality[];
  recentRuns?: TerminalClosureHistoryEntry[];
};

export type TerminalClosureState = {
  canonLabel: string;
  readReview: TerminalClosurePanel;
  verification: TerminalClosurePanel;
  branch: TerminalClosurePanel;
  settlement: TerminalClosurePanel;
  ledger: TerminalClosurePanel;
};

function numberValue(value: number | null | undefined) {
  return typeof value === 'number' && Number.isFinite(value) ? String(value) : '0';
}

function stringValue(value: unknown, fallback = '—') {
  const resolved = typeof value === 'string' ? value.trim() : '';
  return resolved || fallback;
}

function listValue(values: (string | null | undefined)[] | null | undefined, fallback = '—') {
  const resolved = (values || []).map((value) => String(value || '').trim()).filter(Boolean);
  return resolved.length ? resolved.join(', ') : fallback;
}

export function normalizeTerminalClosureState(snapshot: ShellSnapshot): TerminalClosureState | null {
  if (!snapshot?.closureSurface) return null;

  const readReview = snapshot.closureSurface.readReview || {};
  const verification = snapshot.closureSurface.verification || {};
  const branch = snapshot.closureSurface.branch || {};
  const settlement = snapshot.closureSurface.settlement || {};
  const ledger = snapshot.closureSurface.ledger || {};
  const proofFamilies = (settlement.proofFamilies || []).filter(Boolean);
  const fitQualities = (settlement.fitQualities || []).filter(Boolean);
  const reviewActions = (readReview.allowedActions || []).map((entry) => String(entry || '').trim()).filter(Boolean);
  const receiptRefs = (settlement.receiptRefs || []).map((entry) => String(entry || '').trim()).filter(Boolean);
  const visibleArtifacts = (branch.visibleArtifacts || []).map((entry) => String(entry || '').trim()).filter(Boolean);
  const ledgerAccounts = (ledger.accounts || []).filter(Boolean);
  const recentRuns = (ledger.recentRuns || []).filter(Boolean);

  return {
    canonLabel: stringValue(snapshot.canonLabel, 'Bitcode active posture'),
    readReview: {
      id: 'read-review',
      label: stringValue(readReview.label, 'Read review before fit search'),
      summary: stringValue(
        readReview.admissionReason || readReview.measuredTask,
        'Measured Read must be accepted, rejected, or sent back for remeasurement before Bitcode can search for fitting AssetPacks.',
      ),
      metrics: [
        { label: 'Review action', value: stringValue(readReview.reviewAction) },
        { label: 'Review status', value: stringValue(readReview.reviewStatus) },
        { label: 'Fit search admitted', value: readReview.fitSearchAdmitted === true ? 'yes' : 'no' },
        { label: 'Protocol focus', value: stringValue(readReview.protocolFocus, 'source-to-shares') },
      ],
      rows: [
        { label: 'Read', value: stringValue(readReview.readId) },
        { label: 'Review stage', value: stringValue(readReview.reviewStage, 'post-measurement-pre-fit') },
        { label: 'Reviewer', value: stringValue(readReview.reviewer) },
        { label: 'Decision mode', value: stringValue(readReview.decisionMode) },
        { label: 'Allowed actions', value: listValue(reviewActions) },
        { label: 'Measurement hash', value: stringValue(readReview.measurementHash) },
        { label: 'Reviewable Read ref', value: stringValue(readReview.reviewableReadRef) },
      ],
      chips: [
        stringValue(readReview.reviewStage, ''),
        stringValue(readReview.protocolFocus, ''),
        ...reviewActions,
      ].filter(Boolean),
    },
    verification: {
      id: 'verification',
      label: stringValue(verification.label, 'Verification + ranked candidates'),
      summary:
        stringValue(
          verification.summary,
          'Verification remains the gate between fit and downstream branch or settlement rights.',
        ),
      metrics: [
        { label: 'Candidates', value: numberValue(verification.candidateCount) },
        { label: 'Selected assets', value: numberValue(verification.selectedAssetCount) },
        { label: 'Branch-ready', value: numberValue(verification.branchEligibleCount) },
        { label: 'Settlement-ready', value: numberValue(verification.settlementEligibleCount) },
      ],
      rows: [
        { label: 'Verification state', value: stringValue(verification.verificationState) },
        { label: 'Primary closure', value: 'verification precedes branch + settlement' },
      ],
      chips: (verification.topCandidates || [])
        .map((candidate) => stringValue(candidate?.title, ''))
        .filter((value) => value !== '—')
        .slice(0, 6),
      candidates: (verification.topCandidates || []).slice(0, 4).map((candidate) => ({
        title: stringValue(candidate?.title, 'Evaluated candidate'),
        artifactKind: stringValue(candidate?.artifactKind),
        score:
          typeof candidate?.score === 'number' && Number.isFinite(candidate.score)
            ? String(candidate.score)
            : 'n/a',
        rights: [
          candidate?.branchEligible ? 'branch' : null,
          candidate?.settlementEligible ? 'settlement' : null,
          stringValue(candidate?.useTier, '').trim() || null,
        ]
          .filter(Boolean)
          .join(' · ') || 'no downstream right',
        strongestSignals: (candidate?.strongestSignals || [])
          .map((entry) => String(entry || '').trim())
          .filter(Boolean)
          .slice(0, 3),
      })),
    },
    branch: {
      id: 'branch',
      label: stringValue(branch.label, 'Branch artifacts'),
      summary: stringValue(
        branch.summary,
        'Branch artifacts are the materialized closure bundle behind the active Bitcode projection.',
      ),
      metrics: [
        { label: 'Visible artifacts', value: numberValue(branch.visibleArtifactCount) },
        { label: 'Proof families', value: numberValue(branch.proofFamilyCount) },
        { label: 'Replay artifacts', value: numberValue(branch.replayArtifactCount) },
        { label: 'Projection', value: stringValue(branch.projectionPrincipal) },
      ],
      rows: [
        { label: 'Branch', value: stringValue(branch.branchName) },
        { label: 'Branch mode', value: stringValue(branch.branchMode) },
        { label: 'Read lifecycle', value: stringValue(branch.readLifecycle) },
        { label: 'Confidentiality', value: stringValue(branch.confidentiality) },
      ],
      chips: visibleArtifacts.slice(0, 8),
    },
    settlement: {
      id: 'settlement',
      label: stringValue(settlement.label, 'Settlement + proof'),
      summary: stringValue(
        settlement.settlementIntentSummary,
        'Settlement closes the active fit with replayable source-to-shares and proof-bearing accounting.',
      ),
      metrics: [
        { label: 'Credited assets', value: numberValue(settlement.creditedAssetCount) },
        { label: 'Participating assets', value: numberValue(settlement.participatingAssetCount) },
        { label: 'Fit qualities', value: numberValue(fitQualities.length) },
        { label: 'Receipts', value: numberValue(receiptRefs.length) },
      ],
      rows: [
        { label: 'Bundle', value: stringValue(settlement.bundleId) },
        { label: 'Present-fit review', value: stringValue(settlement.reviewStage, 'present-fit-for-settlement-review') },
        { label: 'Objective contract', value: stringValue(settlement.quantizedObjectiveContractId) },
        { label: 'Source-to-shares ref', value: stringValue(settlement.sourceToSharesRef) },
        { label: 'Fit-quality hash', value: stringValue(settlement.fitQualityHash) },
        { label: 'Proof families', value: numberValue(settlement.proofFamilyCount) },
        {
          label: 'Proof posture',
          value: proofFamilies.every((entry) => entry?.allTheoremsPassed === true)
            ? 'theorem closed'
            : proofFamilies.length
              ? 'theorem drift visible'
              : 'pending proof family read',
        },
      ],
      chips: proofFamilies
        .map((entry) => stringValue(entry?.proofFamily, ''))
        .concat(fitQualities.map((entry) => stringValue(entry?.qualityId || entry?.label, '')))
        .filter((value) => value !== '—')
        .slice(0, 8),
      proofFamilies: proofFamilies.slice(0, 4).map((entry) => ({
        label: stringValue(entry?.proofFamily, 'Proof family'),
        artifactPath: stringValue(entry?.proofArtifactPath),
        theoremStatus: entry?.allTheoremsPassed === true ? 'passed' : 'drift',
        replayArtifacts: numberValue(entry?.replayArtifactCount),
      })),
      fitQualities: fitQualities.slice(0, 5).map((entry) => ({
        label: stringValue(entry?.label || entry?.qualityId, 'Source-to-shares fit quality'),
        value: stringValue(entry?.value, '0'),
        detail: listValue([
          entry?.weightBp === null || entry?.weightBp === undefined ? '' : `${entry.weightBp} bp`,
          stringValue(entry?.evidenceClass, ''),
        ]),
      })),
    },
    ledger: {
      id: 'ledger',
      label: stringValue(ledger.label, 'Ledger + run history'),
      summary:
        recentRuns.length > 0
          ? 'Ledger and run history remain inside the same Terminal closure space as proof and settlement.'
          : 'Ledger state is ready even when run history has not accumulated yet.',
      metrics: [
        { label: 'Accounts', value: numberValue(ledger.accountCount) },
        { label: 'History items', value: numberValue(ledger.historyCount) },
        { label: 'Visible accounts', value: numberValue(ledgerAccounts.length) },
        { label: 'Recent runs', value: numberValue(recentRuns.length) },
      ],
      rows: ledgerAccounts.slice(0, 6).map((entry) => ({
        label: stringValue(entry?.label, 'Account'),
        value: stringValue(entry?.value),
      })),
      chips: recentRuns
        .map((entry) => stringValue(entry?.bundleId || entry?.runId, ''))
        .filter((value) => value !== '—')
        .slice(0, 6),
      recentRuns: recentRuns.slice(0, 4).map((entry) => ({
        label: stringValue(entry?.runId, 'run'),
        summary: listValue(
          [
            stringValue(entry?.repo, ''),
            stringValue(entry?.branchName, ''),
            stringValue(entry?.status, ''),
            typeof entry?.creditedAssetCount === 'number'
              ? `${entry.creditedAssetCount} credited`
              : '',
          ],
          'no run summary',
        ),
      })),
    },
  };
}
