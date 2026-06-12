import { NextResponse } from 'next/server';

import { supabaseAdmin } from '@bitcode/supabase';
import { createClient } from '@bitcode/supabase/ssr/server';
import { GitHubService } from '@bitcode/api/src/vcs/github-service';
import {
  applyExclusionsToInventory,
  normalizeProtectedIpExclusions,
} from '@bitcode/pipeline-asset-pack/asset-packs-synthesis';
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

type SynthesizeOptionsBody = {
  repositoryFullName?: unknown;
  sourceBranch?: unknown;
  sourceCommit?: unknown;
  depositorInstructions?: unknown;
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
  const sourceBranch = readString(body.sourceBranch);
  const sourceCommit = readString(body.sourceCommit);
  const depositorInstructions = readString(body.depositorInstructions);
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

  const startedAt = Date.now();
  try {
    const auth = await GitHubService.getValidAuth(
      githubConnection.connection_data as never,
      user.id,
      supabaseAdmin,
    );
    const reference = sourceCommit || sourceBranch || 'HEAD';
    const rawInventory = await buildSourceInventory({
      token: auth.accessToken,
      repositoryFullName,
      reference,
    });
    const inventory = applyExclusionsToInventory(rawInventory, protectedIpExclusions);

    const result = await synthesizeRealDepositOptionCandidates({
      repositoryFullName,
      sourceBranch,
      sourceCommit,
      depositorInstructions,
      protectedIpExclusions,
      demandContext,
      inventory,
    });

    const { synthesis, reviewProjections } = buildRealDepositAssetPackOptionSynthesis(
      {
        repositoryFullName,
        sourceBranch,
        sourceCommit,
        depositorInstructions,
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
    const now = new Date().toISOString();
    const { data: execution, error: executionError } = await supabaseAdmin
      .from('executions')
      .insert({
        user_id: user.id,
        type: 'agentic-execution:asset-pack',
        status: 'completed',
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
        },
        items: [],
        created_at: now,
        started_at: new Date(startedAt).toISOString(),
        completed_at: now,
        updated_at: now,
        total_tokens: result.inference.totalTokens,
        duration_ms: durationMs,
      })
      .select('id')
      .single();

    if (executionError) {
      bitcodeServerTelemetry('warn', 'deposit-synthesize-options', 'execution-write-failed', {
        userId: compactBitcodeServerId(user.id),
        message: executionError.message,
      });
    }

    bitcodeServerTelemetry('info', 'deposit-synthesize-options', 'synthesized', {
      userId: compactBitcodeServerId(user.id),
      repositoryFullName,
      optionCount: synthesis.optionCount,
      droppedCandidateCount: synthesis.exclusionPosture.droppedCandidateCount,
      totalTokens: result.inference.totalTokens,
      durationMs,
    });

    return NextResponse.json({
      ok: true,
      executionId: execution?.id ?? null,
      synthesis,
      reviewProjections,
      inference: { ...result.inference, durationMs },
      exclusionViolations: result.exclusionViolations,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    bitcodeServerTelemetry('warn', 'deposit-synthesize-options', 'failed', {
      userId: compactBitcodeServerId(user.id),
      repositoryFullName,
      message,
    });
    return NextResponse.json(
      { error: message, code: 'deposit_option_synthesis_failed' },
      { status: 502 },
    );
  }
}
