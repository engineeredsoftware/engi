import { buildAssetPackSandboxHarness } from '../asset-pack-harness';
import { VercelSandboxPipelineHost } from '../vercel-sandbox-host';
import type {
  PipelineHarnessFile,
  PipelineHarnessHostEvent,
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

  it('emits host lifecycle events for streaming harness observers', async () => {
    const fakeSandbox = new FakeSandbox();
    const events: PipelineHarnessHostEvent[] = [];
    const factory: SandboxFactory = {
      create: async () => fakeSandbox,
    };
    const host = new VercelSandboxPipelineHost({
      sandboxFactory: factory,
      onEvent: (event) => {
        events.push(event);
      },
    });
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

    await host.runHarness(plan);

    expect(events.map((event) => event.type)).toEqual([
      'sandbox-create-started',
      'sandbox-created',
      'harness-files-written',
      'command-started',
      'command-completed',
      'command-started',
      'command-completed',
      'artifacts-read',
      'sandbox-stopped',
    ]);
    expect(events.find((event) => event.type === 'command-completed')).toMatchObject({
      stdoutLength: expect.any(Number),
      stderrLength: expect.any(Number),
    });
  });

  it('passes access-token auth fields to Sandbox.create when OIDC is unavailable', async () => {
    const previous = {
      VERCEL_TOKEN: process.env.VERCEL_TOKEN,
      VERCEL_TEAM_ID: process.env.VERCEL_TEAM_ID,
      VERCEL_PROJECT_ID: process.env.VERCEL_PROJECT_ID,
      VERCEL_OIDC_TOKEN: process.env.VERCEL_OIDC_TOKEN,
    };
    process.env.VERCEL_TOKEN = 'test-token';
    process.env.VERCEL_TEAM_ID = 'team_test';
    process.env.VERCEL_PROJECT_ID = 'prj_test';
    delete process.env.VERCEL_OIDC_TOKEN;

    try {
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

      await host.runHarness(plan);

      expect(createOptions[0]).toMatchObject({
        token: 'test-token',
        teamId: 'team_test',
        projectId: 'prj_test',
      });
    } finally {
      restoreEnv('VERCEL_TOKEN', previous.VERCEL_TOKEN);
      restoreEnv('VERCEL_TEAM_ID', previous.VERCEL_TEAM_ID);
      restoreEnv('VERCEL_PROJECT_ID', previous.VERCEL_PROJECT_ID);
      restoreEnv('VERCEL_OIDC_TOKEN', previous.VERCEL_OIDC_TOKEN);
    }
  });
});

function restoreEnv(key: string, value: string | undefined): void {
  if (value === undefined) {
    delete process.env[key];
  } else {
    process.env[key] = value;
  }
}
