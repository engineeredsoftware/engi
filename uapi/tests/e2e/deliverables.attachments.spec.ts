import { test, expect } from '@playwright/test';

test.describe('Deliverables Attachments Flows', () => {
  test.beforeEach(async ({ context }) => {
    // Stub GitHub installs, repos, branches, commits
    await context.route('**/api/executions?type=pipeline:deliverables&action=installations', r => r.fulfill({ status:200, contentType:'application/json', body: JSON.stringify({ accounts:[{login:'user1',avatar_url:''}] }) }));
    await context.route('**/api/executions?type=pipeline:deliverables&owner=user1', r => r.fulfill({ status:200, contentType:'application/json', body: JSON.stringify({ repositories:[{name:'repo1'}] }) }));
    await context.route('**/api/executions?type=pipeline:deliverables&owner=user1&repo=repo1', r => r.fulfill({ status:200, contentType:'application/json', body: JSON.stringify({ branches:['main'], repoInfo:{default_branch:'main'} }) }));
    await context.route('**/api/executions?type=pipeline:deliverables&owner=user1&repo=repo1&branch=main', r => r.fulfill({ status:200, contentType:'application/json', body: JSON.stringify({ commits:['c1'] }) }));
    await context.route('**/api/vcs?resource=issues&provider=github&owner=user1&repo=repo1', r => r.fulfill({ status:200, contentType:'application/json', body: JSON.stringify({ issues:[] }) }));
    await context.route('**/api/executions?type=pipeline:deliverables&action=files&**', r => r.fulfill({ status:200, contentType:'application/json', body: JSON.stringify({ files:['file1.txt'] }) }));
  });

  test('URL attachments UI', async ({ page }) => {
    await page.goto('/executions?type=pipeline:deliverables');
    // Click URL attachments input and enter URL
    await page.waitForSelector('[data-testid="url-input"]');
    await page.click('[data-testid="url-input"]');
    await page.fill('[data-testid="url-input"]', 'https://example.com');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-attachments-url.png');
  });

  test('File attachments UI', async ({ page }) => {
    await page.goto('/executions?type=pipeline:deliverables');
    // Upload a file via hidden input
    const fileInput = page.locator('[data-testid="file-input"]');
    await fileInput.setInputFiles({ name: 'test.txt', mimeType: 'text/plain', buffer: Buffer.from('hello') });
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-attachments-file.png');
  });

  test('Integration selection UI', async ({ page }) => {
    await page.goto('/executions?type=pipeline:deliverables');
    // Select integration via integration selector control
    await page.waitForSelector('[data-testid="integration-selector"]');
    // Open dropdown and click first integration option
    await page.click('[data-testid="integration-selector"]');
    await page.waitForSelector('[data-testid^="integration-option-"]');
    const firstInt = page.locator('[data-testid^="integration-option-"]').first();
    await firstInt.click();
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-attachments-integration.png');
  });
});
