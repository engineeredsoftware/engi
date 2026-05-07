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
