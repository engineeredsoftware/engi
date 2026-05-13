import { expect, type Page, type Route, type TestInfo } from '@playwright/test';

type BrowserErrorTrap = {
  assertClean: () => Promise<void>;
};

const COMMERCIAL_MVP_AUXILLARY_DATA = {
  profile: {
    user_id: 'mock-bitcode-review-user',
    username: 'avery-mercer',
    display_name: 'Avery Mercer',
    bio: 'Reviewing the Bitcode commercial surface in deterministic mock mode.',
    company_name: 'Bitcode Review Lab',
    email: 'reviewer@bitcode.ai',
    wallet_address: 'tb1qbitcodemockoperator0000000000000000000000',
    wallet_provider: 'walletconnect',
    wallet_binding_status: 'verified',
    wallet_bound_at: '2026-04-16T12:00:00.000Z',
    wallet_binding: {
      address: 'tb1qbitcodemockoperator0000000000000000000000',
      provider: 'walletconnect',
      status: 'verified',
      boundAt: '2026-04-16T12:00:00.000Z',
    },
    btc_balance: 0.042,
    onboarded_steps: ['profile', 'externals', 'interfaces', 'wallet'],
    mock_mode: true,
  },
  githubConnection: {
    installationId: 424242,
    provider: 'github',
    account: 'bitcode',
    login: 'bitcode',
    status: 'connected',
    repositories: 1,
    mock_mode: true,
  },
  walletConnectionStatus: {
    connected: true,
    provider: 'walletconnect',
    valid: true,
    address: 'tb1qbitcodemockoperator0000000000000000000000',
    verificationState: 'verified',
    metadata: {
      source: 'mock',
      mock_mode: true,
    },
  },
  repositoryConnectionStatus: {
    connected: true,
    provider: 'github',
    valid: true,
    username: 'bitcode',
    metadata: {
      mock_mode: true,
      repositories: 1,
      account: 'bitcode',
      status: 'connected',
    },
  },
  repositories: [
    {
      id: 'mock-repo-bitcode',
      name: 'bitcode',
      fullName: 'bitcode/bitcode',
      defaultBranch: 'main',
      private: true,
      owner: {
        id: 'bitcode',
        username: 'bitcode',
        type: 'organization',
      },
    },
  ],
  repositoryInventorySource: 'mock_repository_inventory',
  organizations: ['bitcode'],
  btdBalance: 1200,
  btcFeeBalance: 0.042,
  recentBtdAssetPacks: [
    {
      assetPackId: 'asset-pack-run-branch-remediation',
      label: 'Run Branch Remediation',
      rangeStart: 1190,
      rangeEndExclusive: 1200,
      acquiredAt: '2026-05-06T18:12:00.000Z',
    },
    {
      assetPackId: 'asset-pack-terminal-route-rendering',
      label: 'Terminal Route Rendering',
      rangeStart: 1178,
      rangeEndExclusive: 1190,
      acquiredAt: '2026-05-06T17:44:00.000Z',
    },
    {
      assetPackId: 'asset-pack-wallet-fee-rehearsal',
      label: 'Wallet Fee Rehearsal',
      rangeStart: 1164,
      rangeEndExclusive: 1178,
      acquiredAt: '2026-05-06T16:58:00.000Z',
    },
    {
      assetPackId: 'asset-pack-auxillaries-mvp-qa',
      label: 'Auxillaries MVP QA',
      rangeStart: 1148,
      rangeEndExclusive: 1164,
      acquiredAt: '2026-05-06T16:21:00.000Z',
    },
  ],
  modelPreferences: {
    preferred_model: 'claude-3-7-sonnet',
    temperature: 0.4,
    max_tokens: 3200,
    review_profile: 'bitcode-terminal-demo',
  },
  onboardedPanes: ['profile', 'externals', 'interfaces', 'wallet'],
  onboarded_steps: ['profile', 'externals', 'interfaces', 'wallet'],
  isOnboardingComplete: true,
};

const NEXT_OVERLAY_PATTERNS = [
  /Unhandled Runtime Error/i,
  /Application error/i,
  /Hydration failed/i,
  /This page could not be found/i,
  /Internal Server Error/i,
];

const BENIGN_DEV_NAVIGATION_ERROR_PATTERNS = [
  /Failed to fetch RSC payload .* Falling back to browser navigation\. TypeError: Failed to fetch/i,
  /Failed to fetch RSC payload .* Falling back to browser navigation\. TypeError: network error/i,
  /\[notifications\] fetch failed TypeError: Failed to fetch/i,
];

export async function installCommercialMvpApiMocks(page: Page) {
  await page.route('**/api/auxillaries/data', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(COMMERCIAL_MVP_AUXILLARY_DATA),
    });
  });

  await page.route('**/api/auxillaries/profile', async (route) => {
    const requestBody =
      route.request().method() === 'POST'
        ? route.request().postDataJSON()
        : {};
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        profile: {
          ...COMMERCIAL_MVP_AUXILLARY_DATA.profile,
          ...(typeof requestBody === 'object' && requestBody ? requestBody : {}),
        },
      }),
    });
  });

  await page.route('**/api/auxillaries/model-preferences**', async (route) => {
    const method = route.request().method();
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        modelPreferences: COMMERCIAL_MVP_AUXILLARY_DATA.modelPreferences,
        saved: method === 'POST',
      }),
    });
  });

  await page.route('**/api/auxillaries/user/data-share**', async (route) => {
    const method = route.request().method();
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        saved: method === 'POST',
        repos: [
          {
            fullName: 'bitcode/bitcode',
            branch: 'main',
            commit: '8d4d0a7',
            enabled: true,
            lastAnalysisAt: '2026-05-06T18:12:00.000Z',
            latestAnalysisResult: {
              assetPackId: 'asset-pack-run-branch-remediation',
              status: 'proof_ready',
            },
          },
        ],
      }),
    });
  });

  await page.route('**/api/auxillaries/notifications**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 'commercial-mvp-notification-1',
          user_id: 'mock-bitcode-review-user',
          type: 'asset_pack',
          title: 'AssetPack ready',
          message: 'Run Branch Remediation is ready for Terminal review.',
          data: { assetPackId: 'asset-pack-run-branch-remediation' },
          read: false,
          created_at: '2026-05-06T18:12:00.000Z',
        },
        {
          id: 'commercial-mvp-notification-2',
          user_id: 'mock-bitcode-review-user',
          type: 'proof',
          title: 'Proof refresh',
          message: 'Verification witness refreshed for the selected Need.',
          data: { transactionId: 'mock-run-need-measurement-pass' },
          read: false,
          created_at: '2026-05-06T17:44:00.000Z',
        },
      ]),
    });
  });

  await page.route('**/api/executions?**', async (route) => {
    const url = new URL(route.request().url());
    if (url.searchParams.get('owner') && url.searchParams.get('repo') && url.searchParams.get('branch')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          commits: [
            { sha: '8d4d0a7b6c5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a' },
            { sha: '4b7f2d9a9c3e1a8f6b5c4d3e2f1a0b9c8d7e6f5a' },
          ],
        }),
      });
      return;
    }

    if (url.searchParams.get('owner') && url.searchParams.get('repo')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          branches: [{ name: 'main' }, { name: 'commercial-mvp' }],
          repoInfo: { default_branch: 'main' },
        }),
      });
      return;
    }

    if (url.searchParams.get('owner')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          repositories: [
            {
              id: 'mock-repo-bitcode',
              name: 'bitcode',
              full_name: 'bitcode/bitcode',
              default_branch: 'main',
            },
          ],
        }),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          id: 'mock-run-branch-remediation',
          title: 'Run Branch Remediation',
          name: 'Run Branch Remediation',
          description: 'AssetPack execution available to conversation pickers during V28 commercial QA.',
          status: 'completed',
        },
        {
          id: 'mock-exchange-route-rendering',
          title: 'Exchange Route Rendering',
          name: 'Exchange Route Rendering',
          description: 'Exchange route rendering evidence for picker and attachment flows.',
          status: 'completed',
        },
      ]),
    });
  });

  const fulfillConversationStream = async (route: Route) => {
    let payload: Record<string, unknown> = {};
    try {
      payload = route.request().postDataJSON() as Record<string, unknown>;
    } catch {
      payload = {};
    }
    const content =
      typeof payload?.content === 'string'
        ? payload.content
        : typeof payload?.message === 'string'
          ? payload.message
          : '';
    const reply =
      `Bitcode mock mode received "${content}". ` +
      'The conversation surface remains mounted inside the Bitcode Terminal and can bind source attachments, AssetPacks, output destinations, and settlement-bound proofs.';
    const events = [
      { type: 'token', data: reply },
      {
        type: 'message_complete',
        data: {
          messageId: 'commercial-mvp-assistant-message',
          content: reply,
          conversationId: 'conv-commercial-mvp',
        },
      },
    ];

    await route.fulfill({
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
      },
      body: events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join(''),
    });
  };

  await page.route('**/api/conversations/stream', fulfillConversationStream);
  await page.route('**/api/conversations/**/stream', fulfillConversationStream);
}

export function installCommercialBrowserErrorTrap(
  page: Page,
  testInfo: TestInfo,
): BrowserErrorTrap {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on('console', (message) => {
    if (message.type() !== 'error') {
      return;
    }

    if (BENIGN_DEV_NAVIGATION_ERROR_PATTERNS.some((pattern) => pattern.test(message.text()))) {
      return;
    }

    const location = message.location();
    consoleErrors.push(
      `${location.url || testInfo.title}:${location.lineNumber || 0}:${location.columnNumber || 0} ${message.text()}`,
    );
  });

  page.on('pageerror', (error) => {
    pageErrors.push(error.stack || error.message);
  });

  return {
    async assertClean() {
      await expectNoFrameworkOverlay(page);
      expect(consoleErrors, `console errors in ${testInfo.title}`).toEqual([]);
      expect(pageErrors, `uncaught page errors in ${testInfo.title}`).toEqual([]);
    },
  };
}

export async function expectCommercialRouteReady(
  page: Page,
  expectedText: string | RegExp,
) {
  await expect(page.locator('body')).toBeVisible();
  await expect(page.getByText(expectedText).first()).toBeVisible({ timeout: 20_000 });
  await expectNoFrameworkOverlay(page);
  await expectReadableViewport(page);
}

export async function expectNoFrameworkOverlay(page: Page) {
  for (const pattern of NEXT_OVERLAY_PATTERNS) {
    await expect(page.getByText(pattern)).toHaveCount(0);
  }
}

export async function expectReadableViewport(page: Page) {
  const metrics = await page.evaluate(() => {
    const bodyTextLength = document.body.innerText.replace(/\s+/g, ' ').trim().length;
    const horizontalOverflow =
      document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const visibleMainCount = Array.from(document.querySelectorAll('main')).filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    }).length;

    return {
      bodyTextLength,
      horizontalOverflow,
      visibleMainCount,
    };
  });

  expect(metrics.bodyTextLength).toBeGreaterThan(80);
  expect(metrics.visibleMainCount).toBeGreaterThan(0);
  expect(metrics.horizontalOverflow).toBeLessThanOrEqual(48);
}

export async function expectAtPageTop(page: Page) {
  await expect
    .poll(async () => page.evaluate(() => Math.round(window.scrollY)), {
      message: 'page should stay at the top of the route',
    })
    .toBe(0);
}

export async function expectRouteParam(
  page: Page,
  key: string,
  expectedValue: string,
) {
  await expect
    .poll(async () => new URL(page.url()).searchParams.get(key), {
      message: `route param ${key} should equal ${expectedValue}`,
    })
    .toBe(expectedValue);
}

export async function expectRouteParamAbsent(page: Page, key: string) {
  await expect
    .poll(async () => new URL(page.url()).searchParams.get(key), {
      message: `route param ${key} should be absent`,
    })
    .toBeNull();
}

export async function openCommercialRoute(
  page: Page,
  path: string,
  expectedText: string | RegExp,
) {
  await page.goto(path);
  await expectCommercialRouteReady(page, expectedText);
}
