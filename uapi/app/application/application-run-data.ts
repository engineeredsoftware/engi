import type { DeliverablesDoc } from '@/components/base/engi/execution/DeliverablesDocPanel';
import type { PipelineExecution } from '@/types/api';

export type WorkspaceRun = Pick<PipelineExecution, 'id' | 'created_at' | 'type' | 'status'> & {
  summary?: string | null;
  repository?: string | null;
  branch?: string | null;
  itemCount?: number;
  tokenTotal?: number | null;
  creditsTotal?: number | null;
  usdTotal?: number | null;
  averageLatencyMs?: number | null;
  proofStatus?: string | null;
  closureFocus?: string | null;
};

export const MOCK_RUNS: WorkspaceRun[] = [
  {
    id: 'mock-run-branch-remediation',
    created_at: '2026-04-16T12:00:00.000Z',
    type: 'pipeline:deliverables',
    status: 'completed',
    summary: 'Prepared the active branch artifact pack and bounded proof bundle for review.',
    repository: 'bitcode/bitcode',
    branch: 'bitcode/application-refit',
    itemCount: 6,
    tokenTotal: 18420,
    creditsTotal: 148.4,
    usdTotal: 6.72,
    averageLatencyMs: 1180,
    proofStatus: 'bounded proof bundle ready',
    closureFocus: 'branch artifacts + deliverables',
  },
  {
    id: 'mock-run-measurement-pass',
    created_at: '2026-04-16T11:12:00.000Z',
    type: 'pipeline:measure',
    status: 'completed',
    summary: 'Measured fit pressure, surfaced ranked verification evidence, and refreshed ledger posture.',
    repository: 'bitcode/bitcode',
    branch: 'fit-pressure/review',
    itemCount: 4,
    tokenTotal: 10980,
    creditsTotal: 82.1,
    usdTotal: 3.11,
    averageLatencyMs: 920,
    proofStatus: 'verification witness refreshed',
    closureFocus: 'fit verification + ledger refresh',
  },
  {
    id: 'mock-run-proof-refresh',
    created_at: '2026-04-16T10:34:00.000Z',
    type: 'pipeline:proof',
    status: 'running',
    summary: 'Refreshing proof-family witnesses against the current V25 canon / V26 draft posture.',
    repository: 'bitcode/bitcode',
    branch: 'proof-refresh/v26',
    itemCount: 3,
    tokenTotal: 7640,
    creditsTotal: 54.6,
    usdTotal: 2.08,
    averageLatencyMs: 1325,
    proofStatus: 'proof-family refresh in flight',
    closureFocus: 'settlement proof + canon posture',
  },
];

export const MOCK_RUN_DELIVERABLES: Record<string, DeliverablesDoc> = {
  'mock-run-branch-remediation': {
    pullRequest: {
      url: 'https://github.com/bitcode/bitcode/pull/268',
      number: 268,
      title: 'Refactor Bitcode application branch-artifact detail workspace',
      description:
        'Pulls the remediated branch artifact pack into the application-owned detail surface and tightens bounded proof grouping.',
    },
    pullRequestReviews: [
      {
        url: 'https://github.com/bitcode/bitcode/pull/268#pullrequestreview-1',
        number: 1,
        title: 'Review remediation workspace wiring',
        description: 'Confirms branch visibility, proof grouping, and run-detail entry posture for `/application`.',
      },
    ],
    issues: [
      {
        url: 'https://github.com/bitcode/bitcode/issues/411',
        number: 411,
        title: 'Tighten branch artifact disclosure grouping',
        description: 'Track final grouping rules for remediation bundles, visibility posture, and operator disclosure notes.',
      },
    ],
    comments: [
      {
        url: 'https://github.com/bitcode/bitcode/issues/411#issuecomment-1',
        number: 411,
        title: 'Operator note',
        description: 'The inward application workspace now reads the branch artifacts before leaving to compatibility routes.',
      },
    ],
    fileChanges: {
      edited: 6,
      created: 2,
      deleted: 0,
      paths: ['uapi/app/application/ApplicationRunWorkspace.tsx', 'uapi/app/application/ApplicationPageClient.tsx'],
    },
    summary:
      'The branch remediation pack now reads as an application-native workspace surface. Operators can inspect the proposed pull request, reviews, issues, and disclosure notes without abandoning `/application`.',
  },
  'mock-run-measurement-pass': {
    pullRequest: null,
    pullRequestReviews: null,
    issues: [
      {
        url: 'https://github.com/bitcode/bitcode/issues/412',
        number: 412,
        title: 'Calibrate fit-pressure display tiers',
        description: 'Capture the measurement adjustments surfaced by the latest deterministic review pass.',
      },
    ],
    comments: [
      {
        url: 'https://github.com/bitcode/bitcode/issues/412#issuecomment-1',
        number: 412,
        title: 'Measurement note',
        description: 'Normalization fit and decisive fit are now separated more clearly for operator reading.',
      },
    ],
    summary:
      'Measurement results were refreshed and tied back into the Bitcode fit-reading model so the application page can present verification pressure without leaving the main route.',
  },
  'mock-run-proof-refresh': {
    pullRequest: null,
    pullRequestReviews: null,
    issues: null,
    comments: null,
    summary:
      'Proof-family witnesses are still refreshing. Mock review keeps the application workspace legible while the final proof bundle remains in-flight.',
  },
};
