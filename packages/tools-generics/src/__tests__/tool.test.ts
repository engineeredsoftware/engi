import { describe, it, expect } from 'vitest';
import { Tool } from '../Tool';
import { factoryTool } from '../factoryTool';
import { createPromptPart } from '@bitcode/prompts';
import { DocCodeToolPrompt } from '../doc-code-tool/DocCodeToolPrompt';

class EchoTool extends Tool<(msg: string) => string> {
  use = (msg: string) => msg;
}

describe('Tool primitive', () => {
  it('executes the wrapped function via execute()', async () => {
    const tool = new EchoTool();
    const result = await tool.execute('hello');
    expect(result).toBe('hello');
  });

  it('factoryTool wraps functions with metadata and optional prompt', async () => {
    const prompt = new DocCodeToolPrompt()
      .setMetadata(
        createPromptPart('Example Tool'),
        createPromptPart('Demo'),
        createPromptPart('V26.00.0'),
        createPromptPart('High'),
        createPromptPart('Stable'),
      )
      .setPurpose(createPromptPart('Return constant string.'));

    const fn = async (name: string) => `Hi ${name}`;
    const tool = factoryTool('GreetingTool', fn, {
      description: 'Greets a user',
      metadata: { category: 'demo' },
      prompt,
    });

    expect(tool.toolName).toBe('GreetingTool');
    expect(tool.tool.function.description).toBe('Greets a user');
    expect(tool.tool.metadata?.category).toBe('demo');
    expect(tool.__docCodePrompt).toBe(prompt);

    const result = await tool.execute('Ada');
    expect(result).toBe('Hi Ada');
  });
});
