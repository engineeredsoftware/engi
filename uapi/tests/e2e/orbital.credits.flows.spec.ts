import { test, expect } from '@playwright/test';

// Helper to set onboarding state
async function setOnboardingState(page, step, completed = []) {
  await page.evaluate(([step, completed]) => {
    localStorage.setItem('onboardingState', JSON.stringify({
      isOnboarding: true,
      currentOnboardingStep: step,
      completedSteps: completed,
      isFirstTimeUser: true
    }));
  }, [step, completed]);
}

test.describe('Orbital - Credits Step', () => {
  test('orbital-credits-first-load', async ({ page }) => {
    await page.goto('/');
    await setOnboardingState(page, 'credits', ['profile', 'connections', 'models']);
    await page.reload();
    // Wait for credits badge
    await page.waitForSelector('[data-testid="credits-step-badge"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-credits-first-load.png');
  });

  test('orbital-credits-plan-selected', async ({ page }) => {
    await page.goto('/');
    await setOnboardingState(page, 'credits', ['profile', 'connections', 'models']);
    await page.reload();
    // Select second credit plan button
    const planBtn = page.locator('button:has-text("Mini")').first();
    await planBtn.click();
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-credits-plan-selected.png');
  });

  test('orbital-credits-promo-applied', async ({ page }) => {
    await page.goto('/');
    await setOnboardingState(page, 'credits', ['profile', 'connections', 'models']);
    await page.reload();
    // Enter promo code
    await page.fill('input.promo-input', 'PROMO123');
    await page.click('button:has-text("Apply")');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-credits-promo-applied.png');
  });

  test('orbital-credits-chart-intervals', async ({ page }) => {
    await page.goto('/');
    await setOnboardingState(page, 'credits', ['profile', 'connections', 'models']);
    await page.reload();
    const intervals = ['daily', 'weekly', 'monthly'];
    for (const intv of intervals) {
      await page.click(`button:has-text("${intv.charAt(0).toUpperCase() + intv.slice(1)}")`);
      await page.waitForTimeout(300);
      expect(await page.screenshot({ fullPage: true }))
        .toMatchSnapshot(`orbital-credits-chart-${intv}.png`);
    }
  });
});
