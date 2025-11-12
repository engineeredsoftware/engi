import { test, expect } from '@playwright/test';

test.describe('User Story: Deliverables Multi-step Form', () => {
  test.beforeEach(async ({ page, context }) => {
    // Stub GitHub connectors via our API
    await context.route('**/api/executions?type=pipeline:deliverables&action=installations', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ accounts: [{ login: 'user1', avatar_url: '' }] }) })
    );
    await context.route('**/api/executions?type=pipeline:deliverables&owner=user1', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ repositories: [{ name: 'repo1' }] }) })
    );
    await context.route('**/api/executions?type=pipeline:deliverables&owner=user1&repo=repo1', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ branches: ['main'], repoInfo: { default_branch: 'main' } }) })
    );
    await context.route('**/api/executions?type=pipeline:deliverables&owner=user1&repo=repo1&branch=main', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ commits: ['c1', 'c2'] }) })
    );
    await context.route('**/api/vcs?resource=issues&provider=github&owner=user1&repo=repo1', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ issues: [{ number: 1, title: 'Issue 1' }] }) })
    );
    await context.route('**/api/executions?type=pipeline:deliverables&action=files&**', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ files: [] }) })
    );
  });

  test('multi-step selectors', async ({ page }) => {
    await page.goto('/executions?type=pipeline:deliverables');
    // Account selector
    await page.waitForSelector('[data-testid="gh-account"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('story-deliverables-account.png');

    // Repo selector
    await page.selectOption('[data-testid="gh-account"]', 'user1');
    await page.waitForSelector('[data-testid="gh-repo"]');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('story-deliverables-repo.png');

    // Branch selector
    await page.selectOption('[data-testid="gh-repo"]', 'repo1');
    await page.waitForSelector('[data-testid="gh-branch"]');
    await page.selectOption('[data-testid="gh-branch"]', 'main');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('story-deliverables-branch.png');

    // Commit selector
    await page.waitForSelector('[data-testid="gh-commit"]');
    await page.selectOption('[data-testid="gh-commit"]', 'c1');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('story-deliverables-commit.png');

    // Issue selector
    await page.waitForSelector('[data-testid="gh-issue"]');
    await page.selectOption('[data-testid="gh-issue"]', '1');
    await page.waitForTimeout(300);
    expect(await page.screenshot({ fullPage: true }))
      .toMatchSnapshot('story-deliverables-issue.png');
  });
});
