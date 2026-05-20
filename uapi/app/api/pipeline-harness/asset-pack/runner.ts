import { randomUUID } from 'node:crypto';
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
import {
  assertDatabaseStreamingEnvironment,
  assertRealInferenceEnvironment,
  isEnabled,
  isPipelineHarnessRealInferenceRequired,
  listSupabaseAdminCredentials,
  normalizeModelEnvironment,
  selectSupabaseAdminCredential,
  summarizeHarnessPreflight,
  type PipelineHarnessPreflightBody,
} from './preflight';

export type AssetPackHarnessRequest = PipelineHarnessPreflightBody & {
  mode?: PipelineHarnessMode;
  readPrompt?: string;
  depositAssetId?: string | null;
  depositHasWalletOrAttestationProof?: boolean;
  depositHasAssetMeasurementEvidence?: boolean;
  depositProofRoot?: string | null;
  depositMeasurementRoot?: string | null;
  depositReconciliationReadbackRoot?: string | null;
  sourceGitUrl?: string;
  sourceRevision?: string;
  sourceDepth?: number;
  readNeed?: unknown;
  acceptedReadNeed?: unknown;
  requireAcceptedReadNeed?: boolean;
  connectionId?: string | number | null;
  assumeRepositoryPresent?: boolean;
  installDependencies?: boolean;
  leaveRunning?: boolean;
};

export type HarnessRouteEmitter = (event: string, data: unknown) => void;

export type HarnessRouteRunnerOptions = {
  runId?: string;
  logErrors?: boolean;
  validateDatabaseAccess?: boolean;
  fetchImpl?: typeof fetch;
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
  'BITCODE_ASSET_PACK_REAL_INFERENCE_PROFILE',
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
  'BITCODE_PIPELINE_HARNESS_REQUIRE_REAL_INFERENCE',
  'BITCODE_PIPELINE_BTC_NETWORK',
  'BITCODE_PIPELINE_BTC_FEE_SATS',
  'BITCODE_PIPELINE_DEPOSITOR_WALLET_ID',
  'BITCODE_PIPELINE_READER_WALLET_ID',
  'BITCODE_PIPELINE_WALLET_SESSION_ID',
  'BITCODE_PIPELINE_BTD_VOLUME',
] as const;

const REDACTED_OUTPUT_ENV_KEYS = [
  ...TRUSTED_COMMAND_ENV_KEYS,
  'BITCODE_SANDBOX_SOURCE_GIT_PASSWORD',
  'GITHUB_TOKEN',
  'GITHUB_PAT',
  'GH_TOKEN',
] as const;

export function validateHarnessRequest(body: AssetPackHarnessRequest): string | null {
  if (!body.repositoryFullName) return 'repositoryFullName is required';
  if (!body.sourceBranch) return 'sourceBranch is required';
  if (!body.sourceCommit) return 'sourceCommit is required';
  if (!body.readId) return 'readId is required';
  if (!body.depositId) return 'depositId is required';
  return null;
}

export async function runAssetPackHarnessRoute(
  body: AssetPackHarnessRequest,
  userId: string,
  emit: HarnessRouteEmitter,
  options: HarnessRouteRunnerOptions = {},
): Promise<void> {
  const routeRunId = options.runId || randomUUID();
  try {
    const repositoryFullName = body.repositoryFullName!;
    const sourceUrl = body.sourceGitUrl || `https://github.com/${repositoryFullName}.git`;
    const mode = body.mode || 'asset_pack_pipeline';

    emit('harness-started', {
      runId: routeRunId,
      mode,
      repositoryFullName,
      sourceBranch: body.sourceBranch,
      sourceCommit: body.sourceCommit,
      readId: body.readId,
      depositId: body.depositId,
      readNeedId: readNeedId(body.acceptedReadNeed || body.readNeed),
      requireAcceptedReadNeed: body.requireAcceptedReadNeed !== false,
    });
    emit('harness-preflight', {
      runId: routeRunId,
      ...summarizeHarnessPreflight(body),
    });

    const commandEnvironment = {
      ...selectedCommandEnvironment(userId),
      BITCODE_PIPELINE_RUN_ID: routeRunId,
    };
    if (options.validateDatabaseAccess !== false) {
      await assertSupabaseRestReadbackAccess(commandEnvironment, options.fetchImpl || fetch);
    }

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
      readNeed: body.acceptedReadNeed || body.readNeed,
      source: body.assumeRepositoryPresent
        ? undefined
        : {
            type: 'git',
            url: sourceUrl,
            revision: body.sourceRevision || body.sourceCommit!,
            depth: body.sourceDepth || 1,
            ...(await sourceCredentialsForUser(userId, body)),
          },
      commandEnvironment,
      assumeRepositoryPresent: body.assumeRepositoryPresent === true,
      installDependencies: body.installDependencies !== false,
    });

    const sandboxFactory = await loadVercelSandboxFactory();
    const host = new VercelSandboxPipelineHost({
      sandboxFactory,
      stopAfterRun: body.leaveRunning !== true,
      onEvent: (event) => emit('harness-event', {
        runId: routeRunId,
        ...safeHostEvent(event),
      }),
    });
    const result = await host.runHarness(plan);

    emit('harness-completed', {
      runId: routeRunId,
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
    emit('harness-failed', {
      runId: routeRunId,
      error: runError instanceof Error ? runError.message : String(runError),
      preflight: summarizeHarnessPreflight(body),
    });
    if (options.logErrors !== false) {
      console.error('[bitcode-pipeline-harness-route-failed]', {
        error: runError instanceof Error ? runError.message : String(runError),
        preflight: summarizeHarnessPreflight(body),
      });
    }
  }
}

function readNeedId(value: unknown): string | null {
  const record = recordValue(value);
  return typeof record?.needId === 'string' ? record.needId : null;
}

function recordValue(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
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

  const serviceRole = selectSupabaseAdminCredential(process.env);
  if (serviceRole) {
    env.SUPABASE_SERVICE_ROLE_KEY = serviceRole;
  }

  env.BITCODE_PIPELINE_USER_ID = userId;
  env.BITCODE_PIPELINE_STREAM_TO_DATABASE = '1';
  env.BITCODE_PIPELINE_STRUCTURED_DB = '1';
  const realInferenceRequired = isPipelineHarnessRealInferenceRequired();
  if (realInferenceRequired) {
    env.BITCODE_PIPELINE_HARNESS_REQUIRE_REAL_INFERENCE = '1';
  }
  if (realInferenceRequired && isEnabled(env.BITCODE_ASSET_PACK_REAL_INFERENCE) && !env.BITCODE_ASSET_PACK_REAL_INFERENCE_PROFILE) {
    env.BITCODE_ASSET_PACK_REAL_INFERENCE_PROFILE = 'bounded';
  }
  assertDatabaseStreamingEnvironment(env, process.env);
  normalizeModelEnvironment(env);
  assertRealInferenceEnvironment(env);

  return env;
}

async function assertSupabaseRestReadbackAccess(
  env: Record<string, string>,
  fetchImpl: typeof fetch,
): Promise<void> {
  const url = env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
  const candidates = listSupabaseAdminCredentials(env);
  if (!url || candidates.length === 0) return;

  const endpoint = new URL('/rest/v1/btd_supply_state', url);
  endpoint.searchParams.set('select', 'id');
  endpoint.searchParams.set('limit', '1');

  const failures: string[] = [];
  for (const candidate of candidates) {
    const response = await fetchImpl(endpoint, {
      headers: {
        apikey: candidate.value,
        authorization: `Bearer ${candidate.value}`,
      },
    });
    if (response.ok) {
      env.SUPABASE_SERVICE_ROLE_KEY = candidate.value;
      return;
    }

    failures.push(`${candidate.key}: ${await readSupabaseRestError(response)}`);
  }

  throw new Error(
    `Pipeline harness Supabase REST readback credential check failed for ${endpoint.origin}: no admin-capable Supabase credential was accepted. ${failures[0] || 'No response detail.'}`
  );
}

async function readSupabaseRestError(response: Response): Promise<string> {
  let message = `${response.status} ${response.statusText}`.trim();
  try {
    const body = await response.json();
    message = body?.message || body?.hint || message;
  } catch {
    // Keep status text when the REST error body is not JSON.
  }
  return message;
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
    selectSupabaseAdminCredential(process.env);
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
  const protectedSourceUnlock = ledgerSettlement?.protectedSourceUnlock && typeof ledgerSettlement.protectedSourceUnlock === 'object'
    ? (ledgerSettlement.protectedSourceUnlock as Record<string, unknown>)
    : null;
  const sourceSafePreview = output?.sourceSafePreview && typeof output.sourceSafePreview === 'object'
    ? (output.sourceSafePreview as Record<string, unknown>)
    : record.sourceSafePreview && typeof record.sourceSafePreview === 'object'
      ? (record.sourceSafePreview as Record<string, unknown>)
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
    sourceSafePreview: sourceSafePreview
      ? {
          schema: sourceSafePreview.schema,
          previewId: sourceSafePreview.previewId,
          assetPackId: sourceSafePreview.assetPackId,
          need: sourceSafePreview.need,
          fit: sourceSafePreview.fit,
          roots: sourceSafePreview.roots,
          feeQuote: sourceSafePreview.feeQuote,
          rangeProjection: sourceSafePreview.rangeProjection,
          disclosurePolicy: sourceSafePreview.disclosurePolicy,
          accessPolicy: sourceSafePreview.accessPolicy,
          settlementBoundary: sourceSafePreview.settlementBoundary,
          unlock: sourceSafePreview.unlock,
          delivery: sourceSafePreview.delivery,
        }
      : null,
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
          ownershipEventId: ledgerSettlement.ownershipEventId,
          readLicenseId: ledgerSettlement.readLicenseId,
          journalEntryIds: ledgerSettlement.journalEntryIds,
          depositorWalletId: ledgerSettlement.depositorWalletId,
          readerWalletId: ledgerSettlement.readerWalletId,
          btcFee: ledgerSettlement.btcFee,
          ownershipBoundary: ledgerSettlement.ownershipBoundary,
          protectedSourceUnlock,
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
