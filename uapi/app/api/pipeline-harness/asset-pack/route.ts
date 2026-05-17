import { NextRequest } from 'next/server';
import { createClient } from '@bitcode/supabase/ssr/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { VCSConnections } from '@bitcode/vcs';
import {
  buildAssetPackSandboxHarness,
  loadVercelSandboxFactory,
  VercelSandboxPipelineHost,
  type PipelineHarnessCommandResult,
  type PipelineHarnessHostEvent,
  type PipelineHarnessMode,
} from '@bitcode/pipeline-hosts';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 800;

type AssetPackHarnessRequest = {
  mode?: PipelineHarnessMode;
  readId?: string;
  readPrompt?: string;
  depositId?: string;
  depositAssetId?: string | null;
  depositHasWalletOrAttestationProof?: boolean;
  depositHasAssetMeasurementEvidence?: boolean;
  depositProofRoot?: string | null;
  depositMeasurementRoot?: string | null;
  depositReconciliationReadbackRoot?: string | null;
  repositoryFullName?: string;
  sourceBranch?: string;
  sourceCommit?: string;
  sourceGitUrl?: string;
  sourceRevision?: string;
  sourceDepth?: number;
  connectionId?: string | number | null;
  assumeRepositoryPresent?: boolean;
  installDependencies?: boolean;
  leaveRunning?: boolean;
};

const DEFAULT_READ_PROMPT =
  'Read the deposited repository revision and determine whether it contains a complete non-mock Terminal path through Deposit, Read/Fit, AssetPack evidence, proof/finality readback, and Supabase/ledger reconciliation.';

const TRUSTED_COMMAND_ENV_KEYS = [
  'OPENAI_API_KEY',
  'OPENAI_BASE_URL',
  'SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_SECRET_KEY',
  'SUPABASE_ADMIN_KEY',
  'SUPABASE_ANON_KEY',
  'SUPABASE_PUBLISHABLE_KEY',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY',
  'BITCODE_LLM_PROVIDER',
  'BITCODE_LLM_MODEL',
  'BITCODE_ASSET_PACK_REAL_INFERENCE',
  'BITCODE_ASSET_PACK_SETUP_PLAN_USE_PTRR',
  'BITCODE_ASSET_PACK_COMPREHEND_READ_USE_PTRR',
  'BITCODE_ASSET_PACK_DANGER_WALL_USE_PTRR',
  'BITCODE_ASSET_PACK_DISCOVERY_USE_PTRR',
  'BITCODE_ASSET_PACK_SYNTHESIS_USE_PTRR',
  'BITCODE_ASSET_PACK_VALIDATION_USE_PTRR',
  'BITCODE_ASSET_PACK_READY_TO_INSTRUCT_USE_PTRR',
  'BITCODE_ASSET_PACK_VALIDATION_READY_TO_FINISH_USE_PTRR',
  'BITCODE_ASSET_PACK_FINISH_DELIVER_USE_PTRR',
  'BITCODE_PIPELINE_HARNESS_MAX_RUNTIME_MS',
] as const;

const DEPLOYED_ROUTE_MAX_DURATION_MS = 800000;
const HARNESS_COLLECTION_MARGIN_MS = 120000;
const MAX_DEPLOYED_HARNESS_RUNTIME_MS = 600000;

const REDACTED_OUTPUT_ENV_KEYS = [
  ...TRUSTED_COMMAND_ENV_KEYS,
  'BITCODE_SANDBOX_SOURCE_GIT_PASSWORD',
  'GITHUB_TOKEN',
  'GITHUB_PAT',
  'GH_TOKEN',
] as const;

function emitSse(
  controller: ReadableStreamDefaultController<Uint8Array>,
  event: string,
  data: unknown
): void {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  controller.enqueue(new TextEncoder().encode(payload));
}

function isProductionDeployment(): boolean {
  return process.env.VERCEL_ENV === 'production';
}

function isDeployedRuntime(): boolean {
  return process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
}

function requireHarnessAllowed(): Response | null {
  if (!isProductionDeployment() || process.env.BITCODE_ENABLE_PIPELINE_HARNESS_API === '1') {
    return null;
  }
  return Response.json({ error: 'pipeline_harness_disabled' }, { status: 404 });
}

function parseBody(request: NextRequest): Promise<AssetPackHarnessRequest> {
  return request.json().catch(() => ({}));
}

function selectedCommandEnvironment(userId: string): Record<string, string> {
  const env: Record<string, string> = {};
  for (const key of TRUSTED_COMMAND_ENV_KEYS) {
    const value = process.env[key];
    if (typeof value === 'string' && value.length > 0) {
      env[key] = value;
    }
  }

  if (!env.SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_URL) {
    env.SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
  }

  const serviceRole =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_ADMIN_KEY;
  if (serviceRole) {
    env.SUPABASE_SERVICE_ROLE_KEY = serviceRole;
  }

  env.BITCODE_PIPELINE_USER_ID = userId;
  env.BITCODE_PIPELINE_STREAM_TO_DATABASE = '1';
  env.BITCODE_PIPELINE_STRUCTURED_DB = '1';
  assertDatabaseStreamingEnvironment(env);
  normalizeModelEnvironment(env);
  assertDeployedRealInferenceEnvironment(env);

  return env;
}

function assertDatabaseStreamingEnvironment(env: Record<string, string>): void {
  const url = env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_SECRET_KEY || env.SUPABASE_ADMIN_KEY;
  if (!isUsableSupabaseUrl(url) || !isUsableSecretValue(key)) {
    throw new Error(
      'Pipeline harness database streaming requires a non-placeholder Supabase URL and service-role key.'
    );
  }
}

function isUsableSupabaseUrl(value: string | undefined): boolean {
  if (!value) return false;
  try {
    const host = new URL(value).host;
    return Boolean(host && host !== 'your-project.supabase.co' && !host.includes('<'));
  } catch {
    return false;
  }
}

function isUsableSecretValue(value: string | undefined): boolean {
  return typeof value === 'string' && value.trim().length > 16 && !value.includes('<');
}

function isEnabled(value: string | undefined): boolean {
  return ['1', 'true', 'yes', 'on'].includes(String(value || '').trim().toLowerCase());
}

function assertDeployedRealInferenceEnvironment(env: Record<string, string>): void {
  if (!isDeployedRuntime()) return;
  if (!isEnabled(env.BITCODE_ASSET_PACK_REAL_INFERENCE)) {
    throw new Error(
      'Staging pipeline harness requires BITCODE_ASSET_PACK_REAL_INFERENCE=1 so Read/Fit QA cannot run deterministic bring-up branches.'
    );
  }
  if (!env.OPENAI_API_KEY) {
    throw new Error(
      'Staging pipeline harness requires OPENAI_API_KEY for real AssetPack PTRR inference.'
    );
  }
  const budgetMs = Number(env.BITCODE_PIPELINE_HARNESS_MAX_RUNTIME_MS || 240000);
  if (!Number.isFinite(budgetMs) || budgetMs <= 0) {
    throw new Error('BITCODE_PIPELINE_HARNESS_MAX_RUNTIME_MS must be a positive millisecond budget.');
  }
  if (budgetMs > MAX_DEPLOYED_HARNESS_RUNTIME_MS) {
    throw new Error(
      `BITCODE_PIPELINE_HARNESS_MAX_RUNTIME_MS must be <= ${MAX_DEPLOYED_HARNESS_RUNTIME_MS} on the deployed streaming route so the ${DEPLOYED_ROUTE_MAX_DURATION_MS}ms function window can still collect artifacts with its ${HARNESS_COLLECTION_MARGIN_MS}ms margin.`
    );
  }
}

function normalizeModelEnvironment(env: Record<string, string>): void {
  const provider = env.BITCODE_LLM_PROVIDER?.trim().toLowerCase();
  if (provider && !hasModelProviderCredential(provider, env)) {
    delete env.BITCODE_LLM_PROVIDER;
    delete env.BITCODE_LLM_MODEL;
  }

  if (!env.BITCODE_LLM_PROVIDER && env.OPENAI_API_KEY) {
    env.BITCODE_LLM_PROVIDER = 'openai';
  }
}

function hasModelProviderCredential(provider: string, env: Record<string, string>): boolean {
  switch (provider) {
    case 'openai':
      return Boolean(env.OPENAI_API_KEY);
    case 'anthropic':
      return Boolean(env.ANTHROPIC_API_KEY);
    case 'google':
      return Boolean(env.GOOGLE_GENERATIVE_AI_API_KEY || env.GEMINI_API_KEY || env.GOOGLE_API_KEY);
    default:
      return true;
  }
}

function summarizeHarnessPreflight(body: AssetPackHarnessRequest): Record<string, unknown> {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_ADMIN_KEY;
  const budgetMs = Number(process.env.BITCODE_PIPELINE_HARNESS_MAX_RUNTIME_MS || 240000);
  return {
    repositoryFullName: body.repositoryFullName || null,
    sourceBranch: body.sourceBranch || null,
    sourceCommit: body.sourceCommit || null,
    readId: body.readId || null,
    depositId: body.depositId || null,
    realInferenceEnabled: isEnabled(process.env.BITCODE_ASSET_PACK_REAL_INFERENCE),
    openaiCredentialProvided: isUsableSecretValue(process.env.OPENAI_API_KEY),
    supabaseUrlProvided: isUsableSupabaseUrl(supabaseUrl),
    supabaseServiceRoleProvided: isUsableSecretValue(serviceRole),
    runtimeBudgetMs: Number.isFinite(budgetMs) ? budgetMs : null,
    deployedRuntime: isDeployedRuntime(),
  };
}

function sourceCredentialsFromEnv(): { username?: string; password?: string } {
  const password =
    process.env.BITCODE_SANDBOX_SOURCE_GIT_PASSWORD ||
    process.env.GITHUB_TOKEN ||
    process.env.GITHUB_PAT ||
    process.env.GH_TOKEN;
  if (!password) return {};

  return {
    username: process.env.BITCODE_SANDBOX_SOURCE_GIT_USERNAME || 'x-access-token',
    password,
  };
}

function createAdminSupabase() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_ADMIN_KEY;
  if (!url || !key) return null;

  return createSupabaseClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function readConnectionId(value: unknown): string | null {
  if (typeof value === 'string' && value.length > 0) return value;
  if (typeof value === 'number' && Number.isFinite(value)) return String(value);
  return null;
}

async function sourceCredentialsForUser(
  userId: string,
  body: AssetPackHarnessRequest
): Promise<{ username?: string; password?: string }> {
  const envCredentials = sourceCredentialsFromEnv();
  if (envCredentials.password) return envCredentials;

  const supabase = createAdminSupabase();
  if (!supabase) return {};

  const connections = new VCSConnections(supabase as any);
  let connectionId = readConnectionId(body.connectionId);
  if (!connectionId) {
    const connection = await connections.getConnection(userId, 'github');
    const connectionData = connection?.connectionData || {};
    connectionId =
      readConnectionId(connectionData.connectionId) ||
      readConnectionId(connectionData.provider_user_id) ||
      null;
  }
  if (!connectionId) return {};

  const auth = /^\d+$/.test(connectionId)
    ? await connections.getAuthFromConnectionByInstallationId(Number(connectionId))
    : await connections.getAuthFromConnection(connectionId);
  if (!auth?.accessToken) return {};

  return {
    username: 'x-access-token',
    password: auth.accessToken,
  };
}

function validateHarnessRequest(body: AssetPackHarnessRequest): string | null {
  if (!body.repositoryFullName) return 'repositoryFullName is required';
  if (!body.sourceBranch) return 'sourceBranch is required';
  if (!body.sourceCommit) return 'sourceCommit is required';
  if (!body.readId) return 'readId is required';
  if (!body.depositId) return 'depositId is required';
  return null;
}

function summarizeCommand(command: PipelineHarnessCommandResult): Record<string, unknown> {
  return {
    label: command.label,
    exitCode: command.exitCode,
    startedAt: command.startedAt,
    completedAt: command.completedAt,
    stdoutTail: redactKnownSecrets(command.stdout.slice(-1200)),
    stderrTail: redactKnownSecrets(command.stderr.slice(-1200)),
  };
}

function redactKnownSecrets(text: string): string {
  let redacted = text;
  for (const key of REDACTED_OUTPUT_ENV_KEYS) {
    const value = process.env[key];
    if (typeof value !== 'string' || value.length < 8) continue;
    redacted = redacted.split(value).join('[redacted]');
  }
  return redacted;
}

function summarizeEvidence(evidence: unknown): Record<string, unknown> | null {
  if (!evidence || typeof evidence !== 'object' || Array.isArray(evidence)) return null;
  const record = evidence as Record<string, unknown>;
  const output = record.output && typeof record.output === 'object'
    ? (record.output as Record<string, unknown>)
    : null;
  const error = record.error && typeof record.error === 'object'
    ? (record.error as Record<string, unknown>)
    : null;
  const fitResult = output?.fitResult && typeof output.fitResult === 'object'
    ? (output.fitResult as Record<string, unknown>)
    : output?.fit && typeof output.fit === 'object'
      ? (output.fit as Record<string, unknown>)
      : null;
  const depositorySearch = output?.depositorySearch && typeof output.depositorySearch === 'object'
    ? (output.depositorySearch as Record<string, unknown>)
    : null;
  const ledgerSettlement = output?.ledgerSettlement && typeof output.ledgerSettlement === 'object'
    ? (output.ledgerSettlement as Record<string, unknown>)
    : null;
  const summarizeCandidate = (candidate: unknown) => {
    if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) return null;
    const record = candidate as Record<string, unknown>;
    const scores = record.scores && typeof record.scores === 'object'
      ? (record.scores as Record<string, unknown>)
      : record.ranking && typeof record.ranking === 'object'
        ? (record.ranking as Record<string, unknown>)
        : null;
    const sourceBinding = record.sourceBinding && typeof record.sourceBinding === 'object'
      ? (record.sourceBinding as Record<string, unknown>)
      : null;
    const verification = record.verification && typeof record.verification === 'object'
      ? (record.verification as Record<string, unknown>)
      : null;
    return {
      assetId: record.assetId,
      title: record.title,
      useTier: record.useTier,
      sourceBinding,
      scores: scores
        ? {
            finalScore: scores.finalScore,
            semanticScore: scores.semanticScore,
            repositoryScore: scores.repositoryScore,
            revisionScore: scores.revisionScore,
            proofScore: scores.proofScore,
            measurementScore: scores.measurementScore,
          }
        : null,
      blockers: Array.isArray(verification?.blockers)
        ? verification.blockers.map((blocker) => String(blocker))
        : [],
      warnings: Array.isArray(verification?.warnings)
        ? verification.warnings.map((warning) => String(warning))
        : [],
    };
  };
  const summarizeFitLike = (value: Record<string, unknown> | null) =>
    value
      ? {
          resultState: value.resultState,
          resultReasons: Array.isArray(value.resultReasons)
            ? value.resultReasons.map((reason) => String(reason))
            : [],
          selectedCandidateAssetIds: Array.isArray(value.selectedCandidateAssetIds)
            ? value.selectedCandidateAssetIds.map((id) => String(id))
            : [],
          queryRoot: value.queryRoot,
          rankingRoot: value.rankingRoot,
          embeddingPolicy: value.embeddingPolicy,
          selectionTrace: value.selectionTrace && typeof value.selectionTrace === 'object'
            ? {
                selectedCandidates: Array.isArray((value.selectionTrace as Record<string, unknown>).selectedCandidates)
                  ? ((value.selectionTrace as Record<string, unknown>).selectedCandidates as unknown[])
                      .map(summarizeCandidate)
                      .filter(Boolean)
                  : [],
                blockedCandidates: Array.isArray((value.selectionTrace as Record<string, unknown>).blockedCandidates)
                  ? ((value.selectionTrace as Record<string, unknown>).blockedCandidates as unknown[])
                      .map(summarizeCandidate)
                      .filter(Boolean)
                  : [],
                rejectedCandidateCount: (value.selectionTrace as Record<string, unknown>).rejectedCandidateCount ?? null,
              }
            : null,
        }
      : null;
  return {
    schema: record.schema,
    harnessMode: record.harnessMode ?? record.mode,
    resultState: record.resultState,
    pipelineResultState: record.pipelineResultState,
    sourceOverlay: record.manifest && typeof record.manifest === 'object'
      ? (record.manifest as Record<string, unknown>).sourceOverlay ?? null
      : null,
    resultReasons: Array.isArray(record.resultReasons)
      ? record.resultReasons.map((reason) => redactKnownSecrets(String(reason)))
      : [],
    error: error
      ? {
          name: error.name,
          message: redactKnownSecrets(String(error.message || '')),
        }
      : null,
    outputKeys: output ? Object.keys(output) : [],
    fitResult: summarizeFitLike(fitResult),
    depositorySearch: depositorySearch
      ? {
          ...summarizeFitLike(depositorySearch),
          searchedAssetCount: depositorySearch.searchedAssetCount,
          selectedCandidates: Array.isArray(depositorySearch.selectedCandidates)
            ? (depositorySearch.selectedCandidates as unknown[])
                .slice(0, 3)
                .map(summarizeCandidate)
                .filter(Boolean)
            : [],
          blockedCandidates: Array.isArray(depositorySearch.blockedCandidates)
            ? (depositorySearch.blockedCandidates as unknown[])
                .slice(0, 3)
                .map(summarizeCandidate)
                .filter(Boolean)
            : [],
        }
      : null,
    ledgerSettlement: ledgerSettlement
      ? {
          status: ledgerSettlement.status,
          settlementAdmissible: ledgerSettlement.settlementAdmissible,
          reason: ledgerSettlement.reason,
          assetPackId: ledgerSettlement.assetPackId,
          btdRange: ledgerSettlement.btdRange,
          ledgerAnchorId: ledgerSettlement.ledgerAnchorId,
          btcFeeReceiptId: ledgerSettlement.btcFeeReceiptId,
          depositorWalletId: ledgerSettlement.depositorWalletId,
          readerWalletId: ledgerSettlement.readerWalletId,
          btcFee: ledgerSettlement.btcFee,
          ownershipBoundary: ledgerSettlement.ownershipBoundary,
          readback: ledgerSettlement.readback,
        }
      : null,
    eventTypes: Array.isArray(record.events)
      ? record.events
          .map((event) => event && typeof event === 'object'
            ? (event as Record<string, unknown>).type
            : null)
          .filter(Boolean)
      : [],
  };
}

function safeHostEvent(event: PipelineHarnessHostEvent): PipelineHarnessHostEvent {
  return event;
}

export async function POST(request: NextRequest): Promise<Response> {
  const disabled = requireHarnessAllowed();
  if (disabled) return disabled;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) {
    return Response.json({ error: 'unauthorized' }, { status: 401 });
  }

  const body = await parseBody(request);
  const validationError = validateHarnessRequest(body);
  if (validationError) {
    return Response.json({ error: validationError }, { status: 400 });
  }

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const run = async () => {
        try {
          const repositoryFullName = body.repositoryFullName!;
          const sourceUrl = body.sourceGitUrl || `https://github.com/${repositoryFullName}.git`;
          const mode = body.mode || 'asset_pack_pipeline';

          emitSse(controller, 'harness-started', {
            mode,
            repositoryFullName,
            sourceBranch: body.sourceBranch,
            sourceCommit: body.sourceCommit,
            readId: body.readId,
            depositId: body.depositId,
          });
          emitSse(controller, 'harness-preflight', summarizeHarnessPreflight(body));

          const plan = buildAssetPackSandboxHarness({
            mode,
            read: {
              id: body.readId!,
              prompt: body.readPrompt || DEFAULT_READ_PROMPT,
            },
            deposit: {
              id: body.depositId!,
              assetId: body.depositAssetId || null,
              hasWalletOrAttestationProof: body.depositHasWalletOrAttestationProof,
              hasAssetMeasurementEvidence: body.depositHasAssetMeasurementEvidence,
              proofRoot: body.depositProofRoot || null,
              measurementRoot: body.depositMeasurementRoot || null,
              reconciliationReadbackRoot: body.depositReconciliationReadbackRoot || null,
            },
            sourceRevision: {
              repositoryFullName,
              branch: body.sourceBranch!,
              commit: body.sourceCommit!,
            },
            source: body.assumeRepositoryPresent
              ? undefined
              : {
                  type: 'git',
                  url: sourceUrl,
                  revision: body.sourceRevision || body.sourceCommit!,
                  depth: body.sourceDepth || 1,
                  ...(await sourceCredentialsForUser(data.user!.id, body)),
                },
            commandEnvironment: selectedCommandEnvironment(data.user!.id),
            assumeRepositoryPresent: body.assumeRepositoryPresent === true,
            installDependencies: body.installDependencies !== false,
          });

          const sandboxFactory = await loadVercelSandboxFactory();
          const host = new VercelSandboxPipelineHost({
            sandboxFactory,
            stopAfterRun: body.leaveRunning !== true,
            onEvent: (event) => emitSse(controller, 'harness-event', safeHostEvent(event)),
          });
          const result = await host.runHarness(plan);

          emitSse(controller, 'harness-completed', {
            outcome: result.outcome,
            sandboxId: result.sandboxId,
            stopped: result.stopped,
            commands: result.commands.map(summarizeCommand),
            evidencePresent: result.artifacts.evidence !== null,
            telemetryPresent: result.artifacts.telemetry !== null,
            evidence: summarizeEvidence(result.artifacts.evidence),
            telemetryLineCount: result.artifacts.telemetry
              ? result.artifacts.telemetry.split(/\r?\n/).filter(Boolean).length
              : 0,
          });
        } catch (runError) {
          emitSse(controller, 'harness-failed', {
            error: runError instanceof Error ? runError.message : String(runError),
            preflight: summarizeHarnessPreflight(body),
          });
          console.error('[bitcode-pipeline-harness-route-failed]', {
            error: runError instanceof Error ? runError.message : String(runError),
            preflight: summarizeHarnessPreflight(body),
          });
        } finally {
          controller.close();
        }
      };

      void run();
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
