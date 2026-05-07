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
    await expect(walletInput).toBeVisible();
    await expect(walletInput).toHaveValue(/tb1qbitcodemockoperator/i);

    await walletInput.fill('tb1qcommercialmvpqa0000000000000000000000');
    await expect(walletInput).toHaveValue('tb1qcommercialmvpqa0000000000000000000000');
    await expect(page.getByText(/Profile owns the wallet identity/i)).toBeVisible();

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
    await expect(page.getByText(/Master-detail and conversation defaults/i)).toBeVisible();
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
    await expect(btdPane.getByText('1,200 $BTD')).toBeVisible();
    await expect(btdPane.getByText(/0\.042 BTC/i)).toBeVisible();
    await expect(page.getByText(/BTC is the fee-liquidity posture/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Save \$BTD auxillary/i })).toBeVisible();

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

    const repoRow = btdPane.getByRole('row', { name: /bitcode\/bitcode/i });
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
