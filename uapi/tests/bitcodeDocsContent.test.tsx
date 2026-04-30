import { getBitcodeDocsPage } from '@/app/docs/bitcode-docs-content';

describe('Bitcode docs content model', () => {
  it('documents ChatGPT App tools as API-style usage features', () => {
    const page = getBitcodeDocsPage('chatgpt-app');
    const features = page?.apiReference?.flatMap((section) => section.features) ?? [];

    expect(features.map((feature) => feature.name)).toEqual(
      expect.arrayContaining([
        'answer_codebase_query',
        'design_code',
        'write_code_changes_to_vcs',
        'use_vercel_write_external_mcp',
        'use_aws_write_external_mcp',
      ]),
    );
    expect(features.find((feature) => feature.name === 'write_code_changes_to_vcs')?.requiresConfirmation).toBe(true);
    expect(features.find((feature) => feature.name === 'design_code')?.inputs.join(' ')).toContain('ideas');
  });

  it('documents active Bitcode MCP server tools with inputs and expected outputs', () => {
    const page = getBitcodeDocsPage('mcp-api');
    const features = page?.apiReference?.flatMap((section) => section.features) ?? [];

    expect(features.map((feature) => feature.name)).toEqual(
      expect.arrayContaining([
        'tools/list',
        'tools/call',
        'bitcode://pipelines/asset-pack/create',
        'bitcode://analysis/repository/analyze',
        'bitcode://intelligence/multimodal/process',
        'bitcode://enterprise/webhook/orchestrate',
        'bitcode://lsp/workspace/intelligence',
        'bitcode://observability/logs/analytics',
      ]),
    );
    expect(features.find((feature) => feature.name === 'bitcode://pipelines/asset-pack/create')?.outputs.join(' ')).toContain('writeAdmission');
    expect(features.every((feature) => feature.inputs.length > 0 && feature.outputs.length > 0)).toBe(true);
  });
});
