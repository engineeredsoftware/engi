import { expect, test } from '@playwright/test';

import {
  expectAtPageTop,
  expectCommercialRouteReady,
  expectRouteParam,
  expectRouteParamAbsent,
  installCommercialMvpApiMocks,
  installCommercialBrowserErrorTrap,
  openCommercialRoute,
} from './commercial-mvp.helpers';

const BTD_RANGE_PATH =
  '/btd/asset-pack-run-branch-remediation' +
  '?rangeStart=1190' +
  '&rangeEndExclusive=1200' +
  '&policyId=owner-read-v28' +
  '&policyHash=policy-hash-v28' +
  '&readBranch=owner-read' +
  '&proofRoot=proof-root-v28' +
  '&sourceManifestRoot=source-manifest-root-v28';

test.describe('commercial MVP BTD and Exchange entry', () => {
  test.beforeEach(async ({ page }) => {
    await installCommercialMvpApiMocks(page);
  });

  test('signed-in BTD widget states BTC fees, BTD holdings, recent packs, and Exchange intent', async ({
    page,
  }, testInfo) => {
    const trap = installCommercialBrowserErrorTrap(page, testInfo);

    await openCommercialRoute(
      page,
      '/exchange',
      /Search activity, select a row, and read Exchange state/i,
    );

    const tracker = page.getByLabel(/Open Exchange to buy or transfer BTD AssetPack rights/i);
    await expect(tracker).toBeVisible();
    await expect(tracker).toContainText('0.042 BTC');
    await expect(tracker).toContainText('1,200 BTD');
    await expect(tracker).not.toContainText('$BTD');

    await tracker.hover();
    await expect(tracker).toHaveAttribute(
      'title',
      /Recent BTD AssetPacks: Run Branch Remediation, Exchange Route Rendering, Wallet Fee Rehearsal/i,
    );

    await tracker.click();

    await expect(page).toHaveURL(/\/exchange\?intent=buy-existing-btd$/);
    await expectAtPageTop(page);
    await expectCommercialRouteReady(page, /Search activity, select a row, and read Exchange state/i);
    await expect(page.getByText(/Finish-delivered Shippables/i)).not.toBeInViewport();

    const exchangeIntent = await page.evaluate(() => window.sessionStorage.getItem('bitcode:btd-exchange-intent'));
    expect(exchangeIntent).toContain('"feeAsset":"BTC"');
    expect(exchangeIntent).toContain('"shareAsset":"BTD"');

    await trap.assertClean();
  });

  test('BTD range route discloses range, policy hash, read branch, and routes into Exchange', async ({
    page,
  }, testInfo) => {
    const trap = installCommercialBrowserErrorTrap(page, testInfo);

    await openCommercialRoute(page, BTD_RANGE_PATH, /\$BTD AssetPack Range/i);

    await expect(page.getByText('1,190-1,199')).toBeVisible();
    await expect(page.getByText('owner-read-v28')).toBeVisible();
    await expect(page.getByText('policy-hash-v28')).toBeVisible();
    await expect(page.getByText('proof-root-v28')).toBeVisible();
    await expect(page.getByText('source-manifest-root-v28')).toBeVisible();
    await expect(page.getByText(/BTC remains the fee asset/i)).toBeVisible();
    await expect(page.getByText(/\$BTD remains the measured share\/read-right posture/i)).toBeVisible();

    await page.getByRole('link', { name: /^Open Exchange$/ }).click();

    await expect(page).toHaveURL(/\/exchange\?assetPack=asset-pack-run-branch-remediation&intent=buy-existing-btd$/);
    await expectAtPageTop(page);
    await expectCommercialRouteReady(page, /Search activity, select a row, and read Exchange state/i);

    await trap.assertClean();
  });

  test('Exchange filters and row selection preserve read-only market-state posture', async ({
    page,
  }, testInfo) => {
    const trap = installCommercialBrowserErrorTrap(page, testInfo);

    await openCommercialRoute(page, '/exchange', /Search activity, select a row, and read Exchange state/i);

    await expect(page.getByText('Primary read')).toBeVisible();
    await expect(page.getByText('activity ledger', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('same state, read-only here')).toBeVisible();
    await expect(page.getByText('Rich Bitcode activity ledger')).toBeVisible();

    await page.getByLabel('Search transactions').fill('need-measurement');
    await expect(page).toHaveURL(/transactionSearch=need-measurement/);
    await expect(page.getByText('mock-run-need-measurement-pass')).toBeVisible();

    await page.getByRole('button', { name: /mock-run-need-measurement-pass/i }).click();

    await expect(page).toHaveURL(/transactionId=mock-run-need-measurement-pass/);
    await expect(page.getByText('Selected activity')).toBeVisible();
    await expect(
      page.locator('article').filter({ hasText: /Proofs/ }).getByText('verification witness refreshed').first(),
    ).toBeVisible();

    await page.getByRole('button', { name: /^Proofs$/ }).click();
    await expect(page).toHaveURL(/transactionDetail=proofs/);
    await expect(page.getByText(/Bounded proof stays in activity detail/i)).toBeVisible();

    await trap.assertClean();
  });

  test('Exchange market filters preserve intent while segmenting readable activity state', async ({
    page,
  }, testInfo) => {
    const trap = installCommercialBrowserErrorTrap(page, testInfo);

    await openCommercialRoute(
      page,
      '/exchange?intent=buy-existing-btd',
      /Search activity, select a row, and read Exchange state/i,
    );
    await expectAtPageTop(page);
    await expectRouteParam(page, 'intent', 'buy-existing-btd');

    await page.getByLabel('Ownership', { exact: true }).selectOption('network');
    await expectRouteParam(page, 'transactionOwnership', 'network');
    await expect(page.getByText('Ownership: Exchange transactions')).toBeVisible();
    await expect(page.getByRole('button', { name: /mock-run-need-measurement-pass/i })).toBeVisible();

    await page.getByLabel('Action lens', { exact: true }).selectOption('need');
    await expectRouteParam(page, 'transactionLens', 'need');
    await expect(page.getByText('Lens: Need')).toBeVisible();
    await expect(page.getByText('same state, read-only here')).toBeVisible();

    await page.getByRole('button', { name: /Clear all filters/i }).click();
    await expectRouteParam(page, 'intent', 'buy-existing-btd');
    await expectRouteParamAbsent(page, 'transactionOwnership');
    await expectRouteParamAbsent(page, 'transactionLens');
    await expect(page.getByText('Active filter posture')).toHaveCount(0);

    await trap.assertClean();
  });
});
