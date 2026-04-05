import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { chromium } from 'playwright';
import { createServer } from '../server.js';

/**
 * @typedef {{ app: any, baseUrl: string, page: import('playwright').Page }} BrowserHarness
 */

/** @type {((name: string, fn: (t: any) => any) => any) & ((name: string, options: any, fn: (t: any) => any) => any)} */
const testAny = test;
const chromiumAny = /** @type {any} */ (chromium);
const createServerAny = /** @type {any} */ (createServer);

/**
 * @param {any} t
 * @param {(ctx: BrowserHarness) => Promise<any>} fn
 * @returns {Promise<any>}
 */
async function withBrowserDemo(t, fn) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'engi-demo-e2e-'));
  const dataPath = path.join(tempDir, 'state.json');
  const publicDir = path.join(process.cwd(), 'public');
  const { app, server } = await createServerAny({ dataPath, publicDir });

  app.ensureState();

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => resolve(undefined));
  });

  const address = /** @type {import('node:net').AddressInfo} */ (server.address());
  const baseUrl = `http://127.0.0.1:${address.port}`;
  const browser = await chromiumAny.launch({ headless: true });
  const page = await browser.newPage();

  t.after(async () => {
    await page.close();
    await browser.close();
    await new Promise((resolve, reject) => server.close((/** @type {Error | undefined} */ error) => (error ? reject(error) : resolve(undefined))));
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  return fn({ app, baseUrl, page });
}

/**
 * @param {import('playwright').Page} page
 * @param {string} expectedText
 * @returns {Promise<void>}
 */
async function waitForStatus(page, expectedText) {
  await page.waitForFunction((/** @type {string} */ text) => {
    const status = document.getElementById('status')?.textContent || '';
    return status.includes(text);
  }, expectedText);
}

/**
 * @param {import('playwright').Page} page
 * @param {string} baseUrl
 * @returns {Promise<void>}
 */
async function loadDemo(page, baseUrl) {
  await page.goto(baseUrl);
  await page.waitForLoadState('networkidle');
  await waitForStatus(page, 'Ready.');
}

/**
 * @param {import('playwright').Page} page
 * @returns {Promise<string[]>}
 */
async function readPanelHeadings(page) {
  return page.evaluate(() => Array.from(document.querySelectorAll('main .panel-head h2')).map((heading) => {
    const wrapped = heading.querySelector(':scope > .label-with-info');
    if (wrapped?.firstElementChild?.textContent) return wrapped.firstElementChild.textContent.trim();
    const directText = Array.from(heading.childNodes).find((node) => node.nodeType === Node.TEXT_NODE && (node.textContent || '').trim());
    return (directText?.textContent || heading.textContent || '').trim();
  }));
}

/**
 * @param {import('playwright').Page} page
 * @returns {Promise<Record<string, string>>}
 */
async function readSummary(page) {
  return page.evaluate(() => Object.fromEntries(Array.from(document.querySelectorAll('.summary-card')).map((card) => {
    const wrapped = card.querySelector('.meta > .label-with-info');
    const label = wrapped?.firstElementChild?.textContent?.trim() || card.querySelector('.meta')?.textContent?.trim() || '';
    return [label, card.querySelector(':scope > strong')?.textContent?.trim() || ''];
  })));
}

testAny('browser flow keeps V15 ordering and drives deposit to targeted settlement', { timeout: 120_000 }, async (t) => {
  await withBrowserDemo(t, async ({ app, baseUrl, page }) => {
    const seededState = app.readState();
    const authSession = seededState.githubAppSessions.find((/** @type {any} */ session) => session.repo === 'frontier/demo-auth');
    const inventoryEntry = seededState.repoArtifactInventory.find((/** @type {any} */ entry) => entry.repo === authSession.repo);

    await loadDemo(page, baseUrl);

    assert.deepEqual(await readPanelHeadings(page), [
      '0. Operating picture',
      '1. Depositing + candidate assets',
      '2. Needing + measured demand',
      '3. Depositing-to-needing fit',
      '4. Ranked candidates + verification determinisms',
      '5. Asset pack + branch artifacts',
      '6. Settlement + journal diff',
      '7. Ledger + policy surfaces'
    ]);

    const initialSummary = await readSummary(page);
    assert.equal(initialSummary['Candidate assets'], '11');
    assert.equal(initialSummary['Selected deposit refs'], '0');
    assert.equal(initialSummary['Latest bundle'], 'No run yet');

    await page.selectOption('#authSessionPicker', authSession.authSessionId);
    await page.locator('.inventory-card').filter({ hasText: inventoryEntry.title }).first().click();
    await page.waitForFunction(() => {
      const summary = document.getElementById('inventorySelectionSummary')?.textContent || '';
      return summary.includes('Selected 1 inventory artifact.');
    });

    await page.fill('input[name="title"]', 'Browser-selected auth bundle');
    await page.fill('textarea[name="operatorNote"]', 'Browser verification deposit.');
    await page.getByRole('button', { name: 'Deposit candidate asset into ENGI flow' }).click();
    await waitForStatus(page, 'Candidate asset deposited into the V15 repo-authenticated flow.');

    const depositedSummary = await readSummary(page);
    assert.equal(depositedSummary['Candidate assets'], '12');
    assert.ok(await page.locator('#assets').getByText('Browser-selected auth bundle').count() >= 1);

    await page.getByRole('button', { name: 'Make ENGI branch' }).click();
    await waitForStatus(page, 'Created engi/remediation-');

    const settledSummary = await readSummary(page);
    assert.equal(settledSummary['Active deposit profile'], 'Targeted deposit');
    assert.ok(Number(settledSummary['Selected assets in latest pack']) >= 1);
    assert.ok(Number(settledSummary['Settlement-credited assets']) >= 1);
    assert.notEqual(settledSummary['Latest bundle'], 'No run yet');

    assert.ok(await page.locator('#branchArtifacts').getByText('Selected asset pack').count() >= 1);
    assert.ok(await page.locator('#settlement').getByText('Settlement preview').count() >= 1);
    assert.ok(await page.locator('#settlement').getByText('Source-to-shares chain').count() >= 1);
    assert.ok(await page.locator('#settlement').getByText('Journal diff').count() >= 1);
  });
});

testAny('browser flow can switch to normalization mode and surface source-to-shares behavior', { timeout: 120_000 }, async (t) => {
  await withBrowserDemo(t, async ({ baseUrl, page }) => {
    await loadDemo(page, baseUrl);

    await page.selectOption('#scenarioPicker', 'auth-many-asset-normalization');
    await waitForStatus(page, 'Selected scenario auth-many-asset-normalization (Normalization deposit).');

    const selectedScenarioSummary = await readSummary(page);
    assert.equal(selectedScenarioSummary['Active deposit profile'], 'Normalization deposit');
    assert.equal(selectedScenarioSummary['Active scenario'], 'many-asset-settlement-normalization');

    await page.getByRole('button', { name: 'Make ENGI branch' }).click();
    await waitForStatus(page, 'Created engi/remediation-need_auth-many-asset-normalization');

    const settledSummary = await readSummary(page);
    assert.equal(settledSummary['Active deposit profile'], 'Normalization deposit');
    assert.equal(settledSummary['Active scenario'], 'many-asset-settlement-normalization');
    assert.equal(settledSummary['Fit pressure'], 'high');
    assert.ok(Number(settledSummary['Selected deposit refs']) >= 2);
    assert.ok(Number(settledSummary['Selected assets in latest pack']) >= 1);
    assert.ok(Number(settledSummary['Settlement-credited assets']) >= 1);

    assert.ok(await page.locator('#branchArtifacts').getByText('Profile composition surface').count() >= 1);
    assert.ok(await page.locator('#settlement').getByText('Source-to-shares chain').count() >= 1);
    assert.ok(await page.locator('#settlement').getByText('Settlement participation').count() >= 1);
    assert.ok(await page.locator('#settlement').getByText(/zero-credit participating/i).count() >= 1);
  });
});
