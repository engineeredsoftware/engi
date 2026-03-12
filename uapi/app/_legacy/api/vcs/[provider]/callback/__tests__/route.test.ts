import { NextRequest } from 'next/server';
import { GET } from '../route';
import { cookies } from 'next/headers';
import { createClient as createSupabaseServerClient } from '@engi/supabase/ssr/server';
import { VCSProviderFactory, VCSConnectionManager } from '@engi/vcs';

// Mock dependencies
jest.mock('next/headers', () => ({
  cookies: jest.fn()
}));

jest.mock('@engi/supabase/ssr/server', () => ({
  createClient: jest.fn()
}));

jest.mock('@engi/vcs', () => ({
  VCSProviderFactory: {
    create: jest.fn()
  },
  VCSConnectionManager: jest.fn(),
  getVCSConfig: jest.fn()
}));

describe('OAuth Callback Route Handler', () => {
  const mockCookies = {
    get: jest.fn(),
    delete: jest.fn()
  };

  const mockSupabase = {
    auth: {
      getUser: jest.fn()
    }
  };

  const mockConnectionManager = {
    saveConnection: jest.fn()
  };

  const mockProvider = {
    exchangeCodeForToken: jest.fn(),
    getCurrentUser: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (cookies as jest.Mock).mockReturnValue(mockCookies);
    (createSupabaseServerClient as jest.Mock).mockReturnValue(mockSupabase);
    (VCSConnectionManager as jest.Mock).mockImplementation(() => mockConnectionManager);
    (VCSProviderFactory.create as jest.Mock).mockResolvedValue(mockProvider);
  });

  describe('Successful OAuth callback', () => {
    test('GitHub callback completes successfully', async () => {
      // Mock cookie with state
      mockCookies.get.mockReturnValue({ value: 'test-state-token' });

      // Mock authenticated user
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-123' } },
        error: null
      });

      // Mock provider methods
      mockProvider.exchangeCodeForToken.mockResolvedValue({
        accessToken: 'github-access-token',
        tokenType: 'bearer',
        scope: 'repo user'
      });

      mockProvider.getCurrentUser.mockResolvedValue({
        id: 'github-user-123',
        username: 'octocat',
        displayName: 'The Octocat',
        email: 'octocat@github.com'
      });

      // Mock connection save
      mockConnectionManager.saveConnection.mockResolvedValue({
        id: 'connection-123',
        provider: 'github',
        userId: 'user-123'
      });

      const request = new NextRequest('http://localhost:3000/api/vcs/github/callback?code=auth-code-123&state=test-state-token');
      const response = await GET(request, { params: { provider: 'github' } });

      // Verify state validation
      expect(mockCookies.get).toHaveBeenCalledWith('vcs_oauth_state');
      expect(mockCookies.delete).toHaveBeenCalledWith('vcs_oauth_state');

      // Verify token exchange
      expect(mockProvider.exchangeCodeForToken).toHaveBeenCalledWith('auth-code-123');

      // Verify user info retrieval
      expect(mockProvider.getCurrentUser).toHaveBeenCalledWith({
        accessToken: 'github-access-token',
        tokenType: 'bearer',
        scope: 'repo user'
      });

      // Verify connection saved
      expect(mockConnectionManager.saveConnection).toHaveBeenCalledWith(
        'user-123',
        'github',
        {
          accessToken: 'github-access-token',
          providerUserId: 'github-user-123',
          providerUsername: 'octocat'
        }
      );

      // Verify redirect
      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toBe('/vcs/success?provider=github');
    });

    test('GitLab callback with refresh token', async () => {
      mockCookies.get.mockReturnValue({ value: 'test-state-token' });
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-123' } },
        error: null
      });

      mockProvider.exchangeCodeForToken.mockResolvedValue({
        accessToken: 'gitlab-access-token',
        refreshToken: 'gitlab-refresh-token',
        expiresAt: new Date(Date.now() + 7200000),
        tokenType: 'bearer',
        scope: 'api read_user'
      });

      mockProvider.getCurrentUser.mockResolvedValue({
        id: 'gitlab-user-123',
        username: 'gitlab-user'
      });

      const request = new NextRequest('http://localhost:3000/api/vcs/gitlab/callback?code=auth-code-456&state=test-state-token');
      const response = await GET(request, { params: { provider: 'gitlab' } });

      // Verify refresh token saved
      expect(mockConnectionManager.saveConnection).toHaveBeenCalledWith(
        'user-123',
        'gitlab',
        expect.objectContaining({
          refreshToken: 'gitlab-refresh-token',
          expiresAt: expect.any(Date)
        })
      );

      expect(response.status).toBe(302);
    });

    test('Bitbucket callback completes successfully', async () => {
      mockCookies.get.mockReturnValue({ value: 'test-state-token' });
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-123' } },
        error: null
      });

      mockProvider.exchangeCodeForToken.mockResolvedValue({
        accessToken: 'bitbucket-access-token',
        refreshToken: 'bitbucket-refresh-token',
        expiresAt: new Date(Date.now() + 3600000)
      });

      mockProvider.getCurrentUser.mockResolvedValue({
        id: '{bitbucket-user-123}',
        username: 'bitbucket-user'
      });

      const request = new NextRequest('http://localhost:3000/api/vcs/bitbucket/callback?code=auth-code-789&state=test-state-token');
      const response = await GET(request, { params: { provider: 'bitbucket' } });

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toBe('/vcs/success?provider=bitbucket');
    });
  });

  describe('Error handling', () => {
    test('returns 400 for invalid provider', async () => {
      const request = new NextRequest('http://localhost:3000/api/vcs/invalid/callback?code=test&state=test');
      const response = await GET(request, { params: { provider: 'invalid' } });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Invalid VCS provider');
    });

    test('returns 400 for missing code parameter', async () => {
      const request = new NextRequest('http://localhost:3000/api/vcs/github/callback?state=test');
      const response = await GET(request, { params: { provider: 'github' } });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Missing authorization code');
    });

    test('returns 400 for missing state parameter', async () => {
      const request = new NextRequest('http://localhost:3000/api/vcs/github/callback?code=test');
      const response = await GET(request, { params: { provider: 'github' } });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Missing state parameter');
    });

    test('returns 401 for state mismatch', async () => {
      mockCookies.get.mockReturnValue({ value: 'expected-state' });

      const request = new NextRequest('http://localhost:3000/api/vcs/github/callback?code=test&state=wrong-state');
      const response = await GET(request, { params: { provider: 'github' } });

      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data.error).toBe('Invalid state parameter');
    });

    test('returns 401 for missing stored state', async () => {
      mockCookies.get.mockReturnValue(null);

      const request = new NextRequest('http://localhost:3000/api/vcs/github/callback?code=test&state=test');
      const response = await GET(request, { params: { provider: 'github' } });

      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data.error).toBe('Invalid state parameter');
    });

    test('returns 401 for unauthenticated user', async () => {
      mockCookies.get.mockReturnValue({ value: 'test-state' });
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: null
      });

      const request = new NextRequest('http://localhost:3000/api/vcs/github/callback?code=test&state=test-state');
      const response = await GET(request, { params: { provider: 'github' } });

      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data.error).toBe('Not authenticated');
    });

    test('handles token exchange failure', async () => {
      mockCookies.get.mockReturnValue({ value: 'test-state' });
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-123' } },
        error: null
      });

      mockProvider.exchangeCodeForToken.mockRejectedValue(new Error('Invalid authorization code'));

      const request = new NextRequest('http://localhost:3000/api/vcs/github/callback?code=invalid&state=test-state');
      const response = await GET(request, { params: { provider: 'github' } });

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toBe('/vcs/error?provider=github&error=oauth_failed');
    });

    test('handles user info retrieval failure', async () => {
      mockCookies.get.mockReturnValue({ value: 'test-state' });
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-123' } },
        error: null
      });

      mockProvider.exchangeCodeForToken.mockResolvedValue({
        accessToken: 'token'
      });

      mockProvider.getCurrentUser.mockRejectedValue(new Error('API error'));

      const request = new NextRequest('http://localhost:3000/api/vcs/github/callback?code=test&state=test-state');
      const response = await GET(request, { params: { provider: 'github' } });

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toBe('/vcs/error?provider=github&error=user_fetch_failed');
    });

    test('handles connection save failure', async () => {
      mockCookies.get.mockReturnValue({ value: 'test-state' });
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: { id: 'user-123' } },
        error: null
      });

      mockProvider.exchangeCodeForToken.mockResolvedValue({
        accessToken: 'token'
      });

      mockProvider.getCurrentUser.mockResolvedValue({
        id: 'provider-user-123',
        username: 'testuser'
      });

      mockConnectionManager.saveConnection.mockRejectedValue(new Error('Database error'));

      const request = new NextRequest('http://localhost:3000/api/vcs/github/callback?code=test&state=test-state');
      const response = await GET(request, { params: { provider: 'github' } });

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toBe('/vcs/error?provider=github&error=connection_save_failed');
    });
  });

  describe('OAuth error responses', () => {
    test('handles access_denied error', async () => {
      const request = new NextRequest('http://localhost:3000/api/vcs/github/callback?error=access_denied&error_description=User+denied+access');
      const response = await GET(request, { params: { provider: 'github' } });

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toBe('/vcs/error?provider=github&error=access_denied');
    });

    test('handles generic OAuth error', async () => {
      const request = new NextRequest('http://localhost:3000/api/vcs/gitlab/callback?error=server_error');
      const response = await GET(request, { params: { provider: 'gitlab' } });

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toBe('/vcs/error?provider=gitlab&error=server_error');
    });
  });
});
