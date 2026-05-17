import {
  buildAssetPackSandboxHarness,
  loadVercelSandboxFactory,
  VercelSandboxPipelineHost,
  type PipelineHarnessMode,
} from '..';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const TRUSTED_SANDBOX_ENV_KEYS = [
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
  'BITCODE_PIPELINE_USER_ID',
] as const;

const REDACTED_OUTPUT_ENV_KEYS = [
  ...TRUSTED_SANDBOX_ENV_KEYS,
  'BITCODE_SANDBOX_SOURCE_GIT_PASSWORD',
  'GITHUB_TOKEN',
  'GITHUB_PAT',
  'GH_TOKEN',
  'VERCEL_OIDC_TOKEN',
  'VERCEL_TOKEN',
] as const;

function loadLocalEnvFiles(): void {
  const roots = [process.cwd(), resolve(process.cwd(), '..'), resolve(process.cwd(), '../..')];
  const seen = new Set<string>();

  for (const root of roots) {
    for (const relativePath of ['.env.local', 'uapi/.env.local']) {
      const path = resolve(root, relativePath);
      if (seen.has(path)) continue;
      seen.add(path);
      if (!existsSync(path)) continue;
      const body = readFileSync(path, 'utf8');
      for (const line of body.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const match = /^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)=(.*)$/.exec(trimmed);
        if (!match) continue;
        const [, key, rawValue] = match;
        if (process.env[key] !== undefined) continue;
        process.env[key] = rawValue.trim().replace(/^(['"])(.*)\1$/, '$2');
      }
    }
  }
}

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
  if (process.env.VERCEL_TOKEN && (!process.env.VERCEL_TEAM_ID || !process.env.VERCEL_PROJECT_ID)) {
    throw new Error(
      'VERCEL_TOKEN sandbox auth also requires VERCEL_TEAM_ID and VERCEL_PROJECT_ID.'
    );
  }
}

function selectedCommandEnvironment(): Record<string, string> {
  const keys = [
    ...TRUSTED_SANDBOX_ENV_KEYS,
    ...(process.env.BITCODE_SANDBOX_ENV_KEYS || '')
    .split(',')
    .map((key) => key.trim())
    .filter(Boolean),
  ];

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

function sourceCredentials(): { username?: string; password?: string } {
  const explicitUsername = process.env.BITCODE_SANDBOX_SOURCE_GIT_USERNAME;
  const explicitPassword = process.env.BITCODE_SANDBOX_SOURCE_GIT_PASSWORD;
  const token =
    explicitPassword ||
    process.env.GITHUB_TOKEN ||
    process.env.GITHUB_PAT ||
    process.env.GH_TOKEN;
  if (!token) return {};
  return {
    username: explicitUsername || 'x-access-token',
    password: token,
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
  const error = record.error && typeof record.error === 'object'
    ? record.error as Record<string, unknown>
    : null;
  const events = Array.isArray(record.events) ? record.events : [];

  return {
    schema: record.schema,
    harnessMode: record.harnessMode,
    resultState: record.resultState,
    resultReasons: Array.isArray(record.resultReasons)
      ? record.resultReasons.map((reason) => redactKnownSecrets(String(reason)))
      : [],
    error: error
      ? {
          name: error.name,
          message: redactKnownSecrets(String(error.message || '')),
        }
      : null,
    outputKeys: record.output && typeof record.output === 'object'
      ? Object.keys(record.output as Record<string, unknown>)
      : [],
    eventTypes: events
      .map((event) => event && typeof event === 'object'
        ? (event as Record<string, unknown>).type
        : null)
      .filter(Boolean),
  };
}

async function main(): Promise<void> {
  loadLocalEnvFiles();
  requireHarnessOptIn();
  requireVercelAuth();

  const mode = (process.env.BITCODE_SANDBOX_MODE || 'host_smoke') as PipelineHarnessMode;
  const repositoryFullName =
    process.env.BITCODE_SANDBOX_REPOSITORY || 'engineeredsoftware/ENGI';
  const branch = process.env.BITCODE_SANDBOX_SOURCE_BRANCH || 'main';
  const commit = process.env.BITCODE_SANDBOX_SOURCE_COMMIT || 'unknown';
  const sourceUrl = process.env.BITCODE_SANDBOX_SOURCE_GIT_URL;
  const credentials = sourceCredentials();

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
      hasWalletOrAttestationProof: process.env.BITCODE_SANDBOX_DEPOSIT_HAS_PROOF === '1',
      hasAssetMeasurementEvidence: process.env.BITCODE_SANDBOX_DEPOSIT_HAS_MEASUREMENT === '1',
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
          ...credentials,
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
        commands: result.commands.map((command) => ({
          label: command.label,
          exitCode: command.exitCode,
          stdoutTail: redactKnownSecrets(command.stdout.slice(-1200)),
          stderrTail: redactKnownSecrets(command.stderr.slice(-1200)),
        })),
        evidencePresent: result.artifacts.evidence !== null,
        telemetryPresent: result.artifacts.telemetry !== null,
        evidence: summarizeEvidence(result.artifacts.evidence),
        telemetryLineCount: result.artifacts.telemetry
          ? result.artifacts.telemetry.split(/\r?\n/).filter(Boolean).length
          : 0,
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
