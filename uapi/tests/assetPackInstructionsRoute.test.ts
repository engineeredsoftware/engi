jest.mock('@bitcode/supabase', () => ({
  supabaseAdmin: {
    from: jest.fn(),
  },
}));

jest.mock('@bitcode/supabase/ssr/server', () => ({
  createClient: jest.fn(),
}));

import { GET, POST } from '@/app/api/executions/instructions/route';
import { supabaseAdmin } from '@bitcode/supabase';
import { createClient } from '@bitcode/supabase/ssr/server';

describe('AssetPack execution instructions API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (createClient as jest.Mock).mockResolvedValue({
      auth: {
        getUser: jest.fn().mockResolvedValue({ data: { user: { id: 'user-1' } }, error: null }),
      },
    });
  });

  it('GET returns normalized stored execution instructions', async () => {
    const storedInstruction = {
      id: 'i1',
      instruction_data: {
        content: 'Use the audited dependency path',
        attachments: [{ type: 'evidence', id: 'e1' }],
      },
      is_processed: false,
      created_at: '2025-01-01T00:00:00Z',
    };
    const query = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnValue({ data: [storedInstruction], error: null }),
    };
    (supabaseAdmin.from as jest.Mock).mockReturnValue(query);

    const response = await GET(new Request('https://bitcode.test/api/executions/instructions?runId=run1'));

    expect(response.status).toBe(200);
    expect(supabaseAdmin.from).toHaveBeenCalledWith('run_otf_instructions');
    expect(query.eq).toHaveBeenCalledWith('run_id', 'run1');
    expect(query.order).toHaveBeenCalledWith('created_at', { ascending: true });
    await expect(response.json()).resolves.toEqual([
      {
        id: 'i1',
        content: 'Use the audited dependency path',
        attachments: [{ type: 'evidence', id: 'e1' }],
        state: 'accepted',
        created_at: '2025-01-01T00:00:00Z',
      },
    ]);
  });

  it('POST stores an AssetPack instruction and records an execution event', async () => {
    const insertedRow = {
      id: 'i2',
      instruction_data: {
        content: 'Tighten proof wording',
        attachments: [],
        state: 'accepted',
      },
      created_at: '2025-01-01T01:00:00Z',
    };
    const instructionQuery = {
      insert: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: insertedRow, error: null }),
    };
    const eventQuery = {
      insert: jest.fn().mockReturnValue({ data: null, error: null }),
    };
    (supabaseAdmin.from as jest.Mock)
      .mockReturnValueOnce(instructionQuery)
      .mockReturnValueOnce(eventQuery);

    const response = await POST(new Request('https://bitcode.test/api/executions/instructions', {
      method: 'POST',
      body: JSON.stringify({ runId: 'run1', content: '  Tighten proof wording  ', attachments: [] }),
    }));

    expect(response.status).toBe(201);
    expect(supabaseAdmin.from).toHaveBeenNthCalledWith(1, 'run_otf_instructions');
    expect(instructionQuery.insert).toHaveBeenCalledWith({
      run_id: 'run1',
      instruction_type: 'user_instruction',
      instruction_data: {
        content: 'Tighten proof wording',
        attachments: [],
        state: 'accepted',
        submittedBy: 'user-1',
      },
      is_processed: false,
    });
    expect(supabaseAdmin.from).toHaveBeenNthCalledWith(2, 'execution_events');
    expect(eventQuery.insert).toHaveBeenCalledWith(expect.objectContaining({
      run_id: 'run1',
      event_type: 'instruction',
      event_data: expect.objectContaining({
        source: 'asset_pack_execution_instruction',
      }),
    }));
    await expect(response.json()).resolves.toEqual({
      id: 'i2',
      content: 'Tighten proof wording',
      attachments: [],
      state: 'accepted',
      created_at: '2025-01-01T01:00:00Z',
    });
  });
});
