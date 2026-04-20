import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

test.describe('Orbital Navigation & Close Flows', () => {
  test.beforeEach(async ({ page, context }) => {
    // Stub OTP and verify endpoints
    await context.route(`${supabaseUrl}/auth/v1/otp`, r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: {}, error: null }) }));
    await context.route(`${supabaseUrl}/auth/v1/verify`, r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data: { session: { user: { id: 'u1' } } }, error: null }) }));
    // Stub user data
    await context.route('**/api/auxillaries/data', r => r.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({
      profile: { user_id: 'u1', username: 'tester', display_name: 'Tester', bio: '', company_name: '', avatar_url: '', team_members: [] },
      githubConnection: { installationId: 42 }, credits: 0, modelPreferences: {}
    }) }));
  });

  test('toggle between Login and Signup in modal', async ({ page }) => {
    // Navigate to app
    await page.goto('/');
    // Open Orbital modal in login mode
    await page.click('[data-orbital-testid="orbital-open-button"]');
    // Wait for login send code button
    await page.waitForSelector('[data-testid="login-send-code"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-login-mode-login.png');
    // Toggle to onboarding (signup) view
    await page.click('[data-orbital-testid="orbital-toggle-button"]');
    // Wait for profile step badge
    await page.waitForSelector('[data-testid="profile-step-badge"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-login-mode-signup.png');
    // Toggle back to login view
    await page.click('[data-orbital-testid="orbital-toggle-button"]');
    await page.waitForSelector('[data-testid="login-send-code"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-login-mode-login-back.png');
  });

  test('navigate steps via sidebar labels', async ({ page }) => {
    // Navigate to app
    await page.goto('/');
    // Login and OTP success to unlock onboarding
    await page.click('[data-orbital-testid="orbital-open-button"]');
    await page.fill('[data-testid="login-email-input"]', 'x@x.com');
    await page.click('[data-testid="login-send-code"]');
    await page.fill('[data-testid="login-otp-input"]', '123456');
    await page.click('[data-testid="login-verify-code"]');
    // Steps: profile -> connections -> models -> credits
    const steps = ['profile', 'connections', 'models', 'credits'];
    for (const step of steps) {
      await page.click(`[data-testid="orbital-label-${step}"]`);
      await page.waitForTimeout(300);
      expect(await page.screenshot({ fullPage: true }))
        .toMatchSnapshot(`orbital-step-nav-${step}.png`);
    }
  });

  test('close onboarding modal', async ({ page }) => {
    // Navigate to app
    await page.goto('/');
    // Open login modal to get into onboarding
    await page.click('[data-orbital-testid="orbital-open-button"]');
    await page.fill('[data-testid="login-email-input"]', 'x@x.com');
    await page.click('[data-testid="login-send-code"]');
    await page.fill('[data-testid="login-otp-input"]', '123456');
    await page.click('[data-testid="login-verify-code"]');
    // Close modal via close button
    await page.click('[data-orbital-testid="orbital-close-button"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-onboarding-closed.png');
  });
  
  test('close login modal with Escape key', async ({ page }) => {
    // Navigate to app
    await page.goto('/');
    await page.click('[data-orbital-testid="orbital-open-button"]');
    // Wait for login input
    await page.waitForSelector('[data-testid="login-email-input"]');
    // Press Escape to close
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-login-closed-escape.png');
  });
  
  test('close onboarding modal with Escape key', async ({ page }) => {
    // Navigate to app
    await page.goto('/');
    await page.click('[data-orbital-testid="orbital-open-button"]');
    // Open onboarding view
    await page.click('[data-orbital-testid="orbital-toggle-button"]');
    await page.waitForSelector('[data-testid="profile-step-badge"]');
    // Press Escape to close
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-onboarding-closed-escape.png');
  });
});
