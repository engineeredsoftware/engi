/**
 * GENERIC TOOL: use-computer
 * Execute shell commands with timeout and capture stdio.
 */
import { Tool } from '@bitcode/tools-generics';
import { USE_COMPUTER_DOC_CODE_TOOL_PROMPT } from './prompts/UseComputerDocCodeToolPrompt';
import { z } from 'zod';
import { spawn } from 'child_process';

export const UseComputerInputSchema = z.object({
  command: z.union([z.string(), z.array(z.string())]).describe('Command (string or argv list)'),
  cwd: z.string().optional().describe('Working directory'),
  env: z.record(z.string(), z.string()).optional().describe('Environment overrides'),
  stdin: z.string().optional().describe('Data to write to stdin'),
  timeoutMs: z.number().optional().default(60_000).describe('Timeout in milliseconds')
});

export const UseComputerOutputSchema = z.object({
  exitCode: z.number().nullable(),
  stdout: z.string(),
  stderr: z.string(),
  durationMs: z.number(),
});

/**
 * @doc-code-tool
 * @prompt USE_COMPUTER_DOC_CODE_TOOL_PROMPT
 * intent: "Run a shell command with timeout; return stdout/stderr/exitCode/duration"
 */
class UseComputerTool extends Tool<typeof UseComputerInputSchema> {
  name = 'use-computer';
  description = 'Execute a shell command with timeout and capture stdio.';
  inputSchema = UseComputerInputSchema;

  async use(input: z.infer<typeof UseComputerInputSchema>) {
    const started = Date.now();
    const argv: string[] = Array.isArray(input.command)
      ? input.command as string[]
      : ['/bin/sh', '-lc', String(input.command)];

    let cmd = argv[0];
    let args = argv.slice(1);
    if (argv.length === 1 && typeof argv[0] === 'string') {
      cmd = '/bin/sh';
      args = ['-lc', argv[0]];
    }

    return await new Promise<z.infer<typeof UseComputerOutputSchema>>((resolve) => {
      const child = spawn(cmd, args, {
        cwd: input.cwd || process.cwd(),
        env: { ...process.env, ...(input.env || {}) },
        stdio: 'pipe'
      });

      let stdout = '';
      let stderr = '';
      let finished = false;

      const onFinish = (exitCode: number | null) => {
        if (finished) return;
        finished = true;
        resolve({ exitCode, stdout, stderr, durationMs: Date.now() - started });
      };

      if (input.stdin) {
        try { child.stdin.write(input.stdin); } catch {}
        try { child.stdin.end(); } catch {}
      }

      child.stdout?.on('data', (d) => { stdout += String(d); });
      child.stderr?.on('data', (d) => { stderr += String(d); });
      child.on('error', () => onFinish(-1));
      child.on('close', (code) => onFinish(code));

      const to = setTimeout(() => {
        try { child.kill('SIGKILL'); } catch {}
        onFinish(null);
      }, input.timeoutMs ?? 60_000);

      child.on('close', () => { try { clearTimeout(to); } catch {} });
    });
  }
}

export const useComputerTool = new UseComputerTool();
