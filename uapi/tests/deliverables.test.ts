import { POST as postHistory } from '@/app/api/executions/history/route';
jest.mock('@bitcode/supabase/ssr/server', () => ({ createClient: jest.fn() }));
jest.mock('@bitcode/supabase', () => ({
  supabaseAdmin: { from: jest.fn() }
}));

import { createClient } from '@bitcode/supabase/ssr/server';
import { supabaseAdmin } from '@bitcode/supabase';

describe('Deliverables Pipeline', () => {
  const mockUser = { id: 'user-1' };
  const mockGetUser = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    // Authenticated by default
    (createClient as jest.Mock).mockResolvedValue({ auth: { getUser: mockGetUser } });
  });

  describe.skip('History POST (insert deliverables) (deprecated items pattern)', () => {
    const types = ['pr', 'pr_review', 'issue', 'issue_comment'];
    types.forEach(type => {
      it(`inserts items of deliverable_type=${type}`, async () => {
        // Mock authentication
        mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
        // Prepare builders
        const runBuilder: any = {
          insert: jest.fn().mockReturnThis(), select: jest.fn().mockReturnThis(), single: jest.fn().mockResolvedValue({ data: { id: 'run-1' }, error: null }),
          update: jest.fn().mockReturnThis(), eq: jest.fn().mockResolvedValue({})
        };
        const itemsInserted = [{ id: 'item-1', deliverable_type: type }];
        const itemsBuilder: any = { insert: jest.fn().mockReturnThis(), select: jest.fn().mockResolvedValue({ data: itemsInserted, error: null }) };
        // supabaseAdmin.from multiplex
        (supabaseAdmin.from as jest.Mock).mockImplementation((table: string) =>
          table === 'executions' ? runBuilder : itemsBuilder
        );
        // Prepare request
        const record = { title: 'Test', output: 'Out', repository: 'repo', deliverable_type: type };
        const req = new Request('http://localhost/api/executions/history', {
          method: 'POST', body: JSON.stringify({ items: [record] })
        });
        const res = await postHistory(req);
        expect(res.status).toBe(201);
        const body = await res.json();
        expect(body).toEqual({ run: 'run-1', items: itemsInserted });
        expect(supabaseAdmin.from).toHaveBeenCalledWith('executions');
        expect(runBuilder.insert).toHaveBeenCalledWith({ user_id: mockUser.id });
        // Items table removed; postprocessed attached to output_data instead
      });
    });
  });

});
