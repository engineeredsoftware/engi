import { test, expect } from '@playwright/test';
import { setOnboardingState } from './orbital.helpers';

test.describe('Orbital - Credits Interval Button States', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Set state to Credits step
    await setOnboardingState(page, 'credits', ['profile','connections','models']);
    await page.reload();
    await page.waitForSelector('span:has-text("Step 4 of 4")');
  });

  for (const intv of ['daily','weekly','monthly']) {
    test(`orbital-credits-interval-${intv}-active`, async ({ page }) => {
      // Click interval toggle
      await page.click(`button:has-text("${intv.charAt(0).toUpperCase()+intv.slice(1)}")`);
      await page.waitForTimeout(300);
      expect(await page.screenshot({ fullPage: true }))
        .toMatchSnapshot(`orbital-credits-interval-${intv}-active.png`);
    });
  }
});
