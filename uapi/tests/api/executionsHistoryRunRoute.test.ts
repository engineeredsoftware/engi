import { GET as getRunHistory } from '@/app/api/executions/history/[runId]/route';

jest.mock('@bitcode/supabase/ssr/server', () => ({
  createClient: jest.fn(),
}));

jest.mock('@bitcode/supabase', () => ({
  supabaseAdmin: {
    from: jest.fn(),
  },
}));

const { createClient } = require('@bitcode/supabase/ssr/server');
const { supabaseAdmin } = require('@bitcode/supabase');

describe('GET /api/executions/history/[runId]', () => {
  const mockUser = { id: 'user-1' };
  const mockGetUser = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    (createClient as jest.Mock).mockResolvedValue({
      auth: { getUser: mockGetUser },
    });
  });

  it('fails closed to an empty run payload when unauthenticated', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: new Error('no') });

    const req = new Request('http://localhost/api/executions/history/run-1');
    const res = await getRunHistory(req, { params: { runId: 'run-1' } });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ run: null, events: [] });
  });

  it('returns the persisted run detail with normalized event reread', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });

    const runBuilder: any = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      maybeSingle: jest
        .fn()
        .mockResolvedValue({
          data: {
            id: 'run-1',
            user_id: mockUser.id,
            created_at: '2026-04-22T12:00:00.000Z',
            started_at: '2026-04-22T11:58:00.000Z',
            completed_at: '2026-04-22T12:04:00.000Z',
            status: 'completed',
            type: 'agentic-execution:proof-refresh',
            input: {
              guide: 'refresh proof families',
            },
            output: {
              asset_pack_completion: {
                summary: 'Persisted closure posture.',
                assetPackSynthesisArtifacts: {
                  summary: 'Persisted AssetPack synthesis artifacts.',
                  fileChanges: { edited: 3, created: 1, deleted: 0 },
                  proofEvidence: ['history-detail-primary-artifacts'],
                },
                writtenAssets: {
                  summary: 'Persisted closure posture.',
                },
                deliveryMechanism: {
                  comments: [{ title: 'Proof note', url: 'https://example.com/comments/9', number: 9 }],
                },
                need: 'Refresh closure proofs and reopen fourth-gate truth honestly.',
                writtenAssetType: 'proof-refresh',
                assetPack: {
                  need: 'Refresh closure proofs and reopen fourth-gate truth honestly.',
                  writtenAssetType: 'proof-refresh',
                  deliveryTarget: 'proof',
                },
                repoSnapshot: {
                  org: 'bitcode',
                  repo: 'terminal',
                  branch: 'main',
                  commit: 'abc123',
                },
                processingStats: {
                  time: '4m 12s',
                  tokens: {
                    input: 160,
                    output: 60,
                    total: 220,
                  },
                  measuredBtd: 18.5,
                  btcFeeUsdEquivalent: 0.91,
                  averageLatencyMs: 880,
                },
              },
            },
            context: {},
            items: [{ id: 'artifact-1' }],
            error: null,
            total_tokens: null,
            total_cost: null,
            duration_ms: null,
          },
          error: null,
        }),
    };

    const eventsBuilder: any = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockResolvedValue({
        data: [
          {
            id: '1',
            run_id: 'run-1',
            event_type: 'phase',
            event_data: { type: 'phase', phase: 'verification', status: 'running' },
            created_at: '2026-04-22T12:01:00.000Z',
            agent_name: null,
            phase: 'verification',
          },
          {
            id: '2',
            run_id: 'run-1',
            event_type: 'completion',
            event_data: null,
            created_at: '2026-04-22T12:04:00.000Z',
            agent_name: 'settlement-agent',
            phase: 'settlement',
          },
        ],
        error: null,
      }),
    };

    (supabaseAdmin.from as jest.Mock).mockImplementation((table: string) => {
      if (table === 'executions') return runBuilder;
      if (table === 'execution_events') return eventsBuilder;
      return { select: jest.fn().mockReturnThis() };
    });

    const req = new Request('http://localhost/api/executions/history/run-1');
    const res = await getRunHistory(req, { params: { runId: 'run-1' } });
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.run).toEqual(
      expect.objectContaining({
        id: 'run-1',
        summary: 'Persisted closure posture.',
        guide: 'refresh proof families',
        repo_snapshot: {
          org: 'bitcode',
          repo: 'terminal',
          branch: 'main',
          commit: 'abc123',
        },
        processing_stats: {
          time: '4m 12s',
          tokens: {
            input: 160,
            output: 60,
            total: 220,
          },
          measuredBtd: 18.5,
          btcFeeUsdEquivalent: 0.91,
          averageLatencyMs: 880,
        },
        written_assets: {
          summary: 'Persisted closure posture.',
        },
        asset_pack_synthesis_artifacts: {
          summary: 'Persisted AssetPack synthesis artifacts.',
          fileChanges: { edited: 3, created: 1, deleted: 0 },
          proofEvidence: ['history-detail-primary-artifacts'],
        },
        delivery_mechanism: {
          comments: [{ title: 'Proof note', url: 'https://example.com/comments/9', number: 9 }],
        },
        shippables: {
          comments: [{ title: 'Proof note', url: 'https://example.com/comments/9', number: 9 }],
        },
        need: 'Refresh closure proofs and reopen fourth-gate truth honestly.',
        written_asset_type: 'proof-refresh',
        asset_pack: {
          need: 'Refresh closure proofs and reopen fourth-gate truth honestly.',
          writtenAssetType: 'proof-refresh',
          deliveryTarget: 'proof',
        },
        asset_pack_completion: expect.objectContaining({
          summary: 'Persisted closure posture.',
          assetPackSynthesisArtifacts: {
            summary: 'Persisted AssetPack synthesis artifacts.',
            fileChanges: { edited: 3, created: 1, deleted: 0 },
            proofEvidence: ['history-detail-primary-artifacts'],
          },
          writtenAssets: {
            summary: 'Persisted closure posture.',
          },
          deliveryMechanism: {
            comments: [{ title: 'Proof note', url: 'https://example.com/comments/9', number: 9 }],
          },
          shippables: {
            comments: [{ title: 'Proof note', url: 'https://example.com/comments/9', number: 9 }],
          },
          need: 'Refresh closure proofs and reopen fourth-gate truth honestly.',
          writtenAssetType: 'proof-refresh',
          assetPack: {
            need: 'Refresh closure proofs and reopen fourth-gate truth honestly.',
            writtenAssetType: 'proof-refresh',
            deliveryTarget: 'proof',
          },
        }),
      }),
    );
    expect(Array.isArray(json.events)).toBe(true);
    expect(json.events[0].event).toEqual({
      type: 'phase',
      phase: 'verification',
      status: 'running',
    });
    expect(json.events[1].event).toEqual({
      type: 'completion',
      agent: 'settlement-agent',
      phase: 'settlement',
      timestamp: '2026-04-22T12:04:00.000Z',
    });
  });

  it('fails closed when the selected run is not owned by the authenticated user', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });

    const runBuilder: any = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      maybeSingle: jest.fn().mockResolvedValue({
        data: {
          id: 'run-foreign',
          user_id: 'user-2',
          created_at: '2026-04-22T12:00:00.000Z',
          items: [],
          context: {},
        },
        error: null,
      }),
    };

    (supabaseAdmin.from as jest.Mock).mockImplementation((table: string) => {
      if (table === 'executions') return runBuilder;
      throw new Error(`Unexpected table for unauthorized detail read: ${table}`);
    });

    const req = new Request('http://localhost/api/executions/history/run-foreign');
    const res = await getRunHistory(req, { params: { runId: 'run-foreign' } });

    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: 'Execution not found or access denied' });
  });
});
