import { expect, test } from '@playwright/test';

import {
  expectCommercialRouteReady,
  installCommercialMvpApiMocks,
  installCommercialBrowserErrorTrap,
  openCommercialRoute,
} from './commercial-mvp.helpers';

const AUXILLARY_ROUTES = [
  {
    step: 'profile',
    path: '/auxillaries/profile',
    heading: /Profile in one contained auxillary read/i,
    container: 'profile-step-container',
  },
  {
    step: 'connects',
    path: '/auxillaries/connects',
    heading: /Connects in one contained auxillary read/i,
    container: 'connects-pane-container',
  },
  {
    step: 'interfaces',
    path: '/auxillaries/interfaces',
    heading: /Interfaces in one contained auxillary read/i,
    container: 'interfaces-pane-container',
  },
  {
    step: 'btd',
    path: '/auxillaries/btd',
    heading: /\$BTD in one contained auxillary read/i,
    container: 'btd-pane-container',
  },
] as const;

test.describe('commercial MVP Auxillaries experience', () => {
  test.beforeEach(async ({ page }) => {
    await installCommercialMvpApiMocks(page);
  });

  for (const auxillary of AUXILLARY_ROUTES) {
    test(`${auxillary.step} route renders a contained tabs-left auxillary pane`, async ({
      page,
    }, testInfo) => {
      const trap = installCommercialBrowserErrorTrap(page, testInfo);

      await openCommercialRoute(page, auxillary.path, auxillary.heading);

      await expect(page.getByTestId(auxillary.container)).toBeVisible();
      await expect(page.getByText('Open Bitcode Terminal')).toBeVisible();
      await expect(page.getByText('Current route')).toBeVisible();
      await expect(page.locator('text=/lane(active|ready|locked)/i')).toHaveCount(0);
      await expect(page.locator('.orbital-ring')).toHaveCount(0);
      await expect(page.locator('.login-background-glow')).toHaveCount(0);

      await trap.assertClean();
    });
  }

  test('route cards and pane tabs preserve route-local Auxillaries navigation', async ({
    page,
  }, testInfo) => {
    const trap = installCommercialBrowserErrorTrap(page, testInfo);

    await openCommercialRoute(page, '/auxillaries/profile', /Profile in one contained auxillary read/i);

    await page.locator('a[href="/auxillaries/connects"]').first().click();
    await expect(page).toHaveURL(/\/auxillaries\/connects$/);
    await expectCommercialRouteReady(page, /Connects in one contained auxillary read/i);

    await page.getByRole('button', { name: /^Interfaces auxillary$/ }).click();
    await expect(page.getByTestId('interfaces-pane-container')).toBeVisible();
    await expect(
      page
        .getByTestId('interfaces-pane-container')
        .getByRole('heading', { name: /^Interfaces Auxillary$/ }),
    ).toBeVisible();

    await page.getByRole('button', { name: /^\$BTD auxillary$/ }).click();
    await expect(page.getByTestId('btd-pane-container')).toBeVisible();
    await expect(
      page
        .getByTestId('btd-pane-container')
        .getByRole('heading', { name: /^\$BTD Auxillary$/ }),
    ).toBeVisible();

    await trap.assertClean();
  });

  test('Profile auxillary keeps wallet identity editable without leaving the contained route', async ({
    page,
  }, testInfo) => {
    const trap = installCommercialBrowserErrorTrap(page, testInfo);

    await openCommercialRoute(page, '/auxillaries/profile', /Profile in one contained auxillary read/i);

    const walletInput = page.getByTestId('profile-wallet-address-input');
    await expect(page.getByLabel('Display Name')).toHaveValue('Avery Mercer');
    await expect(page.getByLabel('Professional Bio')).toHaveValue(
      'Reviewing the Bitcode commercial surface in deterministic mock mode.',
    );
    await expect(walletInput).toBeVisible();
    await expect(walletInput).toHaveValue(/tb1qbitcodemockoperator/i);

    await walletInput.fill('tb1qcommercialmvpqa0000000000000000000000');
    await expect(walletInput).toHaveValue('tb1qcommercialmvpqa0000000000000000000000');
    await expect(page.getByText(/Bitcoin wallet connection is the first Bitcode identity action/i)).toBeVisible();
    await expect(page.getByText(/Connect GitHub in Connects/i)).toBeVisible();
    await expect(page.getByText(/Optional email notifications/i)).toBeVisible();

    await trap.assertClean();
  });

  test('Profile wallet connection stays on Profile and does not run onboarding completion in contained Auxillaries', async ({
    page,
  }, testInfo) => {
    const trap = installCommercialBrowserErrorTrap(page, testInfo);
    let onboardingRequests = 0;

    await page.addInitScript(() => {
      (window as any).LeatherProvider = {
        request: async (method: string, params?: Record<string, unknown>) => {
          (window as any).__bitcodeWalletCalls = [
            ...((window as any).__bitcodeWalletCalls ?? []),
            { method, params },
          ];

          if (method === 'getAddresses') {
            return {
              result: {
                addresses: [
                  {
                    symbol: 'BTC',
                    type: 'p2wpkh',
                    address: 'tb1qcmrcalqaqqqqqqqqqqqqqqqqqqqqqqqqq',
                    publicKey: 'payment-public-key',
                    derivationPath: "m/84'/1'/1'/0/0",
                  },
                  {
                    symbol: 'BTC',
                    type: 'p2tr',
                    address: 'tb1pqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',
                    publicKey: 'auth-public-key',
                    tweakedPublicKey: 'auth-tweaked-public-key',
                    derivationPath: "m/86'/1'/1'/0/0",
                  },
                ],
              },
            };
          }

          if (method === 'signMessage') {
            return { result: { signature: 'leather-contained-profile-signature' } };
          }

          return { result: null };
        },
      };
    });
    await page.route('**/api/auxillaries/onboarding', async (route) => {
      onboardingRequests += 1;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ completedPanes: ['profile'], isOnboardingComplete: false }),
      });
    });

    await openCommercialRoute(page, '/auxillaries/profile', /Profile in one contained auxillary read/i);
    await expect(page.getByTestId('profile-step-container')).toBeVisible();
    await expect(page.getByTestId('profile-connect-leather')).toBeVisible();

    await page.getByTestId('profile-connect-leather').click();
    await expect(page.getByTestId('profile-step-container')).toBeVisible();
    await expect(page.getByText(/Bitcoin provider connected/i)).toBeVisible();
    await expect(page.getByTestId('profile-wallet-address-input')).toHaveValue(
      'tb1pqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',
    );
    await expect(page).toHaveURL(/\/auxillaries\/profile$/);
    await expect.poll(() => Promise.resolve(onboardingRequests)).toBe(0);

    const calls = await page.evaluate(() => (window as any).__bitcodeWalletCalls ?? []);
    expect(calls.map((call: { method: string }) => call.method)).toEqual(['getAddresses', 'signMessage']);

    await trap.assertClean();
  });

  test('Auxillaries portal entry opens the contained access surface without the old onboarding shell', async ({
    page,
  }, testInfo) => {
    const trap = installCommercialBrowserErrorTrap(page, testInfo);

    await openCommercialRoute(page, '/terminal', /Bitcode Terminal/i);

    await page.evaluate(() => {
      window.dispatchEvent(
        new CustomEvent('open-auxillaries', {
          detail: { window: 'SignUpWindow' },
        }),
      );
    });

    const portal = page.locator('.auxillaries-portal');
    await expect(portal.locator('.auxillaries-bitcode-surface.orbital-system-application')).toBeVisible();
    await expect(portal.locator('.login-background-glow')).toHaveCount(0);
    await expect(portal.locator('.account-background-highlight')).toHaveCount(0);
    await expect(portal.locator('.orbital-ring')).toHaveCount(0);

    await trap.assertClean();
  });

  test('Terminal fullscreen Auxillaries fills the viewport and keeps Profile scrolling inside the pane', async ({
    page,
  }, testInfo) => {
    const trap = installCommercialBrowserErrorTrap(page, testInfo);

    await openCommercialRoute(page, '/terminal', /Bitcode Terminal/i);

    await page.getByRole('button', { name: /Open Auxillaries fullscreen/i }).click();
    const shell = page.locator('.auxillaries-bitcode-shell');
    await expect(shell).toBeVisible();

    await page.getByRole('button', { name: /^Profile auxillary$/ }).click();
    await expect(page.getByTestId('profile-step-container')).toBeVisible();

    const shellBottomGap = await shell.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return Math.round(window.innerHeight - rect.bottom);
    });
    expect(shellBottomGap).toBeLessThanOrEqual(2);

    const pane = page.locator('.auxillaries-bitcode-pane > .orbital-content-container').first();
    const paneScrollMetrics = await pane.evaluate((element) => {
      element.scrollTop = element.scrollHeight;
      const style = window.getComputedStyle(element);
      return {
        scrollTop: Math.round(element.scrollTop),
        clientHeight: Math.round(element.clientHeight),
        scrollHeight: Math.round(element.scrollHeight),
        overflowY: style.overflowY,
      };
    });
    expect(paneScrollMetrics.overflowY).toBe('auto');
    expect(paneScrollMetrics.scrollHeight).toBeGreaterThan(paneScrollMetrics.clientHeight);
    expect(paneScrollMetrics.scrollTop).toBeGreaterThan(0);
    await expect(page.getByText(/Profile edits save automatically/i)).toBeVisible();

    await trap.assertClean();
  });

  test('Connects, Interfaces, and BTD panes expose MVP configuration consequences', async ({
    page,
  }, testInfo) => {
    const trap = installCommercialBrowserErrorTrap(page, testInfo);

    await openCommercialRoute(page, '/auxillaries/connects', /Connects in one contained auxillary read/i);
    await expect(page.getByText(/GitHub and verified wallet are ready/i)).toBeVisible();
    await expect(page.getByText(/GitHub plus wallet posture are the minimum live prerequisites/i)).toBeVisible();

    await page.goto('/auxillaries/interfaces');
    await expectCommercialRouteReady(page, /Interfaces in one contained auxillary read/i);
    await expect(page.getByText(/Global Model Selection/i)).toBeVisible();
    await expect(page.getByText(/Exchange detail and conversation defaults/i)).toBeVisible();
    const modelPreferenceSave = page.waitForResponse((response) => {
      return (
        response.url().includes('/api/auxillaries/model-preferences') &&
        response.request().method() === 'POST'
      );
    });
    await page.getByRole('button', { name: /Apply to All/i }).first().click();
    await modelPreferenceSave;
    await expect(page.getByText('Global model', { exact: true }).first()).toBeVisible();

    await page.goto('/auxillaries/btd');
    await expectCommercialRouteReady(page, /\$BTD in one contained auxillary read/i);
    const btdPane = page.getByTestId('btd-pane-container');
    await expect(btdPane.getByText('1,200 BTD')).toBeVisible();
    await expect(btdPane.getByText(/0\.042 BTC/i)).toBeVisible();
    await expect(page.getByText(/BTC is the fee-liquidity posture/i)).toBeVisible();
    await expect(page.getByText(/Read your BTD-relevant activity from the shared Exchange table/i)).toBeVisible();
    await expect(page.getByText(/Searchable Exchange activity table/i)).toBeVisible();
    await expect(page.getByText(/Changes save automatically so the BTD posture/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Save \$BTD auxillary/i })).toHaveCount(0);

    await trap.assertClean();
  });

  test('BTD auxillary data-share consent toggles persist through the contained pane API', async ({
    page,
  }, testInfo) => {
    const trap = installCommercialBrowserErrorTrap(page, testInfo);

    await openCommercialRoute(page, '/auxillaries/btd', /\$BTD in one contained auxillary read/i);

    const btdPane = page.getByTestId('btd-pane-container');
    await expect(btdPane.getByText('Need-space knowledge sharing')).toBeVisible();
    await expect(btdPane.getByText(/All current and future Connects-approved repositories/i)).toBeVisible();

    const setAndForgetToggle = btdPane.getByText('Set it and forget it', { exact: true }).locator('..').locator('label');
    const disableAllRequest = page.waitForResponse((response) => (
      response.url().includes('/api/auxillaries/user/data-share') &&
      response.request().method() === 'POST'
    ));
    await setAndForgetToggle.click();
    const disableAllResponse = await disableAllRequest;
    const disableAllPayload = disableAllResponse.request().postDataJSON() as Record<string, unknown>;
    expect(disableAllPayload).toMatchObject({
      action: 'toggle',
      repoFullName: 'bitcode/bitcode',
      enabled: false,
    });

    const repoRow = btdPane
      .getByTestId('btd-data-share-repositories')
      .getByTestId('btd-data-share-repo-row')
      .filter({ hasText: 'bitcode/bitcode' });
    await expect(repoRow).toBeVisible();
    await expect(repoRow.getByText('main')).toBeVisible();
    await expect(repoRow.locator('input[type="checkbox"]')).not.toBeChecked();

    const enableRepoRequest = page.waitForResponse((response) => (
      response.url().includes('/api/auxillaries/user/data-share') &&
      response.request().method() === 'POST'
    ));
    await repoRow.locator('label').click();
    const enableRepoResponse = await enableRepoRequest;
    const enableRepoPayload = enableRepoResponse.request().postDataJSON() as Record<string, unknown>;
    expect(enableRepoPayload).toMatchObject({
      action: 'toggle',
      repoFullName: 'bitcode/bitcode',
      branch: 'main',
      commit: '8d4d0a7',
      enabled: true,
    });
    await expect(btdPane.getByText(/All current and future Connects-approved repositories/i)).toBeVisible();

    await trap.assertClean();
  });
});
