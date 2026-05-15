import { expect, test } from '@playwright/test';

import {
  expectCommercialRouteReady,
  expectRouteParam,
  expectRouteParamAbsent,
  installCommercialMvpApiMocks,
  installCommercialBrowserErrorTrap,
  openCommercialRoute,
} from './commercial-mvp.helpers';

test.describe('commercial MVP Terminal experience', () => {
  test.beforeEach(async ({ page }) => {
    await installCommercialMvpApiMocks(page);
  });

  test('Terminal opens as Give/Need activity, selected result, and support controls', async ({
    page,
  }, testInfo) => {
    const trap = installCommercialBrowserErrorTrap(page, testInfo);

    await openCommercialRoute(page, '/terminal', /The Bitcode Terminal is where operators prepare Give and Need work/i);

    const terminalWorkspace = page.locator('#terminalTransactionWorkspace');
    await expect(page.getByText('Bitcode Terminal').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Overview, Giving, Needing, Proofs' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Recent Terminal activity', exact: true })).toBeVisible();
    await expect(page.getByText('Selected result digest')).toBeVisible();
    await expect(page.getByRole('button', { name: /mock-run-branch-remediation/i })).toBeVisible();
    await expect(page.getByText('selected activity active')).toBeVisible();
    await expect(terminalWorkspace.locator('dt').filter({ hasText: /^Activity id$/ }).first()).toBeVisible();
    await expect(terminalWorkspace.getByText('Measured $BTD').first()).toBeVisible();
    await expect(terminalWorkspace.locator('dt').filter({ hasText: /^BTC fee basis$/ }).first()).toBeVisible();
    await expect(page.getByLabel('Search transactions')).toBeVisible();

    await trap.assertClean();
  });

  test('Terminal activity search and selection update the selected transaction without leaving Terminal', async ({
    page,
  }, testInfo) => {
    const trap = installCommercialBrowserErrorTrap(page, testInfo);

    await openCommercialRoute(
      page,
      '/terminal?transactionId=mock-run-branch-remediation&provider=github&repo=bitcode%2Fbitcode',
      /The Bitcode Terminal is where operators prepare Give and Need work/i,
    );
    await expect(page).toHaveURL(/transactionId=mock-run-branch-remediation/);

    const activitySearch = page.getByLabel('Search transactions');
    await expect(activitySearch).toBeVisible();
    await activitySearch.fill('proof-refresh');
    await expect(activitySearch).toHaveValue('proof-refresh');
    await expect(page).toHaveURL(/transactionSearch=proof-refresh/);
    await expect(page.getByText('mock-run-proof-refresh')).toBeVisible();

    await page.getByRole('button', { name: /mock-run-proof-refresh/i }).click();
    await expect(page).toHaveURL(/transactionId=mock-run-proof-refresh/);
    await expect(
      page.locator('article').filter({ hasText: /Proofs/ }).getByText('proof-family refresh in flight').first(),
    ).toBeVisible();

    await page.getByRole('button', { name: /^Show proofs$/ }).click();
    await expect(page).toHaveURL(/transactionDetail=proofs/);
    await expect(page.getByText(/Bounded proof stays with the selected activity/i)).toBeVisible();

    await page.getByRole('button', { name: /^History$/ }).click();
    await expect(page).toHaveURL(/transactionDetail=history/);
    await expect(page.getByText(/Recent activity history stays inline/i)).toBeVisible();

    await trap.assertClean();
  });

  test('Terminal transaction filters are URL-addressable and reset without losing the selected activity', async ({
    page,
  }, testInfo) => {
    const trap = installCommercialBrowserErrorTrap(page, testInfo);

    await openCommercialRoute(
      page,
      '/terminal?provider=github&repo=bitcode%2Fbitcode',
      /The Bitcode Terminal is where operators prepare Give and Need work/i,
    );
    await expectRouteParam(page, 'transactionId', 'mock-run-branch-remediation');

    await page.getByLabel('Status', { exact: true }).selectOption('running');
    await expectRouteParam(page, 'transactionStatus', 'running');
    await expect(page.getByText('Status: running')).toBeVisible();
    await expect(page.getByRole('button', { name: /mock-run-proof-refresh/i })).toBeVisible();

    await page.getByLabel('Proof posture', { exact: true }).selectOption('proof-family refresh in flight');
    await expectRouteParam(page, 'transactionProof', 'proof-family refresh in flight');
    await expect(page.getByText('Proof: proof-family refresh in flight')).toBeVisible();

    await page.getByLabel('Sort', { exact: true }).selectOption('highest-btc-fee-basis');
    await expectRouteParam(page, 'transactionSort', 'highest-btc-fee-basis');
    await expect(page.getByText('Sort: Highest BTC Fee Basis')).toBeVisible();

    await page.getByRole('button', { name: /Clear all filters/i }).click();
    await expectRouteParam(page, 'transactionId', 'mock-run-branch-remediation');
    await expectRouteParamAbsent(page, 'transactionStatus');
    await expectRouteParamAbsent(page, 'transactionProof');
    await expectRouteParamAbsent(page, 'transactionSort');
    await expect(page.getByText('Active filter posture')).toHaveCount(0);
    await expect(page.getByRole('button', { name: /mock-run-branch-remediation/i })).toBeVisible();

    await trap.assertClean();
  });

  test('Terminal detail tabs keep AssetPack, proof, closure, console, and history reads in one selected context', async ({
    page,
  }, testInfo) => {
    const trap = installCommercialBrowserErrorTrap(page, testInfo);

    await openCommercialRoute(
      page,
      '/terminal?transactionId=mock-run-branch-remediation&provider=github&repo=bitcode%2Fbitcode',
      /Prepared the active branch artifact pack/i,
    );

    await page.getByRole('button', { name: /^Shippables$/ }).click();
    await expect(page.getByText(/Finish-delivered Shippables/i)).toBeVisible();
    await expect(page.getByText(/AssetPack evidence and file changes remain Exchange-owned/i)).toBeVisible();

    await page.getByRole('button', { name: /^Proofs$/ }).click();
    await expect(page).toHaveURL(/transactionDetail=proofs/);
    await expect(page.getByText(/Bounded proof stays with the selected activity/i)).toBeVisible();

    await page.getByRole('button', { name: /^Closure$/ }).click();
    await expect(page).toHaveURL(/transactionDetail=closure/);
    await expect(page.getByText(/Closure proof, settlement follow-through/i)).toBeVisible();

    await page.getByRole('button', { name: /^Execution stream$/ }).click();
    await expect(page).toHaveURL(/transactionDetail=activity/);
    await expect(page.getByText(/Execution stream/i).first()).toBeVisible();

    await page.getByRole('button', { name: /^History$/ }).click();
    await expect(page).toHaveURL(/transactionDetail=history/);
    await expect(page.getByText(/Recent activity history stays inline/i)).toBeVisible();

    await trap.assertClean();
  });

  test('Terminal write-preparation surfaces disclose Need, Fit, wallet, BTC, and provider readiness before action', async ({
    page,
  }, testInfo) => {
    const trap = installCommercialBrowserErrorTrap(page, testInfo);

    await openCommercialRoute(page, '/terminal', /The Bitcode Terminal is where operators prepare Give and Need work/i);

    await expect(page.getByText(/Need measurement/i).first()).toBeVisible();
    await expect(page.getByText(/Fit pressure/i).first()).toBeVisible();
    await expect(page.getByText(/Visible proof families/i).first()).toBeVisible();
    await expect(page.getByText(/Record repository anchor/i).first()).toBeVisible();
    await expect(page.getByText(/Connected as bitcode/i).first()).toBeVisible();
    await expect(page.getByText(/GitHub/i).first()).toBeVisible();
    await expect(page.getByText(/wallet/i).first()).toBeVisible();
    await expect(
      page.locator('#terminalTransactionWorkspace').locator('dt').filter({ hasText: /^BTC fee basis$/ }).first(),
    ).toBeVisible();

    await trap.assertClean();
  });
});
