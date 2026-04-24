import { test, expect } from '@playwright/test';

test.describe('Deliverables Flows', () => {
  test.beforeEach(async ({ context }) => {
    // Stub GitHub installations
    await context.route('**/api/executions?type=pipeline:deliverables&action=installations', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ accounts: [{ login: 'user1', avatar_url: '' }] }) })
    );
    // Repos
    await context.route('**/api/executions?type=pipeline:deliverables&owner=user1', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ repositories: [{ name: 'repo1' }] }) })
    );
    // Branches
    await context.route('**/api/executions?type=pipeline:deliverables&owner=user1&repo=repo1', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ branches: ['main'], repoInfo: { default_branch: 'main' } }) })
    );
    // Commits
    await context.route('**/api/executions?type=pipeline:deliverables&owner=user1&repo=repo1&branch=main', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ commits: ['c1'] }) })
    );
    // Issues
    await context.route('**/api/vcs?resource=issues&provider=github&owner=user1&repo=repo1', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ issues: [{ number: 1, title: 'Issue 1' }] }) })
    );
    // Files (none)
    await context.route('**/api/executions?type=pipeline:deliverables&action=files&**', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ files: [] }) })
    );
  });

  test('first-time deliverable with manual DoD', async ({ page }) => {
    await page.goto('/executions?type=pipeline:deliverables');
    // Step: Account load
    await page.waitForSelector('[data-testid="gh-account"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-flow-account-select.png');
    // Step: select account
    await page.click('[data-testid="gh-account"]');
    // (Optional) search/filter
    await page.fill('[data-testid="gh-account"]', 'user1');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-flow-account-search-text-filtering.png');
    await page.selectOption('[data-testid="gh-account"]', 'user1');
    await page.waitForSelector('[data-testid="gh-repo"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-flow-repo.png');
    // Step: select repo with search filtering
    await page.click('[data-testid="gh-repo"]');
    await page.fill('[data-testid="gh-repo"]', 'repo1');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-flow-repo-search-text-filtering.png');
    await page.selectOption('[data-testid="gh-repo"]', 'repo1');
    await page.waitForSelector('[data-testid="gh-branch"]');
    // Step: select branch with search filtering
    await page.click('[data-testid="gh-branch"]');
    await page.fill('[data-testid="gh-branch"]', 'main');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-flow-branch-search-text-filtering.png');
    await page.selectOption('[data-testid="gh-branch"]', 'main');
    // Step: select commit with search filtering
    await page.click('[data-testid="gh-commit"]');
    await page.fill('[data-testid="gh-commit"]', 'c1');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-flow-commit-search-text-filtering.png');
    await page.selectOption('[data-testid="gh-commit"]', 'c1');
    // Step: select issue with search filtering
    if (await page.$('[data-testid="gh-issue"]')) {
      await page.click('[data-testid="gh-issue"]');
      await page.fill('[data-testid="gh-issue"]', '1');
      await page.waitForTimeout(300);
      expect(await page.screenshot({ fullPage: true }))
        .toMatchSnapshot('deliverables-flow-issue-search-text-filtering.png');
      await page.selectOption('[data-testid="gh-issue"]', '1');
      await page.waitForTimeout(300);
      expect(await page.screenshot({ fullPage: true }))
        .toMatchSnapshot('deliverables-flow-issue-selected.png');
    }
    // Step: enter task description
    await page.fill('[data-testid="execution-dod-input"]', 'Implement feature X');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-flow-task.png');
    // Step: execute the Bitcode asset-pack pipeline
    await page.click('[data-testid="execute-button"]');
    await page.waitForSelector('[data-testid="stream-log"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-flow-streaming.png');
    // Step: complete run
    await expect(page.locator('[data-testid="stream-log"]')).toContainText('completion');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-flow-complete.png');
  });

  test('deliverable via "Simple TODO from Codebase" template', async ({ page }) => {
    await page.goto('/executions?type=pipeline:deliverables');
    // select template via new dropdown UI
    await page.waitForSelector('[data-testid="template-toggle"]');
    await page.click('[data-testid="template-toggle"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('deliverables-template-dropdown.png');
    // apply template if available
    const templateItems = page.locator('[data-testid^="template-item-"]');
    const count = await templateItems.count();
    if (count > 1) {
      await templateItems.nth(1).click();
      await page.waitForTimeout(300);
      expect(await page.screenshot({ fullPage: true }))
        .toMatchSnapshot('deliverables-template-selected.png');
    }
  });
});
