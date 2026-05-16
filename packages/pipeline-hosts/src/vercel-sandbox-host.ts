import type {
  PipelineHarnessCommand,
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
}

export class VercelSandboxPipelineHost {
  private readonly sandboxFactory: SandboxFactory;
  private readonly stopAfterRun: boolean;

  constructor(options: VercelSandboxPipelineHostOptions) {
    this.sandboxFactory = options.sandboxFactory;
    this.stopAfterRun = options.stopAfterRun ?? true;
  }

  async runHarness(plan: PipelineHarnessPlan): Promise<PipelineHarnessRunResult> {
    const sandbox = await this.sandboxFactory.create(plan.createOptions);
    const commands: PipelineHarnessCommandResult[] = [];
    let stopped = false;
    let outcome: PipelineHarnessRunResult['outcome'] = 'completed';
    let evidence: unknown | null = null;
    let telemetry: string | null = null;

    try {
      await sandbox.writeFiles(plan.files);

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
    } finally {
      if (this.stopAfterRun && sandbox.stop) {
        await sandbox.stop({ blocking: true });
        stopped = true;
      }
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
    const startedAt = new Date().toISOString();
    const result = await sandbox.runCommand({
      cmd: command.cmd,
      args: command.args ?? [],
      cwd: command.cwd,
      env: command.env,
      sudo: command.sudo,
    });
    const completedAt = new Date().toISOString();

    return {
      label: command.label,
      cmd: command.cmd,
      args: command.args ?? [],
      cwd: command.cwd,
      exitCode: result.exitCode,
      stdout: await readCommandOutput(result, 'stdout'),
      stderr: await readCommandOutput(result, 'stderr'),
      startedAt,
      completedAt,
    };
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
