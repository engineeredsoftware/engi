declare module '@bitcode/github' {
  import type { VCSAuth } from '@bitcode/vcs';

  export class GitHubProvider {
    constructor(config: Record<string, unknown>);
    listCommits(
      auth: VCSAuth,
      owner: string,
      repo: string,
      options: { branch?: string; perPage?: number }
    ): Promise<Array<{ sha: string; message: string; author?: { name?: string }; url: string }>>;
    createRepository(
      auth: VCSAuth,
      details: { name: string; description?: string; private?: boolean; autoInit?: boolean },
      options?: unknown
    ): Promise<{ id: string; name: string; description?: string; private?: boolean; url: string }>;
  }
}
