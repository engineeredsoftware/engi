import { describe, it, expect } from 'vitest';
import { Tool } from '../Tool';
import { DocCodeTool as DocCodeToolDecorator, registerDocCodeToolPrompt, getDocCodeToolPrompt, attachDocCodeToolPrompt } from '../doc-code-tool/DocCodeToolDecorator';
import { DocCodeToolPrompt } from '../doc-code-tool/DocCodeToolPrompt';
import {
  formatToolsWithDocCodeToolsIntoUsableTools as formatUsableTools,
  extractToolMetadata,
  hasDocCodePrompt,
} from '../doc-code-tool/formatUsableTools';
import { createPromptPart } from '@bitcode/prompts';

const buildPrompt = (nameSuffix: string) =>
  new DocCodeToolPrompt()
    .setMetadata(
      createPromptPart(`Tool ${nameSuffix}`),
      createPromptPart('Category'),
      createPromptPart('GA1.00.0'),
      createPromptPart('High'),
      createPromptPart('Stable'),
    )
    .setPurpose(createPromptPart('Explain behaviour.'))
    .setCapabilities(createPromptPart('Run safely.'))
    .setParameters(createPromptPart('Takes a string input.'))
    .setOutput(createPromptPart('Returns a response.'));

describe('DocCode tool infrastructure', () => {
  it('registerDocCodeToolPrompt stores prompts for decorator usage', () => {
    const prompt = buildPrompt('Decorator');
    registerDocCodeToolPrompt('DECORATOR_PROMPT', prompt);

    const DecoratedTool = DocCodeToolDecorator('DECORATOR_PROMPT')(
      class extends Tool<() => string> {
        use = () => 'ok';
      }
    );

    const tool = new DecoratedTool();
    expect(getDocCodeToolPrompt('DECORATOR_PROMPT')).toBe(prompt);
    expect(hasDocCodePrompt(tool)).toBe(true);
    expect(tool.__docCodePrompt).toBe(prompt);
  });

  it('attachDocCodeToolPrompt manually associates prompt instances', () => {
    const prompt = buildPrompt('Manual');
    const tool = new (class extends Tool<() => string> {
      use = () => 'manual';
    })();

    attachDocCodeToolPrompt(tool, prompt);
    expect(hasDocCodePrompt(tool)).toBe(true);
    expect(tool.__docCodePrompt).toBe(prompt);
  });

  it('formatUsableTools renders documentation and handles undocumented tools', () => {
    const prompt = buildPrompt('Formatting');
    const documented = new (class extends Tool<() => string> {
      use = () => 'documented';
    })();
    attachDocCodeToolPrompt(documented, prompt);

    const undocumented = new (class extends Tool<() => string> {
      use = () => 'undocumented';
    })();

    const formatted = formatUsableTools([documented, undocumented]);
    expect(formatted).toContain('Tool Formatting');
    expect(formatted).toContain('No documentation available');
  });

  it('extractToolMetadata reports prompt presence and formatted documentation', () => {
    const prompt = buildPrompt('Metadata');
    const tool = new (class extends Tool<() => string> {
      use = () => 'metadata';
    })();
    attachDocCodeToolPrompt(tool, prompt);

    const [metadata] = extractToolMetadata([tool]);
    expect(metadata.hasDocCode).toBe(true);
    expect(metadata.documentation).toContain('Explain behaviour.');
  });
});
