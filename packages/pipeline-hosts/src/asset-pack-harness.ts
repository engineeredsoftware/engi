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
const EVIDENCE_PATH = `${HARNESS_DIRECTORY}/evidence.json`;
const TELEMETRY_PATH = `${HARNESS_DIRECTORY}/telemetry.jsonl`;
const DEFAULT_LONG_TIMEOUT_MS = 45 * 60 * 1000;

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

  const commandEnvironment = {
    BITCODE_PIPELINE_HARNESS_MANIFEST: MANIFEST_PATH,
    BITCODE_PIPELINE_HARNESS_ARTIFACT_DIR: HARNESS_DIRECTORY,
    BITCODE_PIPELINE_HARNESS_MODE: mode,
    ...options.commandEnvironment,
  };

  const manifest = buildAssetPackPipelineHarnessManifest({
    mode,
    read: options.read,
    deposit: options.deposit,
    sourceRevision: options.sourceRevision,
    commandEnvironment,
  });

  const commands = buildCommands(mode, commandEnvironment, options.installDependencies ?? true);

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
    ],
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
  installDependencies: boolean
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
    commands.push({
      label: 'package-manager-readiness',
      cmd: 'corepack',
      args: ['enable'],
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
      label: 'asset-pack-pipeline-run',
      cmd: 'pnpm',
      args: ['exec', 'ts-node', '--transpile-only', LIVE_PIPELINE_RUNNER_PATH],
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
import { assetPackPipeline } from '../../packages/pipelines/asset-pack/src/index';
import { enablePipelineStreaming, factoryPipelineExecution } from '../../packages/pipelines-generics/src/index';

const manifestPath = process.env.BITCODE_PIPELINE_HARNESS_MANIFEST || '${MANIFEST_PATH}';
const artifactDir = process.env.BITCODE_PIPELINE_HARNESS_ARTIFACT_DIR || '${HARNESS_DIRECTORY}';
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const runId = process.env.BITCODE_PIPELINE_RUN_ID || randomUUID();
const userId = process.env.BITCODE_PIPELINE_USER_ID || '00000000-0000-4000-8000-000000000000';
const startedAt = new Date().toISOString();
const manifestRoot = createHash('sha256').update(JSON.stringify(manifest)).digest('hex');
const events = [];
let resultState = 'blocked_readiness';
let output = null;
let error = null;
let supabase = null;
let pipelineRunPersisted = false;

function normalizeResultState(candidate) {
  return ['worthy_fit', 'no_worthy_fit', 'blocked_readiness'].includes(candidate)
    ? candidate
    : 'blocked_readiness';
}

function record(event) {
  events.push({
    ...event,
    at: new Date().toISOString(),
    runId,
  });
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

async function insertPipelineRun() {
  if (!supabase) return;
  try {
    const { error: insertError } = await supabase.from('pipeline_runs').insert({
      user_id: userId,
      pipeline_type: 'asset_pack',
      pipeline_name: 'asset-pack-read-fit',
      status: 'running',
      execution_id: runId,
      correlation_id: runId,
      started_at: startedAt,
      metadata: {
        bitcodePipelineHarness: true,
        harnessMode: manifest.harnessMode,
        manifestRoot,
        sourceRevision: manifest.sourceRevision,
      },
      input: {
        read: manifest.read,
        deposit: manifest.deposit,
        sourceRevision: manifest.sourceRevision,
      },
    });
    if (insertError) {
      record({ type: 'pipeline-run-persist-blocked', stage: 'telemetry-readback', error: insertError.message });
      return;
    }
    pipelineRunPersisted = true;
    record({ type: 'pipeline-run-persisted', stage: 'telemetry-readback' });
  } catch (persistError) {
    record({ type: 'pipeline-run-persist-blocked', stage: 'telemetry-readback', error: persistError?.message || String(persistError) });
  }
}

async function updatePipelineRun(status, payload) {
  if (!supabase || !pipelineRunPersisted) return;
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
      })
      .eq('execution_id', runId);
  } catch (persistError) {
    record({ type: 'pipeline-run-update-blocked', stage: 'telemetry-readback', error: persistError?.message || String(persistError) });
  }
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
        harnessMode: manifest.harnessMode,
      },
    });
  } catch (persistError) {
    record({ type: 'stream-log-persist-blocked', stage: 'telemetry-readback', error: persistError?.message || String(persistError) });
  }
}

await mkdir(artifactDir, { recursive: true });

try {
  const execution = factoryPipelineExecution('asset_pack', undefined, {
    pipelineName: 'asset_pack',
    family: 'asset_pack',
    posture: 'live',
    admittedSurface: 'terminal_read_fit',
  });

  execution.store('harness', 'manifestRoot', manifestRoot);
  execution.store('harness', 'sourceRevision', manifest.sourceRevision);
  execution.store('read', 'request', manifest.read);
  execution.store('deposit', 'reference', manifest.deposit);

  if (process.env.BITCODE_PIPELINE_STREAM_TO_DATABASE === '1') {
    const { supabaseAdmin } = await import('../../packages/supabase/src/index');
    supabase = supabaseAdmin;
    enablePipelineStreaming(execution, {
      runId,
      userId,
      supabase: supabaseAdmin,
      streamToDatabase: true,
      structuredToDatabase: process.env.BITCODE_PIPELINE_STRUCTURED_DB === '1',
    });
    record({ type: 'database-streaming-enabled', stage: 'telemetry-readback' });
    await insertPipelineRun();
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
  output = await assetPackPipeline(input, execution);
  resultState = normalizeResultState(
    output?.resultState || output?.fitResult?.resultState || output?.fit?.resultState
  );
  record({ type: 'pipeline-complete', stage: 'finish' });

  const evidence = {
    schema: 'bitcode.pipeline-harness.evidence',
    harnessMode: manifest.harnessMode,
    resultState,
    resultReasons: [
      'AssetPack pipeline entrypoint returned without throwing.',
      resultState === 'blocked_readiness'
        ? 'Pipeline output did not include an admissible commercial result state; review remains blocked.'
        : 'Review SQL must still verify durable telemetry, proof, and ledger readback before commercial settlement.',
    ],
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
    resultReasons: evidence.resultReasons,
  });
  await writeFile(\`\${artifactDir}/evidence.json\`, JSON.stringify(evidence, null, 2));
} catch (caught) {
  error = {
    name: caught?.name || 'Error',
    message: caught?.message || String(caught),
    stack: caught?.stack || null,
  };
  record({
    type: 'pipeline-blocked',
    stage: 'validation',
    resultState: 'blocked_readiness',
    error: { name: error.name, message: error.message },
  });

  const evidence = {
    schema: 'bitcode.pipeline-harness.evidence',
    harnessMode: manifest.harnessMode,
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
}
`;
}
