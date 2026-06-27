/**
 * Deposit source provisioning (V48 Gate 3).
 *
 * The deposit harness run provisions the FULL repository checkout on the primitive
 * Host (InlineHost in-process here; the Vercel Sandbox host in prod), then builds the
 * synthesis inventory FROM the checkout — every tracked file's verbatim content for
 * measurement (`sources`), plus bounded representative excerpts for the prompts
 * (`samples`). This retires the GitHub-API sample stopgap; the same `{path, content}`
 * shape works on either Host implementation.
 *
 * Host selection: InlineHost is valid only where the runtime has git + a filesystem
 * (the dev persistent Node server, NOT a serverless function). Prod deposit runs on
 * the Vercel Sandbox host (the standing host loose end); when wired,
 * resolveDepositPipelineHost returns it.
 */

import {
  InlineHost,
  VercelSandboxHost,
  loadVercelSandboxFactory,
  readWorkspaceSources,
  type BitcodePipelineHost,
  type HostSourceFile,
} from '@bitcode/pipeline-hosts';

export interface ProvisionedDepositInventory {
  paths: string[];
  samples: { path: string; excerpt: string }[];
  sources: HostSourceFile[];
  truncated: boolean;
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
const MAX_SAMPLE_FILES = 24;
const MAX_SAMPLE_CHARS = 4000;

/** Bounded prompt excerpts derived from the real checkout (manifests/README + shallow source). */
function pickSamples(sources: HostSourceFile[]): { path: string; excerpt: string }[] {
  const byPath = new Map(sources.map((file) => [file.path, file.content]));
  const allPaths = sources.map((file) => file.path);
  const prioritized = allPaths.filter((path) =>
    SAMPLE_PRIORITY_PATTERNS.some((pattern) => pattern.test(path.split('/').pop() || '')),
  );
  const sourceLike = allPaths.filter(
    (path) =>
      !prioritized.includes(path) &&
      /\.(ts|tsx|js|jsx|py|rs|go|rb|java|cs|swift|sol|md)$/i.test(path) &&
      path.split('/').length <= 3,
  );
  return [...prioritized, ...sourceLike]
    .slice(0, MAX_SAMPLE_FILES)
    .map((path) => ({ path, excerpt: (byPath.get(path) || '').slice(0, MAX_SAMPLE_CHARS) }));
}

export type DepositHostKind = 'inline' | 'vercel-sandbox';

/**
 * Select the deposit Host kind. Explicit `BITCODE_PIPELINE_HOST` wins; otherwise a
 * Vercel serverless runtime (no git binary / ephemeral FS) MUST use the sandbox host,
 * while a local/dev runtime (the persistent Node server has git + a filesystem) uses
 * the in-process InlineHost. Pure + testable.
 */
export function selectDepositHostKind(env: NodeJS.ProcessEnv = process.env): DepositHostKind {
  const explicit = env.BITCODE_PIPELINE_HOST?.trim().toLowerCase();
  if (explicit === 'inline' || explicit === 'vercel-sandbox') return explicit;
  return env.VERCEL ? 'vercel-sandbox' : 'inline';
}

/** Vercel auth for sandbox creation: prefer OIDC; otherwise pass the access token. */
function vercelSandboxCreateOptions() {
  if (process.env.VERCEL_OIDC_TOKEN) return {};
  return {
    token: process.env.VERCEL_TOKEN,
    teamId: process.env.VERCEL_TEAM_ID,
    projectId: process.env.VERCEL_PROJECT_ID,
  };
}

/**
 * Resolve the deposit pipeline Host. The deposit run is the harness run, so the Host
 * provisions the source — the dispatching request does not. InlineHost runs in-process
 * (dev); VercelSandboxHost provisions a durable sandbox (prod) because a serverless
 * function cannot clone. Both implement the same primitive, so provisioning is
 * identical downstream.
 */
export async function resolveDepositPipelineHost(): Promise<BitcodePipelineHost> {
  if (selectDepositHostKind() === 'vercel-sandbox') {
    const sandboxFactory = await loadVercelSandboxFactory();
    return new VercelSandboxHost({
      sandboxFactory,
      runtime: 'node22',
      createOptions: vercelSandboxCreateOptions(),
    });
  }
  return new InlineHost();
}

/**
 * Provision the full checkout on the Host and build the deposit inventory from it.
 * Reads every tracked file's verbatim content (`sources`, for measurement), derives
 * bounded `samples` (for prompts), and disposes the workspace. The host is passed in
 * so callers/tests choose the implementation.
 */
export async function provisionDepositSourceInventory(input: {
  host: BitcodePipelineHost;
  repositoryFullName: string;
  url: string;
  revision: string;
  token?: string;
}): Promise<ProvisionedDepositInventory> {
  const workspace = await input.host.provisionRepository({
    repositoryFullName: input.repositoryFullName,
    url: input.url,
    revision: input.revision,
    username: input.token ? 'x-access-token' : undefined,
    password: input.token,
  });
  try {
    // Every tracked file, verbatim — the full source the static-analysis measurement reads.
    const sources = await readWorkspaceSources(workspace);
    return {
      paths: sources.map((file) => file.path),
      samples: pickSamples(sources),
      sources,
      truncated: false,
    };
  } finally {
    await workspace.dispose();
  }
}
