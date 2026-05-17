import type {
  PipelineHarnessCommand,
  PipelineHarnessHostEvent,
  PipelineHarnessCommandResult,
  PipelineHarnessPlan,
  PipelineHarnessRunResult,
  SandboxCommandResult,
  SandboxFactory,
  SandboxSession,
} from './types';

export interface VercelSandboxPipelineHostOptions {
  sandboxFactory: SandboxFactory;
  stopAfterRun?: boolean;
  onEvent?: (event: PipelineHarnessHostEvent) => void | Promise<void>;
}

export class VercelSandboxPipelineHost {
  private readonly sandboxFactory: SandboxFactory;
  private readonly stopAfterRun: boolean;
  private readonly onEvent?: (event: PipelineHarnessHostEvent) => void | Promise<void>;

  constructor(options: VercelSandboxPipelineHostOptions) {
    this.sandboxFactory = options.sandboxFactory;
    this.stopAfterRun = options.stopAfterRun ?? true;
    this.onEvent = options.onEvent;
  }

  async runHarness(plan: PipelineHarnessPlan): Promise<PipelineHarnessRunResult> {
    await this.emit({
      type: 'sandbox-create-started',
      timestamp: new Date().toISOString(),
      runtime: plan.createOptions.runtime,
      mode: plan.manifest.harnessMode,
    });
    const sandbox = await this.sandboxFactory.create(withVercelAccessTokenAuth(plan.createOptions));
    await this.emit({
      type: 'sandbox-created',
      timestamp: new Date().toISOString(),
      sandboxId: sandbox.sandboxId,
      status: sandbox.status,
    });
    const commands: PipelineHarnessCommandResult[] = [];
    let stopped = false;
    let outcome: PipelineHarnessRunResult['outcome'] = 'completed';
    let evidence: unknown | null = null;
    let telemetry: string | null = null;

    try {
      await sandbox.writeFiles(plan.files);
      await this.emit({
        type: 'harness-files-written',
        timestamp: new Date().toISOString(),
        fileCount: plan.files.length,
      });

      for (const command of plan.commands) {
        const commandResult = await this.runCommand(sandbox, command);
        commands.push(commandResult);

        if (command.required !== false && commandResult.exitCode !== 0) {
          outcome = 'failed';
          break;
        }
      }

      evidence = await this.readJsonArtifact(sandbox, plan.artifactPaths.evidence);
      telemetry = await this.readTextArtifact(sandbox, plan.artifactPaths.telemetry);
      await this.emit({
        type: 'artifacts-read',
        timestamp: new Date().toISOString(),
        evidencePresent: evidence !== null,
        telemetryPresent: telemetry !== null,
      });
    } finally {
      if (this.stopAfterRun && sandbox.stop) {
        await sandbox.stop({ blocking: true });
        stopped = true;
      }
      await this.emit({
        type: 'sandbox-stopped',
        timestamp: new Date().toISOString(),
        stopped,
      });
    }

    return {
      sandboxId: sandbox.sandboxId,
      finalStatus: sandbox.status,
      manifest: plan.manifest,
      commands,
      artifacts: {
        evidence,
        telemetry,
      },
      outcome,
      stopped,
    };
  }

  private async runCommand(
    sandbox: SandboxSession,
    command: PipelineHarnessCommand
  ): Promise<PipelineHarnessCommandResult> {
    await this.emit({
      type: 'command-started',
      timestamp: new Date().toISOString(),
      label: command.label,
      cmd: command.cmd,
      args: command.args ?? [],
      cwd: command.cwd,
    });
    const startedAt = new Date().toISOString();
    const result = await sandbox.runCommand({
      cmd: command.cmd,
      args: command.args ?? [],
      cwd: command.cwd,
      env: command.env,
      sudo: command.sudo,
    });
    const completedAt = new Date().toISOString();
    const stdout = await readCommandOutput(result, 'stdout');
    const stderr = await readCommandOutput(result, 'stderr');
    const commandResult = {
      label: command.label,
      cmd: command.cmd,
      args: command.args ?? [],
      cwd: command.cwd,
      exitCode: result.exitCode,
      stdout,
      stderr,
      startedAt,
      completedAt,
    };

    await this.emit({
      type: 'command-completed',
      timestamp: new Date().toISOString(),
      label: command.label,
      exitCode: result.exitCode,
      stdoutLength: stdout.length,
      stderrLength: stderr.length,
      startedAt,
      completedAt,
    });

    return commandResult;
  }

  private async readJsonArtifact(sandbox: SandboxSession, path: string): Promise<unknown | null> {
    const text = await this.readTextArtifact(sandbox, path);
    if (!text) return null;
    try {
      return JSON.parse(text);
    } catch {
      return {
        parseError: true,
        raw: text,
      };
    }
  }

  private async readTextArtifact(sandbox: SandboxSession, path: string): Promise<string | null> {
    const buffer = await sandbox.readFileToBuffer({ path });
    return buffer ? buffer.toString('utf8') : null;
  }

  private async emit(event: PipelineHarnessHostEvent): Promise<void> {
    if (!this.onEvent) return;
    await this.onEvent(event);
  }
}

function withVercelAccessTokenAuth(createOptions: PipelineHarnessPlan['createOptions']): PipelineHarnessPlan['createOptions'] {
  if (!process.env.VERCEL_TOKEN || process.env.VERCEL_OIDC_TOKEN) {
    return createOptions;
  }
  return {
    ...createOptions,
    token: createOptions.token ?? process.env.VERCEL_TOKEN,
    teamId: createOptions.teamId ?? process.env.VERCEL_TEAM_ID,
    projectId: createOptions.projectId ?? process.env.VERCEL_PROJECT_ID,
  };
}

export async function loadVercelSandboxFactory(): Promise<SandboxFactory> {
  const dynamicImport = new Function('specifier', 'return import(specifier)') as (
    specifier: string
  ) => Promise<{ Sandbox?: SandboxFactory }>;
  const module = await dynamicImport('@vercel/sandbox');
  if (!module.Sandbox?.create) {
    throw new Error('@vercel/sandbox did not expose Sandbox.create().');
  }
  return module.Sandbox;
}

async function readCommandOutput(
  result: SandboxCommandResult,
  stream: 'stdout' | 'stderr'
): Promise<string> {
  const reader = result[stream];
  if (typeof reader === 'function') {
    return reader.call(result);
  }
  if (typeof result.output === 'function') {
    return result.output(stream);
  }
  return '';
}
