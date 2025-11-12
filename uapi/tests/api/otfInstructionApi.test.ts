// Unit-tests for the REST handlers in deliverables/ai_documents OTF instruction routes.

jest.mock('@engi/supabase', () => {
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

jest.mock('@engi/supabase/ssr/server', () => ({
  createClient: () => ({
    auth: {
      getUser: async () => ({ data: { user: { id: 'u1' } }, error: null }),
    },
  }),
}));

import { supabaseAdmin } from '@engi/supabase';

import { POST as deliverablePost } from '@/app/api/executions/instructions/route';
import { POST as ai_documentPost } from '@/app/api/ai_documents/instructions/route';

describe('OTF instruction POST routes', () => {
  it('inserts instruction and event for deliverables', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ runId: 'run1', content: 'hello' }),
    });

    await deliverablePost(req as any);

    // First call: insert into run_otf_instructions
    expect((supabaseAdmin.from as jest.Mock).mock.calls[0][0]).toBe('run_otf_instructions');
    // Second call: insert into execution_events
    expect((supabaseAdmin.from as jest.Mock).mock.calls[1][0]).toBe('execution_events');
  });

  it('inserts instruction and event for ai_documents', async () => {
    // reset mock call log
    (supabaseAdmin.from as jest.Mock).mockClear();

    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ runId: 'run2', content: 'hi' }),
    });

    await ai_documentPost(req as any);

    expect((supabaseAdmin.from as jest.Mock).mock.calls[0][0]).toBe('run_otf_instructions');
    expect((supabaseAdmin.from as jest.Mock).mock.calls[1][0]).toBe('ai_document_run_events');
  });
});
