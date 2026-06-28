import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { usePipelineExecution } from '@/hooks/usePipelineExecution';

function Harness({ runId, onResult }: { runId: string; onResult: (state: any) => void }) {
  const state = usePipelineExecution(runId);
  React.useEffect(() => {
    onResult(state);
  }, [state, onResult]);
  return null;
}

describe('usePipelineExecution', () => {
  const originalFetch = global.fetch;
  const encoder = new TextEncoder();

  afterEach(() => {
    global.fetch = originalFetch as any;
    jest.clearAllMocks();
  });

  it('hydrates execution, events, and work updates from history + stream', async () => {
    const historyResponse = {
      run: { id: 'r1', user_id: 'user-1', created_at: new Date().toISOString(), items: [], context: {} },
      events: [
        { id: '1', event: { type: 'pipeline', status: 'start' }, created_at: new Date().toISOString() },
        { id: '2', event: { type: 'work-update', update: { iteration: 1, confidence: 0.4 } }, created_at: new Date().toISOString() },
      ],
    };

    const streamReader = {
      read: jest
        .fn()
        .mockResolvedValueOnce({
          done: false,
          value: encoder.encode(
            'data: {"type":"work-update","scope":"iteration-2","update":{"iteration":2,"confidence":0.9,"prose":"Iteration 2"}}\n\n'
          ),
        })
        .mockResolvedValueOnce({ done: true, value: undefined }),
    };

    global.fetch = jest.fn((request: RequestInfo) => {
      const url = typeof request === 'string' ? request : (request as Request)?.url ?? '';
      if (url.startsWith('/api/executions/history/')) {
        return Promise.resolve({
          ok: true,
          json: async () => historyResponse,
        } as any);
      }
      if (url.startsWith('/api/executions/stream')) {
        return Promise.resolve({
          ok: true,
          headers: { get: () => 'text/event-stream; charset=utf-8' },
          body: { getReader: () => streamReader },
        } as any);
      }
      throw new Error(`Unexpected fetch: ${url}`);
    }) as any;

    let latest: any;
    render(<Harness runId="r1" onResult={(state) => (latest = state)} />);

    await waitFor(() => expect(latest?.isLoading).toBe(false));
    expect(latest.execution?.id).toBe('r1');
    expect(latest.events.length).toBeGreaterThanOrEqual(1);
    expect(latest.latestWorkUpdate).toBeTruthy();
    await waitFor(() => expect(latest.iterationUpdates.some((u: any) => u.iteration === 1)).toBe(true));
    expect((global.fetch as jest.Mock).mock.calls.length).toBeGreaterThanOrEqual(2);
    expect(streamReader.read).toHaveBeenCalled();
    await waitFor(() => expect(latest.iterationUpdates.some((u: any) => u.iteration === 2)).toBe(true));
    expect((global.fetch as jest.Mock).mock.calls[0][0]).toBe('/api/executions/history/r1');
  });

  it('relays raw live event_data with namespace/key intact (F19 fragment fix)', async () => {
    const historyResponse = {
      run: { id: 'r3', user_id: 'user-1', created_at: new Date().toISOString(), items: [], context: {} },
      events: [],
    };

    // A namespaced fragment store and an llm/output generation, exactly as the
    // server persists them. The live tail must push these verbatim (namespace
    // preserved) rather than flattening them through parseStreamChunk.
    const streamReader = {
      read: jest
        .fn()
        .mockResolvedValueOnce({
          done: false,
          value: encoder.encode(
            'data: {"type":"status","namespace":"step","key":"name","message":"try","executionState":{}}\n\n' +
              'data: {"type":"generation","namespace":"llm","key":"output","message":"[content withheld — source-safe]","executionState":{"phase":"setup","agent":"A","step":"plan","failsafe":"prepare","generation":"reason"}}\n\n',
          ),
        })
        .mockResolvedValueOnce({ done: true, value: undefined }),
    };

    global.fetch = jest.fn((request: RequestInfo) => {
      const url = typeof request === 'string' ? request : (request as Request)?.url ?? '';
      if (url.startsWith('/api/executions/history/')) {
        return Promise.resolve({ ok: true, json: async () => historyResponse } as any);
      }
      if (url.startsWith('/api/executions/stream')) {
        return Promise.resolve({
          ok: true,
          headers: { get: () => 'text/event-stream; charset=utf-8' },
          body: { getReader: () => streamReader },
        } as any);
      }
      throw new Error(`Unexpected fetch: ${url}`);
    }) as any;

    let latest: any;
    render(<Harness runId="r3" onResult={(state) => (latest = state)} />);

    await waitFor(() => expect(latest?.isLoading).toBe(false));
    await waitFor(() =>
      expect(latest.events.some((e: any) => e.event?.namespace === 'llm' && e.event?.key === 'output')).toBe(true),
    );
    const stepEvent = latest.events.find((e: any) => e.event?.namespace === 'step');
    const llmEvent = latest.events.find((e: any) => e.event?.namespace === 'llm');
    // Namespace/key survive — the activity builder can classify and suppress the
    // `step/name=try` fragment while keeping the llm/output as a formal row.
    expect(stepEvent?.event?.key).toBe('name');
    expect(llmEvent?.event?.executionState).toMatchObject({ phase: 'setup', step: 'plan', generation: 'reason' });
  });

  it('handles history fetch failure gracefully', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 500 });

    let latest: any;
    render(<Harness runId="r2" onResult={(state) => (latest = state)} />);

    await waitFor(() => expect(latest?.isLoading).toBe(false));

    expect(latest.error).toContain('Failed to fetch execution');
    expect(latest.execution).toBeNull();
    expect(latest.events).toEqual([]);
    expect(latest.latestWorkUpdate).toBeNull();
    expect(latest.iterationUpdates).toEqual([]);
  });
});
