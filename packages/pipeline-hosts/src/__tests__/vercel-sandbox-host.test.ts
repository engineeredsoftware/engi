import { buildAssetPackSandboxHarness } from '../asset-pack-harness';
import { VercelSandboxPipelineHost } from '../vercel-sandbox-host';
import type {
  PipelineHarnessFile,
  SandboxCommandResult,
  SandboxCreateOptions,
  SandboxFactory,
} from '../types';

class FakeSandbox {
  sandboxId = 'sbx_test';
  status = 'running';
  readonly writtenFiles: PipelineHarnessFile[] = [];
  readonly commands: { cmd: string; args: string[] }[] = [];
  stopped = false;

  async writeFiles(files: PipelineHarnessFile[]): Promise<void> {
    this.writtenFiles.push(...files);
  }

  async runCommand(params: { cmd: string; args?: string[] }): Promise<SandboxCommandResult> {
    this.commands.push({ cmd: params.cmd, args: params.args ?? [] });
    return {
      exitCode: 0,
      stdout: async () => `${params.cmd} ${params.args?.join(' ') || ''}`.trim(),
      stderr: async () => '',
    };
  }

  async readFileToBuffer(file: { path: string }): Promise<Buffer | null> {
    if (file.path.endsWith('evidence.json')) {
      return Buffer.from(JSON.stringify({ resultState: 'blocked_readiness' }));
    }
    if (file.path.endsWith('telemetry.jsonl')) {
      return Buffer.from('{"type":"harness-complete"}\n');
    }
    return null;
  }

  async stop(): Promise<void> {
    this.stopped = true;
    this.status = 'stopped';
  }
}

describe('VercelSandboxPipelineHost', () => {
  it('creates the sandbox, writes harness files, runs commands, reads artifacts, and stops', async () => {
    const fakeSandbox = new FakeSandbox();
    const createOptions: SandboxCreateOptions[] = [];
    const factory: SandboxFactory = {
      create: async (options) => {
        createOptions.push(options);
        return fakeSandbox;
      },
    };
    const host = new VercelSandboxPipelineHost({ sandboxFactory: factory });
    const plan = buildAssetPackSandboxHarness({
      read: {
        id: 'read-1',
        prompt: 'Read the deposited repository revision.',
      },
      deposit: {
        id: 'deposit-1',
      },
      sourceRevision: {
        repositoryFullName: 'engineeredsoftware/ENGI',
        branch: 'main',
        commit: '31bbc0c5227b6b3aed5d107fd8507d35ec22970a',
      },
    });

    const result = await host.runHarness(plan);

    expect(createOptions[0].runtime).toBe('node24');
    expect(fakeSandbox.writtenFiles).toHaveLength(3);
    expect(fakeSandbox.commands.map((command) => command.cmd)).toEqual(['node', 'node']);
    expect(result.outcome).toBe('completed');
    expect(result.artifacts.evidence).toEqual({ resultState: 'blocked_readiness' });
    expect(result.artifacts.telemetry).toContain('harness-complete');
    expect(result.stopped).toBe(true);
    expect(fakeSandbox.stopped).toBe(true);
  });
});
