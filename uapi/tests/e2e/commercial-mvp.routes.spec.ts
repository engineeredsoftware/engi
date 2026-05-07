import { expect, test } from '@playwright/test';

import {
  expectCommercialRouteReady,
  installCommercialMvpApiMocks,
  installCommercialBrowserErrorTrap,
  openCommercialRoute,
} from './commercial-mvp.helpers';

const ROUTE_SMOKE_MATRIX = [
  {
    path: '/',
    expected: /Bitcode is auditable market infrastructure for technical knowledge/i,
    name: 'public home',
  },
  {
    path: '/terminal',
    expected: /The Bitcode Terminal is where operators prepare Give and Need work/i,
    name: 'Terminal',
  },
  {
    path: '/exchange',
    expected: /Search activity, select a row, and read Exchange state/i,
    name: 'Exchange',
  },
  {
    path: '/auxillaries/profile',
    expected: /Profile in one contained auxillary read/i,
    name: 'Profile auxillary',
  },
  {
    path: '/auxillaries/connects',
    expected: /Connects in one contained auxillary read/i,
    name: 'Connects auxillary',
  },
  {
    path: '/auxillaries/interfaces',
    expected: /Interfaces in one contained auxillary read/i,
    name: 'Interfaces auxillary',
  },
  {
    path: '/auxillaries/btd',
    expected: /\$BTD in one contained auxillary read/i,
    name: 'BTD auxillary',
  },
  {
    path: '/conversations',
    expected: /Keep the Bitcode Terminal write path as a first-class Terminal interface mode/i,
    name: 'conversations',
  },
  {
    path: '/docs',
    expected: /Learn Bitcode from Source Shares to proof/i,
    name: 'docs home',
  },
  {
    path: '/docs/what-is-bitcode',
    expected: /What Bitcode is/i,
    name: 'what-is-bitcode docs',
  },
  {
    path: '/docs/source-shares',
    expected: /Source Shares and the Bitcode Exchange/i,
    name: 'source-shares docs',
  },
  {
    path: '/docs/exchange',
    expected: /Understand the Bitcode Exchange/i,
    name: 'Exchange docs',
  },
  {
    path: '/docs/terminal',
    expected: /Orient inside the Bitcode Terminal/i,
    name: 'Terminal docs',
  },
  {
    path: '/docs/terminal-actions',
    expected: /Terminal actions: what writes and what should read back/i,
    name: 'Terminal action docs',
  },
  {
    path: '/docs/read-results',
    expected: /Terminal reads, proofs, readiness, and expected results/i,
    name: 'read-results docs',
  },
  {
    path: '/docs/auxillaries',
    expected: /Configure Auxillaries for identity, interfaces, and \$BTD/i,
    name: 'Auxillaries docs',
  },
  {
    path: '/docs/conversations',
    expected: /Use Conversations as a rich Bitcode write surface/i,
    name: 'Conversations docs',
  },
  {
    path: '/docs/configuration',
    expected: /Read launch-mode, environment, and feature configuration clearly/i,
    name: 'configuration docs',
  },
  {
    path: '/docs/protocol-v26',
    expected: /Map the V26 Protocol canon/i,
    name: 'protocol canon docs',
  },
  {
    path: '/docs/proofs',
    expected: /Understand Bitcode proofs, witnesses, and replay/i,
    name: 'proof docs',
  },
  {
    path: '/docs/settlement-btd',
    expected: /Read settlement, \$BTD, and exact accounting/i,
    name: 'settlement BTD docs',
  },
  {
    path: '/docs/commercial-interfaces',
    expected: /Understand commercial Bitcode interfaces/i,
    name: 'commercial interfaces docs',
  },
  {
    path: '/docs/mcp-api',
    expected: /Operate Bitcode through MCP and API surfaces/i,
    name: 'MCP API docs',
  },
  {
    path: '/docs/chatgpt-app',
    expected: /Use the ChatGPT App as a connected Bitcode interface/i,
    name: 'ChatGPT App docs',
  },
] as const;

test.describe('commercial MVP route surfaces', () => {
  test.beforeEach(async ({ page }) => {
    await installCommercialMvpApiMocks(page);
  });

  for (const route of ROUTE_SMOKE_MATRIX) {
    test(`${route.name} route is readable and free of browser errors`, async ({ page }, testInfo) => {
      const trap = installCommercialBrowserErrorTrap(page, testInfo);

      await openCommercialRoute(page, route.path, route.expected);

      await trap.assertClean();
    });
  }

  test('public navigation keeps Exchange, Terminal, and Docs as first-class commercial routes', async ({
    page,
  }, testInfo) => {
    const trap = installCommercialBrowserErrorTrap(page, testInfo);

    await page.goto('/');
    await expectCommercialRouteReady(
      page,
      /Bitcode is auditable market infrastructure for technical knowledge/i,
    );

    await page.locator('a[href="/exchange"]').first().click();
    await expect(page).toHaveURL(/\/exchange$/);
    await expectCommercialRouteReady(page, /Search activity, select a row, and read Exchange state/i);

    await page.locator('a[href="/terminal"]').first().click();
    await expect(page).toHaveURL(/\/terminal$/);
    await expectCommercialRouteReady(page, /The Bitcode Terminal is where operators prepare Give and Need work/i);

    await page.locator('a[href="/docs"]').first().click();
    await expect(page).toHaveURL(/\/docs$/);
    await expectCommercialRouteReady(page, /Learn Bitcode from Source Shares to proof/i);

    await trap.assertClean();
  });
});
