import GitHubProvider from '../providers/github-provider';

const octokitInstances: Array<{ options: any; users: { getAuthenticated: jest.Mock } }> = [];

jest.mock('@octokit/rest', () => {
  return {
    Octokit: jest.fn().mockImplementation((options: any) => {
      const instance = {
        users: {
          getAuthenticated: jest.fn().mockResolvedValue({
            data: {
              id: 42,
              login: 'monalisa',
              name: 'Mona Lisa',
              email: 'mona@example.com',
              avatar_url: 'https://avatars.example.com/u/42',
              html_url: 'https://github.com/monalisa'
            }
          })
        }
      };
      octokitInstances.push({ options, users: instance.users });
      return instance;
    })
  };
});

jest.mock('@octokit/auth-app', () => ({
  createAppAuth: jest.fn()
}));

jest.mock('@octokit/webhooks-methods', () => ({
  verify: jest.fn().mockResolvedValue(true)
}));

const baseConfig = {
  provider: 'github' as const,
  clientId: 'client-id',
  clientSecret: 'client-secret',
  redirectUri: 'https://app.test/oauth/callback'
};

describe('GitHubProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    octokitInstances.length = 0;
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('builds authorization URLs with scopes and state', () => {
    const provider = new GitHubProvider(baseConfig);
    const url = provider.getAuthorizationUrl('state-123', ['repo', 'user:email']);

    expect(url).toContain('client_id=client-id');
    expect(url).toContain('scope=repo+user%3Aemail');
    expect(url).toContain('state=state-123');
  });

  it('caches Octokit clients per access token during validation', async () => {
    const provider = new GitHubProvider(baseConfig);

    const result = await provider.validateToken({ accessToken: 'ghu_token' });
    expect(result).toBe(true);
    expect(octokitInstances).toHaveLength(1);
    expect(octokitInstances[0]?.options).toMatchObject({
      auth: 'ghu_token',
      baseUrl: 'https://api.github.com'
    });

    await provider.validateToken({ accessToken: 'ghu_token' });
    expect(octokitInstances).toHaveLength(1);

    await provider.validateToken({ accessToken: 'ghs_installation_token' });
    expect(octokitInstances).toHaveLength(2);
  });
});
