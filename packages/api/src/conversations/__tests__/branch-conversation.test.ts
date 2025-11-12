import { branchConversation } from '../conversations';

jest.mock('@engi/supabase', () => {
  const tables: Record<string, any[]> = {
    conversations: [],
    messages: [],
  };
  const api = {
    from: (table: string) => ({
      select: (_?: string) => ({
        eq: (c1: string, v1: any) => ({
          eq: (c2: string, v2: any) => ({
            single: async () => {
              const row = tables[table].find(r => r.id === v1 && r.user_id === v2) || null;
              if (!row) return { data: null, error: { code: 'PGRST116' } };
              return { data: row, error: null };
            },
          }),
        }),
        order: (_f: string, _o: any) => ({
          eq: (f: string, v: any) => ({
            order: (_: string, __: any) => ({ data: tables[table].filter(r => r.conversation_id === v), error: null })
          })
        })
      }),
      insert: (row: any) => ({
        select: (_?: string) => ({
          single: async () => {
            const id = row.id || `${table}-${tables[table].length + 1}`;
            const newRow = { id, ...row };
            tables[table].push(newRow);
            return { data: newRow, error: null };
          }
        })
      }),
      update: (_row: any) => ({ eq: () => ({ select: () => ({ single: async () => ({ data: null, error: null }) }) }) })
    })
  };
  return { supabaseAdmin: api };
});

describe('branchConversation', () => {
  const userId = 'user-1';
  const sourceConversationId = 'conv-1';

  beforeEach(async () => {
    // seed conversation and messages
    // @ts-ignore
    const { supabaseAdmin } = await import('@engi/supabase');
    await supabaseAdmin.from('conversations').insert({ id: sourceConversationId, user_id: userId, title: 'Source', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }).select('*').single();
    for (let i = 0; i < 3; i++) {
      await supabaseAdmin.from('messages').insert({ id: `m${i+1}`, conversation_id: sourceConversationId, role: 'user', content: `msg-${i+1}`, created_at: new Date(Date.now() + i).toISOString() }).select('*').single();
    }
  });

  it('branches a conversation and copies messages', async () => {
    const result = await branchConversation(userId, sourceConversationId, { title: 'Branched', copyMessages: true });
    expect(result.id).toBeTruthy();
    expect(result.copiedCount).toBe(3);
  });
});

