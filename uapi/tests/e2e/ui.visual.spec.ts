import { test, expect } from '@playwright/test';

// Visual regression tests for key pages
test.skip('Deliverables page should match visual snapshot', async ({ page }) => {
  await page.goto('/executions?type=pipeline:deliverables');
  // Wait for GH selectors to ensure page loaded
  await page.waitForSelector('[data-testid="gh-account"]');
  // Full page screenshot
  expect(await page.screenshot({ fullPage: true }))
    .toMatchSnapshot('deliverables-page.png');
});

 test.skip('AI Documents page should match visual snapshot', async ({ page }) => {
  await page.goto('/executions?type=pipeline:ai_documents');
  await page.waitForSelector('[data-testid="gh-account"]');
  expect(await page.screenshot({ fullPage: true }))
    .toMatchSnapshot('ai_documents-page.png');
});
