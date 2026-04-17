/**
 * @jest-environment node
 */
import { supabaseAdmin } from '@bitcode/supabase';
import { deductCredits, InsufficientCreditsError } from '@bitcode/credits';

jest.mock('@bitcode/supabase', () => ({
  supabaseAdmin: {
    rpc: jest.fn(),
    from: jest.fn()
  }
}));

describe('deductCredits()', () => {
  const userId = 'user-1';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('uses RPC path when function exists and returns new balance', async () => {
    (supabaseAdmin.rpc as jest.Mock).mockResolvedValue({ data: 80, error: null });
    const bal = await deductCredits(userId, 20);
    expect(bal).toBe(80);
    expect(supabaseAdmin.rpc).toHaveBeenCalledWith('deduct_credits', { p_user_id: userId, p_amount: 20 });
  });

  it('falls back to legacy path when RPC undefined (code 42883)', async () => {
    (supabaseAdmin.rpc as jest.Mock).mockResolvedValue({ data: null, error: { code: '42883', message: 'undefined_function' } });

    // Mock legacy table queries
    const singleMock = jest.fn().mockResolvedValue({ data: { credits: 50 }, error: null });
    const upsertMock = jest.fn().mockReturnThis();
    const insertMock = jest.fn().mockReturnValue(Promise.resolve());

    (supabaseAdmin.from as jest.Mock).mockImplementation((table: string) => {
      if (table === 'user_credits') {
        return { select: jest.fn().mockReturnThis(), eq: jest.fn().mockReturnThis(), single: singleMock, upsert: upsertMock };
      }
      if (table === 'user_credit_usages') {
        return { insert: insertMock };
      }
      return {};
    });

    const bal = await deductCredits(userId, 30); // previous 50 => new 20
    expect(bal).toBe(20);
    expect(upsertMock).toHaveBeenCalled();
    expect(insertMock).toHaveBeenCalled();
  });

  it('throws on insufficient credits', async () => {
    (supabaseAdmin.rpc as jest.Mock).mockResolvedValue({ data: null, error: { code: '42883' } });
    (supabaseAdmin.from as jest.Mock).mockImplementation((table: string) => {
      if (table === 'user_credits') {
        return {
          select: jest.fn().mockReturnThis(),
          eq: jest.fn().mockReturnThis(),
          single: jest.fn().mockResolvedValue({ data: { credits: 10 }, error: null }),
        };
      }
      return {};
    });

    await expect(deductCredits(userId, 30)).rejects.toThrow(InsufficientCreditsError);
  });
});
