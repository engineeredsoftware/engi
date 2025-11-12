import { parseStreamChunk } from '@/streaming/stream-parser';

describe('Stream Parser - On-The-Fly Instructions', () => {
  it('should parse otf_instructions', () => {
    const instructions = [
      { id: '1', content: 'Test instruction', attachments: null, state: 'accepted', created_at: '2025-01-01T00:00:00Z' }
    ];
    const chunkObj = { type: 'otf_instructions', metadata: { instructions } };
    const chunk = `data: ${JSON.stringify(chunkObj)}\n\n`;
    const parsed = parseStreamChunk(chunk);
    expect(parsed.type).toBe('otf_instructions');
    expect(parsed.instructions).toEqual(instructions);
  });

  it('should parse otf_adherence and append text', () => {
    const adherence = { score: 0.75, thoughts: 'Seems good' };
    const chunkObj = { type: 'otf_adherence', metadata: adherence };
    const chunk = `data: ${JSON.stringify(chunkObj)}\n\n`;
    const parsed = parseStreamChunk(chunk);
    expect(parsed.type).toBe('otf_adherence');
    expect(parsed.adherence).toEqual(adherence);
    expect(parsed.text).toContain('📏 Adherence 0.75: Seems good');
  });
});