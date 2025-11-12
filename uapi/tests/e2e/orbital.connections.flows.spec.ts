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

test.describe('@profile Orbital - Connections Step', () => {
  test('orbital-connections-first-load', async ({ page }) => {
    await page.goto('/');
    await setOnboardingState(page, 'connections', ['profile']);
    await page.reload();
    // Wait for connections step badge to appear
    await page.waitForSelector('[data-testid="connections-step-badge"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-connections-first-load.png');
  });

  test('orbital-connections-github-connect-hover', async ({ page }) => {
    await page.goto('/');
    await setOnboardingState(page, 'connections', ['profile']);
    await page.reload();
    // Hover over GitHub connect button
    await page.waitForSelector('[data-testid="connections-github-button"]');
    await page.hover('[data-testid="connections-github-button"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-connections-github-connect-hover.png');
  });

  test('orbital-connections-github-connected', async ({ page }) => {
    await page.goto('/');
    await setOnboardingState(page, 'connections', ['profile']);
    await page.reload();
    // Simulate GitHub connect click
    await page.click('[data-testid="connections-github-button"]');
    // Wait for connected status and summary
    await page.waitForSelector('[data-testid="connections-step-badge"]');
    // Wait for repository chips and selection list
    await page.waitForSelector('[data-testid="connections-repo-chip-user/repo-1"]');
    await page.waitForSelector('[data-testid="connections-repo-item-user/repo-1"]');
    // Capture connected UI
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-connections-github-connected.png');
  });
  
  test.skip('orbital-connections-figma-connected', async ({ page }) => {
    await page.goto('/?dev=true');
    await setOnboardingState(page, 'connections', ['profile']);
    await page.reload();
    // Click Figma connect button
    await page.click('[data-testid="connections-figma-button"]');
    await page.waitForTimeout(1500);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-connections-figma-connected.png');
  });
  
  test.skip('orbital-connections-notion-connected', async ({ page }) => {
    await page.goto('/?dev=true');
    await setOnboardingState(page, 'connections', ['profile']);
    await page.reload();
    // Click Notion connect button
    await page.click('[data-testid="connections-notion-button"]');
    await page.waitForTimeout(1500);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-connections-notion-connected.png');
  });
  
  test('orbital-connections-api-keys-generate', async ({ page, context }) => {
    // Stub API keys endpoints
    await context.route('**/api/orbitals/api-keys', route => {
      const method = route.request().method();
      if (method === 'GET') {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        });
      } else if (method === 'POST') {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ apiKey: 'test-key-123' }),
        });
      }
    });
    await page.goto('/?dev=true');
    await setOnboardingState(page, 'connections', ['profile']);
    await page.reload();
    // Generate new API key
    await page.click('[data-testid="connections-generate-apikey-button"]');
    await page.fill('[data-testid="connections-apikey-name-input"]', 'MyKey');
    await page.fill('[data-testid="connections-apikey-expire-input"]', '2030-12-31');
    await page.click('[data-testid="connections-create-apikey-button"]');
    // Wait for key display
    await page.waitForSelector('[data-testid="connections-apikey-output"]');
    await expect(page.locator('[data-testid="connections-apikey-output"]')).toContainText('test-key-123');
  });

  test('orbital-connections-github-verify-failure', async ({ page, context }) => {
    // Stub GitHub verify to return error
    await context.route('**/api/orbitals/connections/github', route =>
      route.fulfill({
        status: 400,
        contentType: 'text/plain',
        body: 'Invalid installation code',
      })
    );
    await page.goto('/');
    await setOnboardingState(page, 'connections', ['profile']);
    await page.reload();
    // Enter fake verification code
    await page.fill('[data-testid="connections-verify-input"]', '12345-abcde');
    await page.click('[data-testid="connections-verify-button"]');
    // Expect error displayed and remain on verify input
    const errLocator = page.locator('[data-testid="connections-error"]');
    await expect(errLocator).toHaveText('Invalid installation code');
    await expect(page.locator('[data-testid="connections-verify-input"]')).toBeVisible();
    // Capture visual
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-connections-github-verify-failure.png');
  });

  test('orbital-connections-api-keys-delete', async ({ page, context }) => {
    // Initial GET returns two keys
    await context.route('**/api/orbitals/api-keys', route => {
      if (route.request().method() === 'GET') {
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            { id: 'key1', name: 'FirstKey', expireAt: '2030-01-01', createdAt: '2025-01-01T00:00:00Z' },
            { id: 'key2', name: 'SecondKey', expireAt: null, createdAt: '2025-02-01T00:00:00Z' }
          ])
        });
      }
    });
    // Stub DELETE to succeed
    await context.route('**/api/orbitals/api-keys?id=key1', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
    );
    await page.goto('/');
    await setOnboardingState(page, 'connections', ['profile']);
    await page.reload();
    // Wait for API key list
    const item1 = page.locator('[data-testid="connections-apikey-item-key1"]');
    const item2 = page.locator('[data-testid="connections-apikey-item-key2"]');
    await expect(item1).toBeVisible();
    await expect(item2).toBeVisible();
    // Capture initial state
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-connections-apikey-list.png');
    // Delete first key
    await page.click('[data-testid="connections-delete-apikey-button-key1"]');
    // Wait for removal
    await expect(item1).toBeHidden();
    // Capture after deletion
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-connections-apikey-after-delete.png');
  });
});
