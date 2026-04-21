import { buildMockConversationStreamEnvelope } from '@/app/api/conversations/_shared';

describe('conversation mock stream shared helpers', () => {
  it('emits canonical branch-artifact execution events and Bitcode Terminal write copy', () => {
    const envelope = buildMockConversationStreamEnvelope({
      content: 'Attach the repository and synthesize the asset pack.',
      tokens: [
        { type: 'attachment', value: 'spec.pdf' },
        { type: 'asset_pack', value: 'branch artifact' },
      ],
    });

    expect(envelope.pipeline?.pipelineType).toBe('agentic-execution:branch-artifact');
    expect(JSON.stringify(envelope.pipeline?.events)).toMatch(/Mock Bitcode agentic execution/);
    expect(JSON.stringify(envelope.pipeline?.events)).toMatch(/branch artifact execution completed/i);
    expect(envelope.assistantReply).toMatch(
      /source attachments, asset packs, output destinations, and settlement-bound proofs/i,
    );
  });

  it('accepts canonical need-measurement tokens in mock stream execution events', () => {
    const envelope = buildMockConversationStreamEnvelope({
      tokens: [{ type: 'need_measurement', value: 'measure the current need' }],
    });

    expect(envelope.pipeline?.pipelineType).toBe('agentic-execution:need-measurement');
    expect(envelope.assistantReply).toMatch(
      /Ask for need measurement, branch-artifact execution, source attachment, or settlement-bound output/i,
    );
  });
});
