import { GET, POST } from '@/app/api/orbitals/user/data-share/route';

jest.mock('@bitcode/supabase/ssr/server', () => ({ createClient: jest.fn() }));
jest.mock('@/app/api/vcs/_shared', () => ({
  getMockRepositories: jest.fn(),
  getStoredConnection: jest.fn(),
  isMockVcsMode: jest.fn(),
  listStoredRepositories: jest.fn(),
}));

import { createClient } from '@bitcode/supabase/ssr/server';
import {
  getMockRepositories,
  getStoredConnection,
  isMockVcsMode,
  listStoredRepositories,
} from '@/app/api/vcs/_shared';

const mockGetUser = jest.fn();

beforeEach(() => {
  jest.resetAllMocks();
  (createClient as jest.Mock).mockResolvedValue({ auth: { getUser: mockGetUser } });
  (isMockVcsMode as jest.Mock).mockReturnValue(false);
});

describe('GET /api/orbitals/user/data-share', () => {
  it('fails closed to an empty payload for anonymous requests', async () => {
    mockGetUser.mockResolvedValue({ data: { user: null }, error: null });

    const res = await GET();
    const payload = await res.json();

    expect(res.status).toBe(200);
    expect(payload).toEqual({ success: true, repos: [] });
  });

  it('returns deterministic repositories in mock mode', async () => {
    (isMockVcsMode as jest.Mock).mockReturnValue(true);
    (getMockRepositories as jest.Mock).mockReturnValue([
      { fullName: 'bitcode/bitcode', defaultBranch: 'main', updatedAt: '2026-04-16T12:00:00.000Z' },
    ]);

    const res = await GET();
    const payload = await res.json();

    expect(res.status).toBe(200);
    expect(payload.success).toBe(true);
    expect(payload.repos).toHaveLength(1);
    expect(payload.repos[0]).toMatchObject({
      fullName: 'bitcode/bitcode',
      branch: 'main',
      enabled: true,
    });
  });
});

describe('POST /api/orbitals/user/data-share', () => {
  it('accepts toggle requests without throwing', async () => {
    const res = await POST(
      new Request('http://localhost', {
        method: 'POST',
        body: JSON.stringify({ repoFullName: 'bitcode/bitcode', enabled: true }),
      }),
    );
    const payload = await res.json();

    expect(res.status).toBe(200);
    expect(payload).toEqual({
      success: true,
      persisted: false,
      repoFullName: 'bitcode/bitcode',
      enabled: true,
    });
  });

  it('rejects invalid JSON', async () => {
    const res = await POST(
      new Request('http://localhost', {
        method: 'POST',
        body: '{broken',
      }),
    );

    expect(res.status).toBe(400);
  });
});
