import { describe, it, expect, jest, beforeEach, afterEach, beforeAll } from '@jest/globals';
import fs from 'fs';
import os from 'os';
import path from 'path';

jest.setTimeout(30000);

jest.mock('@/digest/llm', () => {
  const defaultResponder = (prompt: string) => {
    if (prompt.includes('### File:')) {
      const fileMatches = Array.from(prompt.matchAll(/### File:\s*([^\n]+)/g));
      const digests = fileMatches.map((match, index) => {
        const relativePath = match[1].trim();
        const summary =
          relativePath.toLowerCase() === 'readme.md'
            ? 'README outlines the voice-first social product purpose and target builders.'
            : relativePath.includes('config/')
              ? 'Configuration describing audio ingestion defaults.'
              : relativePath.includes('components/')
                ? 'React component capturing voice input.'
                : 'Source implements the voice clip handler entry point.';

        return {
          relativePath,
          type: relativePath.endsWith('.md')
            ? 'documentation'
            : relativePath.endsWith('.json')
              ? 'config'
              : 'code',
          summary,
          tags: [],
          dependencies: [],
          tokenCount: 120 + index * 10,
        };
      });
      return JSON.stringify(digests);
    }

    if (prompt.includes('Summarise the software product described below')) {
      return 'This product delivers voice-first social conversations for builders.';
    }

    if (prompt.includes("Create a markdown section for `# PRODUCT'S FEATURES:`")) {
      return [
        '## New or Planned Work',
        '- Implement live waveform previews linked to `src/components/Recorder.tsx`.',
        '## Existing Capabilities',
        '- Users can record 30s clips via `src/index.ts`.',
        '## Technical Foundations & Infrastructure',
        '- Next.js frontend backed by Supabase.',
        '## Defensive Programming & Reliability Focus',
        '- Validate audio length and storage quotas.',
        '## Complexity Hotspots / Areas to Watch',
        '- Real-time transcription accuracy tuning.',
      ].join('\n');
    }

    if (prompt.includes('Create a set of operating instructions for the agent team')) {
      return ['- Confirm Supabase credentials before coding.', '- Narrate file references with paths.'].join('\n');
    }

    if (prompt.includes('Craft “seeking questions”')) {
      return ['- What gaps exist in transcription accuracy?', '- Where can we simplify auth flows?'].join('\n');
    }

    return 'Default response';
  };

  const handler = jest.fn(defaultResponder);

  return {
    callLLMAPI: handler,
    BATCH_SUMMARY_MODEL: 'mock-model',
    MODEL_CONFIGS: {
      'mock-model': { maxOutputTokens: 2048, maxContextTokens: 32000, apiKey: 'mock-api-key' },
    },
    __getDefaultResponder: () => defaultResponder,
  };
});

let generateDigest: typeof import('../digest').generateDigest;

describe('generateDigest', () => {
  let repoDir: string;
  const { callLLMAPI, __getDefaultResponder } = require('@/digest/llm') as {
    callLLMAPI: jest.Mock;
    __getDefaultResponder: () => (prompt: string) => unknown;
  };
  const defaultResponder = __getDefaultResponder();

  beforeAll(async () => {
    const tmpDir = os.tmpdir();
    if (!process.env.TEMP) {
      process.env.TEMP = tmpDir;
    }
    if (!process.env.TMP) {
      process.env.TMP = tmpDir;
    }
    process.env.GITHUB_PRIVATE_KEY = process.env.GITHUB_PRIVATE_KEY ?? 'test-key';
    process.env.GITHUB_APP_ID = process.env.GITHUB_APP_ID ?? '1234';
    process.env.GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? 'gemini-test';
    process.env.ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY ?? 'anthropic-test';
    ({ generateDigest } = await import('../digest'));
  });

  beforeEach(() => {
    repoDir = fs.mkdtempSync(path.join(os.tmpdir(), 'digest-run-test-'));
    fs.mkdirSync(path.join(repoDir, 'src'));
    fs.writeFileSync(path.join(repoDir, 'README.md'), '# Yapper\n\nVoice-first social app.');
    fs.writeFileSync(path.join(repoDir, 'src', 'index.ts'), 'export const handler = () => true;\n');
    fs.mkdirSync(path.join(repoDir, 'src', 'components'), { recursive: true });
    fs.writeFileSync(path.join(repoDir, 'src', 'components', 'Recorder.tsx'), 'export const Recorder = () => null;\n');
    fs.mkdirSync(path.join(repoDir, 'config'));
    fs.writeFileSync(path.join(repoDir, 'config', 'audio.json'), JSON.stringify({ codec: 'aac' }, null, 2));
    callLLMAPI.mockReset();
    callLLMAPI.mockImplementation(defaultResponder);
  });

  afterEach(() => {
    if (repoDir && fs.existsSync(repoDir)) {
      fs.rmSync(repoDir, { recursive: true, force: true });
    }
    fs.rmSync('/tmp/engi', { recursive: true, force: true });
  });

  const runDigest = () =>
    generateDigest({
      correlationId: 'digest-test',
      usePreClonedRepo: true,
      rootDir: repoDir,
      path: repoDir,
      forceRegenerate: true,
    });

  it('assembles PRODUCT.md and AGENTS.md with LLM summaries and file coverage', async () => {
    const result = await runDigest();

    expect(result.productDocument).toContain('###### What is this document?');
    expect(result.productDocument).toContain("# PRODUCT'S PURPOSE:");
    expect(result.productDocument).toContain('This product delivers voice-first social conversations for builders.');
    expect(result.productDocument).toContain("# PRODUCT'S FEATURES:");
    expect(result.productDocument).toContain('## New or Planned Work');
    expect(result.productDocument).toContain('- Users can record 30s clips via `src/index.ts`.');
    expect(result.productDocument).toContain('# SOURCE FILES:');
    expect(result.productDocument).toContain('`README.md` — README outlines the voice-first social product purpose and target builders.');
    expect(result.productDocument).toContain('`src/index.ts` — Source implements the voice clip handler entry point.');
    expect(result.productDocument).toContain('`src/components/Recorder.tsx` — React component capturing voice input.');
    expect(result.productDocument).toContain('`config/audio.json` — Configuration describing audio ingestion defaults.');

    expect(result.agentDocument).toContain("# AGENTS' INSTRUCTIONS:");
    expect(result.agentDocument).toContain('- Confirm Supabase credentials before coding.');
    expect(result.agentDocument).toContain('# AGENTS\' SEEKING QUESTIONS:');
    expect(result.agentDocument).toContain('- What gaps exist in transcription accuracy?');

    expect(fs.existsSync(result.digestPath)).toBe(true);
    expect(fs.existsSync(path.resolve('/tmp/engi/digests', 'AGENTS-digest-test.md'))).toBe(true);
  });

  it('falls back to default copy when high-level LLM generations fail', async () => {
    const baseImplementation = callLLMAPI.getMockImplementation();
    callLLMAPI.mockImplementation((prompt: string) => {
      if (
        prompt.includes('Summarise the software product described below') ||
        prompt.includes("Create a markdown section for `# PRODUCT'S FEATURES:`") ||
        prompt.includes('Create a set of operating instructions for the agent team') ||
        prompt.includes('Craft “seeking questions”')
      ) {
        throw new Error('LLM unavailable');
      }
      return baseImplementation ? baseImplementation(prompt) : defaultResponder(prompt);
    });

    const result = await runDigest();

    expect(result.productDocument).toContain('Purpose TBD – awaiting author input.');
    expect(result.productDocument).toContain('- Feature documentation to be captured.');
    expect(result.agentDocument).toContain('- Document collaborative behaviours explicitly.');
    expect(result.agentDocument).toContain('- Identify missing knowledge areas and document them here.');

    // Source file listing still comes from the summarised context
    expect(result.productDocument).toContain('`src/index.ts` — Source implements the voice clip handler entry point.');

    expect(fs.existsSync(result.digestPath)).toBe(true);
    expect(fs.existsSync(path.resolve('/tmp/engi/digests', 'AGENTS-digest-test.md'))).toBe(true);
  });

  it('handles repositories without usable digests by emitting fallback sections', async () => {
    callLLMAPI.mockImplementation((prompt: string) => {
      if (prompt.includes('### File:')) {
        return '[]';
      }
      if (
        prompt.includes('Summarise the software product described below') ||
        prompt.includes("Create a markdown section for `# PRODUCT'S FEATURES:`") ||
        prompt.includes('Create a set of operating instructions for the agent team') ||
        prompt.includes('Craft “seeking questions”')
      ) {
        return defaultResponder(prompt);
      }
      return defaultResponder(prompt);
    });

    const result = await runDigest();

    expect(result.productDocument).toContain('Purpose TBD – no digest data available.');
    expect(result.productDocument).toContain('- Feature documentation to be captured.');
    expect(result.productDocument).toContain('_No source files summarised yet._');

    expect(result.agentDocument).toContain("# AGENTS' INSTRUCTIONS:");
    expect(result.agentDocument).toContain('- Confirm Supabase credentials before coding.');

    expect(fs.existsSync(result.digestPath)).toBe(true);
    expect(fs.existsSync(path.resolve('/tmp/engi/digests', 'AGENTS-digest-test.md'))).toBe(true);
  });
});
