// @ts-check

import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildInitialState, runMakeBitcodeBranch } from '../bitcode-demo.js';
import { buildV18Matrices, summarizeV18Matrix } from './v18-matrices.js';
import {
  buildV19DeterministicReplayReport,
  buildV19GeneratedArtifactContents,
  buildV19PositiveMatrices,
  buildV19Reports,
  summarizeArtifactContents
} from './v19-canon.js';
import {
  buildV20GeneratedArtifactContents,
  buildV20QualityReports
} from './v20-quality.js';
import {
  buildV21CanonicalInputReport,
  buildV21GeneratedArtifactContents,
  buildV21SpecFamilyReport
} from './v21-specifying.js';
import {
  buildV25CanonPostureDriftReport,
  buildV24CanonPostureDriftReport,
  buildV23CanonPostureDriftReport,
  buildV22CanonPostureDriftReport,
  buildV25GeneratedArtifactContents,
  buildV24GeneratedArtifactContents,
  buildV23GeneratedArtifactContents,
  buildV22GeneratedArtifactContents
} from './v22-canon-posture.js';
import { BITCOIN_PAYMENT_MODES } from './v23-bitcoin.js';
import { ACTIVE_CANON_VERSION } from '../canon-posture.js';

export const DEFAULT_PROVEN_BRANCH_MODES = ['patch', 'context'];
export const DEFAULT_V23_PROVEN_PAYMENT_MODES = [...BITCOIN_PAYMENT_MODES];
export const DEFAULT_V24_PROVEN_PAYMENT_MODES = [...BITCOIN_PAYMENT_MODES];
export const DEFAULT_V25_PROVEN_PAYMENT_MODES = [...BITCOIN_PAYMENT_MODES];
export const DEFAULT_V26_PROVEN_PAYMENT_MODES = [...BITCOIN_PAYMENT_MODES];
export const PROVEN_GENERATOR_ID = 'bitcode.proven-generator.v1';
const NON_DIGESTED_RECURSIVE_ARTIFACT_PATHS = ['.engi/system-proof-bundle.json', '.engi/proof-witness-manifest.json'];
const PROVEN_PROFILE_ENABLED = process.env.BITCODE_PROVEN_PROFILE === '1';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '../../..');

/**
 * @param {string} version
 * @returns {number}
 */
function versionNumber(version) {
  return Number(String(version || '').replace(/^V/u, ''));
}

/**
 * @param {string} version
 * @returns {boolean}
 */
function usesBitcodeSpecFamily(version) {
  return Number.isInteger(versionNumber(version)) && versionNumber(version) >= 26;
}

/**
 * @param {string} version
 * @returns {string}
 */
function defaultSpecProvenPath(version) {
  return usesBitcodeSpecFamily(version)
    ? `BITCODE_SPEC_${version}_PROVEN.md`
    : `_legacy/ENGI_SPEC_${version}_PROVEN.md`;
}
const V26_SECOND_GATE_APPLICATION_FILES = [
  'uapi/app/application/ApplicationPageClient.tsx',
  'uapi/app/application/ApplicationTransactionWorkspace.tsx',
  'uapi/app/application/ApplicationTransactionDetailSurface.tsx',
  'uapi/app/application/ApplicationCommandDeck.tsx',
  'uapi/app/application/ApplicationWorkspaceRail.tsx',
  'uapi/app/auxillaries/AuxillariesRouteClient.tsx',
  'uapi/app/auxillaries/components/AuxillariesProvider.tsx',
  'uapi/app/auxillaries/components/AuxillariesConnectsPane.tsx',
  'uapi/app/auxillaries/components/AuxillariesInterfacesPane.tsx',
  'uapi/app/auxillaries/components/AuxillariesBTDPane.tsx',
  'uapi/components/base/bitcode/layout/nav.tsx',
  'uapi/components/base/bitcode/layout/user-menu.tsx',
  'uapi/components/base/bitcode/notifications/NotificationsWidget.tsx',
  'uapi/styles/orbital.css'
];
const V26_SECOND_GATE_PROOF_FILES = [
  'protocol-demonstration/test/v26-public-copy.test.js',
  'uapi/tests/orbitalsProvider.test.tsx',
  'uapi/tests/orbitalsInterfacesPane.test.tsx',
  'uapi/tests/orbitalsBTDPane.test.tsx',
  'uapi/tests/navWorkspaceChrome.test.tsx',
  'uapi/tests/notificationsWidget.test.tsx',
  'uapi/tests/orbitalsLoginPane.test.tsx',
  'uapi/tests/orbitalsContent.test.tsx',
  'uapi/tests/orbitalsPaneTabs.test.tsx',
  'uapi/tests/orbitalsRouteClient.test.tsx',
  'uapi/tests/userMenu.test.tsx',
  'uapi/tests/workspaceSurface.test.ts'
];
const V26_SECOND_GATE_DOCUMENTATION_FILES = [
  'README.md',
  'uapi/README.md',
  'protocol-demonstration/README.md',
  'uapi/app/application/README.md',
  'uapi/app/orbitals/README.md',
  'uapi/components/base/bitcode/README.md',
  'uapi/components/base/bitcode/execution/README.md',
  'protocol-demonstration/V26_APPLICATION_SYSTEMS.md',
  'protocol-demonstration/V26_PROOF_SURFACES.md'
];
const V26_THIRD_GATE_PREPARATION_FILES = [
  'uapi/app/(root)/components/MarketingLandingPage.tsx',
  'BITCODE_SPEC_V26_DELTA.md',
  'BITCODE_SPEC_V26_NOTES.md',
  'BITCODE_SPEC_V26_PARITY_MATRIX.md',
  'protocol-demonstration/V26_APPLICATION_SYSTEMS.md',
  'protocol-demonstration/V26_PROOF_SURFACES.md'
];
const V26_THIRD_GATE_APPLICATION_FILES = [
  'uapi/app/page.tsx',
  'uapi/app/docs/page.tsx',
  'uapi/app/demo-video/page.tsx',
  'uapi/app/(root)/components/PublicShellFrame.tsx',
  'uapi/app/(root)/components/MarketingLandingPage.tsx',
  'uapi/app/(root)/components/PublicDocsPageContent.tsx',
  'uapi/app/(root)/components/MarketingOperatorGuideCard.tsx',
  'uapi/components/base/bitcode/layout/nav.tsx',
  'uapi/components/base/bitcode/layout/footer.tsx',
  'uapi/components/base/bitcode/layout/NavBrand.tsx',
  'uapi/components/base/bitcode/layout/bitcode-public-copy.ts',
  'uapi/components/base/bitcode/layout/bitcode-public-explainers.ts'
];
const V26_THIRD_GATE_PROOF_FILES = [
  'uapi/tests/marketingLandingPage.test.tsx',
  'uapi/tests/marketingOperatorGuideCard.test.tsx',
  'uapi/tests/publicDocsPageContent.test.tsx',
  'uapi/tests/navPublicShell.test.tsx',
  'uapi/tests/footerPublicShell.test.tsx',
  'uapi/tests/navBrand.test.tsx'
];
const V26_THIRD_GATE_DOCUMENTATION_FILES = [
  'README.md',
  'uapi/README.md',
  'BITCODE_SPEC_V26_DELTA.md',
  'BITCODE_SPEC_V26_NOTES.md',
  'protocol-demonstration/V26_APPLICATION_SYSTEMS.md',
  'protocol-demonstration/V26_PROOF_SURFACES.md'
];
const V26_FOURTH_GATE_PERSISTENCE_FILES = [
  'supabase/migrations/001_ga1_production.sql',
  'packages/supabase/src/index.ts',
  'packages/supabase/src/client.ts',
  'packages/supabase/src/ssr/client.ts',
  'packages/supabase/src/ssr/server.ts',
  'packages/supabase/src/ssr/middleware.ts',
  'packages/orm/src/client.ts',
  'packages/orm/src/models/index.ts',
  'packages/orm/src/queries/field-intelligence.ts',
  'packages/orm/src/queries/vector.ts',
  'packages/orm/src/types/database.generated.ts',
  'packages/orm/src/types/database.ts',
  'packages/orm/scripts/generate-db-types.ts',
  'packages/orm/scripts/generate-db-types.js',
  'uapi/app/edgetimes/edgetimes-topology.ts',
  'uapi/app/edgetimes/EdgetimesPageContent.tsx',
  'uapi/app/edgetimes/page.tsx',
  'uapi/app/api/edgetimes/route.ts',
  'uapi/tests/edgetimesPageContent.test.tsx',
  'uapi/tests/api/edgetimesRoute.test.ts',
  'protocol-demonstration/V26_APPLICATION_SYSTEMS.md',
  'protocol-demonstration/V26_PROOF_SURFACES.md'
];
const V26_FOURTH_GATE_UNRESOLVED_TABLES = [
  'deliverable_vectors',
  'deliverable_run_phases',
  'run_jobs',
  'run_otf_instructions',
  'stream_logs',
  'generated_assets',
  'events',
  'error_logs',
  'token_costs'
];
const V26_FOURTH_GATE_CONVERSATION_FILES = [
  'uapi/app/conversations/page.tsx',
  'uapi/app/conversations/ConversationsRouteClient.tsx',
  'uapi/app/conversations/README.md',
  'uapi/app/conversations/components/ConversationsOverlay.tsx',
  'uapi/app/ClientLayoutInner.tsx',
  'uapi/app/application/ApplicationPageClient.tsx',
  'uapi/app/api/conversations/route.ts',
  'uapi/app/api/conversations/stream/route.ts',
  'uapi/app/api/conversations/[conversationId]/stream/route.ts',
  'uapi/app/api/conversations/branch/route.ts',
  'uapi/app/api/conversations/_shared.ts',
  'packages/conversations-generics/src/index.ts',
  'packages/conversations-generics/src/agent/ConversationAgent.ts',
  'packages/conversations-generics/src/prompts/ConversationSystemPrompt.ts',
  'packages/api/src/conversations/conversations.ts',
  'packages/api/src/conversations/streaming.ts',
  'uapi/tests/api/conversationsRoute.test.ts',
  'uapi/tests/api/chatStreamRoute.test.ts',
  'uapi/tests/conversationsRouteClient.test.tsx'
];
const V26_FOURTH_GATE_ACTIVITY_FILES = [
  'uapi/components/base/bitcode/activity/bitcode-activity-model.ts',
  'uapi/app/application/application-run-activity.ts',
  'uapi/app/application/ApplicationTransactionActivitySurface.tsx',
  'uapi/app/api/activity/route.ts',
  'uapi/app/api/auxillaries/notifications/_shared.ts',
  'uapi/app/api/auxillaries/notifications/route.ts',
  'uapi/app/api/auxillaries/notifications/[notificationId]/route.ts',
  'uapi/app/api/auxillaries/profile/route.ts',
  'uapi/app/api/auxillaries/connections/github/route.ts',
  'uapi/app/api/auxillaries/credits/route.ts',
  'uapi/app/api/auxillaries/usage/route.ts',
  'uapi/app/api/auxillaries/transactions/route.ts',
  'uapi/app/api/auxillaries/api-keys/route.ts',
  'uapi/tests/protocol-demonstrationActivityModel.test.ts',
  'uapi/tests/applicationTransactionActivity.test.ts',
  'uapi/tests/api/activityRoute.test.ts',
  'uapi/tests/api/orbitalsNotificationsRoute.test.ts',
  'uapi/tests/api/orbitalsProfileRoute.test.ts',
  'uapi/tests/api/orbitalUsageRoute.test.ts',
  'uapi/tests/api/auxillariesTransactionsRoute.test.ts',
  'uapi/tests/userConnectionsGithubRoute.test.ts',
  'uapi/tests/api/userCreditsRoute.test.ts',
  'uapi/tests/apiKeysRoutes.test.ts',
  'uapi/tests/mcpSmoke.test.ts',
  'uapi/tests/notificationsWidget.test.tsx'
];
const V26_FOURTH_GATE_RUNS_PIPELINES_FILES = [
  'uapi/app/executions/page.tsx',
  'uapi/app/executions/[runId]/page.tsx',
  'uapi/app/executions/README.md',
  'uapi/app/executions/components/ExecutionsPage.tsx',
  'uapi/app/executions/components/ExecutionsPageClient.tsx',
  'uapi/app/executions/components/ExecutionsDetailsView.tsx',
  'uapi/app/api/executions/route.ts',
  'uapi/app/api/executions/history/route.ts',
  'uapi/app/api/executions/history/[runId]/route.ts',
  'uapi/app/api/executions/_shared.ts',
  'uapi/app/api/vcs/route.ts',
  'uapi/app/api/auxillaries/template-preferences/route.ts',
  'uapi/app/api/templates/deliverables/route.ts',
  'packages/api/src/routes/deliverables.ts',
  'packages/api/src/pipelines/branch.ts',
  'packages/execution-generics/src/Execution.ts',
  'packages/execution-generics/src/execution-registry.ts',
  'packages/execution-generics/src/storage/ExecutionStorageAdapter.ts',
  'packages/pipelines-generics/src/execution/PipelineExecution.ts',
  'packages/pipelines-generics/src/execution/PipelineExecutor.ts',
  'packages/pipelines-generics/src/execution/route-pipeline-execution.ts',
  'packages/pipelines/deliverable/src/run.ts',
  'uapi/tests/deliverablesRoute.test.ts',
  'uapi/tests/deliverablesInstallationsRoute.test.ts',
  'uapi/tests/api/deliverables.test.ts',
  'uapi/tests/api/deliverables.persistence.test.ts',
  'uapi/tests/api/vcsCompatibilityRoute.test.ts',
  'uapi/tests/api/orbitalsTemplatePreferencesRoute.test.ts',
  'uapi/tests/api/deliverableTemplatesRoute.test.ts',
  'uapi/tests/deliverablesHistoryRoute.test.ts',
  'uapi/tests/deliverablesHistoryRunRoute.test.ts',
  'uapi/tests/protocol-demonstrationExecutionStreamPanel.test.tsx',
  'uapi/tests/usePipelineExecution.test.tsx'
];
const V26_FOURTH_GATE_PROMPT_SYSTEM_FILES = [
  'packages/prompts/README.md',
  'packages/prompts/src/index.ts',
  'packages/prompts/src/prompt.ts',
  'packages/prompts/src/execution/PromptExecution.ts',
  'packages/prompts/src/parts/PromptPart.ts',
  'packages/prompts/src/__tests__/prompt.test.ts',
  'packages/execution-generics/README.md',
  'packages/execution-generics/src/prompts/ExecutionPrompt.ts',
  'packages/agent-generics/src/prompts/AgentPrompt.ts',
  'packages/conversations-generics/README.md',
  'packages/conversations-generics/src/prompts/ConversationSystemPrompt.ts',
  'packages/generic-agents/jira-processor/src/prompts/system-prompt-jira-processor.ts',
  'packages/generic-agents/jira-processor/src/prompts/agent-prompt-jira-processor.ts',
  'packages/pipelines/deliverable/src/agents/prompts/understand-requirements-prompt.ts',
  'packages/pipelines/deliverable/src/agents/prompts/plan-implementation-prompt.ts'
];
const V26_RETAINED_PACKAGE_ADMISSIONS = [
  {
    packageName: '@bitcode/supabase',
    rationale: 'typed browser/admin/SSR Supabase clients remain the retained persistence entrypoint for Bitcode routes and APIs',
    requiredFiles: [
      'packages/supabase/src/index.ts',
      'packages/supabase/src/client.ts',
      'packages/supabase/src/ssr/client.ts',
      'packages/supabase/src/ssr/server.ts',
      'packages/supabase/src/ssr/middleware.ts'
    ]
  },
  {
    packageName: '@bitcode/orm',
    rationale: 'typed model/query ownership and generated database types remain the retained schema contract layer',
    requiredFiles: [
      'packages/orm/src/client.ts',
      'packages/orm/src/models/index.ts',
      'packages/orm/src/queries/field-intelligence.ts',
      'packages/orm/src/queries/vector.ts',
      'packages/orm/src/types/database.generated.ts',
      'packages/orm/src/types/database.ts',
      'packages/orm/scripts/generate-db-types.ts'
    ]
  },
  {
    packageName: '@bitcode/prompts',
    rationale: 'prompt abstraction remains the retained owner for prompt text and prompt execution contracts',
    requiredFiles: [
      'packages/prompts/README.md',
      'packages/prompts/src/index.ts',
      'packages/prompts/src/prompt.ts',
      'packages/prompts/src/execution/PromptExecution.ts'
    ]
  },
  {
    packageName: '@bitcode/conversations-generics',
    rationale: 'conversation agent and prompt abstractions remain admitted while fullscreen conversations converge inward',
    requiredFiles: [
      'packages/conversations-generics/README.md',
      'packages/conversations-generics/src/index.ts',
      'packages/conversations-generics/src/agent/ConversationAgent.ts',
      'packages/conversations-generics/src/prompts/ConversationSystemPrompt.ts'
    ]
  },
  {
    packageName: '@bitcode/execution-generics',
    rationale: 'retained execution abstractions remain admitted while runs and pipelines converge onto Bitcode semantics',
    role: 'retained runs-and-pipelines abstractions',
    writeBoundary: 'execution orchestration only; settle-write meaning is owned by Bitcode routes and Git/GH-facing carriers',
    requiredFiles: [
      'packages/execution-generics/README.md',
      'packages/execution-generics/src/index.ts',
      'packages/execution-generics/src/Execution.ts',
      'packages/execution-generics/src/execution-registry.ts',
      'packages/execution-generics/src/storage/ExecutionStorageAdapter.ts'
    ]
  },
  {
    packageName: '@bitcode/jira-tools',
    rationale: 'retained Jira MCP tools remain admitted only as reader-first need-ingestion and need-measurement carriers during fourth-gate promotion',
    role: 'old-world Jira read-first ingestion port',
    writeBoundary: 'default scope is authenticated read and normalization; expansive settle-write to Jira comments or attachments is deferred beyond fourth-gate',
    requiredFiles: [
      'packages/generic-tools/mcps-tools/jira/package.json',
      'packages/generic-tools/mcps-tools/jira/src/index.ts'
    ]
  },
  {
    packageName: '@bitcode/generic-agents-jira',
    rationale: 'retained Jira agent prompt ownership remains admitted only where it repurposes Jira data into Bitcode need context instead of generic project-management automation',
    role: 'old-world Jira prompt-owned ingestion agent',
    writeBoundary: 'reader-first Jira scope; propose writes only when explicitly requested and never as the default Bitcode settlement path',
    requiredFiles: [
      'packages/generic-agents/jira-processor/package.json',
      'packages/generic-agents/jira-processor/src/prompts/system-prompt-jira-processor.ts',
      'packages/generic-agents/jira-processor/src/prompts/agent-prompt-jira-processor.ts',
      'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_jira_processor_system_identity.ts',
      'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_jira_processor_system_role.ts',
      'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_jira_processor_system_instructions.ts',
      'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_jiraprocessor_purpose_corestatement.ts',
      'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_jiraprocessor_capabilities_list.ts',
      'packages/prompts/src/raw_promptparts/specific/promptpart_specific_agent_jiraprocessor_executionpattern_detailcontent.ts'
    ]
  },
  {
    packageName: '@bitcode/generic-tools-mcps-github',
    rationale: 'retained GitHub MCP tooling remains admitted as the initial Git/GH-centric settle-write and repository-read boundary for fourth-gate testnet-ready Bitcode',
    role: 'Git/GH-centric initial settle-write port',
    writeBoundary: 'Git/GH branch and PR settlement is admitted in fourth-gate; multi-surface settle writes to other systems remain later-gate work',
    requiredFiles: [
      'packages/generic-tools/mcps-tools/github/package.json',
      'packages/generic-tools/mcps-tools/github/src/GitHubMCPTool.ts',
      'packages/generic-tools/mcps-tools/github/src/prompts/GitHubMCPDocCodeToolPrompt.ts',
      'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_githubmcp_doccodetoolpurpose.ts',
      'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_githubmcp_doccodetoolcapabilities.ts',
      'packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_githubmcp_doccodetooloutput.ts'
    ]
  }
];

/**
 * @param {{ scenarioId: string, branchMode: string, paymentMode?: string | undefined }} run
 * @returns {string}
 */
function formatRunId(run) {
  return run.paymentMode
    ? `${run.scenarioId}/${run.branchMode}/${run.paymentMode}`
    : `${run.scenarioId}/${run.branchMode}`;
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function stableStringify(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  const record = /** @type {Record<string, unknown>} */ (value);
  return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(record[key])}`).join(',')}}`;
}

/**
 * @param {string} label
 * @returns {() => void}
 */
function beginProvenProfile(label) {
  if (!PROVEN_PROFILE_ENABLED) return () => {};
  const startedAt = process.hrtime.bigint();
  return () => {
    const elapsedMs = Number(process.hrtime.bigint() - startedAt) / 1_000_000;
    process.stderr.write(`[proven-profile] ${label}: ${elapsedMs.toFixed(2)}ms\n`);
  };
}

/**
 * @param {readonly unknown[]} [values=[]]
 * @returns {string[]}
 */
function summarizeStrings(values = []) {
  return [...new Set((values || []).map((value) => String(value || '').trim()).filter(Boolean))];
}

/**
 * @param {boolean} condition
 * @param {string} message
 */
function invariant(condition, message) {
  if (!condition) throw new Error(message);
}

/**
 * @param {string} relativePath
 * @returns {boolean}
 */
function repoFileExists(relativePath) {
  return existsSync(path.resolve(REPO_ROOT, relativePath));
}

/**
 * @param {string} checkId
 * @param {string} label
 * @param {string[]} requiredFiles
 * @returns {{
 *   checkId: string,
 *   label: string,
 *   passed: boolean,
 *   detail: string,
 *   requiredFiles: string[],
 *   missingFiles: string[]
 * }}
 */
function buildV26FilePresenceCheck(checkId, label, requiredFiles) {
  const missingFiles = requiredFiles.filter((file) => !repoFileExists(file));
  return {
    checkId,
    label,
    passed: missingFiles.length === 0,
    detail: missingFiles.length === 0
      ? `${requiredFiles.length} required files present`
      : `${missingFiles.length} files missing`,
    requiredFiles,
    missingFiles
  };
}

/**
 * @param {{
 *   generatedAt: string,
 *   baseData: any,
 *   inheritedV19: any,
 *   inheritedV20: any,
 *   specFamilyReport: any,
 *   canonicalInputReport: any,
 *   draftPreview: boolean
 * }} input
 */
function buildV26GateCheckpointReport({
  generatedAt,
  baseData,
  inheritedV19,
  inheritedV20,
  specFamilyReport,
  canonicalInputReport,
  draftPreview,
  conversationsContinuityProof,
  runsPipelinesTotalityProof,
  persistenceSchemaTotalityProof,
  promptSystemTotalityProof,
  retainedPackageAdmissibilityProof
}) {
  const firstGateChecks = [
    {
      checkId: 'v19-deterministic-replay',
      label: 'Inherited V19 deterministic replay report',
      passed: inheritedV19?.deterministicReplayReport?.passed === true,
      detail: inheritedV19?.deterministicReplayReport?.passed === true
        ? 'Deterministic replay remains closed'
        : 'Deterministic replay remains open'
    },
    {
      checkId: 'v19-volatility-inventory',
      label: 'Inherited V19 volatility inventory',
      passed: inheritedV19?.volatilityInventory?.passed === true,
      detail: inheritedV19?.volatilityInventory?.passed === true
        ? 'Volatility inventory remains closed'
        : 'Volatility inventory remains open'
    },
    {
      checkId: 'v19-contract-change-ledger',
      label: 'Inherited V19 contract change ledger',
      passed: inheritedV19?.contractChangeLedger?.passed === true,
      detail: inheritedV19?.contractChangeLedger?.passed === true
        ? 'Contract change ledger remains closed'
        : 'Contract change ledger remains open but is treated as inherited later-gate proof work rather than a through-fourth-gate blocker'
    },
    {
      checkId: 'v20-operator-quality',
      label: 'Inherited V20 operator quality summary',
      passed: inheritedV20?.qualitySummary?.passed === true,
      detail: inheritedV20?.qualitySummary?.passed === true
        ? 'Operator quality summary remains closed'
        : 'Operator quality summary remains open'
    },
    {
      checkId: 'v26-spec-family',
      label: 'V26 spec-family report',
      passed: specFamilyReport?.passed === true,
      detail: specFamilyReport?.passed === true
        ? `Spec-family report passes in ${specFamilyReport.mode} mode`
        : 'Spec-family report remains open'
    },
    {
      checkId: 'v26-canonical-input',
      label: 'V26 canonical-input report',
      passed: canonicalInputReport?.passed === true,
      detail: canonicalInputReport?.passed === true
        ? 'Canonical-input report passes for the V26 draft family'
        : 'Canonical-input report remains open'
    }
  ];
  const secondGateChecks = [
    buildV26FilePresenceCheck(
      'second-gate-application-carriers',
      'Second-gate application and orbital carriers',
      V26_SECOND_GATE_APPLICATION_FILES
    ),
    buildV26FilePresenceCheck(
      'second-gate-proof-carriers',
      'Second-gate proof and test carriers',
      V26_SECOND_GATE_PROOF_FILES
    ),
    buildV26FilePresenceCheck(
      'second-gate-documentation-carriers',
      'Second-gate documentation and README carriers',
      V26_SECOND_GATE_DOCUMENTATION_FILES
    )
  ];
  const thirdGatePreparationChecks = [
    buildV26FilePresenceCheck(
      'third-gate-preparation-docs',
      'Third-gate preparation and separation artifacts',
      V26_THIRD_GATE_PREPARATION_FILES
    )
  ];
  const thirdGateChecks = [
    buildV26FilePresenceCheck(
      'third-gate-public-shell-carriers',
      'Mounted public-shell and docs-route carriers',
      V26_THIRD_GATE_APPLICATION_FILES
    ),
    buildV26FilePresenceCheck(
      'third-gate-public-proof-carriers',
      'Mounted public-shell proof and test carriers',
      V26_THIRD_GATE_PROOF_FILES
    ),
    buildV26FilePresenceCheck(
      'third-gate-public-documentation-carriers',
      'Mounted public-shell documentation carriers',
      V26_THIRD_GATE_DOCUMENTATION_FILES
    )
  ];
  const fourthGateChecks = [
    {
      checkId: 'fourth-gate-conversations-continuity',
      label: 'Fourth-gate conversations continuity proof',
      passed: conversationsContinuityProof?.passed === true,
      detail: conversationsContinuityProof?.passed === true
        ? 'Conversations and fullscreen chat continuity are explicit and generated'
        : 'Conversations continuity proof remains open'
    },
    {
      checkId: 'fourth-gate-runs-pipelines-totality',
      label: 'Fourth-gate runs and pipelines totality proof',
      passed: runsPipelinesTotalityProof?.passed === true,
      detail: runsPipelinesTotalityProof?.passed === true
        ? 'Retained executions, activity, deliverables, and pipeline systems totalize under Bitcode'
        : 'Runs and pipelines totality proof remains open'
    },
    {
      checkId: 'fourth-gate-persistence-schema-totality',
      label: 'Fourth-gate persistence and schema totality proof',
      passed: persistenceSchemaTotalityProof?.passed === true,
      detail: persistenceSchemaTotalityProof?.passed === true
        ? 'Persistence, schema, `/edgetimes`, and typed storage carriers are explicit'
        : 'Persistence and schema totality proof remains open'
    },
    {
      checkId: 'fourth-gate-retained-package-admissibility',
      label: 'Fourth-gate retained package admissibility proof',
      passed: retainedPackageAdmissibilityProof?.passed === true,
      detail: retainedPackageAdmissibilityProof?.passed === true
        ? 'Retained non-Bitcode packages have explicit admitted roles'
        : 'Retained package admissibility proof remains open'
    },
    {
      checkId: 'fourth-gate-prompt-system-totality',
      label: 'Fourth-gate prompt system totality proof',
      passed: promptSystemTotalityProof?.passed === true,
      detail: promptSystemTotalityProof?.passed === true
        ? 'PromptPart/Prompt/PromptExecution and retained prompt ports remain explicit'
        : 'Prompt system totality proof remains open'
    }
  ];
  const firstGatePassed = firstGateChecks
    .filter((check) => check.checkId !== 'v19-contract-change-ledger')
    .every((check) => check.passed === true);
  const secondGatePassed = secondGateChecks.every((check) => check.passed === true);
  const thirdGatePrepared = thirdGatePreparationChecks.every((check) => check.passed === true);
  const thirdGatePassed = thirdGateChecks.every((check) => check.passed === true);
  const fourthGatePassed = fourthGateChecks.every((check) => check.passed === true);

  const fifthGatePassed = false;
  const sixthGatePrepared = false;
  const seventhGatePrepared = false;

  return {
    reportId: 'v26-gate-checkpoint-report',
    version: 'V26',
    proofSourceCommit: baseData.canonicalCommit,
    generatedAt,
    generatorId: baseData.generatorId,
    worktreeState: baseData.worktreeState,
    activeCanonicalTarget: ACTIVE_CANON_VERSION,
    draftPreview,
    checkpointId: 'v26-through-fourth-gate-promotion-boundary-on-seven-gate-v26',
    checkpointFocus: 'through-fourth-gate-promotion-boundary-on-seven-gate-v26',
    nextGate: 'Gate 5: Bitcode rename completion, proof precision, and system completeness',
    passed: firstGatePassed && secondGatePassed && thirdGatePassed && fourthGatePassed,
    firstGate: {
      gateId: 'gate-1',
      label: 'Ownership migration baseline',
      passed: firstGatePassed,
      checks: firstGateChecks
    },
    secondGate: {
      gateId: 'gate-2',
      label: 'Application UX/UI and external interfacing hardening',
      passed: secondGatePassed,
      checks: secondGateChecks
    },
    thirdGatePreparation: {
      gateId: 'gate-3-preparation',
      label: 'Marketing refurbishment preparation',
      prepared: thirdGatePrepared,
      checks: thirdGatePreparationChecks
    },
    thirdGate: {
      gateId: 'gate-3',
      label: 'Mounted public-shell closure',
      passed: thirdGatePassed,
      checks: thirdGateChecks
    },
    fourthGate: {
      gateId: 'gate-4',
      label: 'Merged-world application and retained-system convergence',
      passed: fourthGatePassed,
      checks: fourthGateChecks
    },
    fifthGate: {
      gateId: 'gate-5',
      label: 'Bitcode rename completion, proof precision, and system completeness',
      passed: fifthGatePassed,
      open: true,
      detail: 'Fifth-gate remains open after through-fourth-gate promotion and owns active-source Bitcode rename completion plus heavier proof/system-completeness closure.'
    },
    sixthGate: {
      gateId: 'gate-6',
      label: 'Old-world system reform into Bitcode market infrastructure',
      prepared: sixthGatePrepared,
      open: true,
      detail: 'Sixth-gate remains open and will adjudicate retained old-world pure-agentic systems into Bitcode roles or cut decisions.'
    },
    seventhGate: {
      gateId: 'gate-7',
      label: 'Whole-repository provation and final V26 closure',
      prepared: seventhGatePrepared,
      open: true,
      detail: 'Seventh-gate remains open and owns final whole-repository Bitcode provation and closure.'
    }
  };
}

/**
 * @param {{
 *   generatedAt: string,
 *   baseData: any
 * }} input
 */
function buildV26PersistenceSchemaTotalityProof({
  generatedAt,
  baseData
}) {
  const checks = [
    buildV26FilePresenceCheck(
      'persistence-baseline-and-typed-owners',
      'Persistence baseline, typed clients, ORM/query owners, and generated type carriers',
      V26_FOURTH_GATE_PERSISTENCE_FILES
    )
  ];
  const passed = checks.every((check) => check.passed === true);

  return {
    reportId: 'v26-persistence-schema-totality-proof',
    version: 'V26',
    proofSourceCommit: baseData.canonicalCommit,
    generatedAt,
    generatorId: baseData.generatorId,
    worktreeState: baseData.worktreeState,
    passed,
    baselineMigrationPath: 'supabase/migrations/001_ga1_production.sql',
    routeWitnesses: [
      '/edgetimes',
      '/api/edgetimes'
    ],
    unresolvedTables: V26_FOURTH_GATE_UNRESOLVED_TABLES,
    checks
  };
}

/**
 * @param {{
 *   generatedAt: string,
 *   baseData: any
 * }} input
 */
function buildV26RetainedPackageAdmissibilityProof({
  generatedAt,
  baseData
}) {
  const packages = V26_RETAINED_PACKAGE_ADMISSIONS.map((entry) => {
    const missingFiles = entry.requiredFiles.filter((file) => !repoFileExists(file));
    return {
      packageName: entry.packageName,
      rationale: entry.rationale,
      role: entry.role,
      writeBoundary: entry.writeBoundary,
      requiredFiles: entry.requiredFiles,
      missingFiles,
      passed: missingFiles.length === 0
    };
  });
  const passed = packages.every((entry) => entry.passed === true);

  return {
    reportId: 'v26-retained-package-admissibility-proof',
    version: 'V26',
    proofSourceCommit: baseData.canonicalCommit,
    generatedAt,
    generatorId: baseData.generatorId,
    worktreeState: baseData.worktreeState,
    passed,
    admittedPackageCount: packages.length,
    packages
  };
}

/**
 * @param {{
 *   generatedAt: string,
 *   baseData: any
 * }} input
 */
function buildV26PromptSystemTotalityProof({
  generatedAt,
  baseData
}) {
  const checks = [
    buildV26FilePresenceCheck(
      'prompt-package-core',
      'PromptPart, Prompt, PromptExecution, tests, and package docs remain explicit',
      [
        'packages/prompts/README.md',
        'packages/prompts/src/index.ts',
        'packages/prompts/src/prompt.ts',
        'packages/prompts/src/execution/PromptExecution.ts',
        'packages/prompts/src/parts/PromptPart.ts',
        'packages/prompts/src/__tests__/prompt.test.ts'
      ]
    ),
    buildV26FilePresenceCheck(
      'execution-agent-and-conversation-prompt-extensions',
      'Execution, agent, and conversation prompt carriers remain explicit',
      [
        'packages/execution-generics/README.md',
        'packages/execution-generics/src/prompts/ExecutionPrompt.ts',
        'packages/agent-generics/src/prompts/AgentPrompt.ts',
        'packages/conversations-generics/README.md',
        'packages/conversations-generics/src/prompts/ConversationSystemPrompt.ts'
      ]
    ),
    buildV26FilePresenceCheck(
      'need-ingestion-and-deliverable-prompt-ports',
      'Need-ingestion and deliverable prompt ports remain explicit under Bitcode ownership',
      [
        'packages/generic-agents/jira-processor/src/prompts/system-prompt-jira-processor.ts',
        'packages/generic-agents/jira-processor/src/prompts/agent-prompt-jira-processor.ts',
        'packages/pipelines/deliverable/src/agents/prompts/understand-requirements-prompt.ts',
        'packages/pipelines/deliverable/src/agents/prompts/plan-implementation-prompt.ts'
      ]
    )
  ];
  const passed = checks.every((check) => check.passed === true);

  return {
    reportId: 'v26-prompt-system-totality-proof',
    version: 'V26',
    proofSourceCommit: baseData.canonicalCommit,
    generatedAt,
    generatorId: baseData.generatorId,
    worktreeState: baseData.worktreeState,
    passed,
    packageWitnesses: [
      '@bitcode/prompts',
      '@bitcode/execution-generics',
      '@bitcode/conversations-generics'
    ],
    checks
  };
}

/**
 * @param {{
 *   generatedAt: string,
 *   baseData: any
 * }} input
 */
function buildV26ConversationsContinuityProof({
  generatedAt,
  baseData
}) {
  const checks = [
    buildV26FilePresenceCheck(
      'conversations-route-and-overlay-owners',
      'Direct conversations route and fullscreen overlay owners',
      [
        'uapi/app/conversations/page.tsx',
        'uapi/app/conversations/ConversationsRouteClient.tsx',
        'uapi/app/conversations/README.md',
        'uapi/app/conversations/components/ConversationsOverlay.tsx',
        'uapi/app/ClientLayoutInner.tsx',
        'uapi/app/application/ApplicationPageClient.tsx'
      ]
    ),
    buildV26FilePresenceCheck(
      'conversations-api-carriers',
      'Conversations API and mock-mode carriers',
      [
        'uapi/app/api/conversations/route.ts',
        'uapi/app/api/conversations/stream/route.ts',
        'uapi/app/api/conversations/[conversationId]/stream/route.ts',
        'uapi/app/api/conversations/branch/route.ts',
        'uapi/app/api/conversations/_shared.ts'
      ]
    ),
    buildV26FilePresenceCheck(
      'conversations-retained-package-basis',
      'Retained conversations package and proof carriers',
      [
        'packages/conversations-generics/src/index.ts',
        'packages/conversations-generics/src/agent/ConversationAgent.ts',
        'packages/conversations-generics/src/prompts/ConversationSystemPrompt.ts',
        'packages/api/src/conversations/conversations.ts',
        'packages/api/src/conversations/streaming.ts',
        'uapi/tests/api/conversationsRoute.test.ts',
        'uapi/tests/api/chatStreamRoute.test.ts',
        'uapi/tests/conversationsRouteClient.test.tsx'
      ]
    )
  ];
  const passed = checks.every((check) => check.passed === true);

  return {
    reportId: 'v26-conversations-continuity-proof',
    version: 'V26',
    proofSourceCommit: baseData.canonicalCommit,
    generatedAt,
    generatorId: baseData.generatorId,
    worktreeState: baseData.worktreeState,
    passed,
    routeWitnesses: [
      '/conversations',
      '/application'
    ],
    apiWitnesses: [
      '/api/conversations',
      '/api/conversations/stream',
      '/api/conversations/[conversationId]/stream',
      '/api/conversations/branch'
    ],
    requiredFiles: V26_FOURTH_GATE_CONVERSATION_FILES,
    checks
  };
}

/**
 * @param {{
 *   generatedAt: string,
 *   baseData: any
 * }} input
 */
function buildV26RunsPipelinesTotalityProof({
  generatedAt,
  baseData
}) {
  const checks = [
    buildV26FilePresenceCheck(
      'executions-route-and-detail-owners',
      'Direct executions route and retained detail owners',
      [
        'uapi/app/executions/page.tsx',
        'uapi/app/executions/[runId]/page.tsx',
        'uapi/app/executions/README.md',
        'uapi/app/executions/components/ExecutionsPage.tsx',
        'uapi/app/executions/components/ExecutionsPageClient.tsx',
        'uapi/app/executions/components/ExecutionsDetailsView.tsx'
      ]
    ),
    buildV26FilePresenceCheck(
      'executions-api-and-history-carriers',
      'Active executions API route and history carriers',
      [
        'uapi/app/api/executions/route.ts',
        'uapi/app/api/executions/history/route.ts',
        'uapi/app/api/executions/history/[runId]/route.ts',
        'uapi/app/api/executions/_shared.ts',
        'packages/api/src/routes/deliverables.ts',
        'packages/api/src/pipelines/branch.ts'
      ]
    ),
    buildV26FilePresenceCheck(
      'executions-retained-compatibility-carriers',
      'Retained executions compatibility APIs, canonical auxillary APIs, and proof carriers',
      [
        'uapi/app/api/vcs/route.ts',
        'uapi/app/api/auxillaries/template-preferences/route.ts',
        'uapi/app/api/auxillaries/profile/route.ts',
        'uapi/app/api/auxillaries/connections/github/route.ts',
        'uapi/app/api/auxillaries/credits/route.ts',
        'uapi/app/api/auxillaries/usage/route.ts',
        'uapi/app/api/auxillaries/transactions/route.ts',
        'uapi/app/api/auxillaries/api-keys/route.ts',
        'uapi/app/api/templates/deliverables/route.ts',
        'uapi/tests/api/vcsCompatibilityRoute.test.ts',
        'uapi/tests/api/orbitalsTemplatePreferencesRoute.test.ts',
        'uapi/tests/api/orbitalsProfileRoute.test.ts',
        'uapi/tests/api/orbitalUsageRoute.test.ts',
        'uapi/tests/api/auxillariesTransactionsRoute.test.ts',
        'uapi/tests/api/deliverableTemplatesRoute.test.ts',
        'uapi/tests/apiKeysRoutes.test.ts',
        'uapi/tests/userConnectionsGithubRoute.test.ts',
        'uapi/tests/api/userCreditsRoute.test.ts'
      ]
    ),
    buildV26FilePresenceCheck(
      'runs-pipelines-retained-package-basis',
      'Retained execution, pipeline, and proof carriers',
      [
        'packages/execution-generics/src/Execution.ts',
        'packages/execution-generics/src/execution-registry.ts',
        'packages/execution-generics/src/storage/ExecutionStorageAdapter.ts',
        'packages/pipelines-generics/src/execution/PipelineExecution.ts',
        'packages/pipelines-generics/src/execution/PipelineExecutor.ts',
        'packages/pipelines-generics/src/execution/route-pipeline-execution.ts',
        'packages/pipelines/deliverable/src/run.ts',
        'uapi/tests/deliverablesRoute.test.ts',
        'uapi/tests/deliverablesInstallationsRoute.test.ts',
        'uapi/tests/api/deliverables.test.ts',
        'uapi/tests/api/deliverables.persistence.test.ts',
        'uapi/tests/deliverablesHistoryRoute.test.ts',
        'uapi/tests/deliverablesHistoryRunRoute.test.ts',
        'uapi/tests/protocol-demonstrationExecutionStreamPanel.test.tsx',
        'uapi/tests/usePipelineExecution.test.tsx'
      ]
    ),
    buildV26FilePresenceCheck(
      'executions-activity-and-notification-carriers',
      'Shared activity, execution, and notification carriers stay explicit under Bitcode',
      V26_FOURTH_GATE_ACTIVITY_FILES
    )
  ];
  const passed = checks.every((check) => check.passed === true);

  return {
    reportId: 'v26-runs-pipelines-totality-proof',
    version: 'V26',
    proofSourceCommit: baseData.canonicalCommit,
    generatedAt,
    generatorId: baseData.generatorId,
    worktreeState: baseData.worktreeState,
    passed,
    routeWitnesses: [
      '/executions',
      '/executions/[runId]'
    ],
    apiWitnesses: [
      '/api/executions',
      '/api/executions/history',
      '/api/executions/history/[runId]',
      '/api/vcs',
      '/api/auxillaries/template-preferences',
      '/api/templates/deliverables'
    ],
    requiredFiles: V26_FOURTH_GATE_RUNS_PIPELINES_FILES,
    checks
  };
}

/**
 * @param {Record<string, string>} files
 * @param {string} artifactPath
 * @returns {any}
 */
function parseArtifactJson(files, artifactPath) {
  const serialized = files[artifactPath];
  invariant(typeof serialized === 'string' && serialized.length > 0, `Missing required artifact ${artifactPath}.`);
  try {
    return JSON.parse(/** @type {string} */ (serialized));
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`Artifact ${artifactPath} is not valid JSON: ${detail}`);
  }
}

/**
 * @param {readonly unknown[]} values
 * @returns {string}
 */
function stableListSignature(values) {
  return stableStringify(values);
}

/**
 * @param {any} replayStep
 * @returns {{ stepId: string, theoremIds: string[], requiredArtifactPaths: string[] }}
 */
function normalizeReplayStep(replayStep) {
  return {
    stepId: String(replayStep?.stepId || ''),
    theoremIds: summarizeStrings(replayStep?.theoremIds || []),
    requiredArtifactPaths: summarizeStrings(replayStep?.requiredArtifactPaths || [])
  };
}

/**
 * @param {any} theoremVerdict
 * @returns {{ theoremId: string, passed: boolean, witnessArtifactPaths: string[], replayArtifactPaths: string[], replayStepIds: string[], failureReasons: string[] }}
 */
function normalizeTheoremVerdict(theoremVerdict) {
  return {
    theoremId: String(theoremVerdict?.theoremId || ''),
    passed: theoremVerdict?.passed === true,
    witnessArtifactPaths: summarizeStrings(theoremVerdict?.witnessArtifactPaths || []),
    replayArtifactPaths: summarizeStrings(theoremVerdict?.replayArtifactPaths || []),
    replayStepIds: summarizeStrings(theoremVerdict?.replayStepIds || []),
    failureReasons: summarizeStrings(theoremVerdict?.failureReasons || [])
  };
}

/**
 * @param {any} memberVerdict
 * @param {number} index
 * @returns {string}
 */
function memberIdentifier(memberVerdict, index) {
  return String(memberVerdict?.memberId || memberVerdict?.field || `member-${index + 1}`);
}

/**
 * @param {any[]} memberVerdicts
 * @returns {string[]}
 */
function collectMemberIds(memberVerdicts) {
  return memberVerdicts.map((entry, index) => memberIdentifier(entry, index));
}

/**
 * @param {any} familyCatalogEntry
 * @returns {{
 *   proofFamily: string,
 *   proofArtifactPath: string,
 *   memberIds: string[],
 *   theoremIds: string[],
 *   witnessArtifactPaths: string[],
 *   replayArtifacts: string[],
 *   replaySteps: Array<{ stepId: string, theoremIds: string[], requiredArtifactPaths: string[] }>
 * }}
 */
function normalizeFamilyCatalogEntry(familyCatalogEntry) {
  return {
    proofFamily: String(familyCatalogEntry?.proofFamily || ''),
    proofArtifactPath: String(familyCatalogEntry?.proofArtifactPath || ''),
    memberIds: summarizeStrings(familyCatalogEntry?.memberIds || []),
    theoremIds: summarizeStrings(familyCatalogEntry?.theoremIds || []),
    witnessArtifactPaths: summarizeStrings(familyCatalogEntry?.witnessArtifactPaths || []),
    replayArtifacts: summarizeStrings(familyCatalogEntry?.replayArtifacts || []),
    replaySteps: (familyCatalogEntry?.replaySteps || []).map(normalizeReplayStep)
  };
}

/**
 * @param {string} version
 * @returns {string}
 */
export function defaultProvenOutputPath(version) {
  return defaultSpecProvenPath(version);
}

/**
 * @param {{
 *   buildInitialStateFn?: typeof buildInitialState,
 *   runMakeBitcodeBranchFn?: typeof runMakeBitcodeBranch,
 *   scenarioIds?: string[],
 *   branchModes?: string[],
 *   paymentModes?: string[]
 * }} [input={}]
 */
export function collectCanonicalProvenRuns({
  buildInitialStateFn = buildInitialState,
  runMakeBitcodeBranchFn = runMakeBitcodeBranch,
  scenarioIds,
  branchModes = DEFAULT_PROVEN_BRANCH_MODES,
  paymentModes = []
} = {}) {
  const seededState = buildInitialStateFn();
  const availableScenarioIds = seededState.needScenarios.map((/** @type {any} */ scenario) => String(scenario.scenarioId));
  const requestedScenarioIds = scenarioIds?.length ? scenarioIds : availableScenarioIds;
  for (const scenarioId of requestedScenarioIds) {
    invariant(availableScenarioIds.includes(scenarioId), `Unknown scenario id ${scenarioId}.`);
  }

  /** @type {any[]} */
  const runs = [];
  for (const scenarioId of requestedScenarioIds) {
    for (const branchMode of branchModes) {
      const effectivePaymentModes = paymentModes.length ? paymentModes : [undefined];
      for (const paymentMode of effectivePaymentModes) {
        const branchInput = paymentMode ? { scenarioId, branchMode, paymentMode } : { scenarioId, branchMode };
        const { latestRun } = runMakeBitcodeBranchFn(buildInitialStateFn(), branchInput);
        invariant(latestRun?.branchArtifacts?.files, `Run ${formatRunId({ scenarioId, branchMode, paymentMode })} did not produce branch artifacts.`);
        const files = /** @type {Record<string, string>} */ (latestRun.branchArtifacts.files);
        const bundle = parseArtifactJson(files, '.engi/system-proof-bundle.json');
        const witnessManifest = parseArtifactJson(files, '.engi/proof-witness-manifest.json');
        const deliverablesManifest = parseArtifactJson(files, '.engi/deliverables.json');
        const policyRelease = parseArtifactJson(files, '.engi/policy-release.json');
        const need = parseArtifactJson(files, '.engi/need.json');

        /** @type {Record<string, any>} */
        const familyProofsByName = {};
        for (const familyCatalogEntry of bundle.proofFamilies || []) {
          const proofFamily = String(familyCatalogEntry?.proofFamily || '');
          const proofArtifactPath = String(familyCatalogEntry?.proofArtifactPath || '');
          invariant(Boolean(proofFamily), `Run ${formatRunId({ scenarioId, branchMode, paymentMode })} contains a proof family entry without proofFamily.`);
          invariant(Boolean(proofArtifactPath), `Run ${formatRunId({ scenarioId, branchMode, paymentMode })} family ${proofFamily} is missing proofArtifactPath.`);
          familyProofsByName[proofFamily] = parseArtifactJson(files, proofArtifactPath);
        }

        runs.push({
          scenarioId,
          branchMode,
          paymentMode: paymentMode || null,
          branchName: String(deliverablesManifest?.branchName || latestRun?.branchName || ''),
          needId: String(bundle?.needId || need?.needId || ''),
          assetPackId: String(bundle?.assetPackId || latestRun?.assetPack?.assetPackId || ''),
          branchArtifacts: files,
          systemProofBundle: bundle,
          proofWitnessManifest: witnessManifest,
          deliverablesManifest,
          policyRelease,
          familyProofsByName
        });
      }
    }
  }

  return {
    scenarioIds: requestedScenarioIds,
    branchModes: summarizeStrings(branchModes),
    paymentModes: summarizeStrings(paymentModes),
    runs
  };
}

/**
 * @param {Record<string, any>} deliverablesByPath
 * @param {Record<string, any>} classificationsByPath
 * @param {string} artifactPath
 * @param {string} contextLabel
 */
function assertArtifactMetadata(deliverablesByPath, classificationsByPath, artifactPath, contextLabel) {
  invariant(!!deliverablesByPath[artifactPath], `${contextLabel} is missing deliverables metadata for ${artifactPath}.`);
  invariant(!!classificationsByPath[artifactPath], `${contextLabel} is missing policy-release classification for ${artifactPath}.`);
}

/**
 * @param {any} run
 * @returns {any}
 */
function validateAndNormalizeRun(run) {
  const runLabel = formatRunId(run);
  const bundle = run.systemProofBundle;
  const witnessManifest = run.proofWitnessManifest;
  const deliverablesByPath = Object.fromEntries((run.deliverablesManifest?.deliverables || []).map((/** @type {any} */ entry) => [String(entry?.path || ''), entry]));
  const classificationsByPath = Object.fromEntries((run.policyRelease?.artifactClasses || []).map((/** @type {any} */ entry) => [String(entry?.path || ''), entry]));
  const artifactDigestByPath = /** @type {Record<string, any>} */ (witnessManifest?.artifactDigestByPath || {});
  const proofFamiliesByName = /** @type {Record<string, any>} */ (witnessManifest?.proofFamiliesByName || {});
  const replayCatalogByName = Object.fromEntries((bundle?.verifierEntrypoint?.proofFamilyReplayCatalog || []).map((/** @type {any} */ entry) => [String(entry?.proofFamily || ''), entry]));
  const requiredArtifactPaths = summarizeStrings(bundle?.verifierEntrypoint?.requiredArtifactPaths || []);

  invariant(Array.isArray(bundle?.proofFamilies) && bundle.proofFamilies.length > 0, `Run ${runLabel} is missing a proof-family catalog.`);
  invariant(Array.isArray(bundle?.verifierEntrypoint?.proofFamilyReplayCatalog), `Run ${runLabel} is missing a verifier replay catalog.`);
  invariant(Array.isArray(witnessManifest?.artifactDigests), `Run ${runLabel} is missing witness-manifest artifact digests.`);
  invariant(typeof witnessManifest?.artifactDigestByPath === 'object' && witnessManifest?.artifactDigestByPath !== null, `Run ${runLabel} is missing witness-manifest keyed artifact digests.`);
  invariant(typeof witnessManifest?.proofFamiliesByName === 'object' && witnessManifest?.proofFamiliesByName !== null, `Run ${runLabel} is missing witness-manifest keyed proof families.`);

  const normalizedFamilies = /** @type {any[]} */ ((bundle.proofFamilies || []).map((/** @type {any} */ familyCatalogEntry) => {
    const catalog = normalizeFamilyCatalogEntry(familyCatalogEntry);
    const proof = run.familyProofsByName[catalog.proofFamily];
    const replayCatalogEntry = replayCatalogByName[catalog.proofFamily];
    const witnessFamilyIndex = proofFamiliesByName[catalog.proofFamily];
    const theoremVerdicts = (proof?.theoremVerdicts || []).map(normalizeTheoremVerdict);
    const memberVerdicts = proof?.memberVerdicts || [];
    const proofMemberIds = collectMemberIds(memberVerdicts);
    const proofReplaySteps = (proof?.replaySteps || []).map(normalizeReplayStep);
    const proofTheoremIds = theoremVerdicts.map((/** @type {any} */ entry) => entry.theoremId);
    const proofWitnessArtifactPaths = summarizeStrings(proof?.witnessArtifactPaths || []);
    const proofReplayArtifacts = summarizeStrings(proof?.replayArtifacts || []);

    invariant(!!proof, `Run ${runLabel} is missing proof object for family ${catalog.proofFamily}.`);
    invariant(typeof proof?.proofHash === 'string' && proof.proofHash.length > 0, `Run ${runLabel} family ${catalog.proofFamily} is missing proofHash.`);
    invariant(proof.proofHash === familyCatalogEntry?.proofHash, `Run ${runLabel} family ${catalog.proofFamily} proofHash does not match the proof-family catalog.`);
    invariant(stableListSignature(catalog.theoremIds) === stableListSignature(proofTheoremIds), `Run ${runLabel} family ${catalog.proofFamily} theorem ids do not match the proof object.`);
    invariant(stableListSignature(catalog.memberIds) === stableListSignature(proofMemberIds), `Run ${runLabel} family ${catalog.proofFamily} member ids do not match the proof object.`);
    invariant(stableListSignature(catalog.witnessArtifactPaths) === stableListSignature(proofWitnessArtifactPaths), `Run ${runLabel} family ${catalog.proofFamily} witness artifact paths do not match the proof object.`);
    invariant(stableListSignature(catalog.replayArtifacts) === stableListSignature(proofReplayArtifacts), `Run ${runLabel} family ${catalog.proofFamily} replay artifact paths do not match the proof object.`);
    invariant(stableListSignature(catalog.replaySteps) === stableListSignature(proofReplaySteps), `Run ${runLabel} family ${catalog.proofFamily} replay steps do not match the proof object.`);

    invariant(!!replayCatalogEntry, `Run ${runLabel} family ${catalog.proofFamily} is missing a verifier replay catalog entry.`);
    invariant(stableListSignature(catalog.theoremIds) === stableListSignature(replayCatalogEntry?.theoremIds || []), `Run ${runLabel} family ${catalog.proofFamily} theorem ids do not match the verifier replay catalog.`);
    invariant(stableListSignature(catalog.replayArtifacts) === stableListSignature(replayCatalogEntry?.replayArtifacts || []), `Run ${runLabel} family ${catalog.proofFamily} replay artifacts do not match the verifier replay catalog.`);
    invariant(stableListSignature(catalog.replaySteps) === stableListSignature((replayCatalogEntry?.replaySteps || []).map(normalizeReplayStep)), `Run ${runLabel} family ${catalog.proofFamily} replay steps do not match the verifier replay catalog.`);

    invariant(!!witnessFamilyIndex, `Run ${runLabel} family ${catalog.proofFamily} is missing from the witness-manifest family index.`);
    const witnessFamilyPaths = summarizeStrings(witnessFamilyIndex?.witnessArtifactPaths || []);
    invariant(proofWitnessArtifactPaths.every((artifactPath) => witnessFamilyPaths.includes(artifactPath)), `Run ${runLabel} family ${catalog.proofFamily} witness-manifest family index does not include all catalog witness artifacts.`);

    for (const artifactPath of catalog.witnessArtifactPaths) {
      invariant(!!run.branchArtifacts[artifactPath], `Run ${runLabel} family ${catalog.proofFamily} is missing witness artifact ${artifactPath}.`);
      invariant(
        NON_DIGESTED_RECURSIVE_ARTIFACT_PATHS.includes(artifactPath) || !!artifactDigestByPath[artifactPath],
        `Run ${runLabel} family ${catalog.proofFamily} is missing witness digest for ${artifactPath}.`
      );
      assertArtifactMetadata(deliverablesByPath, classificationsByPath, artifactPath, `Run ${runLabel} family ${catalog.proofFamily}`);
    }

    invariant(!!run.branchArtifacts[catalog.proofArtifactPath], `Run ${runLabel} family ${catalog.proofFamily} is missing its proof artifact ${catalog.proofArtifactPath}.`);
    assertArtifactMetadata(deliverablesByPath, classificationsByPath, catalog.proofArtifactPath, `Run ${runLabel} family ${catalog.proofFamily}`);

    for (const artifactPath of catalog.replayArtifacts) {
      invariant(!!run.branchArtifacts[artifactPath], `Run ${runLabel} family ${catalog.proofFamily} is missing replay artifact ${artifactPath}.`);
    }
    for (const replayStep of catalog.replaySteps) {
      for (const artifactPath of replayStep.requiredArtifactPaths) {
        invariant(requiredArtifactPaths.includes(artifactPath), `Run ${runLabel} family ${catalog.proofFamily} replay step ${replayStep.stepId} requires ${artifactPath}, but the verifier entrypoint does not.`);
        invariant(!!run.branchArtifacts[artifactPath], `Run ${runLabel} family ${catalog.proofFamily} replay step ${replayStep.stepId} is missing ${artifactPath}.`);
      }
    }

    return {
      proofFamily: catalog.proofFamily,
      proofArtifactPath: catalog.proofArtifactPath,
      proofHash: String(proof.proofHash),
      allTheoremsPassed: proof.allTheoremsPassed === true,
      memberIds: catalog.memberIds,
      memberVerdicts: memberVerdicts.map((/** @type {any} */ entry, /** @type {number} */ index) => ({
        id: memberIdentifier(entry, index),
        fields: Object.keys(entry || {}).sort(),
        payload: entry,
        passed: entry?.passed === true
      })),
      theoremIds: catalog.theoremIds,
      theoremVerdicts,
      witnessArtifactPaths: catalog.witnessArtifactPaths,
      replayArtifacts: catalog.replayArtifacts,
      replaySteps: catalog.replaySteps
    };
  }));

  const proofArtifactPaths = summarizeStrings(normalizedFamilies.flatMap((family) => [family.proofArtifactPath, ...family.witnessArtifactPaths]));
  for (const artifactPath of proofArtifactPaths) {
    assertArtifactMetadata(deliverablesByPath, classificationsByPath, artifactPath, `Run ${runLabel}`);
  }

  return {
    scenarioId: run.scenarioId,
    branchMode: run.branchMode,
    paymentMode: run.paymentMode || null,
    branchName: run.branchName,
    needId: run.needId,
    assetPackId: run.assetPackId,
    bundleProofHash: String(bundle?.proofContract?.proofHash || bundle?.proofHash || ''),
    proofContractHash: String(run.familyProofsByName['proof-contract']?.proofHash || ''),
    proofContractPassed: run.familyProofsByName['proof-contract']?.allTheoremsPassed === true,
    familyCount: normalizedFamilies.length,
    allFamiliesPassed: normalizedFamilies.every((/** @type {any} */ family) => family.allTheoremsPassed),
    requiredArtifactPaths,
    artifactDigestEntries: /** @type {any[]} */ (witnessManifest.artifactDigests || [])
      .map((entry) => ({
        path: String(entry?.path || ''),
        digest: String(entry?.digest || ''),
        proofFamilies: summarizeStrings(entry?.proofFamilies || []),
        classification: classificationsByPath[String(entry?.path || '')] || null,
        deliverable: deliverablesByPath[String(entry?.path || '')] || null
      }))
      .sort((left, right) => left.path.localeCompare(right.path)),
    proofArtifacts: proofArtifactPaths.sort((left, right) => left.localeCompare(right)).map((artifactPath) => ({
      path: artifactPath,
      classification: classificationsByPath[artifactPath] || null,
      deliverable: deliverablesByPath[artifactPath] || null
    })),
    families: normalizedFamilies
  };
}

/**
 * @param {ReturnType<typeof collectCanonicalProvenRuns>} collected
 * @param {{
 *   version: string,
 *   canonicalCommit: string,
 *   canonicalCommitRecordedAt?: string | null,
 *   generatedAt: string,
 *   worktreeState?: string,
 *   generatorId?: string
 * }} input
 */
export function buildCanonicalProvenData(collected, {
  version,
  canonicalCommit,
  canonicalCommitRecordedAt = null,
  generatedAt,
  worktreeState = 'clean',
  generatorId = PROVEN_GENERATOR_ID
}) {
  invariant(/^V\d+$/.test(version), `Canonical version must look like VN. Received ${version}.`);
  invariant(typeof canonicalCommit === 'string' && canonicalCommit.trim().length > 0, 'Canonical commit is required.');
  invariant(typeof generatedAt === 'string' && generatedAt.trim().length > 0, 'generatedAt is required.');

  const normalizedRuns = collected.runs.map(validateAndNormalizeRun);
  invariant(normalizedRuns.length > 0, 'At least one proof run is required to build _PROVEN_.');

  const baseline = normalizedRuns[0];
  const baselineFamilySignatures = Object.fromEntries(baseline.families.map((/** @type {any} */ family) => [
    family.proofFamily,
    stableStringify({
      proofFamily: family.proofFamily,
      proofArtifactPath: family.proofArtifactPath,
      memberIds: family.memberIds,
      theoremIds: family.theoremIds,
      witnessArtifactPaths: family.witnessArtifactPaths,
      replayArtifacts: family.replayArtifacts,
      replaySteps: family.replaySteps
    })
  ]));

  for (const run of normalizedRuns.slice(1)) {
    invariant(baseline.familyCount === run.familyCount, `Run ${formatRunId(run)} proof-family count differs from the baseline.`);
    for (const family of run.families) {
      const baselineSignature = baselineFamilySignatures[family.proofFamily];
      invariant(!!baselineSignature, `Run ${formatRunId(run)} introduced unexpected proof family ${family.proofFamily}.`);
      const runSignature = stableStringify({
        proofFamily: family.proofFamily,
        proofArtifactPath: family.proofArtifactPath,
        memberIds: family.memberIds,
        theoremIds: family.theoremIds,
        witnessArtifactPaths: family.witnessArtifactPaths,
        replayArtifacts: family.replayArtifacts,
        replaySteps: family.replaySteps
      });
      invariant(baselineSignature === runSignature, `Run ${formatRunId(run)} changed the structural catalog for ${family.proofFamily}.`);
    }
    invariant(stableListSignature(baseline.requiredArtifactPaths) === stableListSignature(run.requiredArtifactPaths), `Run ${formatRunId(run)} changed verifier required artifact paths.`);
  }

  const familySummaries = baseline.families.map((/** @type {any} */ baselineFamily) => {
    const perRunFamily = normalizedRuns.map((/** @type {any} */ run) => run.families.find((/** @type {any} */ family) => family.proofFamily === baselineFamily.proofFamily));
    const theoremSummaries = baselineFamily.theoremIds.map((/** @type {string} */ theoremId) => {
      const theoremRuns = perRunFamily.map((/** @type {any} */ family, /** @type {number} */ index) => {
        const verdict = family?.theoremVerdicts.find((/** @type {any} */ entry) => entry.theoremId === theoremId);
        invariant(!!verdict, `Run ${formatRunId(normalizedRuns[index])} is missing theorem ${theoremId} for ${baselineFamily.proofFamily}.`);
        return {
          run: normalizedRuns[index],
          verdict
        };
      });
      return {
        theoremId,
        passedRuns: theoremRuns.filter((/** @type {any} */ entry) => entry.verdict.passed).length,
        totalRuns: theoremRuns.length,
        failingRuns: theoremRuns.filter((/** @type {any} */ entry) => !entry.verdict.passed).map((/** @type {any} */ entry) => formatRunId(entry.run)),
        replayStepIds: summarizeStrings(theoremRuns.flatMap((/** @type {any} */ entry) => entry.verdict.replayStepIds)),
        witnessArtifactPaths: summarizeStrings(theoremRuns.flatMap((/** @type {any} */ entry) => entry.verdict.witnessArtifactPaths)),
        replayArtifactPaths: summarizeStrings(theoremRuns.flatMap((/** @type {any} */ entry) => entry.verdict.replayArtifactPaths)),
        failureReasons: summarizeStrings(theoremRuns.flatMap((/** @type {any} */ entry) => entry.verdict.failureReasons))
      };
    });
    const memberSummaries = baselineFamily.memberIds.map((/** @type {string} */ memberId) => {
      const memberRuns = perRunFamily.map((/** @type {any} */ family, /** @type {number} */ index) => {
        const verdict = family?.memberVerdicts.find((/** @type {any} */ entry) => entry.id === memberId);
        invariant(!!verdict, `Run ${formatRunId(normalizedRuns[index])} is missing member ${memberId} for ${baselineFamily.proofFamily}.`);
        return {
          run: normalizedRuns[index],
          verdict
        };
      });
      return {
        memberId,
        passedRuns: memberRuns.filter((/** @type {any} */ entry) => entry.verdict.passed).length,
        totalRuns: memberRuns.length,
        failingRuns: memberRuns.filter((/** @type {any} */ entry) => !entry.verdict.passed).map((/** @type {any} */ entry) => formatRunId(entry.run)),
        fieldShape: summarizeStrings(memberRuns.flatMap((/** @type {any} */ entry) => entry.verdict.fields))
      };
    });
    return {
      proofFamily: baselineFamily.proofFamily,
      proofArtifactPath: baselineFamily.proofArtifactPath,
      theoremIds: baselineFamily.theoremIds,
      memberIds: baselineFamily.memberIds,
      witnessArtifactPaths: baselineFamily.witnessArtifactPaths,
      replayArtifacts: baselineFamily.replayArtifacts,
      replaySteps: baselineFamily.replaySteps,
      theoremSummaries,
      memberSummaries
    };
  });

  const runMatrix = normalizedRuns.map((run) => ({
    scenarioId: run.scenarioId,
    branchMode: run.branchMode,
    paymentMode: run.paymentMode,
    branchName: run.branchName,
    needId: run.needId,
    assetPackId: run.assetPackId,
    familyCount: run.familyCount,
    allFamiliesPassed: run.allFamiliesPassed,
    proofContractPassed: run.proofContractPassed,
    requiredArtifactPathCount: run.requiredArtifactPaths.length,
    artifactDigestCount: run.artifactDigestEntries.length,
    fullyProven: run.allFamiliesPassed && run.proofContractPassed,
    familyProofHashes: Object.fromEntries(run.families.map((/** @type {any} */ family) => [family.proofFamily, family.proofHash]))
  }));

  const incompleteVerdicts = [
    ...familySummaries.flatMap((/** @type {any} */ family) => family.theoremSummaries.filter((/** @type {any} */ entry) => entry.passedRuns !== entry.totalRuns).map((/** @type {any} */ entry) => ({
      scope: 'theorem',
      proofFamily: family.proofFamily,
      id: entry.theoremId,
      failingRuns: entry.failingRuns,
      failureReasons: entry.failureReasons
    }))),
    ...familySummaries.flatMap((/** @type {any} */ family) => family.memberSummaries.filter((/** @type {any} */ entry) => entry.passedRuns !== entry.totalRuns).map((/** @type {any} */ entry) => ({
      scope: 'member',
      proofFamily: family.proofFamily,
      id: entry.memberId,
      failingRuns: entry.failingRuns,
      failureReasons: []
    })))
  ];

  return {
    version,
    outputPath: defaultProvenOutputPath(version),
    canonicalCommit,
    canonicalCommitRecordedAt,
    worktreeState,
    generatorId,
    generatedAt,
    scenarioIds: collected.scenarioIds,
    branchModes: collected.branchModes,
    paymentModes: collected.paymentModes || [],
    familySummaries,
    runMatrix,
    runDetails: normalizedRuns,
    aggregate: {
      fullyProven: incompleteVerdicts.length === 0 && runMatrix.every((entry) => entry.fullyProven),
      runCount: normalizedRuns.length,
      familyCount: familySummaries.length,
      theoremCount: familySummaries.reduce((/** @type {number} */ sum, /** @type {any} */ family) => sum + family.theoremIds.length, 0),
      memberCount: familySummaries.reduce((/** @type {number} */ sum, /** @type {any} */ family) => sum + family.memberIds.length, 0),
      artifactDigestCount: normalizedRuns.reduce((/** @type {number} */ sum, /** @type {any} */ run) => sum + run.artifactDigestEntries.length, 0)
    },
    incompleteVerdicts
  };
}

/**
 * @param {string} value
 * @returns {string}
 */
function markdownCode(value) {
  return `\`${String(value || '')}\``;
}

/**
 * @param {string} version
 * @returns {string}
 */
function specBrandLabel(version) {
  return 'Bitcode';
}

/**
 * @param {string[]} headers
 * @param {Array<Array<string | number | boolean>>} rows
 * @returns {string}
 */
function renderMarkdownTable(headers, rows) {
  /** @param {string | number | boolean} value */
  const escapeCell = (value) => String(value).replace(/\|/g, '\\|').replace(/\n/g, '<br>');
  const headerRow = `| ${headers.map(escapeCell).join(' | ')} |`;
  const separatorRow = `| ${headers.map(() => '---').join(' | ')} |`;
  const bodyRows = rows.map((row) => `| ${row.map(escapeCell).join(' | ')} |`);
  return [headerRow, separatorRow, ...bodyRows].join('\n');
}

/**
 * @param {ReturnType<typeof buildCanonicalProvenData>} data
 * @returns {string}
 */
export function renderCanonicalProvenMarkdown(data) {
  const v18Matrices = /** @type {any} */ (data).v18Matrices || null;
  const v19 = /** @type {any} */ (data).v19 || null;
  const v20 = /** @type {any} */ (data).v20 || null;
  const v21 = /** @type {any} */ (data).v21 || null;
  const v22 = /** @type {any} */ (data).v22 || null;
  const v23 = /** @type {any} */ (data).v23 || null;
  const v24 = /** @type {any} */ (data).v24 || null;
  const v25 = /** @type {any} */ (data).v25 || null;
  const v26 = /** @type {any} */ (data).v26 || null;
  const lines = [];
  lines.push(`# ${specBrandLabel(data.version)} Spec ${data.version} Proven`);
  lines.push('');
  lines.push(`- canonicalVersion: ${markdownCode(data.version)}`);
  lines.push(`- canonicalCommit: ${markdownCode(data.canonicalCommit)}`);
  lines.push(`- canonicalCommitRecordedAt: ${markdownCode(data.canonicalCommitRecordedAt || 'unknown')}`);
  lines.push(`- worktreeState: ${markdownCode(data.worktreeState)}`);
  lines.push(`- generatorId: ${markdownCode(data.generatorId)}`);
  lines.push(`- generatedAt: ${markdownCode(data.generatedAt)}`);
  lines.push(`- outputPath: ${markdownCode(data.outputPath)}`);
  lines.push(`- scenarioIds: ${data.scenarioIds.map(markdownCode).join(', ')}`);
  lines.push(`- branchModes: ${data.branchModes.map(markdownCode).join(', ')}`);
  if (Array.isArray(data.paymentModes) && data.paymentModes.length) {
    lines.push(`- paymentModes: ${data.paymentModes.map(markdownCode).join(', ')}`);
  }
  lines.push('');
  lines.push('## Aggregate Verdict');
  lines.push('');
  lines.push(`- fullyProven: ${markdownCode(String(data.aggregate.fullyProven))}`);
  lines.push(`- runCount: ${markdownCode(String(data.aggregate.runCount))}`);
  lines.push(`- familyCount: ${markdownCode(String(data.aggregate.familyCount))}`);
  lines.push(`- theoremCount: ${markdownCode(String(data.aggregate.theoremCount))}`);
  lines.push(`- memberCount: ${markdownCode(String(data.aggregate.memberCount))}`);
  lines.push(`- artifactDigestCount: ${markdownCode(String(data.aggregate.artifactDigestCount))}`);
  if (v18Matrices) {
    lines.push(`- v18MatrixCount: ${markdownCode(String(v18Matrices.summaries.length))}`);
    lines.push(`- v18MatrixCellCount: ${markdownCode(String(v18Matrices.summaries.reduce((/** @type {number} */ sum, /** @type {any} */ summary) => sum + summary.cellCount, 0)))}`);
    lines.push(`- v18MatricesFullyProven: ${markdownCode(String(v18Matrices.fullyProven))}`);
  }
  if (v19) {
    lines.push(`- v19PositiveMatrixCellCount: ${markdownCode(String(v19.positiveMatrices.inheritedPositiveBaseline.cellCount))}`);
    lines.push(`- v19MutationCellCount: ${markdownCode(String(v19.negativeMutationMatrix.cellCount))}`);
    lines.push(`- v19MutationCoverageMode: ${markdownCode(v19.negativeMutationMatrix.coverageMode)}`);
    lines.push(`- v19VolatilityBlockingFindings: ${markdownCode(String(v19.volatilityInventory.blockingFindings.length))}`);
    lines.push(`- v19ReplayDeterministic: ${markdownCode(String(v19.deterministicReplayReport?.passed === true))}`);
    lines.push(`- v19ContractLedgerPassed: ${markdownCode(String(v19.contractChangeLedger.passed === true))}`);
  }
  if (v20) {
    lines.push(`- v20QualityPassed: ${markdownCode(String(v20.qualitySummary.passed === true))}`);
    lines.push(`- v20QualityReportCount: ${markdownCode(String(v20.qualitySummary.qualityReportCount))}`);
    lines.push(`- v20GeneratedQualityArtifactCount: ${markdownCode(String(v20.qualitySummary.generatedArtifactCount))}`);
    lines.push(`- v20QualityBlockingFailures: ${markdownCode(String(v20.qualitySummary.blockingFailures.length))}`);
    lines.push(`- v20ProjectionSmokeCells: ${markdownCode(String(v20.projectionQualitySmokeMatrix.cellCount))}`);
  }
  if (v21) {
    lines.push(`- v21SpecFamilyPassed: ${markdownCode(String(v21.specFamilyReport.passed === true))}`);
    lines.push(`- v21CanonicalInputsPassed: ${markdownCode(String(v21.canonicalInputReport.passed === true))}`);
    lines.push(`- v21GeneratedArtifactCount: ${markdownCode(String((v21.artifactSummaries || []).length))}`);
  }
  if (v22) {
    lines.push(`- v22SpecFamilyPassed: ${markdownCode(String(v22.specFamilyReport.passed === true))}`);
    lines.push(`- v22CanonicalInputsPassed: ${markdownCode(String(v22.canonicalInputReport.passed === true))}`);
    lines.push(`- v22CanonPostureDriftPassed: ${markdownCode(String(v22.canonPostureDriftReport.passed === true))}`);
    lines.push(`- v22GeneratedArtifactCount: ${markdownCode(String((v22.artifactSummaries || []).length))}`);
  }
  if (v23) {
    lines.push(`- v23SpecFamilyPassed: ${markdownCode(String(v23.specFamilyReport.passed === true))}`);
    lines.push(`- v23CanonicalInputsPassed: ${markdownCode(String(v23.canonicalInputReport.passed === true))}`);
    lines.push(`- v23CanonPostureDriftPassed: ${markdownCode(String(v23.canonPostureDriftReport.passed === true))}`);
    lines.push(`- v23GeneratedArtifactCount: ${markdownCode(String((v23.artifactSummaries || []).length))}`);
  }
  if (v24) {
    lines.push(`- v24SpecFamilyPassed: ${markdownCode(String(v24.specFamilyReport.passed === true))}`);
    lines.push(`- v24CanonicalInputsPassed: ${markdownCode(String(v24.canonicalInputReport.passed === true))}`);
    lines.push(`- v24CanonPostureDriftPassed: ${markdownCode(String(v24.canonPostureDriftReport.passed === true))}`);
    lines.push(`- v24GeneratedArtifactCount: ${markdownCode(String((v24.artifactSummaries || []).length))}`);
  }
  if (v25) {
    lines.push(`- v25SpecFamilyPassed: ${markdownCode(String(v25.specFamilyReport.passed === true))}`);
    lines.push(`- v25CanonicalInputsPassed: ${markdownCode(String(v25.canonicalInputReport.passed === true))}`);
    lines.push(`- v25CanonPostureDriftPassed: ${markdownCode(String(v25.canonPostureDriftReport.passed === true))}`);
    lines.push(`- v25GeneratedArtifactCount: ${markdownCode(String((v25.artifactSummaries || []).length))}`);
  }
  if (v26) {
    lines.push(`- v26SpecFamilyPassed: ${markdownCode(String(v26.specFamilyReport.passed === true))}`);
    lines.push(`- v26CanonicalInputsPassed: ${markdownCode(String(v26.canonicalInputReport.passed === true))}`);
    lines.push(`- v26ConversationsContinuityPassed: ${markdownCode(String(v26.conversationsContinuityProof.passed === true))}`);
    lines.push(`- v26RunsPipelinesTotalityPassed: ${markdownCode(String(v26.runsPipelinesTotalityProof.passed === true))}`);
    lines.push(`- v26PersistenceSchemaTotalityPassed: ${markdownCode(String(v26.persistenceSchemaTotalityProof.passed === true))}`);
    lines.push(`- v26PromptSystemTotalityPassed: ${markdownCode(String(v26.promptSystemTotalityProof.passed === true))}`);
    lines.push(`- v26RetainedPackageAdmissibilityPassed: ${markdownCode(String(v26.retainedPackageAdmissibilityProof.passed === true))}`);
    lines.push(`- v26GeneratedArtifactCount: ${markdownCode(String((v26.artifactSummaries || []).length))}`);
    lines.push(`- v26DraftPreview: ${markdownCode(String(v26.draftPreview === true))}`);
    lines.push(`- v26PromotionReady: ${markdownCode(String(v26.promotionReady === true))}`);
  }
  lines.push('');
  if (v18Matrices) {
    lines.push('## V18 Generated Matrix Summaries');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['matrixId', 'sourceRunCount', 'cellCount', 'passedCellCount', 'failedCellCount', 'acceptedExclusionCount'],
      v18Matrices.summaries.map((/** @type {any} */ summary) => [
        markdownCode(summary.matrixId),
        summary.sourceRunCount,
        summary.cellCount,
        summary.passedCellCount,
        summary.failedCellCount,
        summary.acceptedExclusionCount
      ])
    ));
    lines.push('');
    lines.push('### V18 State-Machine Group Counts');
    lines.push('');
    const stateSummary = summarizeV18Matrix(v18Matrices.stateMachineMatrix);
    lines.push(renderMarkdownTable(
      ['matrixGroup', 'cellCount'],
      Object.entries(stateSummary.groupCounts).map(([group, count]) => [markdownCode(group), /** @type {number} */ (count)])
    ));
    lines.push('');
    lines.push('### V18 Matrix Failures');
    lines.push('');
    const failedCells = [
      ...v18Matrices.proofMemberSemanticMatrix.failedCells,
      ...v18Matrices.theoremEvidenceMatrix.failedCells,
      ...v18Matrices.stateMachineMatrix.failedCells
    ];
    if (!failedCells.length) {
      lines.push('- none');
    } else {
      for (const cell of failedCells) {
        lines.push(`- matrix=${markdownCode(cell.matrixId || 'unknown')} scenario=${markdownCode(cell.scenarioId)} branchMode=${markdownCode(cell.branchMode || 'none')} predicate=${markdownCode(cell.predicateId || cell.evidencePredicateId || 'unknown')} failure=${markdownCode(cell.failureReason || 'unknown')}`);
      }
    }
    lines.push('');
  }
  if (v19) {
    lines.push('## V19 Reproducible Canon Reports');
    lines.push('');
    lines.push('### V19 Generated Artifact Inventory');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['artifactPath', 'digest', 'byteLength'],
      (v19.artifactSummaries || []).map((/** @type {any} */ artifact) => [
        markdownCode(artifact.artifactPath),
        markdownCode(artifact.digest),
        artifact.byteLength
      ])
    ));
    lines.push('');
    lines.push('### V19 Inherited Positive Matrix Summaries');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['matrixId', 'sourceRunCount', 'cellCount', 'passedCellCount', 'failedCellCount', 'acceptedExclusionCount'],
      v19.positiveMatrices.summaries.map((/** @type {any} */ summary) => [
        markdownCode(summary.matrixId),
        summary.sourceRunCount,
        summary.cellCount,
        summary.passedCellCount,
        summary.failedCellCount,
        summary.acceptedExclusionCount
      ])
    ));
    lines.push('');
    lines.push('### V19 Deterministic Replay');
    lines.push('');
    const replayReport = v19.deterministicReplayReport || null;
    if (!replayReport) {
      lines.push('- replay report not attached');
    } else {
      lines.push(`- reportId: ${markdownCode(replayReport.reportId)}`);
      lines.push(`- runCount: ${markdownCode(String(replayReport.runCount))}`);
      lines.push(`- passed: ${markdownCode(String(replayReport.passed))}`);
      lines.push(`- failureReason: ${markdownCode(replayReport.failureReason || 'none')}`);
      lines.push('');
      lines.push(renderMarkdownTable(
        ['artifactPath', 'firstDigest', 'secondDigest', 'byteEqual'],
        replayReport.artifactComparisons.map((/** @type {any} */ comparison) => [
          markdownCode(comparison.artifactPath),
          markdownCode(comparison.firstDigest),
          markdownCode(comparison.secondDigest),
          markdownCode(String(comparison.byteEqual))
        ])
      ));
    }
    lines.push('');
    lines.push('### V19 Volatility Inventory');
    lines.push('');
    lines.push(`- inventoryId: ${markdownCode(v19.volatilityInventory.inventoryId)}`);
    lines.push(`- scannedArtifactCount: ${markdownCode(String(v19.volatilityInventory.scannedArtifactCount))}`);
    lines.push(`- findingCount: ${markdownCode(String(v19.volatilityInventory.findingCount))}`);
    lines.push(`- blockingFindingCount: ${markdownCode(String(v19.volatilityInventory.blockingFindings.length))}`);
    lines.push(`- passed: ${markdownCode(String(v19.volatilityInventory.passed))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['classification', 'count'],
      Object.entries(v19.volatilityInventory.classificationCounts).map(([classification, count]) => [
        markdownCode(classification),
        /** @type {number} */ (count)
      ])
    ));
    lines.push('');
    lines.push('### V19 Negative Proof Mutation Matrix');
    lines.push('');
    lines.push(`- matrixId: ${markdownCode(v19.negativeMutationMatrix.matrixId)}`);
    lines.push(`- coverageMode: ${markdownCode(v19.negativeMutationMatrix.coverageMode)}`);
    lines.push(`- mutationClassCount: ${markdownCode(String(v19.negativeMutationMatrix.mutationClassCount))}`);
    lines.push(`- cellCount: ${markdownCode(String(v19.negativeMutationMatrix.cellCount))}`);
    lines.push(`- rejectedCellCount: ${markdownCode(String(v19.negativeMutationMatrix.rejectedCellCount))}`);
    lines.push(`- unexpectedPassCount: ${markdownCode(String(v19.negativeMutationMatrix.unexpectedPassCells.length))}`);
    lines.push(`- unexpectedErrorCount: ${markdownCode(String(v19.negativeMutationMatrix.unexpectedErrorCells.length))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['mutationClass', 'expectedErrorClass', 'actualErrorClass', 'rejectedAsExpected'],
      v19.negativeMutationMatrix.cells.map((/** @type {any} */ cell) => [
        markdownCode(cell.mutationClass),
        markdownCode(cell.expectedErrorClass),
        markdownCode(cell.actualErrorClass),
        markdownCode(String(cell.rejectedAsExpected))
      ])
    ));
    lines.push('');
    lines.push('### V19 Omitted Mutation Cross-Products');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['omittedPermutation', 'reason', 'reopenCondition'],
      v19.negativeMutationMatrix.omittedCrossProducts.map((/** @type {any} */ entry) => [
        markdownCode(entry.omittedPermutation),
        entry.reason,
        entry.reopenCondition
      ])
    ));
    lines.push('');
    lines.push('### V19 Contract-Change Ledger');
    lines.push('');
    lines.push(`- ledgerId: ${markdownCode(v19.contractChangeLedger.ledgerId)}`);
    lines.push(`- fromVersion: ${markdownCode(v19.contractChangeLedger.fromVersion)}`);
    lines.push(`- toVersion: ${markdownCode(v19.contractChangeLedger.toVersion)}`);
    lines.push(`- passed: ${markdownCode(String(v19.contractChangeLedger.passed))}`);
    lines.push(`- proofCatalogDelta: ${markdownCode(v19.contractChangeLedger.proofCatalogDelta.status)}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['changeType', 'fromMatrixId', 'toMatrixId', 'cellCount'],
      v19.contractChangeLedger.matrixDeltas.map((/** @type {any} */ delta) => [
        markdownCode(delta.changeType),
        markdownCode(delta.fromMatrixId),
        markdownCode(delta.toMatrixId),
        delta.cellCount
      ])
    ));
    lines.push('');
  }
  if (v20) {
    lines.push('## V20 Operator Quality Reports');
    lines.push('');
    lines.push('### V20 Generated Quality Artifact Inventory');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['artifactPath', 'digest', 'byteLength'],
      (v20.artifactSummaries || []).map((/** @type {any} */ artifact) => [
        markdownCode(artifact.artifactPath),
        markdownCode(artifact.digest),
        artifact.byteLength
      ])
    ));
    lines.push('');
    lines.push('### V20 Quality Summary');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v20.qualitySummary.reportId)}`);
    lines.push(`- passed: ${markdownCode(String(v20.qualitySummary.passed))}`);
    lines.push(`- qualityReportCount: ${markdownCode(String(v20.qualitySummary.qualityReportCount))}`);
    lines.push(`- generatedArtifactCount: ${markdownCode(String(v20.qualitySummary.generatedArtifactCount))}`);
    lines.push(`- inheritedPositiveMatrixCellCount: ${markdownCode(String(v20.qualitySummary.inheritedProofClosure.positiveMatrixCellCount))}`);
    lines.push(`- inheritedNegativeMutationCellCount: ${markdownCode(String(v20.qualitySummary.inheritedProofClosure.negativeMutationCellCount))}`);
    lines.push(`- inheritedDeterministicReplayPassed: ${markdownCode(String(v20.qualitySummary.inheritedProofClosure.deterministicReplayPassed))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['reportId', 'artifactPath', 'passed', 'blockingFailures', 'acceptedExclusions'],
      v20.qualitySummary.reportSummaries.map((/** @type {any} */ report) => [
        markdownCode(report.reportId),
        markdownCode(report.artifactPath),
        markdownCode(String(report.passed)),
        report.blockingFailureCount,
        report.acceptedExclusionCount
      ])
    ));
    lines.push('');
    lines.push('### V20 Operator Acceptance Transcript');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v20.operatorAcceptanceTranscript.reportId)}`);
    lines.push(`- transcriptMode: ${markdownCode(v20.operatorAcceptanceTranscript.transcriptMode)}`);
    lines.push(`- flowCount: ${markdownCode(String(v20.operatorAcceptanceTranscript.flowCount))}`);
    lines.push(`- stepCount: ${markdownCode(String(v20.operatorAcceptanceTranscript.stepCount))}`);
    lines.push(`- passed: ${markdownCode(String(v20.operatorAcceptanceTranscript.passed))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['flowId', 'stepId', 'scenarioId', 'branchMode', 'principal', 'passed'],
      v20.operatorAcceptanceTranscript.steps.map((/** @type {any} */ step) => [
        markdownCode(step.flowId),
        markdownCode(step.stepId),
        markdownCode(step.scenarioId),
        markdownCode(step.branchMode),
        markdownCode(step.projectionPrincipal),
        markdownCode(String(step.passed))
      ])
    ));
    lines.push('');
    lines.push('### V20 Visual Regression Budget');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v20.visualRegressionReport.reportId)}`);
    lines.push(`- signatureMode: ${markdownCode(v20.visualRegressionReport.signatureMode)}`);
    lines.push(`- screenshotMode: ${markdownCode(v20.visualRegressionReport.screenshotMode)}`);
    lines.push(`- stateCount: ${markdownCode(String(v20.visualRegressionReport.stateCount))}`);
    lines.push(`- passed: ${markdownCode(String(v20.visualRegressionReport.passed))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['stateId', 'scenarioId', 'branchMode', 'principal', 'signatureDigest', 'passed'],
      v20.visualRegressionReport.states.map((/** @type {any} */ state) => [
        markdownCode(state.stateId),
        markdownCode(state.scenarioId),
        markdownCode(state.branchMode),
        markdownCode(state.projectionPrincipal),
        markdownCode(state.signatureDigest),
        markdownCode(String(state.passed))
      ])
    ));
    lines.push('');
    lines.push('### V20 Accessibility Budget');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v20.accessibilityReport.reportId)}`);
    lines.push(`- engine: ${markdownCode(v20.accessibilityReport.engine)}`);
    lines.push(`- checkCount: ${markdownCode(String(v20.accessibilityReport.checkCount))}`);
    lines.push(`- normalTextContrast: ${markdownCode(String(v20.accessibilityReport.contrastThresholds.normalTextRatio))}`);
    lines.push(`- nonTextUiContrast: ${markdownCode(String(v20.accessibilityReport.contrastThresholds.nonTextUiRatio))}`);
    lines.push(`- passed: ${markdownCode(String(v20.accessibilityReport.passed))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['checkId', 'passed', 'assertionCount'],
      v20.accessibilityReport.checks.map((/** @type {any} */ check) => [
        markdownCode(check.checkId),
        markdownCode(String(check.passed)),
        check.assertions.length
      ])
    ));
    lines.push('');
    lines.push('### V20 Performance Budget');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v20.performanceBudgetReport.reportId)}`);
    lines.push(`- measurementMode: ${markdownCode(v20.performanceBudgetReport.measurementMode)}`);
    lines.push(`- operationCount: ${markdownCode(String(v20.performanceBudgetReport.operationCount))}`);
    lines.push(`- passed: ${markdownCode(String(v20.performanceBudgetReport.passed))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['operationId', 'budgetMs', 'hardGate', 'normalizedElapsedClass', 'passed'],
      v20.performanceBudgetReport.operations.map((/** @type {any} */ operation) => [
        markdownCode(operation.operationId),
        operation.budgetMs === null ? markdownCode('report-only') : operation.budgetMs,
        markdownCode(String(operation.hardGate)),
        markdownCode(operation.normalizedElapsedClass),
        markdownCode(String(operation.passed))
      ])
    ));
    lines.push('');
    lines.push('### V20 Projection Quality Smoke Matrix');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v20.projectionQualitySmokeMatrix.reportId)}`);
    lines.push(`- matrixMode: ${markdownCode(v20.projectionQualitySmokeMatrix.matrixMode)}`);
    lines.push(`- cellCount: ${markdownCode(String(v20.projectionQualitySmokeMatrix.cellCount))}`);
    lines.push(`- inheritedBrowserMatrixCells: ${markdownCode(String(v20.projectionQualitySmokeMatrix.inheritedBrowserMatrix.cellCount))}`);
    lines.push(`- passed: ${markdownCode(String(v20.projectionQualitySmokeMatrix.passed))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['principal', 'scenarioId', 'rawFiles', 'sourceVisible', 'authVisible', 'qualityRequiresForbidden', 'passed'],
      v20.projectionQualitySmokeMatrix.cells.map((/** @type {any} */ cell) => [
        markdownCode(cell.principal),
        markdownCode(cell.scenarioId),
        markdownCode(String(cell.rawBranchFilesAvailable)),
        markdownCode(String(cell.sourceMaterialVisible)),
        markdownCode(String(cell.authorizationDecisionsVisible)),
        markdownCode(String(cell.qualityChecksDependOnForbiddenSurface)),
        markdownCode(String(cell.passed))
      ])
    ));
    lines.push('');
  }
  if (v21) {
    lines.push('## V21 Specifying Reports');
    lines.push('');
    lines.push('### V21 Generated Specifying Artifact Inventory');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['artifactPath', 'digest', 'byteLength'],
      (v21.artifactSummaries || []).map((/** @type {any} */ artifact) => [
        markdownCode(artifact.artifactPath),
        markdownCode(artifact.digest),
        artifact.byteLength
      ])
    ));
    lines.push('');
    lines.push('### V21 Spec-Family Report');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v21.specFamilyReport.reportId)}`);
    lines.push(`- mode: ${markdownCode(v21.specFamilyReport.mode)}`);
    lines.push(`- currentTarget: ${markdownCode(v21.specFamilyReport.currentTarget)}`);
    lines.push(`- passed: ${markdownCode(String(v21.specFamilyReport.passed))}`);
    lines.push(`- failureCount: ${markdownCode(String(v21.specFamilyReport.failureCount))}`);
    lines.push(`- requiredSpecSectionCount: ${markdownCode(String(v21.specFamilyReport.requiredSpecSectionCount))}`);
    lines.push(`- requiredAppendixSectionCount: ${markdownCode(String(v21.specFamilyReport.requiredAppendixSectionCount))}`);
    lines.push(`- requiredProofFamilyCount: ${markdownCode(String(v21.specFamilyReport.requiredProofFamilyCount))}`);
    lines.push(`- requiredSubsystemCoverageCount: ${markdownCode(String(v21.specFamilyReport.requiredSubsystemCoverageCount))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['requiredFile', 'supportFile'],
      v21.specFamilyReport.requiredFiles.map((/** @type {string} */ file, /** @type {number} */ index) => [
        markdownCode(file),
        markdownCode(v21.specFamilyReport.supportFiles[index] || 'none')
      ])
    ));
    lines.push('');
    lines.push('### V21 Canonical-Input Report');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v21.canonicalInputReport.reportId)}`);
    lines.push(`- checkedTargetVersion: ${markdownCode(v21.canonicalInputReport.checkedTargetVersion)}`);
    lines.push(`- parityPath: ${markdownCode(String(v21.canonicalInputReport.parityPath || 'missing'))}`);
    lines.push(`- passed: ${markdownCode(String(v21.canonicalInputReport.passed))}`);
    lines.push(`- failureCount: ${markdownCode(String(v21.canonicalInputReport.failureCount))}`);
    lines.push(`- requiredGeneratedArtifactCount: ${markdownCode(String(v21.canonicalInputReport.requiredGeneratedArtifactCount))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['specPath', 'provenPath', 'requiredGeneratedArtifactPaths'],
      [[
        markdownCode(v21.canonicalInputReport.specPath),
        markdownCode(v21.canonicalInputReport.provenPath),
        v21.canonicalInputReport.requiredGeneratedArtifactPaths.map(markdownCode).join(', ')
      ]]
    ));
    lines.push('');
  }
  if (v22) {
    lines.push('## V22 Drift-Detection and Specifying Reports');
    lines.push('');
    lines.push('### V22 Generated Artifact Inventory');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['artifactPath', 'digest', 'byteLength'],
      (v22.artifactSummaries || []).map((/** @type {any} */ artifact) => [
        markdownCode(artifact.artifactPath),
        markdownCode(artifact.digest),
        artifact.byteLength
      ])
    ));
    lines.push('');
    lines.push('### V22 Spec-Family Report');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v22.specFamilyReport.reportId)}`);
    lines.push(`- mode: ${markdownCode(v22.specFamilyReport.mode)}`);
    lines.push(`- currentTarget: ${markdownCode(v22.specFamilyReport.currentTarget)}`);
    lines.push(`- passed: ${markdownCode(String(v22.specFamilyReport.passed))}`);
    lines.push(`- failureCount: ${markdownCode(String(v22.specFamilyReport.failureCount))}`);
    lines.push(`- requiredSpecSectionCount: ${markdownCode(String(v22.specFamilyReport.requiredSpecSectionCount))}`);
    lines.push(`- requiredGeneratedArtifactPathCount: ${markdownCode(String(v22.specFamilyReport.requiredGeneratedArtifactPathCount))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['requiredFile', 'supportFile'],
      v22.specFamilyReport.requiredFiles.map((/** @type {string} */ file, /** @type {number} */ index) => [
        markdownCode(file),
        markdownCode(v22.specFamilyReport.supportFiles[index] || 'none')
      ])
    ));
    lines.push('');
    lines.push('### V22 Canonical-Input Report');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v22.canonicalInputReport.reportId)}`);
    lines.push(`- checkedTargetVersion: ${markdownCode(v22.canonicalInputReport.checkedTargetVersion)}`);
    lines.push(`- parityPath: ${markdownCode(String(v22.canonicalInputReport.parityPath || 'missing'))}`);
    lines.push(`- passed: ${markdownCode(String(v22.canonicalInputReport.passed))}`);
    lines.push(`- failureCount: ${markdownCode(String(v22.canonicalInputReport.failureCount))}`);
    lines.push(`- requiredGeneratedArtifactCount: ${markdownCode(String(v22.canonicalInputReport.requiredGeneratedArtifactCount))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['specPath', 'provenPath', 'requiredGeneratedArtifactPaths'],
      [[
        markdownCode(v22.canonicalInputReport.specPath),
        markdownCode(v22.canonicalInputReport.provenPath),
        v22.canonicalInputReport.requiredGeneratedArtifactPaths.map(markdownCode).join(', ')
      ]]
    ));
    lines.push('');
    lines.push('### V22 Canon-Posture Drift Report');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v22.canonPostureDriftReport.reportId)}`);
    lines.push(`- checkedActiveCanonVersion: ${markdownCode(v22.canonPostureDriftReport.checkedActiveCanonVersion)}`);
    lines.push(`- checkedDraftTargetVersion: ${markdownCode(v22.canonPostureDriftReport.checkedDraftTargetVersion)}`);
    lines.push(`- passed: ${markdownCode(String(v22.canonPostureDriftReport.passed))}`);
    lines.push(`- checkCount: ${markdownCode(String(v22.canonPostureDriftReport.checkCount))}`);
    lines.push(`- blockingFailureCount: ${markdownCode(String(v22.canonPostureDriftReport.blockingFailureCount))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['checkId', 'passed', 'detail'],
      v22.canonPostureDriftReport.checks.map((/** @type {any} */ check) => [
        markdownCode(check.checkId),
        markdownCode(String(check.passed)),
        check.detail
      ])
    ));
    lines.push('');
  }
  if (v23) {
    lines.push('## V23 Deployment and Canon Reports');
    lines.push('');
    lines.push('### V23 Generated Artifact Inventory');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['artifactPath', 'digest', 'byteLength'],
      (v23.artifactSummaries || []).map((/** @type {any} */ artifact) => [
        markdownCode(artifact.artifactPath),
        markdownCode(artifact.digest),
        artifact.byteLength
      ])
    ));
    lines.push('');
    lines.push('### V23 Spec-Family Report');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v23.specFamilyReport.reportId)}`);
    lines.push(`- mode: ${markdownCode(v23.specFamilyReport.mode)}`);
    lines.push(`- currentTarget: ${markdownCode(v23.specFamilyReport.currentTarget)}`);
    lines.push(`- passed: ${markdownCode(String(v23.specFamilyReport.passed))}`);
    lines.push(`- failureCount: ${markdownCode(String(v23.specFamilyReport.failureCount))}`);
    lines.push(`- requiredSpecSectionCount: ${markdownCode(String(v23.specFamilyReport.requiredSpecSectionCount))}`);
    lines.push(`- requiredGeneratedArtifactPathCount: ${markdownCode(String(v23.specFamilyReport.requiredGeneratedArtifactPathCount))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['requiredFile', 'supportFile'],
      v23.specFamilyReport.requiredFiles.map((/** @type {string} */ file, /** @type {number} */ index) => [
        markdownCode(file),
        markdownCode(v23.specFamilyReport.supportFiles[index] || 'none')
      ])
    ));
    lines.push('');
    lines.push('### V23 Canonical-Input Report');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v23.canonicalInputReport.reportId)}`);
    lines.push(`- checkedTargetVersion: ${markdownCode(v23.canonicalInputReport.checkedTargetVersion)}`);
    lines.push(`- parityPath: ${markdownCode(String(v23.canonicalInputReport.parityPath || 'missing'))}`);
    lines.push(`- passed: ${markdownCode(String(v23.canonicalInputReport.passed))}`);
    lines.push(`- failureCount: ${markdownCode(String(v23.canonicalInputReport.failureCount))}`);
    lines.push(`- requiredGeneratedArtifactCount: ${markdownCode(String(v23.canonicalInputReport.requiredGeneratedArtifactCount))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['specPath', 'provenPath', 'requiredGeneratedArtifactPaths'],
      [[
        markdownCode(v23.canonicalInputReport.specPath),
        markdownCode(v23.canonicalInputReport.provenPath),
        v23.canonicalInputReport.requiredGeneratedArtifactPaths.map(markdownCode).join(', ')
      ]]
    ));
    lines.push('');
    lines.push('### V23 Canon-Posture Drift Report');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v23.canonPostureDriftReport.reportId)}`);
    lines.push(`- checkedActiveCanonVersion: ${markdownCode(v23.canonPostureDriftReport.checkedActiveCanonVersion)}`);
    lines.push(`- checkedDraftTargetVersion: ${markdownCode(v23.canonPostureDriftReport.checkedDraftTargetVersion)}`);
    lines.push(`- passed: ${markdownCode(String(v23.canonPostureDriftReport.passed))}`);
    lines.push(`- checkCount: ${markdownCode(String(v23.canonPostureDriftReport.checkCount))}`);
    lines.push(`- blockingFailureCount: ${markdownCode(String(v23.canonPostureDriftReport.blockingFailureCount))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['checkId', 'passed', 'detail'],
      v23.canonPostureDriftReport.checks.map((/** @type {any} */ check) => [
        markdownCode(check.checkId),
        markdownCode(String(check.passed)),
        check.detail
      ])
    ));
    lines.push('');
  }
  if (v24) {
    lines.push('## V24 External-Realization and Canon Reports');
    lines.push('');
    lines.push(`- realizedExternalProofFamilies: ${[
      'external-realization-execution',
      'containerized-reality',
      'github-live-interface'
    ].map(markdownCode).join(', ')}`);
    lines.push('');
    lines.push('### V24 Generated Artifact Inventory');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['artifactPath', 'digest', 'byteLength'],
      (v24.artifactSummaries || []).map((/** @type {any} */ artifact) => [
        markdownCode(artifact.artifactPath),
        markdownCode(artifact.digest),
        artifact.byteLength
      ])
    ));
    lines.push('');
    lines.push('### V24 Spec-Family Report');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v24.specFamilyReport.reportId)}`);
    lines.push(`- mode: ${markdownCode(v24.specFamilyReport.mode)}`);
    lines.push(`- currentTarget: ${markdownCode(v24.specFamilyReport.currentTarget)}`);
    lines.push(`- passed: ${markdownCode(String(v24.specFamilyReport.passed))}`);
    lines.push(`- failureCount: ${markdownCode(String(v24.specFamilyReport.failureCount))}`);
    lines.push(`- requiredSpecSectionCount: ${markdownCode(String(v24.specFamilyReport.requiredSpecSectionCount))}`);
    lines.push(`- requiredGeneratedArtifactPathCount: ${markdownCode(String(v24.specFamilyReport.requiredGeneratedArtifactPathCount))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['requiredFile', 'supportFile'],
      v24.specFamilyReport.requiredFiles.map((/** @type {string} */ file, /** @type {number} */ index) => [
        markdownCode(file),
        markdownCode(v24.specFamilyReport.supportFiles[index] || 'none')
      ])
    ));
    lines.push('');
    lines.push('### V24 Canonical-Input Report');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v24.canonicalInputReport.reportId)}`);
    lines.push(`- checkedTargetVersion: ${markdownCode(v24.canonicalInputReport.checkedTargetVersion)}`);
    lines.push(`- parityPath: ${markdownCode(String(v24.canonicalInputReport.parityPath || 'missing'))}`);
    lines.push(`- passed: ${markdownCode(String(v24.canonicalInputReport.passed))}`);
    lines.push(`- failureCount: ${markdownCode(String(v24.canonicalInputReport.failureCount))}`);
    lines.push(`- requiredGeneratedArtifactCount: ${markdownCode(String(v24.canonicalInputReport.requiredGeneratedArtifactCount))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['specPath', 'provenPath', 'requiredGeneratedArtifactPaths'],
      [[
        markdownCode(v24.canonicalInputReport.specPath),
        markdownCode(v24.canonicalInputReport.provenPath),
        v24.canonicalInputReport.requiredGeneratedArtifactPaths.map(markdownCode).join(', ')
      ]]
    ));
    lines.push('');
    lines.push('### V24 Canon-Posture Drift Report');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v24.canonPostureDriftReport.reportId)}`);
    lines.push(`- checkedActiveCanonVersion: ${markdownCode(v24.canonPostureDriftReport.checkedActiveCanonVersion)}`);
    lines.push(`- checkedDraftTargetVersion: ${markdownCode(v24.canonPostureDriftReport.checkedDraftTargetVersion)}`);
    lines.push(`- passed: ${markdownCode(String(v24.canonPostureDriftReport.passed))}`);
    lines.push(`- checkCount: ${markdownCode(String(v24.canonPostureDriftReport.checkCount))}`);
    lines.push(`- blockingFailureCount: ${markdownCode(String(v24.canonPostureDriftReport.blockingFailureCount))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['checkId', 'passed', 'detail'],
      v24.canonPostureDriftReport.checks.map((/** @type {any} */ check) => [
        markdownCode(check.checkId),
        markdownCode(String(check.passed)),
        check.detail
      ])
    ));
    lines.push('');
  }
  if (v25) {
    lines.push('## V25 Bitcode Rename and Canon Reports');
    lines.push('');
    lines.push(`- projectRenameTarget: ${markdownCode('Bitcode')}`);
    lines.push(`- denominationRenameTarget: ${markdownCode('BTD')}`);
    lines.push('');
    lines.push('### V25 Generated Artifact Inventory');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['artifactPath', 'digest', 'byteLength'],
      (v25.artifactSummaries || []).map((/** @type {any} */ artifact) => [
        markdownCode(artifact.artifactPath),
        markdownCode(artifact.digest),
        artifact.byteLength
      ])
    ));
    lines.push('');
    lines.push('### V25 Spec-Family Report');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v25.specFamilyReport.reportId)}`);
    lines.push(`- mode: ${markdownCode(v25.specFamilyReport.mode)}`);
    lines.push(`- currentTarget: ${markdownCode(v25.specFamilyReport.currentTarget)}`);
    lines.push(`- passed: ${markdownCode(String(v25.specFamilyReport.passed))}`);
    lines.push(`- failureCount: ${markdownCode(String(v25.specFamilyReport.failureCount))}`);
    lines.push(`- requiredSpecSectionCount: ${markdownCode(String(v25.specFamilyReport.requiredSpecSectionCount))}`);
    lines.push(`- requiredGeneratedArtifactPathCount: ${markdownCode(String(v25.specFamilyReport.requiredGeneratedArtifactPathCount))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['requiredFile', 'supportFile'],
      v25.specFamilyReport.requiredFiles.map((/** @type {string} */ file, /** @type {number} */ index) => [
        markdownCode(file),
        markdownCode(v25.specFamilyReport.supportFiles[index] || 'none')
      ])
    ));
    lines.push('');
    lines.push('### V25 Canonical-Input Report');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v25.canonicalInputReport.reportId)}`);
    lines.push(`- checkedTargetVersion: ${markdownCode(v25.canonicalInputReport.checkedTargetVersion)}`);
    lines.push(`- parityPath: ${markdownCode(String(v25.canonicalInputReport.parityPath || 'missing'))}`);
    lines.push(`- passed: ${markdownCode(String(v25.canonicalInputReport.passed))}`);
    lines.push(`- failureCount: ${markdownCode(String(v25.canonicalInputReport.failureCount))}`);
    lines.push(`- requiredGeneratedArtifactCount: ${markdownCode(String(v25.canonicalInputReport.requiredGeneratedArtifactCount))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['specPath', 'provenPath', 'requiredGeneratedArtifactPaths'],
      [[
        markdownCode(v25.canonicalInputReport.specPath),
        markdownCode(v25.canonicalInputReport.provenPath),
        v25.canonicalInputReport.requiredGeneratedArtifactPaths.map(markdownCode).join(', ')
      ]]
    ));
    lines.push('');
    lines.push('### V25 Canon-Posture Drift Report');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v25.canonPostureDriftReport.reportId)}`);
    lines.push(`- checkedActiveCanonVersion: ${markdownCode(v25.canonPostureDriftReport.checkedActiveCanonVersion)}`);
    lines.push(`- checkedDraftTargetVersion: ${markdownCode(v25.canonPostureDriftReport.checkedDraftTargetVersion)}`);
    lines.push(`- passed: ${markdownCode(String(v25.canonPostureDriftReport.passed))}`);
    lines.push(`- checkCount: ${markdownCode(String(v25.canonPostureDriftReport.checkCount))}`);
    lines.push(`- blockingFailureCount: ${markdownCode(String(v25.canonPostureDriftReport.blockingFailureCount))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['checkId', 'passed', 'detail'],
      v25.canonPostureDriftReport.checks.map((/** @type {any} */ check) => [
        markdownCode(check.checkId),
        markdownCode(String(check.passed)),
        check.detail
      ])
    ));
    lines.push('');
  }
  if (v26) {
    lines.push('## V26 Productionizing Draft and Canon Reports');
    lines.push('');
    lines.push(`- activeCanonicalTarget: ${markdownCode(v26.activeCanonicalTarget)}`);
    lines.push(`- draftPreview: ${markdownCode(String(v26.draftPreview === true))}`);
    lines.push(`- checkpointReady: ${markdownCode(String(v26.checkpointReady === true))}`);
    lines.push(`- throughFourthGateReady: ${markdownCode(String(v26.throughFourthGateReady === true))}`);
    lines.push(`- promotionReady: ${markdownCode(String(v26.promotionReady === true))}`);
    lines.push(`- fifthGateClosurePassed: ${markdownCode(String(v26.fifthGateClosurePassed === true))}`);
    lines.push(`- sixthGateClosurePassed: ${markdownCode(String(v26.sixthGateClosurePassed === true))}`);
    lines.push(`- seventhGateClosurePassed: ${markdownCode(String(v26.seventhGateClosurePassed === true))}`);
    lines.push(`- operatorSurfaceTarget: ${markdownCode(v26.operatorSurfaceTarget)}`);
    lines.push('');
    lines.push('### V26 Generated Artifact Inventory');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['artifactPath', 'digest', 'byteLength'],
      (v26.artifactSummaries || []).map((/** @type {any} */ artifact) => [
        markdownCode(artifact.artifactPath),
        markdownCode(artifact.digest),
        artifact.byteLength
      ])
    ));
    lines.push('');
    lines.push('### V26 Spec-Family Report');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v26.specFamilyReport.reportId)}`);
    lines.push(`- mode: ${markdownCode(v26.specFamilyReport.mode)}`);
    lines.push(`- currentTarget: ${markdownCode(v26.specFamilyReport.currentTarget)}`);
    lines.push(`- passed: ${markdownCode(String(v26.specFamilyReport.passed))}`);
    lines.push(`- failureCount: ${markdownCode(String(v26.specFamilyReport.failureCount))}`);
    lines.push(`- requiredSpecSectionCount: ${markdownCode(String(v26.specFamilyReport.requiredSpecSectionCount))}`);
    lines.push(`- requiredGeneratedArtifactPathCount: ${markdownCode(String(v26.specFamilyReport.requiredGeneratedArtifactPathCount))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['requiredFile', 'supportFile'],
      v26.specFamilyReport.requiredFiles.map((/** @type {string} */ file, /** @type {number} */ index) => [
        markdownCode(file),
        markdownCode(v26.specFamilyReport.supportFiles[index] || 'none')
      ])
    ));
    lines.push('');
    lines.push('### V26 Canonical-Input Report');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v26.canonicalInputReport.reportId)}`);
    lines.push(`- checkedTargetVersion: ${markdownCode(v26.canonicalInputReport.checkedTargetVersion)}`);
    lines.push(`- parityPath: ${markdownCode(String(v26.canonicalInputReport.parityPath || 'missing'))}`);
    lines.push(`- passed: ${markdownCode(String(v26.canonicalInputReport.passed))}`);
    lines.push(`- failureCount: ${markdownCode(String(v26.canonicalInputReport.failureCount))}`);
    lines.push(`- requiredGeneratedArtifactCount: ${markdownCode(String(v26.canonicalInputReport.requiredGeneratedArtifactCount))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['specPath', 'provenPath', 'requiredGeneratedArtifactPaths'],
      [[
        markdownCode(v26.canonicalInputReport.specPath),
        markdownCode(v26.canonicalInputReport.provenPath),
        v26.canonicalInputReport.requiredGeneratedArtifactPaths.map(markdownCode).join(', ')
      ]]
    ));
    lines.push('');
    lines.push('### V26 Gate Checkpoint Report');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v26.gateCheckpointReport.reportId)}`);
    lines.push(`- checkpointFocus: ${markdownCode(v26.gateCheckpointReport.checkpointFocus)}`);
    lines.push(`- passed: ${markdownCode(String(v26.gateCheckpointReport.passed === true))}`);
    lines.push(`- nextGate: ${markdownCode(v26.gateCheckpointReport.nextGate)}`);
    lines.push(`- thirdGatePrepared: ${markdownCode(String(v26.gateCheckpointReport.thirdGatePreparation.prepared === true))}`);
    lines.push(`- thirdGatePassed: ${markdownCode(String(v26.gateCheckpointReport.thirdGate.passed === true))}`);
    lines.push(`- fourthGatePassed: ${markdownCode(String(v26.gateCheckpointReport.fourthGate.passed === true))}`);
    lines.push(`- fifthGatePassed: ${markdownCode(String(v26.gateCheckpointReport.fifthGate.passed === true))}`);
    lines.push(`- sixthGatePrepared: ${markdownCode(String(v26.gateCheckpointReport.sixthGate.prepared === true))}`);
    lines.push(`- seventhGatePrepared: ${markdownCode(String(v26.gateCheckpointReport.seventhGate.prepared === true))}`);
    lines.push(`- subsequentGatesOpen: ${markdownCode(String(v26.gateCheckpointReport.fifthGate.open === true && v26.gateCheckpointReport.sixthGate.open === true && v26.gateCheckpointReport.seventhGate.open === true))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['gate', 'checkId', 'passed', 'detail'],
      [
        ...v26.gateCheckpointReport.firstGate.checks.map((check) => [
          markdownCode(v26.gateCheckpointReport.firstGate.gateId),
          markdownCode(check.checkId),
          markdownCode(String(check.passed)),
          check.detail
        ]),
        ...v26.gateCheckpointReport.secondGate.checks.map((check) => [
          markdownCode(v26.gateCheckpointReport.secondGate.gateId),
          markdownCode(check.checkId),
          markdownCode(String(check.passed)),
          check.detail
        ]),
        ...v26.gateCheckpointReport.thirdGatePreparation.checks.map((check) => [
          markdownCode(v26.gateCheckpointReport.thirdGatePreparation.gateId),
          markdownCode(check.checkId),
          markdownCode(String(check.passed)),
          check.detail
        ]),
        ...v26.gateCheckpointReport.thirdGate.checks.map((check) => [
          markdownCode(v26.gateCheckpointReport.thirdGate.gateId),
          markdownCode(check.checkId),
          markdownCode(String(check.passed)),
          check.detail
        ]),
        ...v26.gateCheckpointReport.fourthGate.checks.map((check) => [
          markdownCode(v26.gateCheckpointReport.fourthGate.gateId),
          markdownCode(check.checkId),
          markdownCode(String(check.passed)),
          check.detail
        ])
      ]
    ));
    lines.push('');
    lines.push('### V26 Conversations Continuity Proof');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v26.conversationsContinuityProof.reportId)}`);
    lines.push(`- passed: ${markdownCode(String(v26.conversationsContinuityProof.passed === true))}`);
    lines.push(`- routeWitnesses: ${v26.conversationsContinuityProof.routeWitnesses.map(markdownCode).join(', ')}`);
    lines.push(`- apiWitnesses: ${v26.conversationsContinuityProof.apiWitnesses.map(markdownCode).join(', ')}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['checkId', 'passed', 'detail'],
      v26.conversationsContinuityProof.checks.map((check) => [
        markdownCode(check.checkId),
        markdownCode(String(check.passed)),
        check.detail
      ])
    ));
    lines.push('');
    lines.push('### V26 Runs and Pipelines Totality Proof');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v26.runsPipelinesTotalityProof.reportId)}`);
    lines.push(`- passed: ${markdownCode(String(v26.runsPipelinesTotalityProof.passed === true))}`);
    lines.push(`- routeWitnesses: ${v26.runsPipelinesTotalityProof.routeWitnesses.map(markdownCode).join(', ')}`);
    lines.push(`- apiWitnesses: ${v26.runsPipelinesTotalityProof.apiWitnesses.map(markdownCode).join(', ')}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['checkId', 'passed', 'detail'],
      v26.runsPipelinesTotalityProof.checks.map((check) => [
        markdownCode(check.checkId),
        markdownCode(String(check.passed)),
        check.detail
      ])
    ));
    lines.push('');
    lines.push('### V26 Persistence and Schema Totality Proof');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v26.persistenceSchemaTotalityProof.reportId)}`);
    lines.push(`- passed: ${markdownCode(String(v26.persistenceSchemaTotalityProof.passed === true))}`);
    lines.push(`- baselineMigrationPath: ${markdownCode(v26.persistenceSchemaTotalityProof.baselineMigrationPath)}`);
    lines.push(`- routeWitnesses: ${v26.persistenceSchemaTotalityProof.routeWitnesses.map(markdownCode).join(', ')}`);
    lines.push(`- unresolvedTableCount: ${markdownCode(String(v26.persistenceSchemaTotalityProof.unresolvedTables.length))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['checkId', 'passed', 'detail'],
      v26.persistenceSchemaTotalityProof.checks.map((check) => [
        markdownCode(check.checkId),
        markdownCode(String(check.passed)),
        check.detail
      ])
    ));
    lines.push('');
    lines.push('### V26 Prompt System Totality Proof');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v26.promptSystemTotalityProof.reportId)}`);
    lines.push(`- passed: ${markdownCode(String(v26.promptSystemTotalityProof.passed === true))}`);
    lines.push(`- packageWitnesses: ${v26.promptSystemTotalityProof.packageWitnesses.map(markdownCode).join(', ')}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['checkId', 'passed', 'detail'],
      v26.promptSystemTotalityProof.checks.map((check) => [
        markdownCode(check.checkId),
        markdownCode(String(check.passed)),
        check.detail
      ])
    ));
    lines.push('');
    lines.push('### V26 Retained Package Admissibility Proof');
    lines.push('');
    lines.push(`- reportId: ${markdownCode(v26.retainedPackageAdmissibilityProof.reportId)}`);
    lines.push(`- passed: ${markdownCode(String(v26.retainedPackageAdmissibilityProof.passed === true))}`);
    lines.push(`- admittedPackageCount: ${markdownCode(String(v26.retainedPackageAdmissibilityProof.admittedPackageCount))}`);
    lines.push('');
    lines.push(renderMarkdownTable(
      ['packageName', 'passed', 'rationale'],
      v26.retainedPackageAdmissibilityProof.packages.map((entry) => [
        markdownCode(entry.packageName),
        markdownCode(String(entry.passed)),
        entry.rationale
      ])
    ));
    lines.push('');
  }
  lines.push('## Proof Family Inventory');
  lines.push('');
  lines.push(renderMarkdownTable(
    ['proofFamily', 'proofArtifactPath', 'memberCount', 'theoremCount', 'witnessArtifactCount', 'replayArtifactCount', 'replayStepCount'],
    data.familySummaries.map((/** @type {any} */ family) => [
      markdownCode(family.proofFamily),
      markdownCode(family.proofArtifactPath),
      family.memberIds.length,
      family.theoremIds.length,
      family.witnessArtifactPaths.length,
      family.replayArtifacts.length,
      family.replaySteps.length
    ])
  ));
  lines.push('');
  lines.push('## Family Details');
  for (const family of data.familySummaries) {
    lines.push('');
    lines.push(`### ${family.proofFamily}`);
    lines.push('');
    lines.push(`- proofArtifactPath: ${markdownCode(family.proofArtifactPath)}`);
    lines.push(`- witnessArtifactPaths: ${family.witnessArtifactPaths.map(markdownCode).join(', ')}`);
    lines.push(`- replayArtifacts: ${family.replayArtifacts.map(markdownCode).join(', ')}`);
    lines.push(`- replayStepIds: ${family.replaySteps.map((/** @type {any} */ entry) => markdownCode(entry.stepId)).join(', ')}`);
    lines.push('');
    lines.push('#### Members');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['memberId', 'passedRuns', 'totalRuns', 'fieldShape', 'failingRuns'],
      family.memberSummaries.map((/** @type {any} */ member) => [
        markdownCode(member.memberId),
        member.passedRuns,
        member.totalRuns,
        member.fieldShape.map(markdownCode).join(', '),
        member.failingRuns.length ? member.failingRuns.map(markdownCode).join(', ') : markdownCode('none')
      ])
    ));
    lines.push('');
    lines.push('#### Theorems');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['theoremId', 'passedRuns', 'totalRuns', 'replayStepIds', 'failureReasons', 'failingRuns'],
      family.theoremSummaries.map((/** @type {any} */ theorem) => [
        markdownCode(theorem.theoremId),
        theorem.passedRuns,
        theorem.totalRuns,
        theorem.replayStepIds.map(markdownCode).join(', '),
        theorem.failureReasons.length ? theorem.failureReasons.map(markdownCode).join(', ') : markdownCode('none'),
        theorem.failingRuns.length ? theorem.failingRuns.map(markdownCode).join(', ') : markdownCode('none')
      ])
    ));
    lines.push('');
    lines.push('#### Replay Steps');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['stepId', 'theoremIds', 'requiredArtifactPaths'],
      family.replaySteps.map((/** @type {any} */ step) => [
        markdownCode(step.stepId),
        step.theoremIds.map(markdownCode).join(', '),
        step.requiredArtifactPaths.map(markdownCode).join(', ')
      ])
    ));
  }
  lines.push('');
  lines.push('## Scenario and Run Matrix');
  lines.push('');
  const runMatrixHeaders = ['scenarioId', 'branchMode', ...(Array.isArray(data.paymentModes) && data.paymentModes.length ? ['paymentMode'] : []), 'needId', 'branchName', 'assetPackId', 'familyCount', 'allFamiliesPassed', 'proofContractPassed', 'requiredArtifactPathCount', 'artifactDigestCount', 'fullyProven'];
  lines.push(renderMarkdownTable(
    runMatrixHeaders,
    data.runMatrix.map((run) => [
      markdownCode(run.scenarioId),
      markdownCode(run.branchMode),
      ...(Array.isArray(data.paymentModes) && data.paymentModes.length ? [markdownCode(run.paymentMode || 'default')] : []),
      markdownCode(run.needId),
      markdownCode(run.branchName),
      markdownCode(run.assetPackId),
      run.familyCount,
      markdownCode(String(run.allFamiliesPassed)),
      markdownCode(String(run.proofContractPassed)),
      run.requiredArtifactPathCount,
      run.artifactDigestCount,
      markdownCode(String(run.fullyProven))
    ])
  ));
  lines.push('');
  lines.push('## Incomplete Verdicts');
  lines.push('');
  if (!data.incompleteVerdicts.length) {
    lines.push('- none');
  } else {
    for (const verdict of data.incompleteVerdicts) {
      lines.push(`- scope=${markdownCode(verdict.scope)} family=${markdownCode(verdict.proofFamily)} id=${markdownCode(verdict.id)} failingRuns=${verdict.failingRuns.map(markdownCode).join(', ') || markdownCode('none')} failureReasons=${verdict.failureReasons.map(markdownCode).join(', ') || markdownCode('none')}`);
    }
  }
  lines.push('');
  lines.push('## Run Details');
  for (const run of data.runDetails) {
    lines.push('');
    lines.push(`### ${formatRunId(run)}`);
    lines.push('');
    lines.push(`- branchName: ${markdownCode(run.branchName)}`);
    lines.push(`- needId: ${markdownCode(run.needId)}`);
    lines.push(`- assetPackId: ${markdownCode(run.assetPackId)}`);
    if (run.paymentMode) {
      lines.push(`- paymentMode: ${markdownCode(run.paymentMode)}`);
    }
    lines.push(`- proofContractHash: ${markdownCode(run.proofContractHash)}`);
    lines.push(`- allFamiliesPassed: ${markdownCode(String(run.allFamiliesPassed))}`);
    lines.push(`- proofContractPassed: ${markdownCode(String(run.proofContractPassed))}`);
    lines.push('');
    lines.push('#### Family Proof Hashes');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['proofFamily', 'proofHash', 'proofArtifactPath'],
      run.families.map((/** @type {any} */ family) => [markdownCode(family.proofFamily), markdownCode(family.proofHash), markdownCode(family.proofArtifactPath)])
    ));
    lines.push('');
    lines.push('#### Proof Artifact Disclosure Classification');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['path', 'sensitiveDataClass', 'disclosable', 'deliverableConfidentiality', 'potentiallyDisclosable'],
      run.proofArtifacts.map((/** @type {any} */ artifact) => [
        markdownCode(artifact.path),
        markdownCode(String(artifact.classification?.sensitiveDataClass || 'missing')),
        markdownCode(String(artifact.classification?.disclosable === true)),
        markdownCode(String(artifact.deliverable?.confidentialityClass || 'missing')),
        markdownCode(String(artifact.deliverable?.potentiallyDisclosable === true))
      ])
    ));
    lines.push('');
    lines.push('#### Witness Artifact Digest Inventory');
    lines.push('');
    lines.push(renderMarkdownTable(
      ['path', 'digest', 'proofFamilies', 'sensitiveDataClass', 'disclosable'],
      run.artifactDigestEntries.map((/** @type {any} */ artifact) => [
        markdownCode(artifact.path),
        markdownCode(artifact.digest),
        artifact.proofFamilies.map(markdownCode).join(', '),
        markdownCode(String(artifact.classification?.sensitiveDataClass || 'missing')),
        markdownCode(String(artifact.classification?.disclosable === true))
      ])
    ));
  }
  lines.push('');
  return `${lines.join('\n')}\n`;
}

/**
 * @param {{
 *   version: string,
 *   canonicalCommit: string,
 *   canonicalCommitRecordedAt?: string | null,
 *   generatedAt: string,
 *   worktreeState?: string,
 *   generatorId?: string,
 *   scenarioIds?: string[],
 *   branchModes?: string[],
 *   paymentModes?: string[],
 *   buildInitialStateFn?: typeof buildInitialState,
 *   runMakeBitcodeBranchFn?: typeof runMakeBitcodeBranch
 * }} input
 * @returns {ReturnType<typeof buildCanonicalProvenData>}
 */
function buildBaseCanonicalProvenData({
  version,
  canonicalCommit,
  canonicalCommitRecordedAt = null,
  generatedAt,
  worktreeState = 'clean',
  generatorId = PROVEN_GENERATOR_ID,
  scenarioIds,
  branchModes = DEFAULT_PROVEN_BRANCH_MODES,
  paymentModes = [],
  buildInitialStateFn = buildInitialState,
  runMakeBitcodeBranchFn = runMakeBitcodeBranch
}) {
  const finishCollectProfile = beginProvenProfile(`buildBaseCanonicalProvenData:${version}:collectCanonicalProvenRuns`);
  const collected = collectCanonicalProvenRuns({
    buildInitialStateFn,
    runMakeBitcodeBranchFn,
    branchModes,
    paymentModes,
    ...(scenarioIds ? { scenarioIds } : {})
  });
  finishCollectProfile();
  const finishBuildProfile = beginProvenProfile(`buildBaseCanonicalProvenData:${version}:buildCanonicalProvenData`);
  const data = buildCanonicalProvenData(collected, {
    version,
    canonicalCommit,
    canonicalCommitRecordedAt,
    generatedAt,
    worktreeState,
    generatorId
  });
  finishBuildProfile();
  return data;
}

/**
 * @param {ReturnType<typeof buildCanonicalProvenData>} baseData
 * @param {{
 *   version: string,
 *   generatedAt: string,
 *   buildInitialStateFn?: typeof buildInitialState,
 *   runMakeBitcodeBranchFn?: typeof runMakeBitcodeBranch,
 *   deterministicReplayReport?: any,
 *   renderMarkdown?: boolean
 * }} input
 * @returns {{ data: any, markdown: string, artifacts: Record<string, string> }}
 */
function buildV19ProvenPackage(baseData, {
  version,
  generatedAt,
  buildInitialStateFn = buildInitialState,
  runMakeBitcodeBranchFn = runMakeBitcodeBranch,
  deterministicReplayReport = null,
  renderMarkdown = true
}) {
  const positiveMatrices = buildV19PositiveMatrices(baseData, {
    version,
    generatedAt,
    buildInitialStateFn,
    runMakeBitcodeBranchFn
  });
  const reports = buildV19Reports({
    data: baseData,
    positiveMatrices,
    version,
    generatedAt
  });
  const v19 = {
    positiveMatrices,
    ...reports,
    ...(deterministicReplayReport ? { deterministicReplayReport } : {})
  };
  const artifacts = buildV19GeneratedArtifactContents(v19);
  const artifactSummaries = summarizeArtifactContents(artifacts);
  const data = {
    ...baseData,
    v19: {
      ...v19,
      artifactSummaries
    },
    aggregate: {
      ...baseData.aggregate,
      fullyProven: baseData.aggregate.fullyProven
        && positiveMatrices.fullyProven
        && reports.volatilityInventory.passed
        && reports.negativeMutationMatrix.unexpectedPassCells.length === 0
        && reports.negativeMutationMatrix.unexpectedErrorCells.length === 0
        && reports.contractChangeLedger.passed
        && (!deterministicReplayReport || deterministicReplayReport.passed === true)
    }
  };
  return {
    data,
    markdown: renderMarkdown ? renderCanonicalProvenMarkdown(data) : '',
    artifacts: buildV19GeneratedArtifactContents(data.v19)
  };
}

/**
 * @param {ReturnType<typeof buildCanonicalProvenData>} baseData
 * @param {{
 *   version: string,
 *   canonicalCommit: string,
 *   canonicalCommitRecordedAt?: string | null,
 *   generatedAt: string,
 *   worktreeState?: string,
 *   generatorId?: string,
 *   scenarioIds?: string[],
 *   branchModes?: string[],
 *   buildInitialStateFn?: typeof buildInitialState,
 *   runMakeBitcodeBranchFn?: typeof runMakeBitcodeBranch,
 *   renderMarkdown?: boolean
 * }} input
 * @returns {{ data: any, markdown: string, artifacts: Record<string, string> }}
 */
function buildV19DeterministicProvenPackage(baseData, {
  version,
  canonicalCommit,
  canonicalCommitRecordedAt = null,
  generatedAt,
  worktreeState = 'clean',
  generatorId = PROVEN_GENERATOR_ID,
  scenarioIds,
  branchModes = DEFAULT_PROVEN_BRANCH_MODES,
  buildInitialStateFn = buildInitialState,
  runMakeBitcodeBranchFn = runMakeBitcodeBranch,
  renderMarkdown = true
}) {
  const firstPackage = buildV19ProvenPackage(baseData, {
    version,
    generatedAt,
    buildInitialStateFn,
    runMakeBitcodeBranchFn
  });
  const secondBaseData = buildBaseCanonicalProvenData({
    version,
    canonicalCommit,
    canonicalCommitRecordedAt,
    generatedAt,
    worktreeState,
    generatorId,
    branchModes,
    buildInitialStateFn,
    runMakeBitcodeBranchFn,
    ...(scenarioIds ? { scenarioIds } : {})
  });
  const secondPackage = buildV19ProvenPackage(secondBaseData, {
    version,
    generatedAt,
    buildInitialStateFn,
    runMakeBitcodeBranchFn
  });
  const firstReplayArtifacts = {
    [baseData.outputPath]: firstPackage.markdown,
    ...firstPackage.artifacts
  };
  const secondReplayArtifacts = {
    [secondBaseData.outputPath]: secondPackage.markdown,
    ...secondPackage.artifacts
  };
  const deterministicReplayReport = buildV19DeterministicReplayReport({
    version,
    proofSourceCommit: canonicalCommit,
    generatorId,
    generatedAt,
    firstArtifacts: firstReplayArtifacts,
    secondArtifacts: secondReplayArtifacts,
    volatileFieldFindings: firstPackage.data.v19.volatilityInventory.findings
  });
  return buildV19ProvenPackage(baseData, {
    version,
    generatedAt,
    buildInitialStateFn,
    runMakeBitcodeBranchFn,
    deterministicReplayReport,
    renderMarkdown
  });
}

/**
 * @param {ReturnType<typeof buildCanonicalProvenData>} baseData
 * @param {{
 *   version: string,
 *   generatedAt: string,
 *   inheritedV19: any,
 *   renderMarkdown?: boolean
 * }} input
 * @returns {{ data: any, markdown: string, artifacts: Record<string, string> }}
 */
function buildV20ProvenPackage(baseData, {
  version,
  generatedAt,
  inheritedV19,
  renderMarkdown = true
}) {
  const qualityReports = buildV20QualityReports({
    data: baseData,
    version,
    generatedAt,
    proofSourceCommit: baseData.canonicalCommit,
    generatorId: baseData.generatorId,
    worktreeState: baseData.worktreeState,
    inheritedV19
  });
  const artifactSummaries = summarizeArtifactContents(buildV20GeneratedArtifactContents(qualityReports));
  const data = {
    ...baseData,
    v19: inheritedV19,
    v20: {
      ...qualityReports,
      artifactSummaries
    },
    aggregate: {
      ...baseData.aggregate,
      fullyProven: baseData.aggregate.fullyProven
        && inheritedV19?.deterministicReplayReport?.passed === true
        && inheritedV19?.volatilityInventory?.passed === true
        && inheritedV19?.contractChangeLedger?.passed === true
        && qualityReports.qualitySummary.passed === true
    }
  };
  return {
    data,
    markdown: renderMarkdown ? renderCanonicalProvenMarkdown(data) : '',
    artifacts: buildV20GeneratedArtifactContents(data.v20)
  };
}

/**
 * @param {ReturnType<typeof buildCanonicalProvenData>} baseData
 * @param {{
 *   generatedAt: string,
 *   inheritedV19: any,
 *   inheritedV20: any
 * }} input
 * @returns {{ data: any, markdown: string, artifacts: Record<string, string> }}
 */
function buildV21ProvenPackage(baseData, {
  generatedAt,
  inheritedV19,
  inheritedV20
}) {
  const specFamilyReport = buildV21SpecFamilyReport({
    version: 'V21',
    mode: 'promoted',
    currentTarget: 'V21'
  });
  const canonicalInputReport = buildV21CanonicalInputReport({
    currentTarget: 'V21',
    assumeExistingRelativePaths: [
      '_legacy/ENGI_SPEC_V21_PROVEN.md',
      '.engi/v21-spec-family-report.json',
      '.engi/v21-canonical-input-report.json'
    ]
  });
  const artifacts = buildV21GeneratedArtifactContents({
    version: 'V21',
    proofSourceCommit: baseData.canonicalCommit,
    generatedAt,
    generatorId: baseData.generatorId,
    worktreeState: baseData.worktreeState,
    specFamilyReport,
    canonicalInputReport
  });
  const artifactSummaries = summarizeArtifactContents(artifacts);
  const data = {
    ...baseData,
    v19: inheritedV19,
    v20: inheritedV20,
    v21: {
      specFamilyReport,
      canonicalInputReport,
      artifactSummaries
    },
    aggregate: {
      ...baseData.aggregate,
      fullyProven: baseData.aggregate.fullyProven
        && inheritedV19?.deterministicReplayReport?.passed === true
        && inheritedV19?.volatilityInventory?.passed === true
        && inheritedV19?.contractChangeLedger?.passed === true
        && inheritedV20?.qualitySummary?.passed === true
        && specFamilyReport.passed === true
        && canonicalInputReport.passed === true
    }
  };
  return {
    data,
    markdown: renderCanonicalProvenMarkdown(data),
    artifacts
  };
}

/**
 * @param {ReturnType<typeof buildCanonicalProvenData>} baseData
 * @param {{
 *   generatedAt: string,
 *   inheritedV19: any,
 *   inheritedV20: any
 * }} input
 * @returns {{ data: any, markdown: string, artifacts: Record<string, string> }}
 */
function buildV22ProvenPackage(baseData, {
  generatedAt,
  inheritedV19,
  inheritedV20
}) {
  const specFamilyReport = buildV21SpecFamilyReport({
    version: 'V22',
    mode: 'promoted',
    currentTarget: 'V22'
  });
  const canonicalInputReport = buildV21CanonicalInputReport({
    currentTarget: 'V22',
    reportVersion: 'V22',
    assumeExistingRelativePaths: [
      '_legacy/ENGI_SPEC_V22_PROVEN.md',
      '.engi/v22-spec-family-report.json',
      '.engi/v22-canonical-input-report.json',
      '.engi/v22-canon-posture-drift-report.json'
    ]
  });
  const canonPostureDriftReport = buildV22CanonPostureDriftReport({
    version: 'V22',
    activeCanonVersion: 'V22',
    draftTargetVersion: 'V23',
    proofSourceCommit: baseData.canonicalCommit,
    generatedAt,
    generatorId: baseData.generatorId,
    worktreeState: baseData.worktreeState
  });
  const artifacts = buildV22GeneratedArtifactContents({
    version: 'V22',
    proofSourceCommit: baseData.canonicalCommit,
    generatedAt,
    generatorId: baseData.generatorId,
    worktreeState: baseData.worktreeState,
    specFamilyReport,
    canonicalInputReport,
    canonPostureDriftReport
  });
  const artifactSummaries = summarizeArtifactContents(artifacts);
  const data = {
    ...baseData,
    v19: inheritedV19,
    v20: inheritedV20,
    v22: {
      specFamilyReport,
      canonicalInputReport,
      canonPostureDriftReport,
      artifactSummaries
    },
    aggregate: {
      ...baseData.aggregate,
      fullyProven: baseData.aggregate.fullyProven
        && inheritedV19?.deterministicReplayReport?.passed === true
        && inheritedV19?.volatilityInventory?.passed === true
        && inheritedV19?.contractChangeLedger?.passed === true
        && inheritedV20?.qualitySummary?.passed === true
        && specFamilyReport.passed === true
        && canonicalInputReport.passed === true
        && canonPostureDriftReport.passed === true
    }
  };
  return {
    data,
    markdown: renderCanonicalProvenMarkdown(data),
    artifacts
  };
}

/**
 * @param {ReturnType<typeof buildCanonicalProvenData>} baseData
 * @param {{
 *   generatedAt: string,
 *   inheritedV19: any,
 *   inheritedV20: any
 * }} input
 * @returns {{ data: any, markdown: string, artifacts: Record<string, string> }}
 */
function buildV23ProvenPackage(baseData, {
  generatedAt,
  inheritedV19,
  inheritedV20
}) {
  const specFamilyReport = buildV21SpecFamilyReport({
    version: 'V23',
    mode: 'promoted',
    currentTarget: 'V23'
  });
  const canonicalInputReport = buildV21CanonicalInputReport({
    currentTarget: 'V23',
    reportVersion: 'V23',
    assumeExistingRelativePaths: [
      '_legacy/ENGI_SPEC_V23_PROVEN.md',
      '.engi/v23-spec-family-report.json',
      '.engi/v23-canonical-input-report.json',
      '.engi/v23-canon-posture-drift-report.json'
    ]
  });
  const canonPostureDriftReport = buildV23CanonPostureDriftReport({
    version: 'V23',
    activeCanonVersion: 'V23',
    draftTargetVersion: 'V24',
    proofSourceCommit: baseData.canonicalCommit,
    generatedAt,
    generatorId: baseData.generatorId,
    worktreeState: baseData.worktreeState
  });
  const artifacts = buildV23GeneratedArtifactContents({
    version: 'V23',
    proofSourceCommit: baseData.canonicalCommit,
    generatedAt,
    generatorId: baseData.generatorId,
    worktreeState: baseData.worktreeState,
    specFamilyReport,
    canonicalInputReport,
    canonPostureDriftReport
  });
  const artifactSummaries = summarizeArtifactContents(artifacts);
  const data = {
    ...baseData,
    v19: inheritedV19,
    v20: inheritedV20,
    v23: {
      specFamilyReport,
      canonicalInputReport,
      canonPostureDriftReport,
      artifactSummaries
    },
    aggregate: {
      ...baseData.aggregate,
      fullyProven: baseData.aggregate.fullyProven
        && inheritedV19?.deterministicReplayReport?.passed === true
        && inheritedV19?.volatilityInventory?.passed === true
        && inheritedV19?.contractChangeLedger?.passed === true
        && inheritedV20?.qualitySummary?.passed === true
        && specFamilyReport.passed === true
        && canonicalInputReport.passed === true
        && canonPostureDriftReport.passed === true
    }
  };
  return {
    data,
    markdown: renderCanonicalProvenMarkdown(data),
    artifacts
  };
}

/**
 * @param {ReturnType<typeof buildCanonicalProvenData>} baseData
 * @param {{
 *   generatedAt: string,
 *   inheritedV19: any,
 *   inheritedV20: any
 * }} input
 * @returns {{ data: any, markdown: string, artifacts: Record<string, string> }}
 */
function buildV24ProvenPackage(baseData, {
  generatedAt,
  inheritedV19,
  inheritedV20
}) {
  const specFamilyReport = buildV21SpecFamilyReport({
    version: 'V24',
    mode: 'promoted',
    currentTarget: 'V24'
  });
  const canonicalInputReport = buildV21CanonicalInputReport({
    currentTarget: 'V24',
    reportVersion: 'V24',
    assumeExistingRelativePaths: [
      '_legacy/ENGI_SPEC_V24_PROVEN.md',
      '.engi/v24-spec-family-report.json',
      '.engi/v24-canonical-input-report.json',
      '.engi/v24-canon-posture-drift-report.json'
    ]
  });
  const canonPostureDriftReport = buildV24CanonPostureDriftReport({
    version: 'V24',
    activeCanonVersion: 'V24',
    draftTargetVersion: 'V25',
    proofSourceCommit: baseData.canonicalCommit,
    generatedAt,
    generatorId: baseData.generatorId,
    worktreeState: baseData.worktreeState
  });
  const artifacts = buildV24GeneratedArtifactContents({
    version: 'V24',
    proofSourceCommit: baseData.canonicalCommit,
    generatedAt,
    generatorId: baseData.generatorId,
    worktreeState: baseData.worktreeState,
    specFamilyReport,
    canonicalInputReport,
    canonPostureDriftReport
  });
  const artifactSummaries = summarizeArtifactContents(artifacts);
  const data = {
    ...baseData,
    v19: inheritedV19,
    v20: inheritedV20,
    v24: {
      specFamilyReport,
      canonicalInputReport,
      canonPostureDriftReport,
      artifactSummaries
    },
    aggregate: {
      ...baseData.aggregate,
      fullyProven: baseData.aggregate.fullyProven
        && inheritedV19?.deterministicReplayReport?.passed === true
        && inheritedV19?.volatilityInventory?.passed === true
        && inheritedV19?.contractChangeLedger?.passed === true
        && inheritedV20?.qualitySummary?.passed === true
        && specFamilyReport.passed === true
        && canonicalInputReport.passed === true
        && canonPostureDriftReport.passed === true
    }
  };
  return {
    data,
    markdown: renderCanonicalProvenMarkdown(data),
    artifacts
  };
}

/**
 * @param {ReturnType<typeof buildCanonicalProvenData>} baseData
 * @param {{
 *   generatedAt: string,
 *   inheritedV19: any,
 *   inheritedV20: any
 * }} input
 * @returns {{ data: any, markdown: string, artifacts: Record<string, string> }}
 */
function buildV25ProvenPackage(baseData, {
  generatedAt,
  inheritedV19,
  inheritedV20
}) {
  const specFamilyReport = buildV21SpecFamilyReport({
    version: 'V25',
    mode: 'promoted'
  });
  const canonicalInputReport = buildV21CanonicalInputReport({
    currentTarget: 'V25',
    reportVersion: 'V25',
    assumeExistingRelativePaths: [
      '_legacy/ENGI_SPEC_V25_PROVEN.md',
      '.engi/v25-spec-family-report.json',
      '.engi/v25-canonical-input-report.json',
      '.engi/v25-canon-posture-drift-report.json'
    ]
  });
  const canonPostureDriftReport = buildV25CanonPostureDriftReport({
    version: 'V25',
    activeCanonVersion: 'V25',
    draftTargetVersion: 'V26',
    proofSourceCommit: baseData.canonicalCommit,
    generatedAt,
    generatorId: baseData.generatorId,
    worktreeState: baseData.worktreeState
  });
  const artifacts = buildV25GeneratedArtifactContents({
    version: 'V25',
    proofSourceCommit: baseData.canonicalCommit,
    generatedAt,
    generatorId: baseData.generatorId,
    worktreeState: baseData.worktreeState,
    specFamilyReport,
    canonicalInputReport,
    canonPostureDriftReport
  });
  const artifactSummaries = summarizeArtifactContents(artifacts);
  const data = {
    ...baseData,
    v19: inheritedV19,
    v20: inheritedV20,
    v25: {
      specFamilyReport,
      canonicalInputReport,
      canonPostureDriftReport,
      artifactSummaries
    },
    aggregate: {
      ...baseData.aggregate,
      fullyProven: baseData.aggregate.fullyProven
        && inheritedV19?.deterministicReplayReport?.passed === true
        && inheritedV19?.volatilityInventory?.passed === true
        && inheritedV19?.contractChangeLedger?.passed === true
        && inheritedV20?.qualitySummary?.passed === true
        && specFamilyReport.passed === true
        && canonicalInputReport.passed === true
        && canonPostureDriftReport.passed === true
    }
  };
  return {
    data,
    markdown: renderCanonicalProvenMarkdown(data),
    artifacts
  };
}

/**
 * @param {any} baseData
 * @param {{
 *   generatedAt: string,
 *   inheritedV19: any,
 *   inheritedV20: any
 * }} input
 */
function buildV26ProvenPackage(baseData, {
  generatedAt,
  inheritedV19,
  inheritedV20
}) {
  const draftPreview = ACTIVE_CANON_VERSION !== 'V26';
  const specFamilyReport = buildV21SpecFamilyReport({
    version: 'V26',
    mode: draftPreview ? 'draft' : 'promoted',
    ...(draftPreview ? { currentTarget: ACTIVE_CANON_VERSION } : {})
  });
  const canonicalInputReport = buildV21CanonicalInputReport({
    currentTarget: 'V26',
    reportVersion: 'V26',
    ...(draftPreview
        ? {
          skipPointerCheck: true,
          assumeExistingRelativePaths: [
            'BITCODE_SPEC_V26_PROVEN.md',
            '.engi/v26-spec-family-report.json',
            '.engi/v26-canonical-input-report.json',
            '.engi/v26-gate-checkpoint-report.json',
            '.engi/conversations-continuity-proof.json',
            '.engi/runs-pipelines-totality-proof.json',
            '.engi/persistence-schema-totality-proof.json',
            '.engi/prompt-system-totality-proof.json',
            '.engi/retained-package-admissibility-proof.json'
          ]
        }
      : {})
  });
  const conversationsContinuityProof = buildV26ConversationsContinuityProof({
    generatedAt,
    baseData
  });
  const runsPipelinesTotalityProof = buildV26RunsPipelinesTotalityProof({
    generatedAt,
    baseData
  });
  const persistenceSchemaTotalityProof = buildV26PersistenceSchemaTotalityProof({
    generatedAt,
    baseData
  });
  const promptSystemTotalityProof = buildV26PromptSystemTotalityProof({
    generatedAt,
    baseData
  });
  const retainedPackageAdmissibilityProof = buildV26RetainedPackageAdmissibilityProof({
    generatedAt,
    baseData
  });
  const gateCheckpointReport = buildV26GateCheckpointReport({
    generatedAt,
    baseData,
    inheritedV19,
    inheritedV20,
    specFamilyReport,
    canonicalInputReport,
    draftPreview,
    conversationsContinuityProof,
    runsPipelinesTotalityProof,
    persistenceSchemaTotalityProof,
    promptSystemTotalityProof,
    retainedPackageAdmissibilityProof
  });
  const artifacts = {
    ...buildV21GeneratedArtifactContents({
      version: 'V26',
      proofSourceCommit: baseData.canonicalCommit,
      generatedAt,
      generatorId: baseData.generatorId,
      worktreeState: baseData.worktreeState,
      specFamilyReport,
      canonicalInputReport
    }),
    '.engi/v26-gate-checkpoint-report.json': `${JSON.stringify(gateCheckpointReport, null, 2)}\n`,
    '.engi/conversations-continuity-proof.json': `${JSON.stringify(conversationsContinuityProof, null, 2)}\n`,
    '.engi/runs-pipelines-totality-proof.json': `${JSON.stringify(runsPipelinesTotalityProof, null, 2)}\n`,
    '.engi/persistence-schema-totality-proof.json': `${JSON.stringify(persistenceSchemaTotalityProof, null, 2)}\n`,
    '.engi/prompt-system-totality-proof.json': `${JSON.stringify(promptSystemTotalityProof, null, 2)}\n`,
    '.engi/retained-package-admissibility-proof.json': `${JSON.stringify(retainedPackageAdmissibilityProof, null, 2)}\n`
  };
  const artifactSummaries = summarizeArtifactContents(artifacts);
  const checkpointReady = gateCheckpointReport.firstGate?.passed === true
    && gateCheckpointReport.secondGate?.passed === true;
  const throughFourthGateReady = gateCheckpointReport.passed === true;
  const promotionReady = !draftPreview && throughFourthGateReady;
  const fifthGateClosurePassed = false;
  const sixthGateClosurePassed = false;
  const seventhGateClosurePassed = false;
  const data = {
    ...baseData,
    v19: inheritedV19,
    v20: inheritedV20,
    v26: {
      specFamilyReport,
      canonicalInputReport,
      gateCheckpointReport,
      conversationsContinuityProof,
      runsPipelinesTotalityProof,
      persistenceSchemaTotalityProof,
      promptSystemTotalityProof,
      retainedPackageAdmissibilityProof,
      artifactSummaries,
      draftPreview,
      checkpointReady,
      throughFourthGateReady,
      promotionReady,
      fifthGateClosurePassed,
      sixthGateClosurePassed,
      seventhGateClosurePassed,
      activeCanonicalTarget: ACTIVE_CANON_VERSION,
      operatorSurfaceTarget: 'application-native-full-page'
    },
    aggregate: {
      ...baseData.aggregate,
      fullyProven: baseData.aggregate.fullyProven
        && inheritedV19?.deterministicReplayReport?.passed === true
        && inheritedV19?.volatilityInventory?.passed === true
        && inheritedV19?.contractChangeLedger?.passed === true
        && inheritedV20?.qualitySummary?.passed === true
        && promotionReady
        && fifthGateClosurePassed
        && sixthGateClosurePassed
        && seventhGateClosurePassed
    }
  };
  return {
    data,
    markdown: renderCanonicalProvenMarkdown(data),
    artifacts
  };
}

/**
 * @param {{
 *   version: string,
 *   canonicalCommit: string,
 *   canonicalCommitRecordedAt?: string | null,
 *   generatedAt?: string,
 *   worktreeState?: string,
 *   generatorId?: string,
 *   scenarioIds?: string[],
 *   branchModes?: string[],
 *   paymentModes?: string[],
 *   buildInitialStateFn?: typeof buildInitialState,
 *   runMakeBitcodeBranchFn?: typeof runMakeBitcodeBranch
 * }} input
 */
export function generateCanonicalProvenMarkdown({
  version,
  canonicalCommit,
  canonicalCommitRecordedAt = null,
  generatedAt = canonicalCommitRecordedAt || new Date().toISOString(),
  worktreeState = 'clean',
  generatorId = PROVEN_GENERATOR_ID,
  scenarioIds,
  branchModes = DEFAULT_PROVEN_BRANCH_MODES,
  paymentModes,
  buildInitialStateFn = buildInitialState,
  runMakeBitcodeBranchFn = runMakeBitcodeBranch
}) {
  const finishGenerateProfile = beginProvenProfile(`generateCanonicalProvenMarkdown:${version}:total`);
  const resolvedPaymentModes = (version === 'V23' || version === 'V24' || version === 'V25' || version === 'V26')
    ? (
      paymentModes
      || (version === 'V26'
        ? DEFAULT_V26_PROVEN_PAYMENT_MODES
        : version === 'V25'
        ? DEFAULT_V25_PROVEN_PAYMENT_MODES
        : version === 'V24'
          ? DEFAULT_V24_PROVEN_PAYMENT_MODES
          : DEFAULT_V23_PROVEN_PAYMENT_MODES)
    )
    : (paymentModes || []);
  const baseData = buildBaseCanonicalProvenData({
    version,
    canonicalCommit,
    canonicalCommitRecordedAt,
    generatedAt,
    worktreeState,
    generatorId,
    branchModes,
    paymentModes: resolvedPaymentModes,
    buildInitialStateFn,
    runMakeBitcodeBranchFn,
    ...(scenarioIds ? { scenarioIds } : {})
  });
  if (version === 'V19') {
    const v19Package = buildV19DeterministicProvenPackage(baseData, {
      version,
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    finishGenerateProfile();
    return v19Package;
  }
  if (version === 'V20') {
    const inheritedV19BaseData = buildBaseCanonicalProvenData({
      version: 'V19',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV19Package = buildV19DeterministicProvenPackage(inheritedV19BaseData, {
      version: 'V19',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      renderMarkdown: false,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const v20Package = buildV20ProvenPackage(baseData, {
      version,
      generatedAt,
      inheritedV19: inheritedV19Package.data.v19
    });
    finishGenerateProfile();
    return v20Package;
  }
  if (version === 'V21') {
    const inheritedV19BaseData = buildBaseCanonicalProvenData({
      version: 'V19',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV19Package = buildV19DeterministicProvenPackage(inheritedV19BaseData, {
      version: 'V19',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      renderMarkdown: false,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV20BaseData = buildBaseCanonicalProvenData({
      version: 'V20',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV20Package = buildV20ProvenPackage(inheritedV20BaseData, {
      version: 'V20',
      generatedAt,
      inheritedV19: inheritedV19Package.data.v19,
      renderMarkdown: false
    });
    const v21Package = buildV21ProvenPackage(baseData, {
      generatedAt,
      inheritedV19: inheritedV19Package.data.v19,
      inheritedV20: inheritedV20Package.data.v20
    });
    finishGenerateProfile();
    return v21Package;
  }
  if (version === 'V22') {
    const inheritedV19BaseData = buildBaseCanonicalProvenData({
      version: 'V19',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV19Package = buildV19DeterministicProvenPackage(inheritedV19BaseData, {
      version: 'V19',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      renderMarkdown: false,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV20BaseData = buildBaseCanonicalProvenData({
      version: 'V20',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV20Package = buildV20ProvenPackage(inheritedV20BaseData, {
      version: 'V20',
      generatedAt,
      inheritedV19: inheritedV19Package.data.v19,
      renderMarkdown: false
    });
    const v22Package = buildV22ProvenPackage(baseData, {
      generatedAt,
      inheritedV19: inheritedV19Package.data.v19,
      inheritedV20: inheritedV20Package.data.v20
    });
    finishGenerateProfile();
    return v22Package;
  }
  if (version === 'V23') {
    const inheritedV19BaseData = buildBaseCanonicalProvenData({
      version: 'V19',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV19Package = buildV19DeterministicProvenPackage(inheritedV19BaseData, {
      version: 'V19',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      renderMarkdown: false,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV20BaseData = buildBaseCanonicalProvenData({
      version: 'V20',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV20Package = buildV20ProvenPackage(inheritedV20BaseData, {
      version: 'V20',
      generatedAt,
      inheritedV19: inheritedV19Package.data.v19,
      renderMarkdown: false
    });
    const v23Package = buildV23ProvenPackage(baseData, {
      generatedAt,
      inheritedV19: inheritedV19Package.data.v19,
      inheritedV20: inheritedV20Package.data.v20
    });
    finishGenerateProfile();
    return v23Package;
  }
  if (version === 'V24') {
    const inheritedV19BaseData = buildBaseCanonicalProvenData({
      version: 'V19',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV19Package = buildV19DeterministicProvenPackage(inheritedV19BaseData, {
      version: 'V19',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      renderMarkdown: false,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV20BaseData = buildBaseCanonicalProvenData({
      version: 'V20',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV20Package = buildV20ProvenPackage(inheritedV20BaseData, {
      version: 'V20',
      generatedAt,
      inheritedV19: inheritedV19Package.data.v19,
      renderMarkdown: false
    });
    const v24Package = buildV24ProvenPackage(baseData, {
      generatedAt,
      inheritedV19: inheritedV19Package.data.v19,
      inheritedV20: inheritedV20Package.data.v20
    });
    finishGenerateProfile();
    return v24Package;
  }
  if (version === 'V25') {
    const inheritedV19BaseData = buildBaseCanonicalProvenData({
      version: 'V19',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV19Package = buildV19DeterministicProvenPackage(inheritedV19BaseData, {
      version: 'V19',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      renderMarkdown: false,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV20BaseData = buildBaseCanonicalProvenData({
      version: 'V20',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV20Package = buildV20ProvenPackage(inheritedV20BaseData, {
      version: 'V20',
      generatedAt,
      inheritedV19: inheritedV19Package.data.v19,
      renderMarkdown: false
    });
    const v25Package = buildV25ProvenPackage(baseData, {
      generatedAt,
      inheritedV19: inheritedV19Package.data.v19,
      inheritedV20: inheritedV20Package.data.v20
    });
    finishGenerateProfile();
    return v25Package;
  }
  if (version === 'V26') {
    const inheritedV19BaseData = buildBaseCanonicalProvenData({
      version: 'V19',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV19Package = buildV19DeterministicProvenPackage(inheritedV19BaseData, {
      version: 'V19',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      renderMarkdown: false,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV20BaseData = buildBaseCanonicalProvenData({
      version: 'V20',
      canonicalCommit,
      canonicalCommitRecordedAt,
      generatedAt,
      worktreeState,
      generatorId,
      branchModes,
      buildInitialStateFn,
      runMakeBitcodeBranchFn,
      ...(scenarioIds ? { scenarioIds } : {})
    });
    const inheritedV20Package = buildV20ProvenPackage(inheritedV20BaseData, {
      version: 'V20',
      generatedAt,
      inheritedV19: inheritedV19Package.data.v19,
      renderMarkdown: false
    });
    const v26Package = buildV26ProvenPackage(baseData, {
      generatedAt,
      inheritedV19: inheritedV19Package.data.v19,
      inheritedV20: inheritedV20Package.data.v20
    });
    finishGenerateProfile();
    return v26Package;
  }
  const v18Matrices = version === 'V18'
    ? buildV18Matrices(baseData, {
        version,
        generatedAt,
        buildInitialStateFn,
        runMakeBitcodeBranchFn
      })
    : null;
  const data = v18Matrices
    ? {
        ...baseData,
        v18Matrices,
        aggregate: {
          ...baseData.aggregate,
          fullyProven: baseData.aggregate.fullyProven && v18Matrices.fullyProven
        }
      }
    : baseData;
  const v18Package = {
    data,
    markdown: renderCanonicalProvenMarkdown(data),
    artifacts: {}
  };
  finishGenerateProfile();
  return v18Package;
}
