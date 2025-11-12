import { NextRequest, NextResponse } from 'next/server';
import { GET } from '../route';
import { cookies } from 'next/headers';
import { VCSProviderFactory } from '@engi/vcs';

// Mock dependencies
jest.mock('next/headers', () => ({
  cookies: jest.fn()
}));

jest.mock('@engi/vcs', () => ({
  VCSProviderFactory: {
    create: jest.fn()
  },
  getVCSConfig: jest.fn()
}));

jest.mock('crypto', () => ({
  randomBytes: jest.fn().mockReturnValue({
    toString: jest.fn().mockReturnValue('mock-state-token')
  })
}));

describe('OAuth Route Handler', () => {
  const mockCookies = {
    set: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (cookies as jest.Mock).mockReturnValue(mockCookies);
    
    // Set up environment variables
    process.env.GITHUB_CLIENT_ID = 'github-client-id';
    process.env.GITHUB_CLIENT_SECRET = 'github-client-secret';
    process.env.GITHUB_REDIRECT_URI = 'http://localhost:3000/api/vcs/github/callback';
    process.env.GITLAB_CLIENT_ID = 'gitlab-client-id';
    process.env.GITLAB_CLIENT_SECRET = 'gitlab-client-secret';
    process.env.GITLAB_REDIRECT_URI = 'http://localhost:3000/api/vcs/gitlab/callback';
    process.env.BITBUCKET_CLIENT_ID = 'bitbucket-client-id';
    process.env.BITBUCKET_CLIENT_SECRET = 'bitbucket-client-secret';
    process.env.BITBUCKET_REDIRECT_URI = 'http://localhost:3000/api/vcs/bitbucket/callback';
  });

  describe('GitHub OAuth', () => {
    test('redirects to GitHub authorization URL', async () => {
      const mockProvider = {
        getAuthorizationUrl: jest.fn().mockReturnValue('https://github.com/login/oauth/authorize?client_id=github-client-id&state=mock-state-token')
      };

      (VCSProviderFactory.create as jest.Mock).mockResolvedValue(mockProvider);

      const request = new NextRequest('http://localhost:3000/api/vcs/github/oauth');
      const response = await GET(request, { params: { provider: 'github' } });

      expect(VCSProviderFactory.create).toHaveBeenCalledWith({
        provider: 'github',
        clientId: 'github-client-id',
        clientSecret: 'github-client-secret',
        redirectUri: 'http://localhost:3000/api/vcs/github/callback',
        instanceUrl: undefined,
        appId: undefined,
        privateKey: undefined,
        webhookSecret: undefined
      });

      expect(mockProvider.getAuthorizationUrl).toHaveBeenCalledWith('mock-state-token');

      expect(mockCookies.set).toHaveBeenCalledWith(
        'vcs_oauth_state',
        'mock-state-token',
        expect.objectContaining({
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
          maxAge: 600
        })
      );

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toBe('https://github.com/login/oauth/authorize?client_id=github-client-id&state=mock-state-token');
    });
  });

  describe('GitLab OAuth', () => {
    test('redirects to GitLab authorization URL', async () => {
      const mockProvider = {
        getAuthorizationUrl: jest.fn().mockReturnValue('https://gitlab.com/oauth/authorize?client_id=gitlab-client-id&state=mock-state-token')
      };

      (VCSProviderFactory.create as jest.Mock).mockResolvedValue(mockProvider);

      const request = new NextRequest('http://localhost:3000/api/vcs/gitlab/oauth');
      const response = await GET(request, { params: { provider: 'gitlab' } });

      expect(VCSProviderFactory.create).toHaveBeenCalledWith(
        expect.objectContaining({
          provider: 'gitlab',
          clientId: 'gitlab-client-id'
        })
      );

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toContain('gitlab.com/oauth/authorize');
    });

    test('supports custom instance URL', async () => {
      process.env.GITLAB_INSTANCE_URL = 'https://gitlab.company.com';

      const mockProvider = {
        getAuthorizationUrl: jest.fn().mockReturnValue('https://gitlab.company.com/oauth/authorize?client_id=gitlab-client-id&state=mock-state-token')
      };

      (VCSProviderFactory.create as jest.Mock).mockResolvedValue(mockProvider);

      const request = new NextRequest('http://localhost:3000/api/vcs/gitlab/oauth');
      const response = await GET(request, { params: { provider: 'gitlab' } });

      expect(VCSProviderFactory.create).toHaveBeenCalledWith(
        expect.objectContaining({
          instanceUrl: 'https://gitlab.company.com'
        })
      );

      expect(response.headers.get('Location')).toContain('gitlab.company.com/oauth/authorize');
    });
  });

  describe('Bitbucket OAuth', () => {
    test('redirects to Bitbucket authorization URL', async () => {
      const mockProvider = {
        getAuthorizationUrl: jest.fn().mockReturnValue('https://bitbucket.org/site/oauth2/authorize?client_id=bitbucket-client-id&state=mock-state-token')
      };

      (VCSProviderFactory.create as jest.Mock).mockResolvedValue(mockProvider);

      const request = new NextRequest('http://localhost:3000/api/vcs/bitbucket/oauth');
      const response = await GET(request, { params: { provider: 'bitbucket' } });

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toContain('bitbucket.org/site/oauth2/authorize');
    });
  });

  describe('Error handling', () => {
    test('returns 400 for invalid provider', async () => {
      const request = new NextRequest('http://localhost:3000/api/vcs/invalid/oauth');
      const response = await GET(request, { params: { provider: 'invalid' } });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Invalid VCS provider');
    });

    test('returns 500 for provider creation failure', async () => {
      (VCSProviderFactory.create as jest.Mock).mockRejectedValue(new Error('Provider creation failed'));

      const request = new NextRequest('http://localhost:3000/api/vcs/github/oauth');
      const response = await GET(request, { params: { provider: 'github' } });

      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data.error).toBe('Failed to initiate OAuth flow');
    });
  });

  describe('Security', () => {
    test('sets secure cookie in production', async () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const mockProvider = {
        getAuthorizationUrl: jest.fn().mockReturnValue('https://github.com/login/oauth/authorize')
      };

      (VCSProviderFactory.create as jest.Mock).mockResolvedValue(mockProvider);

      const request = new NextRequest('https://app.example.com/api/vcs/github/oauth');
      await GET(request, { params: { provider: 'github' } });

      expect(mockCookies.set).toHaveBeenCalledWith(
        'vcs_oauth_state',
        expect.any(String),
        expect.objectContaining({
          secure: true
        })
      );

      process.env.NODE_ENV = originalEnv;
    });

    test('generates unique state tokens', async () => {
      const mockProvider = {
        getAuthorizationUrl: jest.fn()
      };

      (VCSProviderFactory.create as jest.Mock).mockResolvedValue(mockProvider);

      const crypto = require('crypto');
      const states = new Set();

      // Generate multiple state tokens
      for (let i = 0; i < 5; i++) {
        crypto.randomBytes.mockReturnValue({
          toString: jest.fn().mockReturnValue(`state-${i}`)
        });

        const request = new NextRequest('http://localhost:3000/api/vcs/github/oauth');
        await GET(request, { params: { provider: 'github' } });

        const stateCall = mockProvider.getAuthorizationUrl.mock.calls[i];
        states.add(stateCall[0]);
      }

      // All states should be unique
      expect(states.size).toBe(5);
    });
  });
});