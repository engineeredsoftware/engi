// @ts-nocheck
import { Execution } from '@bitcode/execution-generics';
import { factoryPrepareConciseContext } from '../substeps/factories';

describe('PrepareConciseContext synthesizes full context from root', () => {
  it('includes repository/read/config/attachments/evidence_documents and pipeline/input', async () => {
    const root = new Execution('root');
    // Seed root namespaces
    root.store('repository', 'owner', 'acme');
    root.store('repository', 'name', 'repo');
    root.store('read', 'description', 'Do something great');
    root.store('config', 'iterationCount', 3);
    root.store('attachments', 'list', [{ title: 'Spec', content: 'Design spec' }]);
    root.store('evidence_documents', 'list', [{ title: 'KE', content: '# Knowledge Extension' }]);
    root.store('pipeline', 'input', { definitionOfRead: 'Do something great' });

    // Create a nested execution to simulate deep substep call
    const nested = root.child('phase:discovery').child('agent:analyze').child('step:plan');

    // Minimal pass-through generation child (no LLM)
    const passthrough = async (input: any) => input;
    const pcc = factoryPrepareConciseContext([passthrough]);
    const out = await pcc({ foo: 'bar' }, nested);

    expect(out.preparedContexts).toBeDefined();
    expect(out.preparedContexts.length).toBeGreaterThan(0);
    const ctx = out.preparedContexts[0]?.context;
    expect(ctx.repository?.owner).toBe('acme');
    expect(ctx.repository?.name).toBe('repo');
    expect(ctx.read?.description).toBe('Do something great');
    expect(ctx.config?.iterationCount).toBe(3);
    expect(Array.isArray(ctx.attachments)).toBe(true);
    expect(Array.isArray(ctx.evidence_documents)).toBe(true);
  });
});
