import { test, expect } from '@playwright/test';

test.describe('Deliverables Attachments - File Flow', () => {
  test('deliverables-attachments-file-hover', async ({ page }) => {
    await page.goto('/executions?type=pipeline:deliverables');
    // Hover file attachments control
    await page.waitForSelector('[data-testid="file-attachments"]');
    await page.hover('[data-testid="file-attachments"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-attachments-file-hover.png');
  });

  test('deliverables-attachments-file-single', async ({ page }) => {
    await page.goto('/executions?type=pipeline:deliverables');
    const fileInput = page.locator('input[type=file]');
    // Attach one file
    await fileInput.setInputFiles({
      name: 'test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('hello')
    });
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-attachments-file-single.png');
  });

  test('deliverables-attachments-file-multiple', async ({ page }) => {
    await page.goto('/executions?type=pipeline:deliverables');
    const fileInput = page.locator('input[type=file]');
    // Attach multiple files
    await fileInput.setInputFiles([
      { name: 'a.txt', mimeType: 'text/plain', buffer: Buffer.from('a') },
      { name: 'b.txt', mimeType: 'text/plain', buffer: Buffer.from('b') }
    ]);
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-attachments-file-multiple.png');
  });
});
