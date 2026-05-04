import { test, expect } from '@playwright/test';

// Toggle API mocks: default on (undefined), set USE_API_MOCK=false to disable
const useMocks = process.env.USE_API_MOCK !== 'false';

// Visual regression tests for Deliverables page configurations and history
test.describe('UI Visual - Deliverables Flows', () => {
  test('Deliverables - Configuration screen', async ({ page }) => {
    await page.goto('/executions?type=pipeline:deliverables');
    // Wait for GitHub selectors and task input
    await page.waitForSelector('[data-testid="gh-account"]');
    await page.waitForSelector('[data-testid="execution-need-definition-input"]');
    // Stabilize dynamic content
    await page.waitForTimeout(500);
    // Capture configuration state
    await expect(page).toHaveScreenshot('deliverables-config.png', { fullPage: true });
  });

  /**
   * Test: Deliverables Completed Run Screen
   *
   * Simulates a completed deliverable run for a sample deliverable. Steps:
   * 1. When USE_API_MOCK is not 'false', stub GET /api/deliverables/history to return a mock run:
   *    - run ID 'test-run'
   *    - one pull request item titled 'Add authentication', PR #42
   *    - context summary and processing stats
   * 2. Navigate to /deliverables?runId=test-run
   * 3. Wait for UI elements:
   *    - 'New Deliverable' button
   *    - Summary header with 'Created PR #42'
   * 4. Pause briefly for dynamic UI stabilization
   * 5. Capture full-page screenshot and compare with 'deliverables-completed.png'
   *
   * Mocks can be disabled by setting environment variable USE_API_MOCK=false
   */
  test('Deliverables - Completed run screen', async ({ page }) => {
    // Stub deliverable history API to return a sample run when mocks enabled
    if (useMocks) {
      await page.route('**/api/executions/history?type=pipeline:deliverables', route =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([
            {
              id: 'test-run',
              created_at: new Date().toISOString(),
              items: [
                {
                  id: '1',
                  run_id: 'test-run',
                  title: 'Add authentication',
                  repository: 'user/repo',
                  deliverable_type: 'pull_request',
                  deliverable_id: '42',
                  created_at: new Date().toISOString(),
                  deliverable_status: 'open',
                },
              ],
              context: {
                summary: 'Created PR #42 to add auth',
                processingStats: { time: '2s', tokens: { input: 5, output: 10, total: 15 }, btdUsed: 1 },
                repoSnapshot: {},
              },
            },
          ]),
        })
      );
    }
    // Navigate to history view
    await page.goto('/executions?type=pipeline:deliverables&runId=test-run');
    // Check summary header
    const summaryHeader = page.locator('h3:has-text("Created PR #42")');
    await expect(summaryHeader).toBeVisible();
    // Capture summary section
    await expect(summaryHeader).toHaveScreenshot('deliverables-summary.png');
    // Capture deliverables sidebar list
    const sidebarList = page.locator('[data-testid="sidebar-deliverables-list"]');
    await expect(sidebarList).toBeVisible();
    await expect(sidebarList).toHaveScreenshot('deliverables-list.png');
    // Final full-page snapshot
    await expect(page).toHaveScreenshot('deliverables-completed.png', { fullPage: true });
  });
});
