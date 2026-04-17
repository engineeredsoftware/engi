import { GET } from '@/app/api/executions/route';

jest.mock('@bitcode/supabase/ssr/server', () => ({ createClient: jest.fn() }));
jest.mock('@bitcode/supabase', () => ({ supabaseAdmin: { from: jest.fn() } }));
jest.mock('@bitcode/git/git', () => ({
  createGitHubJWT: jest.fn(() => 'dummy-jwt'),
  getInstallationAccounts: jest.fn(),
}));
jest.mock('@bitcode/logger', () => ({ log: jest.fn() }));
jest.mock('@bitcode/responses', () => ({
  createJsonResponse: (data: any, status: number = 200) => new Response(JSON.stringify(data), { status }),
  createErrorResponse: jest.fn(),
  createAuthErrorResponse: jest.fn(() => new Response('', { status: 401 })),
}));
jest.mock('@bitcode/context', () => ({ initializeContext: jest.fn() }));
jest.mock('@bitcode/engine/pipeline', () => ({ runSDIVSPipeline: jest.fn() }));
jest.mock('@bitcode/streams', () => ({ writeStreamMessage: jest.fn() }));
jest.mock('@bitcode/pipeline-ai_document/src/tools/vectorize', () => ({ searchRelevantAI Documents: jest.fn() }));

import { createClient } from '@bitcode/supabase/ssr/server';
import { supabaseAdmin } from '@bitcode/supabase';
import { getInstallationAccounts } from '@bitcode/git/git';

describe('GET /api/executions?action=installations', () => {
  const mockUser = { id: 'user-1' };
  const mockGetUser = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    (createClient as jest.Mock).mockResolvedValue({ auth: { getUser: mockGetUser } });
  });

  // TODO: add unauthenticated test once Request/url handling is polyfilled
  it('returns installation account in array', async () => {
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
    // Mock Supabase connection fetch
    const connectionBuilder: any = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      maybeSingle: jest.fn().mockResolvedValue({ data: { connection_data: { installationId: 42 } }, error: null })
    };
    (supabaseAdmin.from as jest.Mock).mockReturnValue(connectionBuilder);
    // Mock GitHub account fetch
    const account = { login: 'acme', type: 'Organization', id: 100 };
    (getInstallationAccounts as jest.Mock).mockResolvedValue(account);
    const req = { url: 'http://localhost/api/executions?action=installations' } as Request;
    const res = await GET(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toEqual({ accounts: [account] });
    // Ensure we filtered by user_id and provider
    expect(connectionBuilder.eq).toHaveBeenCalledWith('user_id', 'user-1');
    expect(connectionBuilder.eq).toHaveBeenCalledWith('provider', 'github');
  });
});
