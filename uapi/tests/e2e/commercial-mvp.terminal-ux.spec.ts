import { expect, test } from '@playwright/test';

import {
  expectNoFrameworkOverlay,
  expectReadableViewport,
  installCommercialBrowserErrorTrap,
  installCommercialMvpApiMocks,
  openCommercialRoute,
} from './commercial-mvp.helpers';

const TERMINAL_BROWSER_PROOF_VIEWPORTS = [
  { id: 'phone', width: 390, height: 844 },
  { id: 'tablet', width: 768, height: 1024 },
  { id: 'laptop', width: 1280, height: 900 },
  { id: 'widescreen', width: 1440, height: 900 },
] as const;

test.describe('commercial MVP Terminal UX browser proof', () => {
  test.setTimeout(120_000);

  test.beforeEach(async ({ page }) => {
    await installCommercialMvpApiMocks(page);
  });

  test('Terminal cockpit exposes landmarks, skip navigation, and selected activity detail', async ({
    page,
  }, testInfo) => {
    const trap = installCommercialBrowserErrorTrap(page, testInfo);

    await page.goto('/terminal');
    await expect(page.getByTestId('terminal-cockpit-root')).toBeVisible({ timeout: 90_000 });
    await expect(page.getByText(/The Bitcode Terminal is where operators prepare Deposit and Read work/i).first()).toBeVisible();
    await expectNoFrameworkOverlay(page);
    await expectReadableViewport(page);

    await expect(page.getByRole('main', { name: /Deposit, Read, and read recent Bitcode activity/i })).toBeVisible();
    await expect(page.getByTestId('terminal-cockpit-root')).toBeVisible();
    await expect(page.getByRole('region', { name: /Recent Terminal activity and selected result/i })).toBeVisible();
    await expect(page.getByTestId('terminal-selected-activity-detail')).toBeVisible();
    await expect(page.getByRole('group', { name: /Selected activity detail sections/i })).toBeVisible();

    const skipLink = page.getByRole('link', { name: /Skip to selected Terminal activity/i });
    await skipLink.evaluate((element) => (element as HTMLElement).focus());
    await expect(skipLink).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#terminalTransactionWorkspace')).toBeInViewport();

    await page.goto('/terminal?transactionId=mock-run-branch-remediation&transactionDetail=activity');
    await expect(page.getByTestId('terminal-activity-stream-surface')).toBeVisible({ timeout: 20_000 });

    await trap.assertClean();
  });

  test('Terminal blocked detail posture is readable without raw network inspection', async ({
    page,
  }, testInfo) => {
    const trap = installCommercialBrowserErrorTrap(page, testInfo);

    await openCommercialRoute(
      page,
      '/terminal?transactionId=mock-run-branch-remediation&transactionDetail=console',
      /Prepared the active branch artifact pack/i,
    );

    await expect(page.getByTestId('terminal-selected-activity-hero')).toContainText(/Console \/ blocked/i);
    await expect(page.getByRole('button', { name: /^Console$/ })).toBeDisabled();
    await expect(page.getByText(/Console detail is available only for live execution-history rows/i)).toBeVisible();

    await trap.assertClean();
  });

  test('Terminal cockpit remains readable from phone through widescreen without document overflow', async ({
    page,
  }, testInfo) => {
    const trap = installCommercialBrowserErrorTrap(page, testInfo);

    for (const viewport of TERMINAL_BROWSER_PROOF_VIEWPORTS) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await openCommercialRoute(
        page,
        '/terminal',
        /The Bitcode Terminal is where operators prepare Deposit and Read work/i,
      );
      await expect(page.getByTestId('terminal-cockpit-root')).toBeVisible();
      await expect(page.locator('#terminalTransactionWorkspace')).toBeVisible();

      const metrics = await page.evaluate(() => {
        const workspace = document.querySelector('#terminalTransactionWorkspace');
        const workspaceRect = workspace?.getBoundingClientRect();
        return {
          documentOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          workspaceWidth: Math.round(workspaceRect?.width || 0),
          viewportWidth: window.innerWidth,
        };
      });

      expect(metrics.workspaceWidth).toBeGreaterThan(0);
      expect(metrics.workspaceWidth).toBeLessThanOrEqual(metrics.viewportWidth);
      expect(metrics.documentOverflow, `${viewport.id} document overflow`).toBeLessThanOrEqual(48);
    }

    await trap.assertClean();
  });
});
