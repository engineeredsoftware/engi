import { test, expect } from '@playwright/test';

// E2E tests for the Deliverables and AI Documents UIs
// NOTE: The UI must include data-testid attributes on key elements:
//   - GitHub selectors: gh-account, gh-repo, gh-branch, gh-commit, gh-issue
//   - DoD input: execution-dod-input
//   - Action button: execute-button (deliverables and ai_documents)
//   - Stream output container: stream-log

test.describe('E2E Deliverables (UI)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login or bypass in dev
    await page.goto('/login');
    // TODO: Implement real login or set session cookie
  });

  test('should create a deliverable via the UI', async ({ page }) => {
    // Open the deliverables page
    await page.goto('/executions?type=pipeline:deliverables');

    // Select GitHub account
    await page.waitForSelector('[data-testid="gh-account"]');
    const accountOpts = await page.$$eval(
      '[data-testid="gh-account"] option',
      opts => opts.map(o => (o as HTMLOptionElement).value)
    );
    await page.selectOption('[data-testid="gh-account"]', accountOpts[0]);

    // Select repository
    await page.waitForSelector('[data-testid="gh-repo"]');
    const repoOpts = await page.$$eval(
      '[data-testid="gh-repo"] option',
      opts => opts.map(o => (o as HTMLOptionElement).value)
    );
    await page.selectOption('[data-testid="gh-repo"]', repoOpts[0]);

    // Select branch
    await page.waitForSelector('[data-testid="gh-branch"]');
    const branchOpts = await page.$$eval(
      '[data-testid="gh-branch"] option',
      opts => opts.map(o => (o as HTMLOptionElement).value)
    );
    await page.selectOption('[data-testid="gh-branch"]', branchOpts[0]);

    // Select commit
    await page.waitForSelector('[data-testid="gh-commit"]');
    const commitOpts = await page.$$eval(
      '[data-testid="gh-commit"] option',
      opts => opts.map(o => (o as HTMLOptionElement).value)
    );
    await page.selectOption('[data-testid="gh-commit"]', commitOpts[0]);

    // Optionally select an issue or PR
    if (await page.$('[data-testid="gh-issue"]')) {
      const issueOpts = await page.$$eval(
        '[data-testid="gh-issue"] option',
        opts => opts.map(o => (o as HTMLOptionElement).value)
      );
      if (issueOpts.length) {
        await page.selectOption('[data-testid="gh-issue"]', issueOpts[0]);
      }
    }

    // Enter the task description
    await page.fill('[data-testid="execution-dod-input"]', 'Please open a pull request');

    // Click Execute to start the pipeline
    await page.click('[data-testid="execute-button"]');

    // Wait for the stream log container to appear
    await page.waitForSelector('[data-testid="stream-log"]');

    // Assert that the stream eventually contains a completion event
    await expect(page.locator('[data-testid="stream-log"]')).toContainText('completion');
  });
});

test.describe('E2E AI Documents (UI)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    // TODO: Implement real login or set session cookie
  });

  test('should create an ai_document via the UI', async ({ page }) => {
    // Open the ai_documents page
    await page.goto('/executions?type=pipeline:ai_documents');

    // Select GitHub account
    await page.waitForSelector('[data-testid="gh-account"]');
    const accountOpts = await page.$$eval(
      '[data-testid="gh-account"] option',
      opts => opts.map(o => (o as HTMLOptionElement).value)
    );
    await page.selectOption('[data-testid="gh-account"]', accountOpts[0]);

    // Select repository
    await page.waitForSelector('[data-testid="gh-repo"]');
    const repoOpts = await page.$$eval(
      '[data-testid="gh-repo"] option',
      opts => opts.map(o => (o as HTMLOptionElement).value)
    );
    await page.selectOption('[data-testid="gh-repo"]', repoOpts[0]);

    // Select branch
    await page.waitForSelector('[data-testid="gh-branch"]');
    const branchOpts = await page.$$eval(
      '[data-testid="gh-branch"] option',
      opts => opts.map(o => (o as HTMLOptionElement).value)
    );
    await page.selectOption('[data-testid="gh-branch"]', branchOpts[0]);

    // Select commit
    await page.waitForSelector('[data-testid="gh-commit"]');
    const commitOpts = await page.$$eval(
      '[data-testid="gh-commit"] option',
      opts => opts.map(o => (o as HTMLOptionElement).value)
    );
    await page.selectOption('[data-testid="gh-commit"]', commitOpts[0]);

    // Enter the ai_document task description
    await page.fill('[data-testid="execution-dod-input"]', 'Suggest MCP ai_documents for this repo');

    // Click Execute to start the ai_documents pipeline
    await page.click('[data-testid="execute-button"]');

    // Wait for the stream log container to appear
    await page.waitForSelector('[data-testid="stream-log"]');

    // Assert that the stream eventually contains a completion event
    await expect(page.locator('[data-testid="stream-log"]')).toContainText('completion');
  });
});
