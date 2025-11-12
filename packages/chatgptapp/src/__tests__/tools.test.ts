import { getEngiTools, type EngiToolExecutionResult } from '../tools';

jest.mock('@engi/generic-tools-simple-system-text-search', () => ({
  simpleSystemTextSearch: { execute: jest.fn() },
}));

jest.mock('@engi/generic-tools-web-search', () => ({
  search: { execute: jest.fn() },
}));

jest.mock('@engi/digest/run', () => ({
  generateDigest: jest.fn(),
}));

const simpleSystemTextSearchExecute =
  (jest.requireMock('@engi/generic-tools-simple-system-text-search').simpleSystemTextSearch.execute as jest.Mock);
const webSearchExecute =
  (jest.requireMock('@engi/generic-tools-web-search').search.execute as jest.Mock);
const generateDigestMock = (jest.requireMock('@engi/digest/run').generateDigest as jest.Mock);

describe('ChatGPT App tools', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    simpleSystemTextSearchExecute.mockResolvedValue([
      { file: 'src/index.ts', line: 0, text: 'export const handler = () => true;' },
    ]);
    webSearchExecute.mockResolvedValue({
      results: [
        { title: 'Optimistic UI Patterns', url: 'https://example.com/optimistic', summary: 'Summary.' },
      ],
    });
    generateDigestMock.mockResolvedValue({
      productDocument: `###### What is this document?

# PRODUCT'S PURPOSE:
This product delivers voice-first social conversations for builders.

# PRODUCT'S FEATURES:
## New or Planned Work
- Implement live waveform previews linked to \`src/components/Recorder.tsx\`.
## Existing Capabilities
- Users can record 30s clips via \`src/index.ts\`.
## Technical Foundations & Infrastructure
- Next.js frontend backed by Supabase.
## Defensive Programming & Reliability Focus
- Validate audio length and storage quotas.
## Complexity Hotspots / Areas to Watch
- Real-time transcription accuracy tuning.

# SOURCE FILES:
- \`README.md\` — README outlines the voice-first social product purpose and target builders.
- \`src/index.ts\` — Source implements the voice clip handler entry point.
- \`config/audio.json\` — Configuration describing audio ingestion defaults.`,
      agentDocument: `###### What is this document?

# AGENTS' INSTRUCTIONS:
- Confirm Supabase credentials before coding.
- Narrate file references with paths.

# AGENTS' SEEKING QUESTIONS:
- What gaps exist in transcription accuracy?
- Where can we simplify auth flows?`,
    });
  });

  const tools = getEngiTools();
  const findTool = (name: string) => {
    const tool = tools.find((t) => t.name === name);
    if (!tool) {
      throw new Error(`Tool ${name} not found`);
    }
    return tool;
  };

  const runTool = async <TResult extends EngiToolExecutionResult = EngiToolExecutionResult>(
    name: string,
    args: Record<string, unknown>
  ): Promise<TResult> => {
    const tool = findTool(name);
    return (await tool.execute(args as any)) as TResult;
  };

  it('answer_codebase_query returns annotated matches', async () => {
    const result = await runTool<{ answer: string; metadata: { matchCount: number } }>('answer_codebase_query', {
      query: 'handler',
    });
    expect(result.answer).toContain('• src/index.ts:1');
    expect(result.metadata.matchCount).toBe(1);
  });

  it('answer_codeweb_query lists external references', async () => {
    const result = await runTool<{ answer: string; metadata: { total: number } }>('answer_codeweb_query', {
      query: 'optimistic ui',
    });
    expect(result.answer).toContain('Here’s a focused reading list');
    expect(result.metadata.total).toBe(1);
  });

  it('design_code appends updates without regenerating when baseline provided', async () => {
    const result = await runTool<{
      latest_design: string;
      metadata: { digestUsed?: boolean };
    }>('design_code', {
      ideas: 'Add optimistic UI to post composer.',
      currentProductMd: '# Existing PRODUCT.md',
    });
    expect(generateDigestMock).not.toHaveBeenCalled();
    expect(result.latest_design).toContain('# Existing PRODUCT.md');
    expect(result.latest_design).toContain('- Add optimistic UI to post composer.');
    const headings = result.latest_design.match(/### Proposed Updates/g) ?? [];
    expect(headings.length).toBe(1);
    expect(result.metadata.digestUsed).toBeFalsy();
  });

  it('design_code refreshes baseline via digest when requested', async () => {
    const result = await runTool<{
      latest_design: string;
      metadata: { digestUsed?: boolean };
    }>('design_code', {
      ideas: 'Document optimistic UI workflow.',
      regenerateFromDigest: true,
    });
    expect(generateDigestMock).toHaveBeenCalledTimes(1);
    expect(result.metadata.digestUsed).toBe(true);
    expect(result.latest_design).toContain('This product delivers voice-first social conversations for builders.');
    expect(result.latest_design).toContain('Document optimistic UI workflow.');
    const headings = result.latest_design.match(/### Proposed Updates/g) ?? [];
    expect(headings.length).toBe(1);
  });

  it('improve_developing_behavior refreshes baseline via digest when requested', async () => {
    const result = await runTool<{
      latest_behavior: string;
      metadata: { digestUsed?: boolean };
    }>('improve_developing_behavior', {
      improvement_betterment: 'Always cite file paths with line numbers.',
      regenerateFromDigest: true,
    });
    expect(generateDigestMock).toHaveBeenCalled();
    expect(result.metadata.digestUsed).toBe(true);
    expect(result.latest_behavior).toContain('Confirm Supabase credentials before coding.');
    expect(result.latest_behavior).toContain('Always cite file paths');
  });

  it('use_vercel_read_external_mcp handles list_deployments', async () => {
    const result = await runTool<{ answer: { deployments: unknown[] }; metadata: { provider: string } }>(
      'use_vercel_read_external_mcp',
      {
        request: 'list_deployments',
        payload: { projectId: 'prj_Yapper', teamId: 'team_engi', limit: 2 },
      }
    );
    expect(result.metadata.provider).toBe('vercel');
    expect(Array.isArray((result.answer as any).deployments)).toBe(true);
  });

  it('use_vercel_write_external_mcp triggers deploy fixture', async () => {
    const result = await runTool<{ result: { readyState: string }; metadata: { provider: string } }>(
      'use_vercel_write_external_mcp',
      {
        request: 'deploy_to_vercel',
        payload: { projectId: 'prj_Yapper', teamId: 'team_engi', message: 'Demo deploy' },
      }
    );
    expect(result.metadata.provider).toBe('vercel');
    expect((result.result as any).readyState).toBe('BUILDING');
  });

  it('use_aws_read_external_mcp invokes lambda helper', async () => {
    const result = await runTool<{ metadata: { provider: string; guidance: string } }>('use_aws_read_external_mcp', {
      request: 'lambda.invoke',
      payload: { functionName: 'handler' },
    });
    expect(result.metadata.provider).toBe('aws');
    expect(result.metadata.guidance).toContain('Invoked the Lambda');
  });

  it('use_aws_write_external_mcp uploads to S3', async () => {
    const result = await runTool<{ metadata: { provider: string; guidance: string } }>('use_aws_write_external_mcp', {
      request: 's3.putObject',
      payload: { bucket: 'demo', key: 'config.json', body: '{}' },
    });
    expect(result.metadata.provider).toBe('aws');
    expect(result.metadata.guidance).toContain('Uploaded to S3');
  });

  it('design_code gracefully degrades when digest regeneration fails', async () => {
    generateDigestMock.mockRejectedValueOnce(new Error('digest offline'));
    const result = await runTool<{
      latest_design: string;
      metadata: { digestUsed?: boolean; digestError?: string };
    }>('design_code', {
      ideas: 'Add fallback messaging to onboarding flow.',
      regenerateFromDigest: true,
    });

    expect(result.metadata.digestUsed).toBe(false);
    expect(result.metadata.digestError).toBe('digest offline');
    expect(result.latest_design).toContain('### Proposed Updates');
    expect(result.latest_design).toContain('- Add fallback messaging to onboarding flow.');
    expect(result.latest_design).toContain('# PRODUCT\'S PURPOSE:\n\n[]');
    const headings = result.latest_design.match(/### Proposed Updates/g) ?? [];
    expect(headings.length).toBe(1);
  });

  it('improve_developing_behavior reports digest errors and uses template baseline', async () => {
    generateDigestMock.mockRejectedValueOnce(new Error('agents digest unavailable'));
    const result = await runTool<{
      latest_behavior: string;
      metadata: { digestUsed?: boolean; digestError?: string };
    }>('improve_developing_behavior', {
      improvement_betterment: 'Record when successors need live narration.',
      regenerateFromDigest: true,
    });

    expect(result.metadata.digestUsed).toBe(false);
    expect(result.metadata.digestError).toBe('agents digest unavailable');
    expect(result.latest_behavior).toContain('### Behavior Evolution');
    expect(result.latest_behavior).toContain('Record when successors need live narration.');
    expect(result.latest_behavior).toContain('# AGENTS\' INSTRUCTIONS:\n\n- []');
  });
});
