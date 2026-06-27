/**
 * VercelSandboxHost — the Vercel Sandbox implementation of the primitive Host
 * (V48 Gate 3). The sibling of InlineHost: same `BitcodePipelineHost` contract,
 * different mechanics.
 *
 * Provisions a repository by creating a sandbox with a git `source` (the Sandbox
 * SDK clones the full working tree at the revision into the working directory), and
 * exposes that checkout via the sandbox session — `git ls-files` over runCommand and
 * `readFileToBuffer`. This is the durable, isolated host (prod); a serverless
 * dispatching request hands off to it because it cannot itself clone.
 *
 * (Distinct from the existing `VercelSandboxPipelineHost`, which runs a full harness
 * PLAN of commands + artifacts. This class is the source/filesystem primitive.)
 */

import type {
  BitcodeHostCapabilities,
  BitcodeHostRepositorySource,
  BitcodeHostWorkspace,
  BitcodePipelineHost,
  HostCommandResult,
} from './host';
import type {
  SandboxCommandResult,
  SandboxCreateOptions,
  SandboxFactory,
  SandboxSession,
  VercelSandboxRuntime,
} from './types';

const DEFAULT_WORKING_DIRECTORY = '/vercel/sandbox';

async function readStream(result: SandboxCommandResult, stream: 'stdout' | 'stderr'): Promise<string> {
  const reader = result[stream];
  if (typeof reader === 'function') return reader.call(result);
  if (typeof result.output === 'function') return result.output(stream);
  return '';
}

function joinPosix(base: string, relative: string): string {
  return `${base.replace(/\/+$/, '')}/${relative.replace(/^\/+/, '')}`;
}

export interface VercelSandboxHostOptions {
  sandboxFactory: SandboxFactory;
  workingDirectory?: string;
  runtime?: VercelSandboxRuntime;
  createOptions?: Partial<SandboxCreateOptions>;
}

class VercelSandboxWorkspace implements BitcodeHostWorkspace {
  constructor(
    private readonly session: SandboxSession,
    readonly workspacePath: string,
  ) {}

  async listFiles(): Promise<string[]> {
    const result = await this.session.runCommand({ cmd: 'git', args: ['ls-files'], cwd: this.workspacePath });
    if (result.exitCode !== 0) return [];
    const out = await readStream(result, 'stdout');
    return out
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  async readFile(relativePath: string): Promise<string | null> {
    // Defense-in-depth: never read outside the checkout.
    if (relativePath.split('/').some((segment) => segment === '..')) return null;
    const buffer = await this.session.readFileToBuffer({ path: joinPosix(this.workspacePath, relativePath) });
    return buffer ? buffer.toString('utf8') : null;
  }

  async runCommand(cmd: string, args: string[] = []): Promise<HostCommandResult> {
    const result = await this.session.runCommand({ cmd, args, cwd: this.workspacePath });
    return {
      exitCode: result.exitCode,
      stdout: await readStream(result, 'stdout'),
      stderr: await readStream(result, 'stderr'),
    };
  }

  async dispose(): Promise<void> {
    if (this.session.stop) {
      try {
        await this.session.stop({ blocking: true });
      } catch {
        // Best-effort; the sandbox is reclaimed regardless.
      }
    }
  }
}

export class VercelSandboxHost implements BitcodePipelineHost {
  private readonly sandboxFactory: SandboxFactory;
  private readonly workingDirectory: string;
  private readonly runtime?: VercelSandboxRuntime;
  private readonly createOptions?: Partial<SandboxCreateOptions>;

  constructor(options: VercelSandboxHostOptions) {
    this.sandboxFactory = options.sandboxFactory;
    this.workingDirectory = options.workingDirectory ?? DEFAULT_WORKING_DIRECTORY;
    this.runtime = options.runtime;
    this.createOptions = options.createOptions;
  }

  get capabilities(): BitcodeHostCapabilities {
    return {
      hostKind: 'vercel-sandbox',
      clone: true,
      filesystem: true,
      exec: true,
      ephemeralFilesystem: true,
      defaultWorkingDirectory: this.workingDirectory,
    };
  }

  async provisionRepository(source: BitcodeHostRepositorySource): Promise<BitcodeHostWorkspace> {
    const session = await this.sandboxFactory.create({
      ...this.createOptions,
      runtime: this.runtime ?? this.createOptions?.runtime,
      source: {
        type: 'git',
        url: source.url,
        revision: source.revision,
        username: source.username,
        password: source.password,
      },
    });
    return new VercelSandboxWorkspace(session, this.workingDirectory);
  }
}
