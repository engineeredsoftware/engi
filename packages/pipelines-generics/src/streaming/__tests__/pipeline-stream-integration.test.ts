// @ts-nocheck
import { Execution } from '@engi/execution-generics';
import { enablePipelineStreaming } from '../../streaming/pipeline-stream-integration';

// Mock ORM model so we can assert persistence without a real DB
const createdEvents: any[] = [];
jest.mock('@engi/orm', () => ({
  ExecutionEventsModel: class {
    constructor() {}
    async create(row: any) {
      createdEvents.push(row);
      return { id: String(createdEvents.length), ...row };
    }
  }
}));

describe('pipeline-stream-integration', () => {
  it('registers a streamer on Execution and persists events when enabled', async () => {
    const exec = new Execution('pipeline:test');
    const fakeSupabase: any = {}; // not used by mock model

    const streamer = enablePipelineStreaming(exec, {
      runId: 'run-123',
      userId: 'user-1',
      supabase: fakeSupabase,
      streamToDatabase: true,
      streamToSSE: false,
    });

    // Emit a couple of events through the streamer
    await streamer.writeData(JSON.stringify({ type: 'pipeline', status: 'start', timestamp: Date.now() }));
    await streamer.writeData(JSON.stringify({ type: 'phase', phase: 'setup', status: 'start', timestamp: Date.now() }));

    expect(typeof streamer.subscribe).toBe('function');
    expect(typeof streamer.writeData).toBe('function');
    // Allow async subscribers to flush
    await new Promise(r => setTimeout(r, 10));
    expect(createdEvents.length).toBeGreaterThanOrEqual(2);
    expect(createdEvents[0].run_id).toBe('run-123');
    expect(createdEvents[0].event_type).toBeDefined();
  });
});
