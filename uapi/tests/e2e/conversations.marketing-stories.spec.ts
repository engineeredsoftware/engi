import { test, expect } from '@playwright/test';
import { promises as fs } from 'fs';
import path from 'path';

const fixturesDir = path.join(__dirname, 'fixtures', 'stories');

interface RunStep {
  type: 'run';
  kind: 'deliverable' | 'measure';
  id: string;
  logChunks: string[];
}

interface ChatStep {
  type: 'user' | 'agent';
  text: string;
}

type Step = RunStep | ChatStep;

async function openConversations(page) {
  await page.goto('/');
  await page.click('[data-testid="conversations-orb"], [data-orbital-testid="conversations-orb"]');
  await page.click('button[title="Fullscreen Mode"], button[aria-label="Fullscreen"], button:has-text("Fullscreen")');
}

async function splitPane(page) {
  await page.click('button[title="Add Split"], button:has-text("Split")');
}

async function embedLogs(page) {
  const btn = page.locator('button:has-text("Logs")');
  if (await btn.isDisabled()) return; // already embedded in single pane test
  await btn.click();
}

async function mockRun(page, run: RunStep) {
  // Inject script to fake WS server for this run
  await page.addInitScript((run) => {
    window.__MOCK_WS_MESSAGES__ = window.__MOCK_WS_MESSAGES__ || [];
    window.__MOCK_WS_MESSAGES__.push(run);
  }, run);
}

// Monkey-patch WS in page context before it loads
test.use({
  launchOptions: {
    args: [
      '--disable-features=IsolateOrigins,site-per-process',
    ],
  },
});

// Auto-generate tests
(async () => {
  const files = await fs.readdir(fixturesDir);
  for (const file of files) {
    const story = JSON.parse(await fs.readFile(path.join(fixturesDir, file), 'utf-8')) as { title: string; steps: Step[] };

    test(story.title, async ({ page }) => {
      await openConversations(page);

      // create split so logs embed meaningful when >1 pane
      await splitPane(page);
      await embedLogs(page);

      for (const step of story.steps) {
        if (step.type === 'user') {
          await page.fill('.chat-input-container textarea', step.text);
          await page.press('.chat-input-container textarea', 'Enter');
          await expect(page.locator('.message-user', { hasText: step.text })).toBeVisible();
        } else if (step.type === 'agent') {
          await expect(page.locator('.message-agent', { hasText: step.text })).toBeVisible();
        } else if (step.type === 'run') {
          await mockRun(page, step);
          for (const chunk of step.logChunks) {
            await expect(page.locator('.embedded-process-log')).toContainText(chunk);
          }
        }
      }
    });
  }
})();
