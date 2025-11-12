import { test, expect } from '@playwright/test';

test.describe('Deliverables Attachments - Integration Flow', () => {
  test('deliverables-attachments-integration-hover', async ({ page }) => {
    await page.goto('/executions?type=pipeline:deliverables');
    // Hover integration selector control
    await page.waitForSelector('[data-testid="integration-selector"]');
    await page.hover('[data-testid="integration-selector"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-attachments-integration-hover.png');
  });

  test('deliverables-attachments-integration-selected', async ({ page }) => {
    await page.goto('/executions?type=pipeline:deliverables');
    // Open integration selector dropdown
    await page.waitForSelector('[data-testid="integration-selector"]');
    await page.click('[data-testid="integration-selector"]');
    // Select first integration option
    await page.waitForSelector('[data-testid^="integration-option-"]');
    await page.click('[data-testid^="integration-option-"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-attachments-integration-selected.png');
  });
});
