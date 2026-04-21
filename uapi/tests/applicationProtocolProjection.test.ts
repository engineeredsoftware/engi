import {
  buildProtocolProjectedWorkspaceRun,
  mergeProtocolProjectedRun,
} from '@/app/application/application-protocol-projection';
import type { ApplicationRepositoryContextState } from '@/app/application/application-repository-context';
import type { WorkspaceRun } from '@/app/application/application-run-data';

describe('application-protocol-projection', () => {
  const repositoryContext: ApplicationRepositoryContextState = {
    provider: 'github',
    connectionStatus: {
      connected: true,
      provider: 'github',
      valid: true,
      username: 'garrett',
      metadata: {
        account: 'bitcode',
      },
    },
    repositories: [],
    selectedRepository: {
      id: 'repo-1',
      name: 'terminal',
      fullName: 'bitcode/terminal',
      private: true,
      defaultBranch: 'main',
      url: 'https://github.com/bitcode/terminal',
      cloneUrl: 'https://github.com/bitcode/terminal.git',
      owner: {
        id: 'owner-1',
        username: 'bitcode',
        type: 'organization',
      },
    },
  };

  it('builds a canonical projected workspace run from live protocol posture', () => {
    const projectedRun = buildProtocolProjectedWorkspaceRun(
      {
        scenario: {
          scenarioFamily: 'auth-remediation',
        },
        needingSurface: {
          needSummary: 'Measure issuer-auth drift against the active repository boundary.',
          parserKind: 'benchmark-parser',
        },
        inventory: {
          selectedCount: 3,
        },
      } as any,
      repositoryContext,
    );

    expect(projectedRun).toMatchObject({
      type: 'agentic-execution:need-measurement',
      status: 'running',
      sourceModel: 'protocol-projection',
      repository: 'bitcode/terminal',
      branch: 'main',
      participant: 'garrett',
      itemCount: 3,
      summary: 'Measure issuer-auth drift against the active repository boundary.',
    });
    expect(projectedRun?.id).toContain('protocol-live-posture::');
  });

  it('prefers a projected protocol row ahead of persisted execution history rows', () => {
    const projectedRun = {
      id: 'protocol-live-posture::bitcode-terminal',
      created_at: '2026-04-21T18:00:00.000Z',
      type: 'agentic-execution:proof-refresh',
      status: 'running',
      sourceModel: 'protocol-projection',
    } satisfies WorkspaceRun;
    const historyRun = {
      id: 'run-123',
      created_at: '2026-04-21T17:00:00.000Z',
      type: 'agentic-execution:branch-artifact',
      status: 'completed',
      sourceModel: 'execution-history',
    } satisfies WorkspaceRun;

    expect(mergeProtocolProjectedRun([historyRun], projectedRun)).toEqual([projectedRun, historyRun]);
  });
});
