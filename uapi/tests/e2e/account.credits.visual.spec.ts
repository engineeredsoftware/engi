import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe.skip('@profile UI Visual - Account Credits Flow (skipped - focusing on onboarding only)', () => {
  test('account-credits-massive-balance', async ({ page, context }) => {
    // Stub user data with large credits and usage
    const supa = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    await context.route('**/api/auxillaries/data', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          profile: { user_id: 'u1', username: 'tester' },
          githubConnection: { installationId: 42 },
          credits: 1000000,
          modelPreferences: {},
          organizations: [],
          repositories: []
        })
      })
    );
    // Trigger credits step via successSessionId
    await page.goto('/?successful_checkout_session_id=1');
    await page.waitForSelector('span:has-text("Step 4 of 4")');
    await page.waitForSelector('canvas'); // usage chart
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('account-credits-massive-balance.png');
  });
});
