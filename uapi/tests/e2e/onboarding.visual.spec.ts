import { test, expect } from '@playwright/test';

test.describe('@profile UI Visual - Auth and Onboarding Flows', () => {
  test('Login modal snapshot', async ({ page }) => {
    // Open login modal via landing page button
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

  test('Onboarding - Connections step snapshot', async ({ page }) => {
    // Navigate to app and open onboarding modal
    await page.goto('/');
    await page.click('[data-orbital-testid="orbital-open-button"]');
    // Navigate to Connections step
    await page.click('[data-testid="orbital-label-connections"]');
    // Wait for connections step elements
    await page.waitForSelector('[data-testid="connections-step-badge"]');
    await page.waitForSelector('[data-testid="connections-github-button"]');
    await page.waitForTimeout(500);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('onboarding-connections-step.png');
  });

  test('Onboarding - Models step snapshot', async ({ page }) => {
    // Navigate to app and open onboarding modal
    await page.goto('/');
    await page.click('[data-orbital-testid="orbital-open-button"]');
    // Navigate through steps to Models
    await page.click('[data-testid="orbital-label-connections"]');
    await page.click('[data-testid="orbital-label-models"]');
    // Wait for models step elements
    await page.waitForSelector('[data-testid="interfaces-step-badge"]');
    await page.waitForSelector('[data-testid="models-prompt-input"]');
    await page.waitForTimeout(500);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('onboarding-models-step.png');
  });

  test('Onboarding - Credits step snapshot', async ({ page }) => {
    // Navigate to app and open onboarding modal
    await page.goto('/');
    await page.click('[data-orbital-testid="orbital-open-button"]');
    // Navigate through steps to Credits
    await page.click('[data-testid="orbital-label-connections"]');
    await page.click('[data-testid="orbital-label-models"]');
    await page.click('[data-testid="orbital-label-credits"]');
    // Wait for credits step elements
    await page.waitForSelector('[data-testid="btd-step-badge"]');
    await page.waitForSelector('[data-testid="credits-promo-input"]');
    await page.waitForTimeout(500);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('onboarding-credits-step.png');
  });
});
