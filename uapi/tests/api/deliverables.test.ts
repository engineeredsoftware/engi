import { POST } from '@/app/api/executions/route';
import { createClient } from '@bitcode/supabase/ssr/server';
import { supabaseAdmin } from '@bitcode/supabase';
import { deductBtdBalance, InsufficientBtdBalanceError } from '@bitcode/btd';

// Mock Next.js Request
function createRequest(body: any) {
  return new Request('http://localhost/api/executions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

jest.mock('@bitcode/supabase/ssr/server', () => ({
  createClient: jest.fn(),
}));
jest.mock('@bitcode/supabase', () => ({
  supabaseAdmin: {
    from: jest.fn(),
    rpc: jest.fn(),
  }
}));
jest.mock('@bitcode/btd', () => {
  const actual = jest.requireActual('@bitcode/btd');
  return {
    ...actual,
    deductBtdBalance: jest.fn(),
  };
});
jest.mock('@bitcode/engine/pipeline', () => ({
  runSDIVFPipeline: jest.fn().mockResolvedValue({}),
}));

describe('Deliverables API POST', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    process.env.DELIVERABLE_BASE_COST = '100';
    process.env.EXA_API_KEY = 'test';
  });

  it('returns 402 when insufficient $BTD balance', async () => {
    // Mock auth: user exists
    (createClient as jest.Mock).mockResolvedValue({
      auth: { getUser: jest.fn().mockResolvedValue({ data: { user: { id: 'user1' } }, error: null }) }
    });
    // Mock existing BTD balance = 50
    (deductBtdBalance as jest.Mock).mockImplementation(() => {
      throw new InsufficientBtdBalanceError('balance too low');
    });

    const body = {
      task: 'do something',
      repoOwner: 'o', repoName: 'r', repoBranch: 'b', repoCommit: 'c',
      issueNumber: null,
      modelProvider: 'openai', modelId: 'gpt-3.5-turbo',
      attachments: []
    };
    const res = await POST(createRequest(body));
    expect(res.status).toBe(402);
    const json = await res.json();
    expect(json.error).toBe('balance too low');
    expect(json.required).toBe(100);
  });

  it('debits credits when sufficient balance', async () => {
    (createClient as jest.Mock).mockResolvedValue({
      auth: { getUser: jest.fn().mockResolvedValue({ data: { user: { id: 'user2' } }, error: null }) }
    });
    const insertMock = jest.fn().mockReturnValue(Promise.resolve());
    (deductBtdBalance as jest.Mock).mockResolvedValue(80); // after deduction
    (supabaseAdmin.from as jest.Mock).mockImplementation((table: string) => {
      if (table === 'executions') return {
        insert: insertMock,
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: { id: 'run1' }, error: null })
      };
      return { insert: insertMock };
    });

    const body = {
      task: 'do work',
      repoOwner: 'o', repoName: 'r', repoBranch: 'b', repoCommit: 'c',
      issueNumber: null,
      modelProvider: 'anthropic', modelId: 'claude-3.7-sonnet',
      attachments: []
    };
    const res = await POST(createRequest(body));
    // Should return streaming response (200)
    expect(res.status).toBe(200);
    expect(deductBtdBalance).toHaveBeenCalled();
  });
});
