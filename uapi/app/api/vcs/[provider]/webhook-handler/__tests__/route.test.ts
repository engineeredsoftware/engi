import { NextRequest } from 'next/server';
import { POST } from '../route';
import { createClient as createSupabaseServerClient } from '@engi/supabase/ssr/server';
import { VCSProviderFactory, getVCSConfig } from '@engi/vcs';

// Mock dependencies
jest.mock('@engi/supabase/ssr/server', () => ({
  createClient: jest.fn()
}));

jest.mock('@engi/vcs', () => ({
  VCSProviderFactory: {
    create: jest.fn()
  },
  getVCSConfig: jest.fn()
}));

describe('Webhook Handler Route', () => {
  const mockSupabase = {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn(),
    insert: jest.fn().mockReturnThis()
  };

  const mockProvider = {
    verifyWebhookSignature: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (createSupabaseServerClient as jest.Mock).mockReturnValue(mockSupabase);
    (VCSProviderFactory.create as jest.Mock).mockResolvedValue(mockProvider);
    (getVCSConfig as jest.Mock).mockReturnValue({
      provider: 'github',
      clientId: 'test',
      clientSecret: 'test',
      redirectUri: 'test'
    });
  });

  describe('GitHub webhooks', () => {
    test('processes push event successfully', async () => {
      const payload = {
        ref: 'refs/heads/main',
        repository: {
          owner: { login: 'octocat' },
          name: 'hello-world'
        },
        commits: [
          { id: 'abc123', message: 'Test commit' }
        ]
      };

      const mockWebhook = {
        id: 'webhook-123',
        provider: 'github',
        owner: 'octocat',
        repo: 'hello-world',
        secret: 'webhook-secret',
        active: true
      };

      mockSupabase.single.mockResolvedValueOnce({
        data: mockWebhook,
        error: null
      });

      mockProvider.verifyWebhookSignature.mockReturnValue(true);

      mockSupabase.insert.mockResolvedValueOnce({
        data: { id: 'event-123' },
        error: null
      });

      const request = new NextRequest(
        'http://localhost:3000/api/vcs/github/webhook-handler',
        {
          method: 'POST',
          headers: {
            'x-hub-signature-256': 'sha256=valid-signature',
            'x-github-event': 'push',
            'content-type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      const response = await POST(request, { params: { provider: 'github' } });

      // Verify webhook lookup
      expect(mockSupabase.eq).toHaveBeenCalledWith('provider', 'github');
      expect(mockSupabase.eq).toHaveBeenCalledWith('owner', 'octocat');
      expect(mockSupabase.eq).toHaveBeenCalledWith('repo', 'hello-world');
      expect(mockSupabase.eq).toHaveBeenCalledWith('active', true);

      // Verify signature verification
      expect(mockProvider.verifyWebhookSignature).toHaveBeenCalledWith(
        JSON.stringify(payload),
        'sha256=valid-signature',
        'webhook-secret'
      );

      // Verify event recorded
      expect(mockSupabase.insert).toHaveBeenCalledWith(
        expect.objectContaining({
          webhook_id: 'webhook-123',
          event_type: 'push',
          common_event_type: 'push',
          payload,
          processed: true
        })
      );

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.success).toBe(true);
      expect(data.event).toBe('push');
    });

    test('processes pull request event', async () => {
      const payload = {
        action: 'opened',
        pull_request: {
          number: 42,
          title: 'New feature',
          user: { login: 'contributor' }
        },
        repository: {
          owner: { login: 'octocat' },
          name: 'hello-world'
        }
      };

      const mockWebhook = {
        id: 'webhook-123',
        provider: 'github',
        owner: 'octocat',
        repo: 'hello-world',
        secret: 'webhook-secret',
        active: true
      };

      mockSupabase.single.mockResolvedValueOnce({
        data: mockWebhook,
        error: null
      });

      mockProvider.verifyWebhookSignature.mockReturnValue(true);

      const request = new NextRequest(
        'http://localhost:3000/api/vcs/github/webhook-handler',
        {
          method: 'POST',
          headers: {
            'x-hub-signature-256': 'sha256=valid-signature',
            'x-github-event': 'pull_request'
          },
          body: JSON.stringify(payload)
        }
      );

      const response = await POST(request, { params: { provider: 'github' } });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.event).toBe('pull_request');
    });
  });

  describe('GitLab webhooks', () => {
    test('processes merge request event', async () => {
      const payload = {
        object_kind: 'merge_request',
        object_attributes: {
          iid: 10,
          title: 'Feature MR',
          state: 'opened',
          action: 'open'
        },
        project: {
          path_with_namespace: 'group/project'
        }
      };

      const mockWebhook = {
        id: 'webhook-456',
        provider: 'gitlab',
        owner: 'group',
        repo: 'project',
        secret: 'gitlab-token',
        active: true
      };

      mockSupabase.single.mockResolvedValueOnce({
        data: mockWebhook,
        error: null
      });

      mockProvider.verifyWebhookSignature.mockReturnValue(true);

      const request = new NextRequest(
        'http://localhost:3000/api/vcs/gitlab/webhook-handler',
        {
          method: 'POST',
          headers: {
            'x-gitlab-token': 'gitlab-token',
            'x-gitlab-event': 'Merge Request Hook'
          },
          body: JSON.stringify(payload)
        }
      );

      const response = await POST(request, { params: { provider: 'gitlab' } });

      // Verify GitLab-specific parsing
      expect(mockSupabase.eq).toHaveBeenCalledWith('owner', 'group');
      expect(mockSupabase.eq).toHaveBeenCalledWith('repo', 'project');

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.event).toBe('pull_request');
    });

    test('handles issue event', async () => {
      const payload = {
        object_kind: 'issue',
        object_attributes: {
          iid: 5,
          title: 'Bug report',
          state: 'opened'
        },
        project: {
          path_with_namespace: 'user/project'
        }
      };

      const mockWebhook = {
        id: 'webhook-456',
        provider: 'gitlab',
        owner: 'user',
        repo: 'project',
        secret: 'gitlab-token',
        active: true
      };

      mockSupabase.single.mockResolvedValueOnce({
        data: mockWebhook,
        error: null
      });

      mockProvider.verifyWebhookSignature.mockReturnValue(true);

      const request = new NextRequest(
        'http://localhost:3000/api/vcs/gitlab/webhook-handler',
        {
          method: 'POST',
          headers: {
            'x-gitlab-token': 'gitlab-token',
            'x-gitlab-event': 'Issue Hook'
          },
          body: JSON.stringify(payload)
        }
      );

      const response = await POST(request, { params: { provider: 'gitlab' } });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.event).toBe('issues');
    });
  });

  describe('Bitbucket webhooks', () => {
    test('processes repository push event', async () => {
      const payload = {
        push: {
          changes: [{
            new: { name: 'main' },
            commits: [{ hash: 'def456' }]
          }]
        },
        repository: {
          workspace: { slug: 'workspace' },
          slug: 'repo'
        }
      };

      const mockWebhook = {
        id: 'webhook-789',
        provider: 'bitbucket',
        owner: 'workspace',
        repo: 'repo',
        active: true
      };

      mockSupabase.single.mockResolvedValueOnce({
        data: mockWebhook,
        error: null
      });

      // Bitbucket doesn't use signatures by default
      mockProvider.verifyWebhookSignature.mockReturnValue(true);

      const request = new NextRequest(
        'http://localhost:3000/api/vcs/bitbucket/webhook-handler',
        {
          method: 'POST',
          headers: {
            'x-hook-uuid': '{webhook-uuid}',
            'x-event-key': 'repo:push'
          },
          body: JSON.stringify(payload)
        }
      );

      const response = await POST(request, { params: { provider: 'bitbucket' } });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.event).toBe('push');
    });

    test('processes pull request created event', async () => {
      const payload = {
        pullrequest: {
          id: 100,
          title: 'New PR',
          state: 'OPEN'
        },
        repository: {
          workspace: { slug: 'workspace' },
          slug: 'repo'
        }
      };

      const mockWebhook = {
        id: 'webhook-789',
        provider: 'bitbucket',
        owner: 'workspace',
        repo: 'repo',
        active: true
      };

      mockSupabase.single.mockResolvedValueOnce({
        data: mockWebhook,
        error: null
      });

      const request = new NextRequest(
        'http://localhost:3000/api/vcs/bitbucket/webhook-handler',
        {
          method: 'POST',
          headers: {
            'x-hook-uuid': '{webhook-uuid}',
            'x-event-key': 'pullrequest:created'
          },
          body: JSON.stringify(payload)
        }
      );

      const response = await POST(request, { params: { provider: 'bitbucket' } });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.event).toBe('pull_request');
    });
  });

  describe('Error handling', () => {
    test('returns 400 for invalid provider', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/vcs/invalid/webhook-handler',
        {
          method: 'POST',
          headers: { 'x-github-event': 'push' },
          body: '{}'
        }
      );

      const response = await POST(request, { params: { provider: 'invalid' } });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Invalid VCS provider');
    });

    test('returns 400 for missing event header', async () => {
      const request = new NextRequest(
        'http://localhost:3000/api/vcs/github/webhook-handler',
        {
          method: 'POST',
          body: '{}'
        }
      );

      const response = await POST(request, { params: { provider: 'github' } });

      expect(response.status).toBe(400);
      const data = await response.json();
      expect(data.error).toBe('Missing event header');
    });

    test('returns 404 for unregistered webhook', async () => {
      mockSupabase.single.mockResolvedValueOnce({
        data: null,
        error: { message: 'Not found' }
      });

      const request = new NextRequest(
        'http://localhost:3000/api/vcs/github/webhook-handler',
        {
          method: 'POST',
          headers: {
            'x-github-event': 'push'
          },
          body: JSON.stringify({
            repository: { owner: { login: 'unknown' }, name: 'unknown' }
          })
        }
      );

      const response = await POST(request, { params: { provider: 'github' } });

      expect(response.status).toBe(404);
      const data = await response.json();
      expect(data.error).toBe('Webhook not registered');
    });

    test('returns 401 for invalid signature', async () => {
      const mockWebhook = {
        id: 'webhook-123',
        provider: 'github',
        owner: 'octocat',
        repo: 'hello-world',
        secret: 'webhook-secret',
        active: true
      };

      mockSupabase.single.mockResolvedValueOnce({
        data: mockWebhook,
        error: null
      });

      mockProvider.verifyWebhookSignature.mockReturnValue(false);

      const request = new NextRequest(
        'http://localhost:3000/api/vcs/github/webhook-handler',
        {
          method: 'POST',
          headers: {
            'x-hub-signature-256': 'sha256=invalid-signature',
            'x-github-event': 'push'
          },
          body: JSON.stringify({
            repository: { owner: { login: 'octocat' }, name: 'hello-world' }
          })
        }
      );

      const response = await POST(request, { params: { provider: 'github' } });

      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data.error).toBe('Invalid webhook signature');
    });
  });

  describe('Event processing', () => {
    test('handles unhandled event types gracefully', async () => {
      const mockWebhook = {
        id: 'webhook-123',
        provider: 'github',
        owner: 'octocat',
        repo: 'hello-world',
        active: true
      };

      mockSupabase.single.mockResolvedValueOnce({
        data: mockWebhook,
        error: null
      });

      const request = new NextRequest(
        'http://localhost:3000/api/vcs/github/webhook-handler',
        {
          method: 'POST',
          headers: {
            'x-github-event': 'unknown_event'
          },
          body: JSON.stringify({
            repository: { owner: { login: 'octocat' }, name: 'hello-world' }
          })
        }
      );

      const response = await POST(request, { params: { provider: 'github' } });

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.event).toBe('unknown_event');
      expect(data.processed).toBe(true);
    });
  });
});
