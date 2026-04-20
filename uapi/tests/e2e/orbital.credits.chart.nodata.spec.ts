import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Orbital - Credits Chart No-Data States', () => {
  test('orbital-credits-chart-weekly-no-data', async ({ page, context }) => {
    // Stub user data and usage API to return no data
    const supa = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    await context.route('**/api/auth/v1/otp', r => r.fulfill({ status:200, body: JSON.stringify({ data:{},error:null }) }));
    await context.route('**/api/auth/v1/verify', r => r.fulfill({ status:200, body: JSON.stringify({ data:{session:{user:{id:'u1'}}}, error:null }) }));
    await context.route('**/api/auxillaries/data', r => r.fulfill({
      status: 200, contentType: 'application/json', body: JSON.stringify({
        profile: { user_id: 'u1', username: 'tester' },
        githubConnection: { installationId: 42 }, credits: 0, modelPreferences: {}
      })
    }));
    await context.route('**/api/auxillaries/usage*', r => r.fulfill({
      status: 200, contentType: 'application/json', body: JSON.stringify([])
    }));
    // Trigger Credits step
    await page.goto('/?successful_checkout_session_id=1');
    await page.waitForSelector('span:has-text("Step 4 of 4")');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('orbital-credits-chart-weekly-no-data.png');
  });
});
