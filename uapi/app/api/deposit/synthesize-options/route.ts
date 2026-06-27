import { randomUUID } from 'crypto';

import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@bitcode/supabase';
import { createClient } from '@bitcode/supabase/ssr/server';
import { GitHubService } from '@bitcode/api/src/vcs/github-service';
import { ExecutionStreamAdapter } from '@bitcode/execution-generics';
import { createStreamingExecution, emitPhaseTransition } from '@bitcode/pipelines-generics';
import {
  applyExclusionsToInventory,
  normalizeProtectedIpExclusions,
  validateDepositSynthesisOptions,
} from '@bitcode/pipeline-asset-pack/asset-packs-synthesis';
import { synthesizeAssetPacksPipeline } from '@bitcode/pipeline-asset-pack';
import {
  buildRealDepositAssetPackOptionSynthesis,
  synthesizeRealDepositOptionCandidates,
} from '@bitcode/pipeline-asset-pack/deposit-option-real-synthesis';
import { isAssetPackRealInferenceEnabled } from '@bitcode/pipeline-asset-pack/runtime-inference-policy';
import {
  bitcodeServerTelemetry,
  compactBitcodeServerId,
} from '@/lib/bitcode-server-telemetry';

export const runtime = 'nodejs';
export const maxDuration = 300;

const MAX_INVENTORY_PATHS = 400;
const MAX_SAMPLE_FILES = 10;
const MAX_SAMPLE_CHARS = 1600;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type SynthesizeOptionsBody = {
  runId?: unknown;
  repositoryFullName?: unknown;
  sourceBranch?: unknown;
  sourceCommit?: unknown;
  obfuscations?: unknown;
  protectedIpExclusions?: unknown;
  demandContext?: unknown;
  depositoryDemandSignals?: unknown;
  readingDemandSignals?: unknown;
  existingDepositorySignals?: unknown;
};

function readString(value: unknown) {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function readStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((entry) => (typeof entry === 'string' ? entry.trim() : '')).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value.split(/\r?\n/).map((entry) => entry.trim()).filter(Boolean);
  }
  return [];
}

function readSignals(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => (entry && typeof entry === 'object' && !Array.isArray(entry) ? (entry as Record<string, unknown>) : null))
    .filter((entry): entry is Record<string, unknown> => entry !== null)
    .map((entry) => ({
      id: readString(entry.id),
      label: readString(entry.label),
      summary: readString(entry.summary),
      weight: typeof entry.weight === 'number' ? entry.weight : null,
    }));
}

const SAMPLE_PRIORITY_PATTERNS = [
  /^readme/i,
  /^package\.json$/i,
  /^pyproject\.toml$/i,
  /^cargo\.toml$/i,
  /^go\.mod$/i,
  /^setup\.(py|cfg)$/i,
  /^requirements.*\.txt$/i,
];

function pickSamplePaths(paths: string[]): string[] {
  const prioritized = paths.filter((path) =>
    SAMPLE_PRIORITY_PATTERNS.some((pattern) => pattern.test(path.split('/').pop() || '')),
  );
  const sourceLike = paths.filter(
    (path) =>
      !prioritized.includes(path) &&
      /\.(ts|tsx|js|jsx|py|rs|go|rb|java|cs|swift|sol|md)$/i.test(path) &&
      path.split('/').length <= 3,
  );
  return [...prioritized, ...sourceLike].slice(0, MAX_SAMPLE_FILES);
}

async function githubJson(token: string, url: string) {
  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/vnd.github+json',
      'x-github-api-version': '2022-11-28',
    },
    cache: 'no-store',
  });
  if (!response.ok) {
    throw new Error(`GitHub API ${response.status} for ${url.replace(/\?.*$/, '')}`);
  }
  return response.json() as Promise<Record<string, unknown>>;
}

async function buildSourceInventory(input: {
  token: string;
  repositoryFullName: string;
  reference: string;
}) {
  const tree = await githubJson(
    input.token,
    `https://api.github.com/repos/${input.repositoryFullName}/git/trees/${encodeURIComponent(input.reference)}?recursive=1`,
  );
  const entries = Array.isArray(tree.tree) ? (tree.tree as Array<Record<string, unknown>>) : [];
  const paths = entries
    .filter((entry) => entry.type === 'blob' && typeof entry.path === 'string')
    .map((entry) => entry.path as string)
    .slice(0, MAX_INVENTORY_PATHS);

  const samples: Array<{ path: string; excerpt: string }> = [];
  for (const path of pickSamplePaths(paths)) {
    try {
      const content = await githubJson(
        input.token,
        `https://api.github.com/repos/${input.repositoryFullName}/contents/${encodeURI(path)}?ref=${encodeURIComponent(input.reference)}`,
      );
      if (typeof content.content === 'string' && content.encoding === 'base64') {
        const text = Buffer.from(content.content, 'base64').toString('utf8');
        samples.push({ path, excerpt: text.slice(0, MAX_SAMPLE_CHARS) });
      }
    } catch {
      // A missing or oversized sample never blocks synthesis.
    }
  }

  return { paths, samples, truncated: entries.length > MAX_INVENTORY_PATHS };
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return NextResponse.json(
      { error: 'A Bitcode session is required for deposit option synthesis.', code: 'deposit_session_required' },
      { status: 401 },
    );
  }

  if (!isAssetPackRealInferenceEnabled()) {
    return NextResponse.json(
      {
        error:
          'Real deposit option synthesis requires BITCODE_ASSET_PACK_REAL_INFERENCE (with BITCODE_ASSET_PACK_REAL_INFERENCE_PROFILE=bounded) so options carry real measurements.',
        code: 'real_inference_required',
      },
      { status: 422 },
    );
  }

  let body: SynthesizeOptionsBody;
  try {
    body = (await request.json()) as SynthesizeOptionsBody;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const repositoryFullName = readString(body.repositoryFullName);
  if (!repositoryFullName || !/^[\w.-]+\/[\w.-]+$/.test(repositoryFullName)) {
    return NextResponse.json({ error: 'repositoryFullName (owner/repo) is required.' }, { status: 400 });
  }
  const requestedRunId = readString(body.runId);
  const runId = requestedRunId && UUID_PATTERN.test(requestedRunId) ? requestedRunId : randomUUID();
  const sourceBranch = readString(body.sourceBranch);
  const sourceCommit = readString(body.sourceCommit);
  const obfuscations = readString(body.obfuscations);
  const protectedIpExclusions = normalizeProtectedIpExclusions(readStringList(body.protectedIpExclusions));
  const demandContext = readStringList(body.demandContext);

  const { data: ownedRepository, error: repositoryError } = await supabaseAdmin
    .from('vcs_repositories')
    .select('repo_full_name')
    .eq('user_id', user.id)
    .eq('repo_full_name', repositoryFullName)
    .maybeSingle();
  if (repositoryError) {
    return NextResponse.json({ error: repositoryError.message }, { status: 500 });
  }
  if (!ownedRepository) {
    return NextResponse.json(
      { error: 'Repository is not in the connected GitHub inventory for this account.', code: 'repository_not_connected' },
      { status: 403 },
    );
  }

  const { data: githubConnection, error: connectionError } = await supabaseAdmin
    .from('user_connections')
    .select('connection_data')
    .eq('user_id', user.id)
    .eq('provider', 'github')
    .eq('is_active', true)
    .maybeSingle();
  if (connectionError || !githubConnection?.connection_data) {
    return NextResponse.json(
      { error: 'An active GitHub connection is required for deposit option synthesis.', code: 'github_connection_required' },
      { status: 422 },
    );
  }

  // Streaming execution: a running executions row plus live execution_events
  // the /deposit accordion log tails. Only source-safe telemetry streams
  // (phase/agent/stage/provider/model/usage); prompt and response content is
  // withheld by the synthesis bridge.
  const execution = createStreamingExecution({
    runId,
    userId: user.id,
    supabase: supabaseAdmin,
    streamToDatabase: true,
    structuredToDatabase: false,
  });
  const emitStatus = (message: string, extra: Record<string, unknown> = {}) =>
    ExecutionStreamAdapter.emitEvent(execution.id, 'status' as never, { message, ...extra });

  const startedAt = Date.now();
  const startedAtIso = new Date(startedAt).toISOString();
  const finalizeExecutionRow = async (row: Record<string, unknown>) => {
    const { error: rowError } = await supabaseAdmin.from('executions').upsert(
      {
        id: runId,
        user_id: user.id,
        type: 'agentic-execution:asset-pack',
        created_at: startedAtIso,
        started_at: startedAtIso,
        updated_at: new Date().toISOString(),
        ...row,
      },
      { onConflict: 'id' },
    );
    if (rowError) {
      bitcodeServerTelemetry('warn', 'deposit-synthesize-options', 'execution-write-failed', {
        userId: compactBitcodeServerId(user.id),
        message: rowError.message,
      });
    }
  };

  // F26-B: the synthesis runs the full formal hierarchy (many LLM calls), so it
  // must NOT be bound to this request's maxDuration. Dispatch it as a background
  // run (the local in-process harness host) and return the runId immediately; the
  // client tails source-safe telemetry and, on the completion event, reads the
  // persisted synthesis from the execution row output. Prod durability is the
  // Vercel Sandbox host (pipeline-hosts). The F25 per-call LLM timeout remains the
  // safety bound within the run.
  const runSynthesis = async () => {
   try {
    await emitPhaseTransition(execution as never, 'deposit-option-synthesis', 'start', {
      repositoryFullName,
      sourceBranch,
      sourceCommit,
    });
    await emitStatus(`AssetPacksSynthesis (deposit lens) started for ${repositoryFullName}.`);

    const auth = await GitHubService.getValidAuth(
      githubConnection.connection_data as never,
      user.id,
      supabaseAdmin,
    );
    const reference = sourceCommit || sourceBranch || 'HEAD';
    await emitStatus(`Building source inventory from ${repositoryFullName}@${reference}…`);
    const rawInventory = await buildSourceInventory({
      token: auth.accessToken,
      repositoryFullName,
      reference,
    });
    const inventory = applyExclusionsToInventory(rawInventory, protectedIpExclusions);
    await emitStatus(
      `Inventory ready: ${inventory.paths.length} paths (${inventory.excludedPathCount} withheld by ${protectedIpExclusions.length} protected-IP exclusions; ${inventory.samples.length} excerpts sampled).`,
    );

    const DEPOSIT_OPTION_KINDS = ['capability-slice', 'implementation-pattern', 'proof-operations-slice'];
    // Default: run the full SynthesizeAssetPacks SDIVF pipeline (deposit mode)
    // inline so the rich phase→agent→step→failsafe→generation telemetry streams.
    // Set BITCODE_DEPOSIT_SYNTHESIS_PIPELINE=0 to use the bounded synthesis only.
    const useFullPipeline = process.env.BITCODE_DEPOSIT_SYNTHESIS_PIPELINE !== '0';

    type DepositResult = Awaited<ReturnType<typeof synthesizeRealDepositOptionCandidates>>;
    let result: DepositResult;

    if (useFullPipeline) {
      await emitStatus(
        'Running SynthesizeAssetPacks (deposit mode): Setup → Discovery → Implementation → Validation → Finish…',
      );
      const [owner, name] = repositoryFullName.split('/');
      await synthesizeAssetPacksPipeline(
        {
          mode: 'deposit',
          synthesizeMode: 'deposit',
          repositoryFullName,
          sourceBranch,
          sourceCommit,
          repository: {
            owner,
            name,
            repo: name,
            branch: sourceBranch,
            commit: sourceCommit,
            fullName: repositoryFullName,
            url: `https://github.com/${repositoryFullName}`,
          },
          obfuscations,
          protectedIpExclusions,
          demandContext,
          inventory,
          candidateKinds: DEPOSIT_OPTION_KINDS,
        } as never,
        execution as never,
      );
      const rawOptions = ((execution as any).get?.('implementation', 'options') ??
        (execution as any).findUp?.('implementation', 'options') ??
        []) as Parameters<typeof validateDepositSynthesisOptions>[0];
      const validated = validateDepositSynthesisOptions(rawOptions, {
        lens: 'deposit',
        inventoryPaths: inventory.paths,
        protectedIpExclusions,
        candidateKinds: DEPOSIT_OPTION_KINDS,
      });
      result = {
        lens: 'deposit',
        candidates: validated.candidates,
        droppedCandidateCount: validated.droppedCandidateCount,
        exclusionViolations: validated.exclusionViolations,
        inference: { provider: null, model: null, totalTokens: null, durationMs: Date.now() - startedAt },
      };
      if (result.candidates.length === 0) {
        // Pipeline produced no admissible options — fall back to bounded synthesis.
        await emitStatus('Pipeline yielded no admissible options; falling back to bounded deposit synthesis…');
        result = await synthesizeRealDepositOptionCandidates({
          repositoryFullName,
          sourceBranch,
          sourceCommit,
          obfuscations,
          protectedIpExclusions,
          demandContext,
          inventory,
          execution: execution as never,
        });
      }
    } else {
      await emitStatus('Running the bounded deposit synthesis (reason → judge → structured output)…');
      result = await synthesizeRealDepositOptionCandidates({
        repositoryFullName,
        sourceBranch,
        sourceCommit,
        obfuscations,
        protectedIpExclusions,
        demandContext,
        inventory,
        execution: execution as never,
      });
    }
    await emitStatus(
      `Validated candidates fail-closed: ${result.candidates.length} admissible, ${result.droppedCandidateCount} dropped.`,
    );

    const { synthesis, reviewProjections } = buildRealDepositAssetPackOptionSynthesis(
      {
        repositoryFullName,
        sourceBranch,
        sourceCommit,
        obfuscations,
        protectedIpExclusions,
        depositoryDemandSignals: readSignals(body.depositoryDemandSignals),
        readingDemandSignals: readSignals(body.readingDemandSignals),
        existingDepositorySignals: readSignals(body.existingDepositorySignals),
        createdAt: new Date().toISOString(),
      },
      result,
      inventory,
    );

    const durationMs = Date.now() - startedAt;
    await emitStatus(
      `Synthesized ${synthesis.optionCount} measured AssetPack options (${result.inference.totalTokens ?? 'n/a'} tokens, ${(durationMs / 1000).toFixed(1)}s).`,
    );
    await emitPhaseTransition(execution as never, 'deposit-option-synthesis', 'complete', {
      optionCount: synthesis.optionCount,
    });

    // Persist the synthesis BEFORE the completion event so the client's
    // completion-triggered history fetch always finds it (the reviewProjections
    // ride along on the output now that the route no longer returns them inline).
    await finalizeExecutionRow({
      status: 'completed',
      completed_at: new Date().toISOString(),
      context: {
        source: 'deposit-option-synthesis',
        workbench: 'deposit-option-synthesis',
        route: '/deposit',
        pipelineCore: 'AssetPacksSynthesis',
        synthesisMode: synthesis.synthesisMode,
        repositoryFullName,
        sourceBranch,
        sourceCommit,
        optionCount: synthesis.optionCount,
        synthesisRoot: synthesis.roots.synthesisRoot,
        exclusionCount: synthesis.exclusionPosture.protectedIpExclusionCount,
        excludedPathCount: synthesis.exclusionPosture.excludedPathCount,
        droppedCandidateCount: synthesis.exclusionPosture.droppedCandidateCount,
        inventoryPathCount: inventory.paths.length,
        inferenceProvider: result.inference.provider,
        inferenceModel: result.inference.model,
      },
      output: {
        summary: `Synthesized ${synthesis.optionCount} measured AssetPack options for ${repositoryFullName} via AssetPacksSynthesis (deposit lens).`,
        depositOptionSynthesis: synthesis,
        reviewProjections,
        inference: { ...result.inference, durationMs },
        exclusionViolations: result.exclusionViolations,
      },
      items: [],
      total_tokens: result.inference.totalTokens,
      duration_ms: durationMs,
    });

    await ExecutionStreamAdapter.emitEvent(execution.id, 'completion' as never, {
      message: `AssetPacksSynthesis completed with ${synthesis.optionCount} measured options.`,
      runId,
    });

    bitcodeServerTelemetry('info', 'deposit-synthesize-options', 'synthesized', {
      userId: compactBitcodeServerId(user.id),
      repositoryFullName,
      runId,
      optionCount: synthesis.optionCount,
      droppedCandidateCount: synthesis.exclusionPosture.droppedCandidateCount,
      totalTokens: result.inference.totalTokens,
      durationMs,
    });
   } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      await ExecutionStreamAdapter.emitEvent(execution.id, 'error' as never, { message, runId });
    } catch {}
    await finalizeExecutionRow({
      status: 'failed',
      completed_at: new Date().toISOString(),
      error: { message },
      context: {
        source: 'deposit-option-synthesis',
        route: '/deposit',
        pipelineCore: 'AssetPacksSynthesis',
        repositoryFullName,
        sourceBranch,
        sourceCommit,
      },
      duration_ms: Date.now() - startedAt,
    });
    bitcodeServerTelemetry('warn', 'deposit-synthesize-options', 'failed', {
      userId: compactBitcodeServerId(user.id),
      repositoryFullName,
      runId,
      message,
    });
   } finally {
    ExecutionStreamAdapter.unregisterStreamer(execution.id);
   }
  };

  void runSynthesis();
  return NextResponse.json({ ok: true, executionId: runId, runId, status: 'dispatched' });
}
