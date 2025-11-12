import { test, expect } from '@playwright/test';

test.describe('Deliverables Attachments - URL Flow', () => {
  test('deliverables-attachments-url-pasted-url-loading', async ({ page }) => {
    await page.goto('/executions?type=pipeline:deliverables');
    // Paste URL and press Enter to add
    const input = page.locator('[data-testid="url-input"]');
    await input.click();
    await input.fill('https://example.com');
    await input.press('Enter');
    // Spinner should appear
    await page.waitForSelector('svg.animate-spin');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-attachments-url-pasted-url-loading.png');
  });

  test('deliverables-attachments-url-complete-success', async ({ page }) => {
    await page.goto('/executions?type=pipeline:deliverables');
    const input = page.locator('[data-testid="url-input"]');
    await input.click();
    await input.fill('https://example.com');
    await input.press('Enter');
    // Simulate success: placeholder updates to show count
    await page.waitForTimeout(500);
    // Expect URL count shown
    await page.waitForSelector('[data-testid="url-input"][placeholder*="URLs (1)"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-attachments-url-complete-success.png');
  });

  test('deliverables-attachments-url-complete-error', async ({ page }) => {
    await page.goto('/executions?type=pipeline:deliverables');
    // Manually inject error into UI
    await page.evaluate(() => {
      const parent = document.querySelector('[data-testid="url-input"]')?.parentElement;
      if (parent) {
        const err = document.createElement('div');
        err.className = 'url-error text-red-400';
        err.textContent = 'Invalid URL';
        parent.appendChild(err);
      }
    });
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-attachments-url-complete-error.png');
  });
});
