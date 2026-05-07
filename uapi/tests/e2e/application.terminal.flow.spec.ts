import { test, expect } from '@playwright/test';

function json(body: unknown, status = 200) {
  return {
    status,
    contentType: 'application/json',
    body: JSON.stringify(body),
  };
}

function buildExternalRuntimePayload() {
  return {
    activeRuntime: {
      configuredEnvironmentMode: 'staging',
      actualityDisposition: 'boundary-reviewed',
      interfaceRuntimeStates: [
        {
          interfaceId: 'github-live-interface',
          runtimeState: 'live-configured',
          resultClass: 'connected',
          reconciliationState: 'reconciled',
          telemetryCoverageState: 'covered',
          liveEnabled: true,
          missingBindingKeys: [],
          missingSecretEnvKeys: [],
          environmentIdentityRef: 'staging/github',
          environmentResourceRef: 'installation/bitcode',
        },
        {
          interfaceId: 'bitcoin-mainchain-execution',
          runtimeState: 'stubbed-demonstration',
          resultClass: 'boundary-only',
          reconciliationState: 'preview',
          telemetryCoverageState: 'covered',
          liveEnabled: false,
          missingBindingKeys: [],
          missingSecretEnvKeys: [],
          environmentIdentityRef: null,
          environmentResourceRef: null,
        },
      ],
    },
  };
}

test.describe('Bitcode Terminal browser flow', () => {
  test('application route keeps read, selection, and repository-anchor write-through in one Terminal surface', async ({
    page,
    context,
  }) => {
    const repositorySnapshot = {
      org: 'bitcode',
      repo: 'terminal',
      branch: 'main',
      commit: 'abc123',
    };

    let postedExecutionHistoryDraft: Record<string, any> | null = null;

    const historyRows: Array<Record<string, any>> = [
      {
        id: 'run-proof',
        created_at: '2026-04-22T14:03:00.000Z',
        status: 'completed',
        type: 'agentic-execution:proof-refresh',
        summary: 'Recorded closure posture.',
        repo_snapshot: repositorySnapshot,
        items: [{ id: 'artifact-proof' }],
        agentic_execution: {
          canonicalType: 'agentic-execution:proof-refresh',
          label: 'Proof execution',
          lens: 'closure',
          proofStatus: 'proof witness ready',
          closureFocus: 'bounded disclosure',
        },
        processing_stats: {
          time: '4m 12s',
          tokens: { input: 120, output: 40, total: 160 },
          measuredBtd: 24.5,
          btcFeeUsdEquivalent: 1.62,
          averageLatencyMs: 930,
        },
        asset_pack_completion: {
          summary: 'Recorded closure posture.',
          repoSnapshot: repositorySnapshot,
          processingStats: {
            time: '4m 12s',
            tokens: { input: 120, output: 40, total: 160 },
            measuredBtd: 24.5,
            btcFeeUsdEquivalent: 1.62,
            averageLatencyMs: 930,
          },
          closureFollowThrough: {
            canonLabel: 'Bitcode active posture',
            settlementMetrics: [{ label: 'Credited assets', value: '2' }],
            branchArtifacts: ['BITCODE_NEED.md'],
            proofFamilies: [
              {
                label: 'selection-materialization',
                artifactPath: '.bitcode/selection-and-materialization-proof.json',
                theoremStatus: 'passed',
                replayArtifacts: '3',
              },
            ],
            recentHistory: [
              {
                label: 'run-proof',
                summary: 'bitcode/terminal · main · completed · closure posture',
              },
            ],
          },
        },
      },
      {
        id: 'run-need',
        created_at: '2026-04-22T13:20:00.000Z',
        status: 'completed',
        type: 'agentic-execution:need-measurement',
        summary: 'Recorded need measurement for auth-remediation.',
        repo_snapshot: {
          org: 'bitcode',
          repo: 'terminal',
          branch: 'fit',
          commit: 'def456',
        },
        items: [{ id: 'artifact-need' }],
        agentic_execution: {
          canonicalType: 'agentic-execution:need-measurement',
          label: 'Need measurement execution',
          lens: 'need',
          proofStatus: 'need-measurement witness ready',
          closureFocus: 'need measurement + verification posture',
        },
        processing_stats: {
          time: '55s',
          tokens: { input: 70, output: 10, total: 80 },
          measuredBtd: 5.5,
          btcFeeUsdEquivalent: 0.22,
          averageLatencyMs: 480,
        },
        asset_pack_completion: {
          summary: 'Recorded need measurement for auth-remediation.',
          repoSnapshot: {
            org: 'bitcode',
            repo: 'terminal',
            branch: 'fit',
            commit: 'def456',
          },
          needMeasurement: {
            parserKind: 'benchmark-parser',
            closureCriteriaCount: 2,
            targetKindCount: 3,
            scenario: {
              id: 'scenario-auth',
              label: 'auth-remediation',
              repo: 'bitcode/terminal',
              profile: 'Targeted deposit',
              selected: true,
            },
          },
        },
      },
    ];

    const historyDetails: Record<string, { run: Record<string, any>; events: Array<Record<string, any>> }> = {
      'run-proof': {
        run: historyRows[0],
        events: [
          {
            id: 'proof-phase-1',
            run_id: 'run-proof',
            event_type: 'phase',
            created_at: '2026-04-22T14:02:00.000Z',
            event: {
              type: 'phase',
              phase: 'verification',
              status: 'running',
            },
          },
          {
            id: 'proof-complete',
            run_id: 'run-proof',
            event_type: 'completion',
            created_at: '2026-04-22T14:03:00.000Z',
            event: {
              type: 'completion',
              phase: 'settlement',
              status: 'completed',
            },
          },
        ],
      },
      'run-need': {
        run: historyRows[1],
        events: [
          {
            id: 'need-phase-1',
            run_id: 'run-need',
            event_type: 'phase',
            created_at: '2026-04-22T13:19:00.000Z',
            event: {
              type: 'phase',
              phase: 'Need measurement refresh',
              status: 'running',
            },
          },
        ],
      },
    };

    await context.route('**/auth/v1/user*', async (route) => {
      await route.fulfill(
        json({
          data: { user: { id: 'user-1', email: 'operator@bitcode.test' } },
          error: null,
        }),
      );
    });

    await context.route('**/api/auxillaries/data', async (route) => {
      await route.fulfill(
        json({
          profile: {
            id: 'user-1',
            settings: {
              walletBinding: {
                address: 'bc1qbitcodeterminal0001',
                provider: 'river',
                status: 'verified',
                boundAt: '2026-04-22T12:00:00.000Z',
              },
            },
          },
          githubConnection: {
            provider: 'github',
            username: 'bitcode',
          },
          vcsConnections: [{ provider: 'github' }],
          btdBalance: 420,
        }),
      );
    });

    await context.route('**/api/vcs/github/connection', async (route) => {
      await route.fulfill(
        json({
          connected: true,
          valid: true,
          username: 'bitcode',
          metadata: {
            account: 'bitcode',
            repositories: 1,
            status: 'connected',
            mock_mode: false,
          },
        }),
      );
    });

    await context.route('**/api/vcs/github/repositories', async (route) => {
      await route.fulfill(
        json({
          repositories: [
            {
              id: 'repo-1',
              fullName: 'bitcode/terminal',
              defaultBranch: 'main',
              private: true,
              language: 'TypeScript',
              topics: ['bitcode', 'exchange'],
              url: 'https://github.com/bitcode/terminal',
              owner: {
                id: 'owner-1',
                username: 'bitcode',
              },
            },
          ],
        }),
      );
    });

    await context.route('**/api/external-realization*', async (route) => {
      await route.fulfill(json(buildExternalRuntimePayload()));
    });

    await context.route('**/api/executions/history', async (route) => {
      const method = route.request().method();

      if (method === 'GET') {
        await route.fulfill(json(historyRows));
        return;
      }

      if (method === 'POST') {
        postedExecutionHistoryDraft = route.request().postDataJSON() as Record<string, any>;
        const anchorExecution = {
          id: 'run-anchor',
          created_at: '2026-04-22T15:10:00.000Z',
          status: 'completed',
          type: postedExecutionHistoryDraft.pipeline_type,
          summary: postedExecutionHistoryDraft.output?.summary,
          repo_snapshot: postedExecutionHistoryDraft.output?.repo_snapshot,
          items: [],
          agentic_execution: {
            canonicalType: 'agentic-execution:asset-pack',
            label: 'AssetPack execution',
            lens: 'give',
            proofStatus: 'repository-anchor witness recorded',
            closureFocus: 'repository supply boundary',
          },
          processing_stats: {
            time: '18s',
            tokens: { input: 55, output: 18, total: 73 },
            measuredBtd: 4.2,
            btcFeeUsdEquivalent: 0.13,
            averageLatencyMs: 410,
          },
          asset_pack_completion: {
            ...(postedExecutionHistoryDraft.output?.asset_pack_completion || {}),
            processingStats: {
              time: '18s',
              tokens: { total: 73 },
              measuredBtd: 4.2,
              btcFeeUsdEquivalent: 0.13,
              averageLatencyMs: 410,
            },
          },
        };

        historyRows.unshift(anchorExecution);
        historyDetails['run-anchor'] = {
          run: anchorExecution,
          events: [
            {
              id: 'anchor-phase-1',
              run_id: 'run-anchor',
              event_type: 'phase',
              created_at: '2026-04-22T15:09:00.000Z',
              event: {
                type: 'phase',
                phase: 'repository-anchor',
                status: 'completed',
              },
            },
          ],
        };

        await route.fulfill(
          json({
            execution: anchorExecution,
          }, 201),
        );
        return;
      }

      await route.fallback();
    });

    await context.route('**/api/executions/history/*', async (route) => {
      const runId = route.request().url().split('/').pop() || '';
      const payload = historyDetails[runId];

      if (!payload) {
        await route.fulfill(json({ error: 'Execution not found or access denied' }, 404));
        return;
      }

      await route.fulfill(json(payload));
    });

    await page.goto('/application?provider=github&repo=bitcode%2Fterminal&transactionId=run-proof&transactionDetail=activity');

    await expect(page.getByText('Recent Terminal activity')).toBeVisible();
    await expect(page.getByText('Proof execution')).toBeVisible();
    await expect(page.getByText(/Recorded closure posture\./)).toBeVisible();
    await expect(page.getByText('Connected as bitcode')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Record repository anchor' })).toBeEnabled();

    const needDetailResponse = page.waitForResponse((response) =>
      response.url().includes('/api/executions/history/run-need') && response.request().method() === 'GET',
    );
    await page.getByRole('button', { name: /Need measurement execution/i }).click();
    await needDetailResponse;

    await expect(page).toHaveURL(/transactionId=run-need/);
    await expect(page.getByText(/Recorded need measurement for auth-remediation\./)).toBeVisible();

    const postRequest = page.waitForRequest((request) =>
      request.url().endsWith('/api/executions/history') && request.method() === 'POST',
    );
    const anchorDetailResponse = page.waitForResponse((response) =>
      response.url().includes('/api/executions/history/run-anchor') && response.request().method() === 'GET',
    );

    await page.getByRole('button', { name: 'Record repository anchor' }).click();

    const recordedRequest = await postRequest;
    await anchorDetailResponse;

    expect(recordedRequest.postDataJSON()).toMatchObject({
      pipeline_type: 'agentic-execution:asset-pack',
      status: 'completed',
      output: {
        summary: 'Recorded repository anchor for bitcode/terminal.',
        repo_snapshot: {
          org: 'bitcode',
          repo: 'terminal',
          branch: 'main',
          commit: '',
        },
        asset_pack_completion: {
          summary: 'Recorded repository anchor for bitcode/terminal.',
          repoSnapshot: {
            org: 'bitcode',
            repo: 'terminal',
            branch: 'main',
            commit: '',
          },
          bitcodeActivityState: {
            repositoryAnchor: {
              provider: 'github',
              providerAccount: 'bitcode',
            },
          },
        },
      },
      context: {
        source: 'application-repository-context-panel',
        surface: 'Bitcode Terminal',
        provider: 'github',
        providerAccount: 'bitcode',
        repositoryFullName: 'bitcode/terminal',
      },
    });

    expect(postedExecutionHistoryDraft).not.toBeNull();

    await expect(page).toHaveURL(/transactionId=run-anchor/);
    await expect(page).toHaveURL(/transactionDetail=transaction/);
    await expect(page.getByText('Repository anchor recorded into the Bitcode activity ledger.')).toBeVisible();
    await expect(page.getByText('AssetPack execution')).toBeVisible();
    await expect(page.getByText(/Recorded repository anchor for bitcode\/terminal\./)).toBeVisible();
    await expect(page.getByText('Selected activity')).toBeVisible();
    await expect(page.getByText('Activity id')).toBeVisible();
    await expect(page.getByText('bitcode/terminal')).toBeVisible();
  });
});
