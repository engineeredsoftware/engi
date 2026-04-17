// @ts-nocheck
import deliverablePipeline from '../index';
import { Execution } from '@bitcode/execution-generics';

describe('Deliverable pipeline - attachments and DoD variants (enabled when full SDIVS is active)', () => {
  const baseInput = {
    taskDescription: 'Implement feature X',
    repository: { url: 'https://github.com/acme/repo', branch: 'main' },
    requirements: { testCoverage: 20, documentationRequired: true },
    deliveryTarget: 'pr' as const,
  };

  it('accepts no attachments', async () => {
    const exec = new Execution('deliverable:no-attachments');
    const res = await deliverablePipeline({ ...baseInput, attachments: [] }, exec);
    expect(res.success).toBe(true);
    expect(res.deliverable.prUrl).toContain('/pull/');
    expect(res.metrics).toBeDefined();
  });

  it('accepts file and url attachments (multimodal simulation)', async () => {
    const exec = new Execution('deliverable:attachments');
    const attachments = [
      { id: 'a1', type: 'file', content: '/tmp/readme.png', metadata: { contentType: 'image/png' } },
      { id: 'a2', type: 'url', content: 'https://example.com/spec' },
    ];
    const res = await deliverablePipeline({ ...baseInput, attachments }, exec);
    expect(res.success).toBe(true);
    expect(res.metrics).toBeDefined();
  });

  it('handles integration/issue attachments', async () => {
    const exec = new Execution('deliverable:integration');
    const attachments = [
      { id: 'i1', type: 'integration', content: 'github:12345' },
      { id: 'i2', type: 'issue', content: '42' },
    ];
    const res = await deliverablePipeline({ ...baseInput, attachments }, exec);
    expect(res.success).toBe(true);
    expect(typeof res.summary).toBe('string');
  });

  it('covers DoD-like good/bad requirements variations', async () => {
    const good = { ...baseInput, requirements: { testCoverage: 80, documentationRequired: true } };
    const bad = { ...baseInput, requirements: { testCoverage: 0, documentationRequired: false } };

    const resGood = await deliverablePipeline({ ...good, attachments: [] }, new Execution('deliverable:good'));
    const resBad = await deliverablePipeline({ ...bad, attachments: [] }, new Execution('deliverable:bad'));

    // Both execute, but shapes remain correct; downstream phases would enforce stricter criteria
    expect(resGood.success).toBe(true);
    expect(resBad.success).toBe(true);
    expect(resGood.metrics).toBeDefined();
    expect(resBad.metrics).toBeDefined();
  });
});
