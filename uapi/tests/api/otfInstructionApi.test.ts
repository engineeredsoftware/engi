// Unit-tests for the REST handlers in AssetPack OTF instruction routes.

jest.mock('@bitcode/supabase', () => {
  return {
    supabaseAdmin: {
      from: jest.fn(() => ({
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: { id: 'id1', content: 'c', attachments: null, state: 'accepted', created_at: 'now' }, error: null }),
      })),
    },
  };
});

jest.mock('@bitcode/supabase/ssr/server', () => ({
  createClient: () => ({
    auth: {
      getUser: async () => ({ data: { user: { id: 'u1' } }, error: null }),
    },
  }),
}));

import { supabaseAdmin } from '@bitcode/supabase';

import { POST as assetPackPost } from '@/app/api/executions/instructions/route';

describe('OTF instruction POST routes', () => {
  it('inserts instruction and event for AssetPack executions', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ runId: 'run1', content: 'hello' }),
    });

    await assetPackPost(req as any);

    // First call: insert into run_otf_instructions
    expect((supabaseAdmin.from as jest.Mock).mock.calls[0][0]).toBe('run_otf_instructions');
    // Second call: insert into execution_events
    expect((supabaseAdmin.from as jest.Mock).mock.calls[1][0]).toBe('execution_events');
  });

  it('does not retain the removed Evidence Document instruction route as a live wrapper', async () => {
    await expect(import('@/app/api/evidence-documents/instructions/route')).rejects.toThrow();
  });
});
