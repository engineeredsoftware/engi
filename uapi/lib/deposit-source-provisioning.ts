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
  readWorkspaceSources,
  type BitcodeHostKind,
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

/**
 * Select the deposit HostKind by CONFIGURATION (not environment): `BITCODE_PIPELINE_HOST`
 * (`inline` | `sandbox`) chooses which HostKind runs the synthesis pipeline; default
 * `inline`. (A SandboxHost's provider is `BITCODE_SANDBOX_PROVIDER`, `vercel` | `aws`.)
 * Pure + testable; no dev/prod or local/remote semantics.
 */
export function selectDepositHostKind(env: NodeJS.ProcessEnv = process.env): BitcodeHostKind {
  const explicit = env.BITCODE_PIPELINE_HOST?.trim().toLowerCase();
  return explicit === 'sandbox' ? 'sandbox' : 'inline';
}

/**
 * Resolve the deposit pipeline Host. The pipeline runs WITHIN the resolved host.
 * InlineHost runs the synthesis in the current box (provision + pipeline in-process).
 * SandboxHost runs the synthesis IN a provisioned box (the harness) — that in-box
 * deposit dispatch is specified but not yet wired, so it is rejected here rather than
 * falling back to a cross-boundary read. Configure `BITCODE_PIPELINE_HOST=inline`.
 */
export async function resolveDepositPipelineHost(): Promise<BitcodePipelineHost> {
  if (selectDepositHostKind() === 'sandbox') {
    throw new Error(
      'SandboxHost deposit runs the synthesis pipeline IN the box (the harness); in-box ' +
        'deposit dispatch is specified but not yet wired. Set BITCODE_PIPELINE_HOST=inline.',
    );
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
