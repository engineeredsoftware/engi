// @ts-nocheck
import { ExecutionEventsModel } from '../../src/models/execution-events';

function mkSupabase() {
  const calls: any[] = [];
  return {
    calls,
    from(table: string) {
      const ctx: any = { table };
      const api: any = {
        insert: (row: any) => {
          calls.push(['insert', table, row]);
          api._mode = 'insert';
          return api;
        },
        select: (_sel?: any) => api,
        single: () => ({ data: { id: '1', ...api._row }, error: null }),
        eq: (col: string, val: any) => { calls.push(['eq', table, col, val]); return api; },
        order: (col: string, opts?: any) => { calls.push(['order', table, col, opts]); return api; },
        limit: (n: number) => { calls.push(['limit', table, n]); return api; },
        gt: (col: string, val: any) => { calls.push(['gt', table, col, val]); return api; },
        then: undefined,
      };
      return api;
    }
  } as any;
}

describe('ExecutionEventsModel', () => {
  it('create() inserts into execution_events', async () => {
    const sb = mkSupabase();
    const model = new ExecutionEventsModel(sb);
    const row = {
      run_id: 'run-1',
      event_type: 'phase',
      event_data: { type: 'phase', phase: 'setup', status: 'start' },
      created_at: new Date().toISOString(),
    };
    await model.create(row as any);
    expect(sb.calls[0][0]).toBe('insert');
    expect(sb.calls[0][1]).toBe('execution_events');
  });

  it('getByRunId() selects by run_id ordered by created_at', async () => {
    const sb = mkSupabase();
    const model = new ExecutionEventsModel(sb);
    const res = await model.getByRunId('run-1');
    // eq + order calls are recorded
    const eqCall = sb.calls.find(c => c[0] === 'eq');
    const orderCall = sb.calls.find(c => c[0] === 'order');
    expect(eqCall).toEqual(['eq', 'execution_events', 'run_id', 'run-1']);
    expect(orderCall).toEqual(['order', 'execution_events', 'created_at', undefined]);
  });
});
