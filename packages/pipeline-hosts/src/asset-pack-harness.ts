import {
  buildAssetPackPipelineHarnessManifest,
  VERCEL_SANDBOX_HOST_CAPABILITIES,
} from './manifest';
import type {
  PipelineDepositReference,
  PipelineHarnessCommand,
  PipelineHarnessMode,
  PipelineHarnessPlan,
  PipelineNetworkPolicy,
  PipelineReadRequest,
  PipelineSandboxSource,
  PipelineSourceRevision,
  VercelSandboxRuntime,
} from './types';

const HARNESS_DIRECTORY = '.bitcode/pipeline-harness';
const MANIFEST_PATH = `${HARNESS_DIRECTORY}/manifest.json`;
const HOST_SMOKE_RUNNER_PATH = `${HARNESS_DIRECTORY}/run-host-smoke.mjs`;
const LIVE_PIPELINE_RUNNER_PATH = `${HARNESS_DIRECTORY}/run-live-asset-pack-pipeline.ts`;
const SOURCE_OVERLAY_PATCH_PATH = `${HARNESS_DIRECTORY}/source-overlay.patch`;
const EVIDENCE_PATH = `${HARNESS_DIRECTORY}/evidence.json`;
const TELEMETRY_PATH = `${HARNESS_DIRECTORY}/telemetry.jsonl`;
const TSCONFIG_PATHS_REGISTER_PATH = `${HARNESS_DIRECTORY}/node_modules/tsconfig-paths/register`;
const SANDBOX_WORKING_DIRECTORY = '/vercel/sandbox' as const;
const DEFAULT_LONG_TIMEOUT_MS = 45 * 60 * 1000;
const SANDBOX_PNPM_VERSION = '10.33.0';

export interface BuildAssetPackSandboxHarnessOptions {
  mode?: PipelineHarnessMode;
  read: PipelineReadRequest;
  deposit: PipelineDepositReference;
  sourceRevision: PipelineSourceRevision;
  source?: PipelineSandboxSource;
  assumeRepositoryPresent?: boolean;
  runtime?: VercelSandboxRuntime;
  timeoutMs?: number;
  networkPolicy?: PipelineNetworkPolicy;
  commandEnvironment?: Record<string, string>;
  installDependencies?: boolean;
  sourceOverlayPatch?: Buffer | string;
}

export function buildAssetPackSandboxHarness(
  options: BuildAssetPackSandboxHarnessOptions
): PipelineHarnessPlan {
  const mode = options.mode ?? 'host_smoke';
  if (mode === 'asset_pack_pipeline' && !options.source && !options.assumeRepositoryPresent) {
    throw new Error(
      'asset_pack_pipeline harness mode requires a sandbox source or assumeRepositoryPresent=true.'
    );
  }

  const sourceOverlayPatch = normalizeSourceOverlayPatch(options.sourceOverlayPatch);
  const sourceOverlay = sourceOverlayPatch
    ? {
        path: SOURCE_OVERLAY_PATCH_PATH,
        patchRoot: SANDBOX_WORKING_DIRECTORY,
        commercialAdmissibility: 'qa-only-not-source-revision-evidence' as const,
      }
    : undefined;
  const commandEnvironment = {
    BITCODE_PIPELINE_HARNESS_MANIFEST: `${SANDBOX_WORKING_DIRECTORY}/${MANIFEST_PATH}`,
    BITCODE_PIPELINE_HARNESS_ARTIFACT_DIR: `${SANDBOX_WORKING_DIRECTORY}/${HARNESS_DIRECTORY}`,
    BITCODE_PIPELINE_HARNESS_MODE: mode,
    ...(sourceOverlay ? { BITCODE_PIPELINE_SOURCE_OVERLAY_APPLIED: '1' } : {}),
    ...options.commandEnvironment,
  };

  const manifest = buildAssetPackPipelineHarnessManifest({
    mode,
    read: options.read,
    deposit: options.deposit,
    sourceRevision: options.sourceRevision,
    sourceOverlay,
    commandEnvironment,
  });

  const commands = buildCommands(
    mode,
    commandEnvironment,
    options.installDependencies ?? true,
    sourceOverlayPatch !== null
  );

  return {
    capabilities: VERCEL_SANDBOX_HOST_CAPABILITIES,
    createOptions: {
      runtime: options.runtime ?? VERCEL_SANDBOX_HOST_CAPABILITIES.defaultRuntime,
      timeout: options.timeoutMs ?? DEFAULT_LONG_TIMEOUT_MS,
      networkPolicy: options.networkPolicy ?? 'allow-all',
      source: options.source,
    },
    manifest,
    files: [
      {
        path: MANIFEST_PATH,
        content: Buffer.from(JSON.stringify(manifest, null, 2)),
        mode: 0o644,
      },
      {
        path: HOST_SMOKE_RUNNER_PATH,
        content: Buffer.from(createHostSmokeRunner()),
        mode: 0o755,
      },
      {
        path: LIVE_PIPELINE_RUNNER_PATH,
        content: Buffer.from(createLiveAssetPackPipelineRunner()),
        mode: 0o755,
      },
      ...(sourceOverlayPatch
        ? [
            {
              path: SOURCE_OVERLAY_PATCH_PATH,
              content: sourceOverlayPatch,
              mode: 0o644,
            },
          ]
        : []),
    ],
    sourceOverlay,
    commands,
    artifactPaths: {
      evidence: EVIDENCE_PATH,
      telemetry: TELEMETRY_PATH,
    },
  };
}

function buildCommands(
  mode: PipelineHarnessMode,
  commandEnvironment: Record<string, string>,
  installDependencies: boolean,
  hasSourceOverlayPatch: boolean
): PipelineHarnessCommand[] {
  const commands: PipelineHarnessCommand[] = [
    {
      label: 'runtime-readiness',
      cmd: 'node',
      args: ['--version'],
      required: true,
    },
  ];

  if (mode === 'asset_pack_pipeline') {
    if (hasSourceOverlayPatch) {
      commands.push({
        label: 'apply-source-overlay',
        cmd: 'git',
        args: ['apply', '--whitespace=nowarn', SOURCE_OVERLAY_PATCH_PATH],
        required: true,
      });
    }

    commands.push({
      label: 'package-manager-readiness',
      cmd: 'corepack',
      args: ['prepare', `pnpm@${SANDBOX_PNPM_VERSION}`, '--activate'],
      required: true,
    });

    if (installDependencies) {
      commands.push({
        label: 'workspace-install',
        cmd: 'pnpm',
        args: ['install', '--frozen-lockfile'],
        required: true,
      });
    }

    commands.push({
      label: 'harness-runtime-install',
      cmd: 'npm',
      args: ['install', '--prefix', HARNESS_DIRECTORY, 'tsconfig-paths@4.2.0'],
      required: true,
    });

    commands.push({
      label: 'asset-pack-pipeline-run',
      cmd: 'pnpm',
      args: [
        '--filter',
        '@bitcode/pipeline-hosts',
        'exec',
        'ts-node',
        '--project',
        '../../tsconfig.json',
        '-r',
        `../../${TSCONFIG_PATHS_REGISTER_PATH}`,
        '--transpile-only',
        `../../${LIVE_PIPELINE_RUNNER_PATH}`,
      ],
      env: commandEnvironment,
      required: true,
    });

    return commands;
  }

  commands.push({
    label: 'host-smoke-harness-run',
    cmd: 'node',
    args: [HOST_SMOKE_RUNNER_PATH],
    env: commandEnvironment,
    required: true,
  });

  return commands;
}

function normalizeSourceOverlayPatch(sourceOverlayPatch?: Buffer | string): Buffer | null {
  if (typeof sourceOverlayPatch === 'string') {
    return sourceOverlayPatch.trim().length > 0 ? Buffer.from(sourceOverlayPatch) : null;
  }
  if (Buffer.isBuffer(sourceOverlayPatch)) {
    return sourceOverlayPatch.length > 0 && sourceOverlayPatch.toString('utf8').trim().length > 0
      ? sourceOverlayPatch
      : null;
  }
  return null;
}

function createHostSmokeRunner(): string {
  return `import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { arch, platform, release } from 'node:os';

const manifestPath = process.env.BITCODE_PIPELINE_HARNESS_MANIFEST || '${MANIFEST_PATH}';
const artifactDir = process.env.BITCODE_PIPELINE_HARNESS_ARTIFACT_DIR || '${HARNESS_DIRECTORY}';
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const startedAt = new Date().toISOString();
const manifestRoot = createHash('sha256').update(JSON.stringify(manifest)).digest('hex');

await mkdir(artifactDir, { recursive: true });

const events = [
  {
    type: 'harness-start',
    stage: 'telemetry-readback',
    harnessMode: manifest.harnessMode,
    sourceRevision: manifest.sourceRevision,
    startedAt,
  },
  {
    type: 'host-runtime-readiness',
    stage: 'telemetry-readback',
    nodeVersion: process.version,
    platform: platform(),
    arch: arch(),
    release: release(),
  },
  {
    type: 'pipeline-boundary',
    stage: 'asset-pack-synthesis',
    resultState: 'blocked_readiness',
    reason: 'Host smoke mode verifies sandbox execution and artifact export only. Run asset_pack_pipeline mode for repository pipeline execution evidence.',
  },
  {
    type: 'harness-complete',
    stage: 'telemetry-readback',
    completedAt: new Date().toISOString(),
  },
];

const evidence = {
  schema: 'bitcode.pipeline-harness.evidence',
  harnessMode: manifest.harnessMode,
  resultState: 'blocked_readiness',
  resultReasons: [
    'Vercel Sandbox host lifecycle completed.',
    'Command output and artifacts were exported before sandbox stop.',
    'AssetPack pipeline execution was not invoked in host_smoke mode.',
  ],
  manifestRoot,
  manifest,
  hostRuntime: {
    nodeVersion: process.version,
    platform: platform(),
    arch: arch(),
    release: release(),
  },
  events,
  createdAt: new Date().toISOString(),
};

await writeFile(\`\${artifactDir}/telemetry.jsonl\`, events.map((event) => JSON.stringify(event)).join('\\n') + '\\n');
await writeFile(\`\${artifactDir}/evidence.json\`, JSON.stringify(evidence, null, 2));
`;
}

function createLiveAssetPackPipelineRunner(): string {
  return `import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash, randomUUID } from 'node:crypto';

const manifestPath = process.env.BITCODE_PIPELINE_HARNESS_MANIFEST || '${MANIFEST_PATH}';
const artifactDir = process.env.BITCODE_PIPELINE_HARNESS_ARTIFACT_DIR || '${HARNESS_DIRECTORY}';
const runId = process.env.BITCODE_PIPELINE_RUN_ID || randomUUID();
const DEFAULT_USER_ID = '00000000-0000-4000-8000-000000000000';
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const startedAt = new Date().toISOString();
const harnessMaxRuntimeMs = Number(process.env.BITCODE_PIPELINE_HARNESS_MAX_RUNTIME_MS || 240000);
let manifest = null;
let manifestRoot = null;
let userId = process.env.BITCODE_PIPELINE_USER_ID || DEFAULT_USER_ID;
const events = [];
let resultState = 'blocked_readiness';
let output = null;
let error = null;
let supabase = null;
let execution = null;
let pipelineRunPersisted = false;
let pipelineRunId = null;
let forceExitAfterFinally = false;

function normalizeResultState(candidate) {
  return ['worthy_fit', 'no_worthy_fit', 'blocked_readiness'].includes(candidate)
    ? candidate
    : 'blocked_readiness';
}

function isUsableUuid(value) {
  return UUID_PATTERN.test(String(value || '')) && value !== DEFAULT_USER_ID;
}

function record(event) {
  events.push({
    ...event,
    at: new Date().toISOString(),
    runId,
  });
}

function stageForStreamEvent(event) {
  return event?.executionState?.phase || event?.phase || 'telemetry-readback';
}

function summarizeStreamEvent(event) {
  const data = event?.data && typeof event.data === 'object' && !Array.isArray(event.data)
    ? event.data
    : null;
  return {
    type: 'pipeline-stream-event',
    stage: stageForStreamEvent(event),
    streamEventType: event?.type || 'status',
    namespace: event?.namespace || null,
    key: event?.key || null,
    executionPath: Array.isArray(event?.executionPath) ? event.executionPath : [],
    executionState: event?.executionState || null,
    message: event?.message || null,
    dataKeys: data ? Object.keys(data).sort() : [],
    inputMessageCount: Array.isArray(data?.messages) ? data.messages.length : null,
    outputContentLength: typeof data?.content === 'string' ? data.content.length : null,
    parsedOutputPresent: Boolean(data?.parsed),
  };
}

function buildManifestDepositoryAsset(manifest) {
  const assetId = manifest.deposit?.assetId || manifest.deposit?.id || 'manifest-deposit-reference';
  const source = manifest.sourceRevision || {};
  const repositoryFullName = source.repositoryFullName || '';
  const text = [
    'Deposited repository revision',
    repositoryFullName,
    source.branch,
    source.commit,
    'repository-revision fit-quality-receipt asset-pack-evidence proof-root reconciliation-readback',
    manifest.read?.prompt,
  ].filter(Boolean).join(' ');

  return {
    assetId,
    title: \`Deposited repository revision \${repositoryFullName || assetId}\`,
    summary: text,
    artifactKind: 'repository-revision',
    artifactType: 'repository/revision',
    repositoryFullName,
    sourceBranch: source.branch || null,
    sourceCommit: source.commit || null,
    contentRoot: \`sha256:\${createHash('sha256').update(text).digest('hex')}\`,
    contentUnits: [
      {
        unitId: \`\${assetId}:repository-revision\`,
        unitKind: 'repository-revision',
        text,
      },
    ],
    sourceMaterialBinding: {
      mode: 'source-bound-repository-revision',
      mutableInBranch: false,
      materializationRoot: \`.bitcode/source-material/\${assetId}\`,
    },
    hasWalletOrAttestationProof: manifest.deposit?.hasWalletOrAttestationProof === true,
    hasAssetMeasurementEvidence: manifest.deposit?.hasAssetMeasurementEvidence === true,
  };
}

function summarizeExecution(execution) {
  const summary = {
    root: execution.summary(),
    namespaces: {},
  };
  for (const namespace of execution.getNamespaces()) {
    const values = execution.getAll(namespace);
    summary.namespaces[namespace] = values
      ? Array.from(values.entries()).map(([key, value]) => ({ key, value }))
      : [];
  }
  return summary;
}

async function withHarnessTimeout(promise, maxRuntimeMs) {
  if (!Number.isFinite(maxRuntimeMs) || maxRuntimeMs <= 0) return promise;
  let timeout = null;
  try {
    return await Promise.race([
      promise,
      new Promise((_, reject) => {
        timeout = setTimeout(() => {
          const timeoutError = new Error(\`AssetPack pipeline exceeded harness runtime budget of \${maxRuntimeMs}ms.\`);
          timeoutError.name = 'PipelineHarnessTimeoutError';
          reject(timeoutError);
        }, maxRuntimeMs);
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

async function insertPipelineRun() {
  if (!supabase) return null;
  try {
    const { data, error: insertError } = await supabase.from('pipeline_runs').insert({
      user_id: userId,
      pipeline_type: 'asset_pack',
      pipeline_name: 'asset-pack-read-fit',
      status: 'running',
      execution_id: runId,
      correlation_id: runId,
      started_at: startedAt,
      metadata: {
        bitcodePipelineHarness: true,
        harnessMode: manifest?.harnessMode || 'asset_pack_pipeline',
        manifestRoot,
        sourceRevision: manifest?.sourceRevision || null,
      },
      input: {
        read: manifest?.read || null,
        deposit: manifest?.deposit || null,
        sourceRevision: manifest?.sourceRevision || null,
      },
    }).select('id').single();
    if (insertError) {
      const existingId = await findPipelineRunIdByExecutionId();
      if (existingId) {
        pipelineRunId = existingId;
        pipelineRunPersisted = true;
        record({ type: 'pipeline-run-reused', stage: 'telemetry-readback', pipelineRunId });
        return pipelineRunId;
      }
      record({ type: 'pipeline-run-persist-blocked', stage: 'telemetry-readback', error: insertError.message });
      return null;
    }
    pipelineRunId = data?.id || null;
    pipelineRunPersisted = true;
    record({ type: 'pipeline-run-persisted', stage: 'telemetry-readback', pipelineRunId });
    return pipelineRunId;
  } catch (persistError) {
    record({ type: 'pipeline-run-persist-blocked', stage: 'telemetry-readback', error: persistError?.message || String(persistError) });
    return null;
  }
}

async function updatePipelineRun(status, payload) {
  if (!supabase || !pipelineRunPersisted || !pipelineRunId) return;
  try {
    await supabase
      .from('pipeline_runs')
      .update({
        status,
        completed_at: new Date().toISOString(),
        output: payload?.output || null,
        error_data: payload?.error || null,
        artifacts: {
          manifestRoot,
          evidencePath: '${EVIDENCE_PATH}',
          telemetryPath: '${TELEMETRY_PATH}',
        },
        validation: {
          resultState: payload?.resultState || resultState,
          resultReasons: payload?.resultReasons || [],
        },
        duration_ms: Date.now() - Date.parse(startedAt),
        updated_at: new Date().toISOString(),
      })
      .eq('id', pipelineRunId);
  } catch (persistError) {
    record({ type: 'pipeline-run-update-blocked', stage: 'telemetry-readback', error: persistError?.message || String(persistError) });
  }
}

async function findPipelineRunIdByExecutionId() {
  if (!supabase) return null;
  try {
    const { data, error: lookupError } = await supabase
      .from('pipeline_runs')
      .select('id')
      .eq('execution_id', runId)
      .maybeSingle();
    if (lookupError) return null;
    return data?.id || null;
  } catch {
    return null;
  }
}

async function resolvePipelineUserId() {
  if (isUsableUuid(userId)) return userId;
  if (!supabase) return userId;

  try {
    const { data, error: lookupError } = await supabase
      .from('user_connections')
      .select('user_id')
      .eq('is_active', true)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!lookupError && isUsableUuid(data?.user_id)) {
      userId = data.user_id;
      record({ type: 'pipeline-user-resolved', stage: 'telemetry-readback', source: 'user_connections' });
      return userId;
    }
  } catch (lookupError) {
    record({ type: 'pipeline-user-lookup-blocked', stage: 'telemetry-readback', error: lookupError?.message || String(lookupError) });
  }

  throw new Error('BITCODE_PIPELINE_USER_ID is required for database-backed pipeline harness telemetry.');
}

async function insertHarnessStreamLog(status) {
  if (!supabase) return;
  try {
    await supabase.from('stream_logs').insert({
      stream_id: runId,
      user_id: userId,
      log_type: 'pipeline-harness',
      log_data: {
        event: 'pipeline-harness-complete',
        status,
        resultState,
        manifestRoot,
        harnessMode: manifest?.harnessMode || 'asset_pack_pipeline',
      },
    });
  } catch (persistError) {
    record({ type: 'stream-log-persist-blocked', stage: 'telemetry-readback', error: persistError?.message || String(persistError) });
  }
}

async function main() {
await mkdir(artifactDir, { recursive: true });

try {
  manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  manifestRoot = createHash('sha256').update(JSON.stringify(manifest)).digest('hex');
  userId = process.env.BITCODE_PIPELINE_USER_ID || manifest.deposit?.userId || DEFAULT_USER_ID;
  const [{ assetPackPipeline }, { enablePipelineStreaming, factoryPipelineExecution }] = await Promise.all([
    import('../../packages/pipelines/asset-pack/src/index'),
    import('../../packages/pipelines-generics/src/index'),
  ]);
  execution = factoryPipelineExecution('asset_pack', undefined, {
    pipelineName: 'asset_pack',
    family: 'asset_pack',
    posture: 'live',
    admittedSurface: 'terminal_read_fit',
  });

  execution.store('harness', 'manifestRoot', manifestRoot);
  execution.store('harness', 'sourceRevision', manifest.sourceRevision);
  execution.store('read', 'request', manifest.read);
  execution.store('deposit', 'reference', manifest.deposit);

  const databaseStreamingRequested = process.env.BITCODE_PIPELINE_STREAM_TO_DATABASE === '1';
  if (databaseStreamingRequested) {
    const { supabaseAdmin } = await import('../../packages/supabase/src/index');
    supabase = supabaseAdmin;
    userId = await resolvePipelineUserId();
    pipelineRunId = await insertPipelineRun();
    record({ type: 'database-streaming-enabled', stage: 'telemetry-readback' });
  }
  const pipelineStreamer = enablePipelineStreaming(execution, {
    runId,
    userId,
    pipelineRunId,
    supabase: supabase || undefined,
    streamToDatabase: databaseStreamingRequested && Boolean(supabase),
    structuredToDatabase: databaseStreamingRequested && process.env.BITCODE_PIPELINE_STRUCTURED_DB === '1',
  });
  pipelineStreamer.subscribe((event) => {
    record(summarizeStreamEvent(event));
  });
  if (!databaseStreamingRequested) {
    record({ type: 'artifact-streaming-enabled', stage: 'telemetry-readback' });
  }

  const input = {
    read: manifest.read.prompt,
    definitionOfRead: manifest.read.prompt,
    repository: {
      fullName: manifest.sourceRevision.repositoryFullName,
      branch: manifest.sourceRevision.branch,
      commit: manifest.sourceRevision.commit,
    },
    sourceRevision: manifest.sourceRevision,
    deposit: manifest.deposit,
    depositoryAssets: [buildManifestDepositoryAsset(manifest)],
    writtenAssetType: 'asset_pack',
    deliveryMechanismTemplate: 'pull-request',
    harness: manifest,
  };

  record({ type: 'pipeline-start', stage: 'read-comprehension', sourceRevision: manifest.sourceRevision });
  if (manifest.sourceOverlay) {
    record({
      type: 'source-overlay-applied',
      stage: 'validation',
      sourceOverlay: manifest.sourceOverlay,
    });
  }
  output = await withHarnessTimeout(assetPackPipeline(input, execution), harnessMaxRuntimeMs);
  const pipelineResultState = normalizeResultState(
    output?.resultState || output?.fitResult?.resultState || output?.fit?.resultState
  );
  resultState = manifest.sourceOverlay ? 'blocked_readiness' : pipelineResultState;
  const fitResult = output?.fitResult || output?.fit || null;
  const depositorySearch = output?.depositorySearch || null;
  const pipelineResultReasons = Array.isArray(fitResult?.resultReasons)
    ? fitResult.resultReasons
    : Array.isArray(depositorySearch?.resultReasons)
      ? depositorySearch.resultReasons
      : [];
  record({ type: 'pipeline-complete', stage: 'finish' });

  const resultReasons = [
    'AssetPack pipeline entrypoint returned without throwing.',
    manifest.sourceOverlay
      ? 'Source overlay patch was applied for QA; this run cannot serve as source-revision settlement evidence.'
      : null,
    resultState === 'blocked_readiness'
      ? 'Pipeline output did not include an admissible commercial result state; review remains blocked.'
      : 'Review SQL must still verify durable telemetry, proof, and ledger readback before commercial settlement.',
    ...pipelineResultReasons,
  ].filter(Boolean);

  const evidence = {
    schema: 'bitcode.pipeline-harness.evidence',
    harnessMode: manifest.harnessMode,
    resultState,
    pipelineResultState,
    resultReasons,
    runId,
    userId,
    manifestRoot,
    manifest,
    output,
    execution: summarizeExecution(execution),
    events,
    startedAt,
    completedAt: new Date().toISOString(),
  };

  await updatePipelineRun('completed', {
    output,
    resultState,
    resultReasons,
  });
  await writeFile(\`\${artifactDir}/evidence.json\`, JSON.stringify(evidence, null, 2));
} catch (caught) {
  error = {
    name: caught?.name || 'Error',
    message: caught?.message || String(caught),
    stack: caught?.stack || null,
  };
  if (error.name === 'PipelineHarnessTimeoutError') {
    forceExitAfterFinally = true;
  }
  record({
    type: 'pipeline-blocked',
    stage: 'validation',
    resultState: 'blocked_readiness',
    error: { name: error.name, message: error.message },
  });

  const evidence = {
    schema: 'bitcode.pipeline-harness.evidence',
    harnessMode: manifest?.harnessMode || 'asset_pack_pipeline',
    resultState: 'blocked_readiness',
    resultReasons: [
      'AssetPack pipeline execution did not produce admissible commercial result evidence.',
      error.message,
    ],
    runId,
    userId,
    manifestRoot,
    manifest,
    output,
    error,
    execution: execution ? summarizeExecution(execution) : null,
    events,
    startedAt,
    completedAt: new Date().toISOString(),
  };

  await updatePipelineRun('failed', {
    output,
    error,
    resultState: 'blocked_readiness',
    resultReasons: evidence.resultReasons,
  });
  await writeFile(\`\${artifactDir}/evidence.json\`, JSON.stringify(evidence, null, 2));
  process.exitCode = 1;
} finally {
  await insertHarnessStreamLog(process.exitCode ? 'failed' : 'completed');
  await writeFile(\`\${artifactDir}/telemetry.jsonl\`, events.map((event) => JSON.stringify(event)).join('\\n') + '\\n');
  if (forceExitAfterFinally) {
    process.exit(1);
  }
}

}

main().catch((caught) => {
  process.stderr.write(\`\${caught?.message || String(caught)}\\n\`);
  process.exitCode = 1;
});
`;
}
