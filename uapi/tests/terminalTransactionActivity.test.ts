import {
  buildTerminalRunActivityFromEvents,
  buildTerminalRunActivityFromMock,
} from '@/app/terminal/terminal-run-activity';

describe('terminal-run-activity helpers', () => {
  it('builds Terminal activity from live execution events', () => {
    const snapshot = buildTerminalRunActivityFromEvents(
      [
        {
          id: '1',
          event: {
            type: 'status',
            status: {
              message: 'Preparing run',
              executionState: { phase: 'Discovery', agent: 'Analyzer', step: 'chunk_then_sum' },
            },
          },
          created_at: '2026-04-16T12:00:00.000Z',
        },
        {
          id: '2',
          event: { type: 'generation', message: 'Model call completed' },
          created_at: '2026-04-16T12:00:10.000Z',
        },
        {
          id: '3',
          event: { type: 'work-update', update: { iteration: 1, confidence: 0.7 } },
          created_at: '2026-04-16T12:00:20.000Z',
        },
        {
          id: '4',
          event: { type: 'completion' },
          created_at: '2026-04-16T12:00:30.000Z',
        },
      ],
      { iteration: 1, confidence: 0.7 },
      [{ iteration: 1, confidence: 0.7 }],
      null,
    );

    expect(snapshot.output).toContain('Preparing run');
    expect(snapshot.output).toContain('[completion]');
    expect(snapshot.executionState.phase).toBe('Discovery');
    expect(snapshot.isStreamingComplete).toBe(true);
    expect(snapshot.generationCount).toBe(1);
    expect(snapshot.activityKinds).toEqual(['execution']);
    expect(snapshot.activityRecords).toHaveLength(4);
    expect(snapshot.activityRecords[0]?.kind).toBe('execution');
    expect(snapshot.activityRecords[2]?.title).toBe('Work update');
    expect(snapshot.iterationUpdates).toHaveLength(1);
    expect(snapshot.latestWorkUpdate?.confidence).toBe(0.7);
  });

  it('renders only LLM-call and Tool-use rows, each stamped with its full hierarchy (F19)', () => {
    const snapshot = buildTerminalRunActivityFromEvents(
      [
        // Fragment: a step-name store leaks the value "try" — must NOT become a row.
        { id: '1', event: { type: 'status', namespace: 'step', key: 'name', message: 'try', data: 'try' }, created_at: '2026-06-26T12:00:00.000Z' },
        // Fragment: a cwd path store — must NOT become a row.
        { id: '2', event: { type: 'status', namespace: 'workspace', key: 'cwd', message: '/Users/x/ENGI/uapi', data: '/Users/x/ENGI/uapi' }, created_at: '2026-06-26T12:00:01.000Z' },
        // Context: agent start establishes phase/agent/step for the following rows.
        { id: '3', event: { type: 'agent-start', namespace: 'agent:SetupPlanAgent', key: 'start', executionState: { phase: 'setup', agent: 'SetupPlanAgent', step: 'plan' } }, created_at: '2026-06-26T12:00:02.000Z' },
        // Fragment: the prompt-side llm store — must NOT become a row.
        { id: '4', event: { type: 'status', namespace: 'llm', key: 'input', message: '[content withheld — source-safe]' }, created_at: '2026-06-26T12:00:03.000Z' },
        // Formal LLM call: the substep output carries the full hierarchy.
        { id: '5', event: { type: 'generation', namespace: 'llm', key: 'output', message: '[content withheld — source-safe]', executionState: { phase: 'setup', agent: 'SetupPlanAgent', step: 'plan', failsafe: 'prepare_concise_context', generation: 'reason' } }, created_at: '2026-06-26T12:00:04.000Z' },
        // Formal Tool use: name then result on the same node.
        { id: '6', event: { type: 'status', namespace: 'tool', key: 'name', data: 'AssetPackPatchWriteTool', executionNodeId: 'tool-node-1' }, created_at: '2026-06-26T12:00:05.000Z' },
        { id: '7', event: { type: 'status', namespace: 'tool', key: 'result', data: { ok: true }, executionNodeId: 'tool-node-1' }, created_at: '2026-06-26T12:00:06.000Z' },
      ],
      null,
      [],
      null,
    );

    // Fragments are suppressed; only the LLM call + Tool use are rows.
    expect(snapshot.output).toContain('[content withheld — source-safe]');
    expect(snapshot.output).toContain('AssetPackPatchWriteTool');
    expect(snapshot.output).not.toContain('try');
    expect(snapshot.output).not.toContain('/Users/');
    expect(snapshot.output.split('\n')).toHaveLength(2);

    const rows = Object.values(snapshot.outputDetails) as any[];
    const llm = rows.find((r) => r.type === 'generation');
    const tool = rows.find((r) => r.type === 'tool-use');

    // LLM call: all five hierarchy levels present.
    expect(llm?.executionState).toMatchObject({
      phase: 'setup',
      agent: 'SetupPlanAgent',
      step: 'plan',
      failsafe: 'prepare_concise_context',
      generation: 'reason',
    });
    // Tool use: Phase/Agent/Step (from rolling context) + tool name, no failsafe/generation.
    expect(tool?.executionState).toMatchObject({ phase: 'setup', agent: 'SetupPlanAgent', step: 'plan', tool: 'AssetPackPatchWriteTool' });
    expect(tool?.executionState.failsafe).toBeUndefined();
    expect(tool?.metadata?.toolName).toBe('AssetPackPatchWriteTool');
  });

  it('uses explicit stream error and mock snapshots', () => {
    const liveErrorSnapshot = buildTerminalRunActivityFromEvents([], null, [], 'Stream failed');
    expect(liveErrorSnapshot.error).toBe('Stream failed');

    const mockSnapshot = buildTerminalRunActivityFromMock({
      output: '[pipeline:running]\n[completion]',
      outputDetails: { '[completion]': { type: 'completion' } },
      executionState: { phase: 'Mock' },
      isStreamingComplete: true,
      generationCount: 2,
    });

    expect(mockSnapshot?.output).toContain('[completion]');
    expect(mockSnapshot?.activityKinds).toEqual(['execution']);
    expect(mockSnapshot?.activityRecords).toHaveLength(1);
    expect(mockSnapshot?.executionState.phase).toBe('Mock');
    expect(mockSnapshot?.generationCount).toBe(2);
  });
});
