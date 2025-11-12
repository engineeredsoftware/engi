import { test, expect } from '@playwright/test';

test.describe('Deliverables Header and Logging Flows', () => {
  test.beforeEach(async ({ context }) => {
    // Stub GitHub selectors for header
    await context.route('**/api/executions?type=pipeline:deliverables&action=installations', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ accounts: [{ login: 'user1', avatar_url: '' }] })
      })
    );
    await context.route('**/api/executions?type=pipeline:deliverables&owner=user1', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ repositories: [{ name: 'repo1' }] })
      })
    );
    await context.route('**/api/executions?type=pipeline:deliverables&owner=user1&repo=repo1', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ branches: ['main'], repoInfo: { default_branch: 'main' } })
      })
    );
    await context.route('**/api/executions?type=pipeline:deliverables&owner=user1&repo=repo1&branch=main', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ commits: ['c1'] })
      })
    );
  });

  test('template selector dropdown and selection', async ({ page }) => {
    await page.goto('/executions?type=pipeline:deliverables');
    // Wait for template toggle and open dropdown
    await page.waitForSelector('[data-testid="template-toggle"]');
    // dropdown initial
    await page.click('[data-testid="template-toggle"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-header-template-dropdown.png');
    // select second template if available
    const templateItems = page.locator('[data-testid^="template-item-"]');
    const count = await templateItems.count();
    if (count > 1) {
      await templateItems.nth(1).click();
      await page.waitForTimeout(300);
      expect(await page.screenshot({ fullPage: true }))
        .toMatchSnapshot('deliverables-header-template-selected.png');
    }
  });

  test('run simulation and capture streaming logs', async ({ page, context }) => {
    // Stub the deliverables API to simulate SSE
    const sseBody = [
      'event: status',
      'data: {"status":{"message":"Initializing..."}}',
      '',
      'data: {"text":"First chunk"}',
      '',
      'data: {"text":"Second chunk"}',
      '',
      'data: {"completion":{"result":"done"}}',
      ''
    ].join('\n');
    await context.route('**/api/executions?type=pipeline:deliverables', route =>
      route.fulfill({
        status: 200,
        contentType: 'text/event-stream',
        body: sseBody
      })
    );
    // Fill selectors
    await page.goto('/executions?type=pipeline:deliverables');
    await page.selectOption('[data-testid="gh-account"]', 'user1');
    await page.selectOption('[data-testid="gh-repo"]', 'repo1');
    await page.selectOption('[data-testid="gh-branch"]', 'main');
    await page.selectOption('[data-testid="gh-commit"]', 'c1');
    // Start run
    await page.fill('[data-testid="execution-dod-input"]', 'Test run');
    await page.click('[data-testid="execute-button"]');
    // Initial status
    await page.waitForSelector('text=Initializing...');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-run-status-initializing.png');
    // First chunk
    await page.waitForSelector('text=First chunk');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-run-stream-first-chunk.png');
    // Second chunk
    await page.waitForSelector('text=Second chunk');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-run-stream-second-chunk.png');
    // Completion
    await page.waitForSelector('text=done');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-run-complete.png');
  });
});
