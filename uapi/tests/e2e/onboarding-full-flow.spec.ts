import { test, expect } from '@playwright/test';

// Full end-to-end onboarding drive-through
test.describe('Full Onboarding Flow', () => {
  test('should complete profile, connections, models, and credits steps', async ({ page, context }) => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    // Stub OTP request and verify
    await context.route(`${supabaseUrl}/auth/v1/otp`, route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: {}, error: null }) })
    );
    await context.route(`${supabaseUrl}/auth/v1/verify`, route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: { session: { user: { id: 'user1' } } }, error: null }) })
    );
    // Navigate to app and open onboarding
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.click('[data-orbital-testid="orbital-open-button"]');

    // Profile Step
    await page.waitForSelector('[data-testid="profile-email-input"]');
    await page.fill('[data-testid="profile-email-input"]', 'test@playwright.com');
    await page.click('[data-testid="profile-send-code"]');
    await page.waitForSelector('[data-testid="profile-otp-input"]');
    await page.fill('[data-testid="profile-otp-input"]', '123456');
    await page.click('[data-testid="profile-verify-code"]');
    // Should auto-advance to Connections
    await page.waitForSelector('[data-testid="connections-step-badge"]');
    await expect(page.locator('[data-testid="connections-step-badge"]')).toHaveText('Step 2 of 4');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('onboarding-full-connections.png');

    // Connections Step
    // GitHub connect
    await page.click('[data-testid="connections-github-button"]');
    // Wait for repo chips and items
    await page.waitForSelector('[data-testid="connections-repo-chip-user/repo-1"]');
    await page.waitForSelector('[data-testid="connections-repo-item-user/repo-1"]');
    await page.waitForSelector('[data-testid="models-step-badge"]');
    await expect(page.locator('[data-testid="models-step-badge"]')).toHaveText('Step 3 of 4');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('onboarding-full-models.png');

    // Models Step (auto-advances)
    // Wait for Credits Step
    await page.waitForSelector('[data-testid="credits-step-badge"]');
    await expect(page.locator('[data-testid="credits-step-badge"]')).toHaveText('Step 4 of 4');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true })).toMatchSnapshot('onboarding-full-credits.png');
  });
});
