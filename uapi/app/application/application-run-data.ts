import type { DeliverablesDoc } from '@/components/base/engi/execution/DeliverablesDocPanel';
import type { PipelineExecution } from '@/types/api';

export type WorkspaceRun = Pick<PipelineExecution, 'id' | 'created_at' | 'type' | 'status'> & {
  summary?: string | null;
  repository?: string | null;
  branch?: string | null;
  participant?: string | null;
  isOwnTransaction?: boolean;
  transactionLens?: 'give' | 'need' | 'closure';
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
    participant: 'garrett',
    isOwnTransaction: true,
    transactionLens: 'give',
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
    participant: 'research-partner',
    isOwnTransaction: false,
    transactionLens: 'need',
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
    participant: 'garrett',
    isOwnTransaction: true,
    transactionLens: 'closure',
    itemCount: 3,
    tokenTotal: 7640,
    creditsTotal: 54.6,
    usdTotal: 2.08,
    averageLatencyMs: 1325,
    proofStatus: 'proof-family refresh in flight',
    closureFocus: 'settlement proof + canon posture',
  },
];

const MOCK_RUN_IDS = new Set(MOCK_RUNS.map((run) => run.id));

export function isMockWorkspaceRunId(runId?: string | null) {
  return !!runId && MOCK_RUN_IDS.has(runId);
}

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
      paths: ['uapi/app/application/ApplicationTransactionWorkspace.tsx', 'uapi/app/application/ApplicationPageClient.tsx'],
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

export const MOCK_RUN_ACTIVITY: Record<
  string,
  {
    output: string;
    outputDetails: Record<string, any>;
    executionState: Record<string, any>;
    latestWorkUpdate?: any;
    iterationUpdates?: any[];
    isStreamingComplete?: boolean;
    generationCount?: number;
    error?: string | null;
  }
> = {
  'mock-run-branch-remediation': {
    output: [
      '[pipeline:running]',
      '[phase:running] Branch remediation',
      '[agent:running] Branch synthesizer',
      '[completion]',
    ].join('\n'),
    outputDetails: {
      '[pipeline:running]': { type: 'pipeline', status: 'running', timestamp: '2026-04-16T12:00:10.000Z' },
      '[phase:running] Branch remediation': {
        type: 'phase',
        status: 'running',
        phase: 'Branch remediation',
        timestamp: '2026-04-16T12:00:20.000Z',
      },
      '[agent:running] Branch synthesizer': {
        type: 'agent',
        status: 'running',
        agent: 'Branch synthesizer',
        timestamp: '2026-04-16T12:00:26.000Z',
      },
      '[completion]': { type: 'completion', timestamp: '2026-04-16T12:02:00.000Z' },
    },
    executionState: {
      phase: 'Branch remediation',
      agent: 'Branch synthesizer',
      step: 'prepare_concise_context',
      generation: 'deliverable bundle',
    },
    latestWorkUpdate: {
      id: 'wu-1',
      iteration: 2,
      confidence: 0.94,
      prose: 'Remediation branch artifacts and deliverable surfaces are aligned for application review.',
      timestamp: '2026-04-16T12:01:40.000Z',
    },
    iterationUpdates: [
      {
        id: 'wu-1',
        iteration: 1,
        confidence: 0.66,
        prose: 'Initial remediation branch bundle prepared.',
        timestamp: '2026-04-16T12:00:48.000Z',
      },
      {
        id: 'wu-2',
        iteration: 2,
        confidence: 0.94,
        prose: 'Remediation branch artifacts and deliverable surfaces are aligned for application review.',
        timestamp: '2026-04-16T12:01:40.000Z',
      },
    ],
    isStreamingComplete: true,
    generationCount: 2,
  },
  'mock-run-measurement-pass': {
    output: ['[pipeline:running]', '[phase:running] Measurement refresh', '[completion]'].join('\n'),
    outputDetails: {
      '[pipeline:running]': { type: 'pipeline', status: 'running', timestamp: '2026-04-16T11:12:04.000Z' },
      '[phase:running] Measurement refresh': {
        type: 'phase',
        status: 'running',
        phase: 'Measurement refresh',
        timestamp: '2026-04-16T11:12:20.000Z',
      },
      '[completion]': { type: 'completion', timestamp: '2026-04-16T11:13:02.000Z' },
    },
    executionState: {
      phase: 'Measurement refresh',
      agent: 'Fit analyzer',
      step: 'chunk_then_sum',
      generation: 'verification update',
    },
    latestWorkUpdate: {
      id: 'wu-3',
      iteration: 1,
      confidence: 0.88,
      prose: 'Normalization and decisive fit tiers were refreshed for the selected scenario.',
      timestamp: '2026-04-16T11:12:48.000Z',
    },
    iterationUpdates: [
      {
        id: 'wu-3',
        iteration: 1,
        confidence: 0.88,
        prose: 'Normalization and decisive fit tiers were refreshed for the selected scenario.',
        timestamp: '2026-04-16T11:12:48.000Z',
      },
    ],
    isStreamingComplete: true,
    generationCount: 1,
  },
  'mock-run-proof-refresh': {
    output: ['[pipeline:running]', '[agent:running] Proof witness generator'].join('\n'),
    outputDetails: {
      '[pipeline:running]': { type: 'pipeline', status: 'running', timestamp: '2026-04-16T10:34:04.000Z' },
      '[agent:running] Proof witness generator': {
        type: 'agent',
        status: 'running',
        agent: 'Proof witness generator',
        timestamp: '2026-04-16T10:34:26.000Z',
      },
    },
    executionState: {
      phase: 'Proof refresh',
      agent: 'Proof witness generator',
      step: 'stitch_until_complete',
      generation: 'proof witness',
    },
    latestWorkUpdate: {
      id: 'wu-4',
      iteration: 1,
      confidence: 0.58,
      prose: 'Proof-family witnesses are still refreshing against the current canon posture.',
      timestamp: '2026-04-16T10:35:10.000Z',
    },
    iterationUpdates: [
      {
        id: 'wu-4',
        iteration: 1,
        confidence: 0.58,
        prose: 'Proof-family witnesses are still refreshing against the current canon posture.',
        timestamp: '2026-04-16T10:35:10.000Z',
      },
    ],
    isStreamingComplete: false,
    generationCount: 1,
  },
};
