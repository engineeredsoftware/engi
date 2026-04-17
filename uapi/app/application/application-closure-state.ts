import type { KeyValueRow, Metric } from './application-shell-reading';

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
    needLifecycle?: string | null;
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
    creditCount?: number | null;
    proofFamilyCount?: number | null;
    proofFamilies?: ClosureProofFamilySnapshot[] | null;
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

export type ApplicationClosureCandidate = {
  title: string;
  artifactKind: string;
  score: string;
  rights: string;
  strongestSignals: string[];
};

export type ApplicationClosureProofFamily = {
  label: string;
  artifactPath: string;
  theoremStatus: string;
  replayArtifacts: string;
};

export type ApplicationClosureHistoryEntry = {
  label: string;
  summary: string;
};

export type ApplicationClosurePanel = {
  id: 'verification' | 'branch' | 'settlement' | 'ledger';
  label: string;
  summary: string;
  metrics: Metric[];
  rows: KeyValueRow[];
  chips: string[];
  candidates?: ApplicationClosureCandidate[];
  proofFamilies?: ApplicationClosureProofFamily[];
  recentRuns?: ApplicationClosureHistoryEntry[];
};

export type ApplicationClosureState = {
  canonLabel: string;
  verification: ApplicationClosurePanel;
  branch: ApplicationClosurePanel;
  settlement: ApplicationClosurePanel;
  ledger: ApplicationClosurePanel;
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

export function normalizeApplicationClosureState(snapshot: ShellSnapshot): ApplicationClosureState | null {
  if (!snapshot?.closureSurface) return null;

  const verification = snapshot.closureSurface.verification || {};
  const branch = snapshot.closureSurface.branch || {};
  const settlement = snapshot.closureSurface.settlement || {};
  const ledger = snapshot.closureSurface.ledger || {};
  const proofFamilies = (settlement.proofFamilies || []).filter(Boolean);
  const visibleArtifacts = (branch.visibleArtifacts || []).map((entry) => String(entry || '').trim()).filter(Boolean);
  const ledgerAccounts = (ledger.accounts || []).filter(Boolean);
  const recentRuns = (ledger.recentRuns || []).filter(Boolean);

  return {
    canonLabel: stringValue(snapshot.canonLabel, 'Bitcode active posture'),
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
        { label: 'Need lifecycle', value: stringValue(branch.needLifecycle) },
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
        { label: 'Debit lines', value: numberValue(settlement.debitCount) },
        { label: 'Credit lines', value: numberValue(settlement.creditCount) },
      ],
      rows: [
        { label: 'Bundle', value: stringValue(settlement.bundleId) },
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
        .filter((value) => value !== '—')
        .slice(0, 8),
      proofFamilies: proofFamilies.slice(0, 4).map((entry) => ({
        label: stringValue(entry?.proofFamily, 'Proof family'),
        artifactPath: stringValue(entry?.proofArtifactPath),
        theoremStatus: entry?.allTheoremsPassed === true ? 'passed' : 'drift',
        replayArtifacts: numberValue(entry?.replayArtifactCount),
      })),
    },
    ledger: {
      id: 'ledger',
      label: stringValue(ledger.label, 'Ledger + run history'),
      summary:
        recentRuns.length > 0
          ? 'Ledger and run history remain inside the same master-detail closure space as proof and settlement.'
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
