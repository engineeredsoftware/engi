import { test, expect } from '@playwright/test';

test.describe('@profile UI Visual - Auth and Onboarding Flows', () => {
  test('Login modal snapshot', async ({ page }) => {
    // Open the login modal via the public-shell launcher.
    await page.goto('/');
    await page.click('[data-orbital-testid="orbital-open-button"]');
    // Wait for email input to appear
    await page.waitForSelector('[data-testid="login-email-input"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('login-page.png');
  });

  test('Onboarding - Profile step snapshot', async ({ page }) => {
    // Navigate to app and open onboarding modal
    await page.goto('/');
    await page.click('[data-orbital-testid="orbital-open-button"]');
    // Profile step contains email input
    await page.waitForSelector('[data-testid="profile-step-badge"]');
    await page.waitForSelector('[data-testid="profile-email-input"]');
    // Stabilize animation
    await page.waitForTimeout(500);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('onboarding-profile-step.png');
  });

  test('Onboarding - Connects step snapshot', async ({ page }) => {
    // Navigate to the app and open onboarding.
    await page.goto('/');
    await page.click('[data-orbital-testid="orbital-open-button"]');
    // Navigate to the canonical connects step.
    await page.click('[data-testid="orbital-label-connects"]');
    // Wait for the connects-step elements.
    await page.waitForSelector('[data-testid="connections-step-badge"]');
    await page.waitForSelector('[data-testid="connections-github-button"]');
    await page.waitForTimeout(500);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('onboarding-connects-step.png');
  });

  test('Onboarding - Interfaces step snapshot', async ({ page }) => {
    // Navigate to the app and open onboarding.
    await page.goto('/');
    await page.click('[data-orbital-testid="orbital-open-button"]');
    // Navigate through the canonical steps to Interfaces.
    await page.click('[data-testid="orbital-label-connects"]');
    await page.click('[data-testid="orbital-label-interfaces"]');
    // Wait for the interfaces-step elements.
    await page.waitForSelector('[data-testid="interfaces-step-badge"]');
    await page.waitForSelector('[data-testid="models-prompt-input"]');
    await page.waitForTimeout(500);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('onboarding-interfaces-step.png');
  });

  test('Onboarding - $BTD step snapshot', async ({ page }) => {
    // Navigate to the app and open onboarding.
    await page.goto('/');
    await page.click('[data-orbital-testid="orbital-open-button"]');
    // Navigate through the canonical steps to $BTD.
    await page.click('[data-testid="orbital-label-connects"]');
    await page.click('[data-testid="orbital-label-interfaces"]');
    await page.click('[data-testid="orbital-label-btd"]');
    // Wait for the BTD-step elements.
    await page.waitForSelector('[data-testid="btd-step-badge"]');
    await page.waitForSelector('[data-testid="credits-promo-input"]');
    await page.waitForTimeout(500);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('onboarding-btd-step.png');
  });
});
