import { test, expect } from '@playwright/test';

test.describe('@profile UI Visual - Login Flows', () => {
  test('login-first-load', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-auxillaries-testid="auxillaries-open-button"]');
    await page.waitForSelector('[data-testid="login-email-input"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('login-first-load.png');
  });

  test('login-enter-email', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-auxillaries-testid="auxillaries-open-button"]');
    await page.fill('[data-testid="login-email-input"]', 'user@example.com');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('login-enter-email.png');
  });

  test('login-hover-send-link', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-auxillaries-testid="auxillaries-open-button"]');
    await page.hover('[data-testid="login-send-code"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('login-hover-send-link.png');
  });

  test('Sign In Returning Customer', async ({ page, context }) => {
    // Stub Supabase OTP request
    await context.route('**/auth/v1/otp*', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: {}, error: null }),
      })
    );
    // Stub Supabase verify OTP
    await context.route('**/auth/v1/verify*', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: {
            session: {
              access_token: 'fake-access-token',
              refresh_token: 'fake-refresh-token',
              expires_in: 3600,
              token_type: 'bearer',
              user: { id: 'user-1', aud: 'authenticated', role: 'authenticated', email: 'user@example.com' },
            },
          },
          error: null,
        }),
      })
    );
    // Stub Supabase getUser
    await context.route('**/auth/v1/user*', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          data: { user: { id: 'user-1', email: 'user@example.com' } },
          error: null,
        }),
      })
    );
    // Stub notifications API
    await context.route('**/api/auxillaries/notifications', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 'n1', user_id: 'user-1', type: 'info', message: 'Welcome back!', data: {}, read: false, created_at: '2023-01-01T00:00:00Z' },
          { id: 'n2', user_id: 'user-1', type: 'alert', message: 'Subscription expires soon', data: {}, read: true, created_at: '2023-01-02T00:00:00Z' },
        ]),
      })
    );
    // Stub deliverables history API
    await context.route('**/api/deliverables/history', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'test-run',
            created_at: '2023-01-03T00:00:00Z',
            items: [
              {
                id: '1',
                run_id: 'test-run',
                title: 'Add authentication',
                repository: 'user/repo',
                deliverable_type: 'pull_request',
                deliverable_id: '42',
                created_at: '2023-01-03T00:00:00Z',
                deliverable_status: 'open',
              },
            ],
            context: {
              summary: 'Created PR #42 to add auth',
              processingStats: { time: '2s', tokens: { input: 5, output: 10, total: 15 }, btdUsed: 1 },
              repoSnapshot: {},
            },
          },
        ]),
      })
    );
    // Navigate to Deliverables history page
    await page.goto('/deliverables?runId=test-run');
    // Open login modal
    await page.click('[data-auxillaries-testid="auxillaries-open-button"]');
    // Enter email and send code
    await page.fill('[data-testid="login-email-input"]', 'user@example.com');
    await page.click('[data-testid="login-send-code"]');
    // Enter verification code and verify
    await page.waitForSelector('[data-testid="login-otp-input"]');
    await page.fill('[data-testid="login-otp-input"]', '123456');
    await page.click('[data-testid="login-verify-code"]');
    // Wait for deliverables history summary to appear
    await page.waitForURL('**/deliverables?runId=test-run');
    await page.waitForSelector('[data-testid="deliverables-summary-header"]');
    // Open notifications dropdown
    const notifButton = page.locator('[data-testid="notifications-toggle"]');
    await notifButton.click();
    // Wait for unread notification message
    await page.waitForSelector('text=Welcome back!');
    // Capture full-page visual snapshot
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('login-sign-in-returning-customer.png');
  });
});
