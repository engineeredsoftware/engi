import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { createServer } from '../server.js';
import { CURRENT_CANON_POSTURE } from '../src/canon-posture.js';

/**
 * @typedef {{ app: any, baseUrl: string, page: import('playwright').Page }} BrowserHarness
 */

/** @type {((name: string, fn: (t: any) => any) => any) & ((name: string, options: any, fn: (t: any) => any) => any)} */
const testAny = test;
const chromiumAny = /** @type {any} */ (chromium);
const createServerAny = /** @type {any} */ (createServer);
const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.resolve(TEST_DIR, '..');

/**
 * @param {any} t
 * @param {(ctx: BrowserHarness) => Promise<any>} fn
 * @returns {Promise<any>}
 */
async function withBrowserDemo(t, fn) {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'protocol-demonstration-e2e-'));
  const dataPath = path.join(tempDir, 'state.json');
  const publicDir = path.join(APP_ROOT, 'public');
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

/**
 * @param {import('playwright').Page} page
 * @param {string} surfaceTitle
 * @returns {Promise<import('playwright').Locator>}
 */
async function surfaceByTitle(page, surfaceTitle) {
  const surfaces = page.locator('article.json-surface');
  const index = await surfaces.evaluateAll((articles, title) => articles.findIndex((article) => {
    const heading = article.querySelector('h3');
    if (!heading) return false;
    const label = heading.querySelector('.label-with-info > span:first-child');
    const text = (label?.textContent || heading.childNodes[0]?.textContent || heading.textContent || '').trim();
    return text === title;
  }), surfaceTitle);
  if (index < 0) {
    throw new Error(`Could not find surface with title ${surfaceTitle}`);
  }
  const surface = surfaces.nth(index);
  await surface.waitFor();
  return surface;
}

/**
 * @param {import('playwright').Page} page
 * @param {string} panelId
 * @param {string} surfaceTitle
 * @returns {Promise<import('playwright').Locator>}
 */
async function surfaceByTitleInSection(page, panelId, surfaceTitle) {
  const surfaces = page.locator(`#${panelId} article.json-surface`);
  const index = await surfaces.evaluateAll((articles, title) => articles.findIndex((article) => {
    const heading = article.querySelector('h3');
    if (!heading) return false;
    const label = heading.querySelector('.label-with-info > span:first-child');
    const text = (label?.textContent || heading.childNodes[0]?.textContent || heading.textContent || '').trim();
    return text === title;
  }), surfaceTitle);
  if (index < 0) {
    throw new Error(`Could not find surface with title ${surfaceTitle} in #${panelId}`);
  }
  const surface = surfaces.nth(index);
  await surface.waitFor();
  return surface;
}

/**
 * @param {import('playwright').Page} page
 * @param {string} panelId
 * @param {string} subtitle
 * @returns {Promise<import('playwright').Locator>}
 */
async function surfaceBySubtitleInSection(page, panelId, subtitle) {
  const surfaces = page.locator(`#${panelId} article.json-surface`);
  const index = await surfaces.evaluateAll((articles, subtitleText) => articles.findIndex((article) => {
    const meta = article.querySelector('.json-surface-head > div > p.meta');
    const text = meta?.textContent?.trim() || '';
    return text === subtitleText;
  }), subtitle);
  if (index < 0) {
    throw new Error(`Could not find surface with subtitle ${subtitle} in #${panelId}`);
  }
  const surface = surfaces.nth(index);
  await surface.waitFor();
  return surface;
}

/**
 * @param {string} value
 * @returns {string}
 */
function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * @param {import('playwright').Locator} surface
 * @returns {import('playwright').Locator}
 */
function activeRawPanelPre(surface) {
  return surface.locator('.surface-panel-raw.active pre').first();
}

/**
 * @param {import('playwright').Locator} surface
 * @returns {Promise<void>}
 */
async function switchSurfaceToRaw(surface) {
  await surface.locator('.surface-mode-button[data-mode="raw"]').click();
}

/**
 * @param {string[]} values
 * @returns {string[]}
 */
function sortedStrings(values) {
  return [...values].sort((a, b) => a.localeCompare(b));
}

/**
 * @param {string[] | undefined} actual
 * @param {string[]} expected
 * @param {string} message
 * @returns {void}
 */
function assertSameStrings(actual, expected, message) {
  assert.deepEqual(sortedStrings(actual || []), sortedStrings(expected), message);
}

/**
 * @param {import('playwright').Page} page
 * @param {string} label
 * @param {string} expectedValue
 * @returns {Promise<void>}
 */
async function waitForSummaryValue(page, label, expectedValue) {
  await page.waitForFunction(({ summaryLabel, value }) => {
    const cards = Array.from(document.querySelectorAll('.summary-card'));
    return cards.some((card) => {
      const wrapped = card.querySelector('.meta > .label-with-info');
      const currentLabel = wrapped?.firstElementChild?.textContent?.trim() || card.querySelector('.meta')?.textContent?.trim() || '';
      const currentValue = card.querySelector(':scope > strong')?.textContent?.trim() || '';
      return currentLabel === summaryLabel && currentValue === value;
    });
  }, { summaryLabel: label, value: expectedValue });
}

/**
 * @param {import('playwright').Page} page
 * @param {string} principal
 * @returns {Promise<any>}
 */
async function fetchProjectedState(page, principal) {
  return page.evaluate(async (projectionPrincipal) => {
    const response = await fetch(`/api/state?principal=${encodeURIComponent(projectionPrincipal)}`);
    const json = await response.json();
    if (!response.ok) throw new Error(json.error || `Failed to fetch ${projectionPrincipal} projection`);
    return json;
  }, principal);
}

/**
 * @param {import('playwright').Page} page
 * @returns {Promise<any>}
 */
async function readProjectionVisibilitySummary(page) {
  const surface = await surfaceByTitleInSection(page, 'branchArtifacts', 'Projection visibility summary');
  await switchSurfaceToRaw(surface);
  await activeRawPanelPre(surface).waitFor();
  return JSON.parse(String(await activeRawPanelPre(surface).textContent() || '{}'));
}

/**
 * @param {{
 *   page: import('playwright').Page,
 *   principal: string,
 *   scenarioId: string,
 *   branchMode: string,
 *   cellLabel: string
 * }} input
 * @returns {Promise<void>}
 */
async function assertOperatorProjectionCell({ page, principal, scenarioId, branchMode, cellLabel }) {
  const projected = await fetchProjectedState(page, principal);
  const internal = await fetchProjectedState(page, 'internal');
  const projectedRun = projected.latestRun;
  const internalRun = internal.latestRun;
  const projectionSummary = await readProjectionVisibilitySummary(page);
  const publicArtifactPaths = projectedRun.projectionPolicy.publicArtifactPaths || [];
  const privateArtifactPaths = projectedRun.projectionPolicy.privateArtifactPaths || [];
  const policyVisibleNonSourcePaths = [...new Set([...publicArtifactPaths, ...privateArtifactPaths])]
    .filter((artifactPath) => !artifactPath.startsWith('.bitcode/source-material/'));
  const internalRawPaths = Object.keys(internalRun.branchArtifacts.files || {});
  const nonSourceRawPaths = internalRawPaths.filter((artifactPath) => !artifactPath.startsWith('.bitcode/source-material/'));

  assert.equal(projected.projectionPrincipal, principal, `${cellLabel} projected principal drift`);
  assert.equal(projectedRun.scenarioId, scenarioId, `${cellLabel} projected scenario drift`);
  assert.equal(projectedRun.branchMode, branchMode, `${cellLabel} projected branch-mode drift`);
  assert.equal(internalRun.scenarioId, scenarioId, `${cellLabel} internal scenario drift`);
  assert.equal(internalRun.branchMode, branchMode, `${cellLabel} internal branch-mode drift`);
  assert.equal(projectionSummary.projectionPrincipal, principal, `${cellLabel} projection summary principal drift`);
  assert.equal(projectionSummary.sourceMaterialVisible, principal === 'internal', `${cellLabel} source-material visibility drift`);
  assert.equal(projectionSummary.rawBranchFilesAvailable, principal === 'internal', `${cellLabel} raw-file availability drift`);

  if (principal === 'public') {
    assert.equal(projectedRun.systemProofBundle, undefined, `${cellLabel} public leaked system proof bundle`);
    assert.equal(projectedRun.proofWitnessManifest, undefined, `${cellLabel} public leaked proof witness manifest`);
    assert.equal(projectedRun.authorizationDecisions, undefined, `${cellLabel} public leaked authorization decisions`);
    assert.equal(projectedRun.inferenceProofs, undefined, `${cellLabel} public leaked inference proofs`);
    assertSameStrings(Object.keys(projectedRun.publicArtifacts || {}), publicArtifactPaths, `${cellLabel} public artifact exactness drift`);
    assertSameStrings(Object.keys(projectedRun.branchArtifacts.publicFiles || {}), publicArtifactPaths, `${cellLabel} public file exactness drift`);
    assertSameStrings(projectionSummary.visibleArtifactPaths, publicArtifactPaths, `${cellLabel} public visible path drift`);
    for (const artifactPath of privateArtifactPaths) {
      assert.equal(artifactPath in (projectedRun.publicArtifacts || {}), false, `${cellLabel} public leaked private artifact ${artifactPath}`);
      assert.equal(artifactPath in (projectedRun.branchArtifacts.publicFiles || {}), false, `${cellLabel} public file leaked private artifact ${artifactPath}`);
    }
    assert.equal(projectionSummary.proofFamilyCount, 0, `${cellLabel} public proof-family visibility drift`);
    return;
  }

  assert.equal(projectedRun.systemProofBundle.proofFamilies.length, 9, `${cellLabel} lost proof families`);
  assert.ok((projectedRun.branchArtifacts.visibleFileInventory || internalRawPaths).length > publicArtifactPaths.length, `${cellLabel} did not expose richer-than-public artifacts`);

  if (principal === 'reviewer') {
    assert.equal(projectedRun.authorizationDecisions, undefined, `${cellLabel} reviewer leaked authorization decisions`);
    assert.equal(projectedRun.branchArtifacts.files, undefined, `${cellLabel} reviewer leaked raw files`);
    assertSameStrings(projectedRun.branchArtifacts.visibleFileInventory, policyVisibleNonSourcePaths, `${cellLabel} reviewer visible inventory exactness drift`);
    assertSameStrings(projectionSummary.visibleArtifactPaths, policyVisibleNonSourcePaths, `${cellLabel} reviewer summary visible path drift`);
    return;
  }

  if (principal === 'buyer') {
    assert.ok(projectedRun.authorizationDecisions.length >= 1, `${cellLabel} buyer lost authorization decisions`);
    assert.equal(projectedRun.branchArtifacts.files, undefined, `${cellLabel} buyer leaked raw files`);
    assertSameStrings(projectedRun.branchArtifacts.visibleFileInventory, nonSourceRawPaths, `${cellLabel} buyer visible inventory exactness drift`);
    assertSameStrings(projectionSummary.visibleArtifactPaths, nonSourceRawPaths, `${cellLabel} buyer summary visible path drift`);
    return;
  }

  assert.ok(internalRawPaths.some((artifactPath) => artifactPath.startsWith('.bitcode/source-material/')), `${cellLabel} internal lost source material`);
  assert.ok(projectedRun.authorizationDecisions.length >= 1, `${cellLabel} internal lost authorization decisions`);
  assertSameStrings(Object.keys(projectedRun.branchArtifacts.files || {}), internalRawPaths, `${cellLabel} internal raw file exactness drift`);
  assertSameStrings(projectionSummary.visibleArtifactPaths, internalRawPaths, `${cellLabel} internal summary visible path drift`);
}

testAny('browser flow keeps operator ordering and drives deposit to targeted settlement', { timeout: 120_000 }, async (t) => {
  await withBrowserDemo(t, async ({ app, baseUrl, page }) => {
    const seededState = app.readState();
    const authSession = seededState.githubAppSessions.find((/** @type {any} */ session) => session.repo === 'frontier/demo-auth');
    const inventoryEntry = seededState.repoArtifactInventory.find((/** @type {any} */ entry) => entry.repo === authSession.repo);

    await loadDemo(page, baseUrl);
    await page.waitForFunction((title) => document.title.includes(title), CURRENT_CANON_POSTURE.documentTitle);

    assert.deepEqual(await readPanelHeadings(page), [
      '0. Operating picture',
      '1. Deposit draft + selected supply',
      '2. Read draft + measured demand',
      '3. Deposit-to-read fit',
      '4. Ranked candidates + verification',
      '5. Shippables + branch artifacts',
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
    await page.getByRole('button', { name: 'Deposit candidate asset into Bitcode flow' }).click();
    await waitForStatus(page, 'Candidate asset deposited into the repo-authenticated flow.');

    const depositedSummary = await readSummary(page);
    assert.equal(depositedSummary['Candidate assets'], '12');
    assert.ok(await page.locator('#assets').getByText('Browser-selected auth bundle').count() >= 1);

    await page.getByRole('button', { name: 'Make Bitcode branch' }).click();
    await waitForStatus(page, 'Created bitcode/remediation-');

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

/**
 * @param {import('playwright').Page} page
 * @param {string} panelId
 * @param {string} title
 * @returns {Promise<number>}
 */
async function sectionSurfaceTitleCount(page, panelId, title) {
  return page.locator(`#${panelId} article.json-surface`).evaluateAll((articles, headingTitle) => articles.filter((article) => {
    const heading = article.querySelector('h3');
    if (!heading) return false;
    const label = heading.querySelector('.label-with-info > span:first-child');
    const text = (label?.textContent || heading.childNodes[0]?.textContent || heading.textContent || '').trim();
    return text === headingTitle;
  }).length, title);
}

testAny('browser operator matrix covers every scenario, branch mode, and projection cell', { timeout: 360_000 }, async (t) => {
  await withBrowserDemo(t, async ({ app, baseUrl, page }) => {
    const seededState = app.readState();
    const scenarios = seededState.readScenarios.map((/** @type {any} */ scenario) => ({
      scenarioId: scenario.scenarioId,
      scenarioFamily: scenario.scenarioFamily
    }));
    const branchModes = ['patch', 'context'];
    const principals = ['internal', 'reviewer', 'buyer', 'public'];
    /** @type {string[]} */
    const consoleErrors = [];
    /** @type {string[]} */
    const pageErrors = [];

    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));

    await loadDemo(page, baseUrl);
    assert.equal(consoleErrors.length, 0, 'initial demo load emitted console errors');
    assert.equal(pageErrors.length, 0, 'initial demo load emitted page errors');

    let coveredCells = 0;
    for (const scenario of scenarios) {
      for (const branchMode of branchModes) {
        for (const principal of principals) {
          const cellLabel = `${scenario.scenarioId}/${branchMode}/${principal}`;
          /** @type {number} */
          const consoleErrorStart = consoleErrors.length;
          /** @type {number} */
          const pageErrorStart = pageErrors.length;

          await page.getByRole('button', { name: 'Reset runtime' }).click();
          await waitForStatus(page, 'Transactions reset to the seeded');

          await page.selectOption('#projectionPicker', principal);
          await waitForSummaryValue(page, 'Projection', principal);
          await page.selectOption('#branchModePicker', branchMode);
          await waitForSummaryValue(page, 'Branch mode', branchMode);
          await page.selectOption('#scenarioPicker', scenario.scenarioId);
          await waitForSummaryValue(page, 'Active scenario', scenario.scenarioFamily);

          await page.getByRole('button', { name: 'Make Bitcode branch' }).click();
          await waitForStatus(page, `Created bitcode/remediation-read_${scenario.scenarioId}`);

          const summary = await readSummary(page);
          assert.equal(summary['Projection'], principal, `${cellLabel} summary projection drift`);
          assert.equal(summary['Branch mode'], branchMode, `${cellLabel} summary branch-mode drift`);
          assert.equal(summary['Active scenario'], scenario.scenarioFamily, `${cellLabel} summary scenario drift`);
          assert.notEqual(summary['Latest bundle'], 'No run yet', `${cellLabel} stale latest bundle`);
          assert.ok(Number(summary['Visible branch artifacts']) > 0, `${cellLabel} lost visible artifacts`);
          assert.ok(await sectionSurfaceTitleCount(page, 'branchArtifacts', 'Projection visibility summary') >= 1, `${cellLabel} lost projection visibility UI surface`);
          assert.ok(await page.locator('#settlement').getByText('Bounded public proof').count() >= 1, `${cellLabel} lost bounded public proof surface`);

          await assertOperatorProjectionCell({
            page,
            principal,
            scenarioId: scenario.scenarioId,
            branchMode,
            cellLabel
          });

          assert.deepEqual(consoleErrors.slice(consoleErrorStart), [], `${cellLabel} emitted console errors`);
          assert.deepEqual(pageErrors.slice(pageErrorStart), [], `${cellLabel} emitted page errors`);
          coveredCells += 1;
        }
      }
    }

    assert.equal(coveredCells, 64);
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

    await page.getByRole('button', { name: 'Make Bitcode branch' }).click();
    await waitForStatus(page, 'Created bitcode/remediation-read_auth-many-asset-normalization');

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

testAny('browser flow surfaces identity/auth and proof/disclosure panels for privacy-boundary review', { timeout: 120_000 }, async (t) => {
  await withBrowserDemo(t, async ({ baseUrl, page }) => {
    await loadDemo(page, baseUrl);

    await page.selectOption('#scenarioPicker', 'privacy-boundary-proof-export');
    await waitForStatus(page, 'Selected scenario privacy-boundary-proof-export (Targeted deposit).');

    await page.getByRole('button', { name: 'Make Bitcode branch' }).click();
    await waitForStatus(page, 'Created bitcode/remediation-read_privacy-boundary-proof-export');

    const settledSummary = await readSummary(page);
    assert.equal(settledSummary['Active scenario'], 'privacy-boundary-stress');
    assert.equal(settledSummary['Active deposit profile'], 'Targeted deposit');
    assert.ok(Number(settledSummary['Selected assets in latest pack']) >= 1);

    assert.ok(await page.locator('#operatingPicture').getByText('Identity and auth spine').count() >= 1);
    assert.ok(await page.locator('#settlement').getByText('System proof bundle').count() >= 1);
    assert.ok(await page.locator('#settlement').getByText('Proof contract + evidence chain').count() >= 1);
    assert.ok(await page.locator('#settlement').getByText('Theorem / invariant checks').count() >= 1);
    assert.ok(await page.locator('#settlement').getByText('Bounded public proof').count() >= 1);
    assert.ok(await page.locator('#settlement').getByText('private proof artifacts stay private').count() >= 1);
  });
});

testAny('browser flow surfaces deposit validation failures without mutating seeded state', { timeout: 120_000 }, async (t) => {
  await withBrowserDemo(t, async ({ baseUrl, page }) => {
    await loadDemo(page, baseUrl);

    await page.getByRole('button', { name: 'Deposit candidate asset into Bitcode flow' }).click();
    await waitForStatus(page, 'Raw content or repo artifact selection is required.');

    const summary = await readSummary(page);
    assert.equal(summary['Candidate assets'], '11');
    assert.equal(summary['Selected deposit refs'], '0');
    assert.equal(summary['Latest bundle'], 'No run yet');
  });
});

testAny('browser flow recovers from an invalid deposit into a valid raw deposit and branch run', { timeout: 120_000 }, async (t) => {
  await withBrowserDemo(t, async ({ baseUrl, page }) => {
    await loadDemo(page, baseUrl);

    await page.getByRole('button', { name: 'Deposit candidate asset into Bitcode flow' }).click();
    await waitForStatus(page, 'Raw content or repo artifact selection is required.');
    assert.equal((await readSummary(page))['Candidate assets'], '11');

    await page.fill('input[name="title"]', 'Recovered browser raw deposit');
    await page.fill('input[name="author"]', 'V17 Browser');
    await page.fill('textarea[name="content"]', 'Manual recovery evidence for a browser-visible invalid-to-valid deposit path.');
    await page.getByRole('button', { name: 'Deposit candidate asset into Bitcode flow' }).click();
    await waitForStatus(page, 'Candidate asset deposited into the repo-authenticated flow.');

    const depositedSummary = await readSummary(page);
    assert.equal(depositedSummary['Candidate assets'], '12');
    assert.ok(await page.locator('#assets').getByText('Recovered browser raw deposit').count() >= 1);

    await page.getByRole('button', { name: 'Make Bitcode branch' }).click();
    await waitForStatus(page, 'Created bitcode/remediation-');

    const runSummary = await readSummary(page);
    assert.notEqual(runSummary['Latest bundle'], 'No run yet');
    assert.ok(Number(runSummary['Selected assets in latest pack']) >= 1);
  });
});

testAny('browser flow can reset back to the seeded state after a realized run', { timeout: 120_000 }, async (t) => {
  await withBrowserDemo(t, async ({ baseUrl, page }) => {
    await loadDemo(page, baseUrl);

    await page.getByRole('button', { name: 'Make Bitcode branch' }).click();
    await waitForStatus(page, 'Created bitcode/remediation-');
    assert.notEqual((await readSummary(page))['Latest bundle'], 'No run yet');

    await page.getByRole('button', { name: 'Reset runtime' }).click();
    await waitForStatus(page, 'Transactions reset to the seeded');

    const resetSummary = await readSummary(page);
    assert.equal(resetSummary['Candidate assets'], '11');
    assert.equal(resetSummary['Selected deposit refs'], '0');
    assert.equal(resetSummary['Latest bundle'], 'No run yet');
  });
});

testAny('browser flow surfaces no-survivor branch conflicts and recovers after reset', { timeout: 120_000 }, async (t) => {
  await withBrowserDemo(t, async ({ app, baseUrl, page }) => {
    const state = app.readState();
    app.writeState({ ...state, assets: [] });

    await loadDemo(page, baseUrl);
    const emptySummary = await readSummary(page);
    assert.equal(emptySummary['Candidate assets'], '0');
    assert.equal(emptySummary['Latest bundle'], 'No run yet');

    await page.getByRole('button', { name: 'Make Bitcode branch' }).click();
    await waitForStatus(page, 'No candidates survived into the asset pack');
    assert.equal((await readSummary(page))['Latest bundle'], 'No run yet');

    await page.getByRole('button', { name: 'Reset runtime' }).click();
    await waitForStatus(page, 'Transactions reset to the seeded');
    assert.equal((await readSummary(page))['Candidate assets'], '11');

    await page.getByRole('button', { name: 'Make Bitcode branch' }).click();
    await waitForStatus(page, 'Created bitcode/remediation-');

    const recoveredSummary = await readSummary(page);
    assert.notEqual(recoveredSummary['Latest bundle'], 'No run yet');
    assert.ok(Number(recoveredSummary['Selected assets in latest pack']) >= 1);
  });
});

testAny('browser flow surfaces projection visibility and proof-family catalog for reviewer versus public', { timeout: 120_000 }, async (t) => {
  await withBrowserDemo(t, async ({ baseUrl, page }) => {
    await loadDemo(page, baseUrl);

    await page.selectOption('#projectionPicker', 'reviewer');
    await waitForStatus(page, 'Viewing reviewer projection.');
    await page.selectOption('#scenarioPicker', 'privacy-boundary-proof-export');
    await waitForStatus(page, 'Selected scenario privacy-boundary-proof-export (Targeted deposit).');

    await page.getByRole('button', { name: 'Make Bitcode branch' }).click();
    await waitForStatus(page, 'Created bitcode/remediation-read_privacy-boundary-proof-export');

    const reviewerSummary = await readSummary(page);
    assert.equal(reviewerSummary['Projection'], 'reviewer');
    assert.equal(reviewerSummary['Visible proof families'], '9');
    assert.ok(Number(reviewerSummary['Visible branch artifacts']) > 0);

    assert.ok(await sectionSurfaceTitleCount(page, 'branchArtifacts', 'Projection visibility summary') >= 1);
    assert.ok(await sectionSurfaceTitleCount(page, 'settlement', 'Proof family catalog') >= 1);
    assert.ok(await page.locator('#settlement').getByText('prompt-completeness').count() >= 1);
    assert.ok(await page.locator('#settlement').getByText('proof-contract').count() >= 1);

    await page.selectOption('#projectionPicker', 'public');
    await waitForStatus(page, 'Viewing public projection.');

    const publicSummary = await readSummary(page);
    assert.equal(publicSummary['Projection'], 'public');
    assert.equal(publicSummary['Visible proof families'], '0');
    assert.ok(Number(publicSummary['Visible branch artifacts']) < Number(reviewerSummary['Visible branch artifacts']));
    assert.ok(await sectionSurfaceTitleCount(page, 'branchArtifacts', 'Projection visibility summary') >= 1);
    assert.equal(await sectionSurfaceTitleCount(page, 'settlement', 'Proof family catalog'), 0);
  });
});

testAny('browser flow can run a second scenario without reset and refresh latest operator truth', { timeout: 120_000 }, async (t) => {
  await withBrowserDemo(t, async ({ baseUrl, page }) => {
    await loadDemo(page, baseUrl);

    await page.getByRole('button', { name: 'Make Bitcode branch' }).click();
    await waitForStatus(page, 'Created bitcode/remediation-read_auth-issuer-rollback');

    const firstSummary = await readSummary(page);
    assert.equal(firstSummary['Active scenario'], 'monorepo-auth-rollback');
    assert.notEqual(firstSummary['Latest bundle'], 'No run yet');

    await page.selectOption('#scenarioPicker', 'privacy-boundary-proof-export');
    await waitForStatus(page, 'Selected scenario privacy-boundary-proof-export (Targeted deposit).');
    await page.getByRole('button', { name: 'Make Bitcode branch' }).click();
    await waitForStatus(page, 'Created bitcode/remediation-read_privacy-boundary-proof-export');

    const secondSummary = await readSummary(page);
    assert.equal(secondSummary['Active scenario'], 'privacy-boundary-stress');
    assert.notEqual(secondSummary['Latest bundle'], 'No run yet');
    assert.notEqual(secondSummary['Latest bundle'], firstSummary['Latest bundle']);
    assert.ok(await page.locator('#settlement').getByText('private proof artifacts stay private').count() >= 1);
  });
});

testAny('browser flow can inspect raw verification and proof JSON for a restrictive workflow', { timeout: 120_000 }, async (t) => {
  await withBrowserDemo(t, async ({ baseUrl, page }) => {
    await loadDemo(page, baseUrl);

    await page.selectOption('#projectionPicker', 'reviewer');
    await waitForStatus(page, 'Viewing reviewer projection.');
    await page.selectOption('#scenarioPicker', 'unsafe-patch-review-recovery');
    await waitForStatus(page, 'Selected scenario unsafe-patch-review-recovery (Targeted deposit).');

    await page.getByRole('button', { name: 'Make Bitcode branch' }).click();
    await waitForStatus(page, 'Created bitcode/remediation-read_unsafe-patch-review-recovery');

    const verificationSurface = await surfaceByTitleInSection(page, 'evaluations', 'Verification report');
    await switchSurfaceToRaw(verificationSurface);
    await activeRawPanelPre(verificationSurface).waitFor();
    const verificationRawText = await activeRawPanelPre(verificationSurface).textContent();
    assert.match(String(verificationRawText), /"useTier": "reject"/);
    assert.match(String(verificationRawText), /"policyRestrictions"/);

    const exclusionsSurface = await surfaceBySubtitleInSection(page, 'branchArtifacts', '.bitcode/materialization-exclusions.json');
    await switchSurfaceToRaw(exclusionsSurface);
    await activeRawPanelPre(exclusionsSurface).waitFor();
    const exclusionsRawText = await activeRawPanelPre(exclusionsSurface).textContent();
    assert.match(String(exclusionsRawText), /"exclusionClass"/);
    assert.match(String(exclusionsRawText), /Use tier reject does not authorize patch branch materialization/);

    const proofSurface = await surfaceBySubtitleInSection(page, 'settlement', '.bitcode/system-proof-bundle.json');
    await switchSurfaceToRaw(proofSurface);
    await activeRawPanelPre(proofSurface).waitFor();
    const proofRawText = await activeRawPanelPre(proofSurface).textContent();
    assert.match(String(proofRawText), /"proofFamilies"/);
    assert.match(String(proofRawText), /"verifierEntrypoint"/);
    assert.match(String(proofRawText), /"memberIds"/);
    assert.match(String(proofRawText), /"theoremIds"/);
    assert.match(String(proofRawText), /"verification-decisions"/);
    assert.match(String(proofRawText), /"use-tier-consequence"/);
    assert.match(String(proofRawText), /verification_decisions\.use_tier_consequence_closure/);
    assert.match(String(proofRawText), /selection_and_materialization\.exclusion_closure/);
  });
});

testAny('browser flow surfaces prompt and inference audit artifacts for internal review', { timeout: 120_000 }, async (t) => {
  await withBrowserDemo(t, async ({ baseUrl, page }) => {
    await loadDemo(page, baseUrl);

    await page.selectOption('#projectionPicker', 'internal');
    await waitForStatus(page, 'Viewing internal projection.');
    await page.selectOption('#scenarioPicker', 'auth-issuer-rollback');
    await waitForStatus(page, 'Selected scenario auth-issuer-rollback');

    await page.getByRole('button', { name: 'Make Bitcode branch' }).click();
    await waitForStatus(page, 'Created bitcode/remediation-read_auth-issuer-rollback');

    assert.ok(await sectionSurfaceTitleCount(page, 'branchArtifacts', 'Prompt family registry') >= 1);
    assert.ok(await sectionSurfaceTitleCount(page, 'branchArtifacts', 'Inference proofs') >= 1);
    assert.ok(await sectionSurfaceTitleCount(page, 'branchArtifacts', 'Prompt completeness family proof') >= 1);
    assert.ok(await sectionSurfaceTitleCount(page, 'branchArtifacts', 'Inference synthesis family proof') >= 1);

    const registrySurface = await surfaceBySubtitleInSection(page, 'branchArtifacts', '.bitcode/prompt-family-registry.json');
    await switchSurfaceToRaw(registrySurface);
    await activeRawPanelPre(registrySurface).waitFor();
    const registryRawText = await activeRawPanelPre(registrySurface).textContent();
    assert.match(String(registryRawText), /"closureCriteria"/);
    assert.match(String(registryRawText), /"BITCODE_NEED\.md"/);

    const inferenceSurface = await surfaceBySubtitleInSection(page, 'branchArtifacts', '.bitcode/inference-proofs.json');
    await switchSurfaceToRaw(inferenceSurface);
    await activeRawPanelPre(inferenceSurface).waitFor();
    const inferenceRawText = await activeRawPanelPre(inferenceSurface).textContent();
    assert.match(String(inferenceRawText), /"momentContractId"/);
    assert.match(String(inferenceRawText), /"evidenceBasisClosedToMoment": true/);
    assert.match(String(inferenceRawText), /"closureCriteria"/);
  });
});

testAny('browser flow surfaces static, authorization, and settlement family proofs for internal audit', { timeout: 120_000 }, async (t) => {
  await withBrowserDemo(t, async ({ baseUrl, page }) => {
    await loadDemo(page, baseUrl);

    await page.selectOption('#projectionPicker', 'internal');
    await waitForStatus(page, 'Viewing internal projection.');
    await page.selectOption('#scenarioPicker', 'auth-many-asset-normalization');
    await waitForStatus(page, 'Selected scenario auth-many-asset-normalization');

    await page.getByRole('button', { name: 'Make Bitcode branch' }).click();
    await waitForStatus(page, 'Created bitcode/remediation-read_auth-many-asset-normalization');

    assert.ok(await sectionSurfaceTitleCount(page, 'branchArtifacts', 'Static measurement report') >= 1);
    assert.ok(await sectionSurfaceTitleCount(page, 'branchArtifacts', 'Static code-analysis closure proof') >= 1);
    assert.ok(await sectionSurfaceTitleCount(page, 'branchArtifacts', 'Authorization and sensitive-flow family proof') >= 1);
    assert.ok(await sectionSurfaceTitleCount(page, 'settlement', 'Settlement source-to-shares family proof') >= 1);

    const staticProofSurface = await surfaceBySubtitleInSection(page, 'branchArtifacts', '.bitcode/static-measurement-proof.json');
    await switchSurfaceToRaw(staticProofSurface);
    await activeRawPanelPre(staticProofSurface).waitFor();
    const staticRawText = await activeRawPanelPre(staticProofSurface).textContent();
    assert.match(String(staticRawText), /static_code_analysis\.stage_domain_purity/);
    assert.match(String(staticRawText), /"allTheoremsPassed": true/);

    const authProofSurface = await surfaceBySubtitleInSection(page, 'branchArtifacts', '.bitcode/authorization-and-sensitive-flow-proof.json');
    await switchSurfaceToRaw(authProofSurface);
    await activeRawPanelPre(authProofSurface).waitFor();
    const authRawText = await activeRawPanelPre(authProofSurface).textContent();
    assert.match(String(authRawText), /authorization_and_sensitive_flow\.policy_assignment_closure/);
    assert.match(String(authRawText), /authorization_and_sensitive_flow\.no_unauthorized_public_flow/);

    const settlementParticipationSurface = await surfaceBySubtitleInSection(page, 'settlement', '.bitcode/settlement-participation.json');
    await switchSurfaceToRaw(settlementParticipationSurface);
    await activeRawPanelPre(settlementParticipationSurface).waitFor();
    const settlementParticipationRawText = await activeRawPanelPre(settlementParticipationSurface).textContent();
    assert.match(String(settlementParticipationRawText), /"zero-credit-participating"/);

    const settlementProofSurface = await surfaceBySubtitleInSection(page, 'settlement', '.bitcode/settlement-source-to-shares-proof.json');
    await switchSurfaceToRaw(settlementProofSurface);
    await activeRawPanelPre(settlementProofSurface).waitFor();
    const settlementRawText = await activeRawPanelPre(settlementProofSurface).textContent();
    assert.match(String(settlementRawText), /settlement_source_to_shares\.normalization_exactness/);
    assert.match(String(settlementRawText), /settlement_source_to_shares\.allocation_conservation/);
  });
});

testAny('browser flow can switch projections and keep proof visibility bounded by principal', { timeout: 120_000 }, async (t) => {
  await withBrowserDemo(t, async ({ baseUrl, page }) => {
    await loadDemo(page, baseUrl);

    await page.selectOption('#projectionPicker', 'reviewer');
    await waitForStatus(page, 'Viewing reviewer projection.');
    await page.selectOption('#scenarioPicker', 'privacy-boundary-proof-export');
    await waitForStatus(page, 'Selected scenario privacy-boundary-proof-export (Targeted deposit).');

    await page.getByRole('button', { name: 'Make Bitcode branch' }).click();
    await waitForStatus(page, 'Created bitcode/remediation-read_privacy-boundary-proof-export');

    const reviewerSummary = await readSummary(page);
    assert.equal(reviewerSummary['Projection'], 'reviewer');
    assert.ok(await page.locator('#branchArtifacts').getByText('Proof witness manifest').count() >= 1);
    assert.ok(await page.locator('#branchArtifacts').getByText('.bitcode/proof-contract.json').count() >= 1);
    assert.equal(await page.locator('#branchArtifacts details summary').getByText('.bitcode/source-material/').count(), 0);

    await page.selectOption('#projectionPicker', 'public');
    await waitForStatus(page, 'Viewing public projection.');

    const publicSummary = await readSummary(page);
    assert.equal(publicSummary['Projection'], 'public');
    assert.equal(await sectionSurfaceTitleCount(page, 'branchArtifacts', 'Proof witness manifest'), 0);
    assert.equal(await sectionSurfaceTitleCount(page, 'settlement', 'System proof bundle'), 0);
    assert.ok(await sectionSurfaceTitleCount(page, 'settlement', 'Bounded public proof') >= 1);
    assert.equal(await sectionSurfaceTitleCount(page, 'settlement', 'Proof contract'), 0);
  });
});

testAny('browser flow can switch between internal and reviewer visibility without leaking raw source material', { timeout: 120_000 }, async (t) => {
  await withBrowserDemo(t, async ({ baseUrl, page }) => {
    await loadDemo(page, baseUrl);

    await page.selectOption('#projectionPicker', 'internal');
    await waitForStatus(page, 'Viewing internal projection.');
    await page.selectOption('#scenarioPicker', 'privacy-boundary-proof-export');
    await waitForStatus(page, 'Selected scenario privacy-boundary-proof-export (Targeted deposit).');

    await page.getByRole('button', { name: 'Make Bitcode branch' }).click();
    await waitForStatus(page, 'Created bitcode/remediation-read_privacy-boundary-proof-export');

    const internalSummary = await readSummary(page);
    assert.equal(internalSummary['Projection'], 'internal');
    assert.equal(internalSummary['Visible proof families'], '9');
    assert.ok(Number(internalSummary['Visible branch artifacts']) > 0);
    assert.ok(await page.locator('#branchArtifacts').getByText('raw branch files available').count() >= 1);
    assert.ok(await page.locator('#branchArtifacts details summary').getByText('.bitcode/source-material/').count() >= 1);

    await page.selectOption('#projectionPicker', 'reviewer');
    await waitForStatus(page, 'Viewing reviewer projection.');

    const reviewerSummary = await readSummary(page);
    assert.equal(reviewerSummary['Projection'], 'reviewer');
    assert.equal(reviewerSummary['Visible proof families'], '9');
    assert.ok(Number(reviewerSummary['Visible branch artifacts']) < Number(internalSummary['Visible branch artifacts']));
    assert.ok(await page.locator('#branchArtifacts').getByText('bounded projection only').count() >= 1);
    assert.equal(await page.locator('#branchArtifacts details summary').getByText('.bitcode/source-material/').count(), 0);
    assert.ok(await sectionSurfaceTitleCount(page, 'branchArtifacts', 'Proof witness manifest') >= 1);
  });
});
