import {
  buildAssetPackSandboxHarness,
  loadVercelSandboxFactory,
  VercelSandboxPipelineHost,
  type PipelineHarnessMode,
} from '..';

function requireHarnessOptIn(): void {
  if (process.env.BITCODE_RUN_VERCEL_SANDBOX_HARNESS !== '1') {
    throw new Error(
      'Set BITCODE_RUN_VERCEL_SANDBOX_HARNESS=1 before creating a live Vercel Sandbox.'
    );
  }
}

function requireVercelAuth(): void {
  if (!process.env.VERCEL_OIDC_TOKEN && !process.env.VERCEL_TOKEN) {
    throw new Error(
      'Missing Vercel Sandbox auth. Run `vercel link && vercel env pull`, or provide VERCEL_TOKEN with VERCEL_TEAM_ID and VERCEL_PROJECT_ID.'
    );
  }
}

function selectedCommandEnvironment(): Record<string, string> {
  const keys = (process.env.BITCODE_SANDBOX_ENV_KEYS || '')
    .split(',')
    .map((key) => key.trim())
    .filter(Boolean);

  const env: Record<string, string> = {};
  for (const key of keys) {
    const value = process.env[key];
    if (typeof value === 'string') {
      env[key] = value;
    }
  }

  if (process.env.BITCODE_PIPELINE_STREAM_TO_DATABASE === '1') {
    env.BITCODE_PIPELINE_STREAM_TO_DATABASE = '1';
    if (process.env.BITCODE_PIPELINE_STRUCTURED_DB === '1') {
      env.BITCODE_PIPELINE_STRUCTURED_DB = '1';
    }
  }

  return env;
}

async function main(): Promise<void> {
  requireHarnessOptIn();
  requireVercelAuth();

  const mode = (process.env.BITCODE_SANDBOX_MODE || 'host_smoke') as PipelineHarnessMode;
  const repositoryFullName =
    process.env.BITCODE_SANDBOX_REPOSITORY || 'engineeredsoftware/ENGI';
  const branch = process.env.BITCODE_SANDBOX_SOURCE_BRANCH || 'main';
  const commit = process.env.BITCODE_SANDBOX_SOURCE_COMMIT || 'unknown';
  const sourceUrl = process.env.BITCODE_SANDBOX_SOURCE_GIT_URL;

  const plan = buildAssetPackSandboxHarness({
    mode,
    read: {
      id: process.env.BITCODE_SANDBOX_READ_ID || 'manual-read-fit-qa',
      prompt:
        process.env.BITCODE_SANDBOX_READ_PROMPT ||
        'Read the deposited repository revision and determine whether it contains a complete non-mock Terminal path through Deposit, Read/Fit, AssetPack evidence, proof/finality readback, and Supabase/ledger reconciliation.',
    },
    deposit: {
      id: process.env.BITCODE_SANDBOX_DEPOSIT_ID || 'manual-deposit-qa',
      assetId: process.env.BITCODE_SANDBOX_DEPOSIT_ASSET_ID || null,
    },
    sourceRevision: {
      repositoryFullName,
      branch,
      commit,
    },
    source: sourceUrl
      ? {
          type: 'git',
          url: sourceUrl,
          revision: process.env.BITCODE_SANDBOX_SOURCE_REVISION || commit,
          depth: Number(process.env.BITCODE_SANDBOX_SOURCE_DEPTH || 1),
        }
      : undefined,
    commandEnvironment: selectedCommandEnvironment(),
    assumeRepositoryPresent: process.env.BITCODE_SANDBOX_ASSUME_REPOSITORY_PRESENT === '1',
    installDependencies: process.env.BITCODE_SANDBOX_SKIP_INSTALL !== '1',
  });

  const sandboxFactory = await loadVercelSandboxFactory();
  const host = new VercelSandboxPipelineHost({
    sandboxFactory,
    stopAfterRun: process.env.BITCODE_SANDBOX_LEAVE_RUNNING !== '1',
  });
  const result = await host.runHarness(plan);

  process.stdout.write(
    JSON.stringify(
      {
        outcome: result.outcome,
        sandboxId: result.sandboxId,
        stopped: result.stopped,
        commandCount: result.commands.length,
        commandExitCodes: result.commands.map((command) => ({
          label: command.label,
          exitCode: command.exitCode,
        })),
        evidencePresent: result.artifacts.evidence !== null,
        telemetryPresent: result.artifacts.telemetry !== null,
      },
      null,
      2
    ) + '\n'
  );

  if (result.outcome !== 'completed') {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  process.stderr.write(`${error?.message || String(error)}\n`);
  process.exitCode = 1;
});
