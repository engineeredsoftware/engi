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

testAny('browser flow keeps V15 ordering and drives deposit to targeted settlement', { timeout: 120_000 }, async (t) => {
  await withBrowserDemo(t, async ({ app, baseUrl, page }) => {
    const seededState = app.readState();
    const authSession = seededState.githubAppSessions.find((/** @type {any} */ session) => session.repo === 'frontier/demo-auth');
    const inventoryEntry = seededState.repoArtifactInventory.find((/** @type {any} */ entry) => entry.repo === authSession.repo);

    await loadDemo(page, baseUrl);
    await page.waitForFunction(() => document.title.includes('Canonical V16'));

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
    await waitForStatus(page, 'Candidate asset deposited into the canonical V16 repo-authenticated flow.');

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

testAny('browser flow surfaces identity/auth and proof/disclosure panels for privacy-boundary review', { timeout: 120_000 }, async (t) => {
  await withBrowserDemo(t, async ({ baseUrl, page }) => {
    await loadDemo(page, baseUrl);

    await page.selectOption('#scenarioPicker', 'privacy-boundary-proof-export');
    await waitForStatus(page, 'Selected scenario privacy-boundary-proof-export (Targeted deposit).');

    await page.getByRole('button', { name: 'Make ENGI branch' }).click();
    await waitForStatus(page, 'Created engi/remediation-need_privacy-boundary-proof-export');

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

    await page.getByRole('button', { name: 'Deposit candidate asset into ENGI flow' }).click();
    await waitForStatus(page, 'Raw content or repo artifact selection is required.');

    const summary = await readSummary(page);
    assert.equal(summary['Candidate assets'], '11');
    assert.equal(summary['Selected deposit refs'], '0');
    assert.equal(summary['Latest bundle'], 'No run yet');
  });
});

testAny('browser flow can reset back to the seeded state after a realized run', { timeout: 120_000 }, async (t) => {
  await withBrowserDemo(t, async ({ baseUrl, page }) => {
    await loadDemo(page, baseUrl);

    await page.getByRole('button', { name: 'Make ENGI branch' }).click();
    await waitForStatus(page, 'Created engi/remediation-');
    assert.notEqual((await readSummary(page))['Latest bundle'], 'No run yet');

    await page.getByRole('button', { name: 'Reset demo' }).click();
    await waitForStatus(page, 'Demo reset to the seeded canonical V16 scenario state.');

    const resetSummary = await readSummary(page);
    assert.equal(resetSummary['Candidate assets'], '11');
    assert.equal(resetSummary['Selected deposit refs'], '0');
    assert.equal(resetSummary['Latest bundle'], 'No run yet');
  });
});

testAny('browser flow surfaces projection visibility and proof-family catalog for reviewer versus public', { timeout: 120_000 }, async (t) => {
  await withBrowserDemo(t, async ({ baseUrl, page }) => {
    await loadDemo(page, baseUrl);

    await page.selectOption('#projectionPicker', 'reviewer');
    await waitForStatus(page, 'Viewing reviewer projection.');
    await page.selectOption('#scenarioPicker', 'privacy-boundary-proof-export');
    await waitForStatus(page, 'Selected scenario privacy-boundary-proof-export (Targeted deposit).');

    await page.getByRole('button', { name: 'Make ENGI branch' }).click();
    await waitForStatus(page, 'Created engi/remediation-need_privacy-boundary-proof-export');

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

testAny('browser flow can inspect raw verification and proof JSON for a restrictive workflow', { timeout: 120_000 }, async (t) => {
  await withBrowserDemo(t, async ({ baseUrl, page }) => {
    await loadDemo(page, baseUrl);

    await page.selectOption('#projectionPicker', 'reviewer');
    await waitForStatus(page, 'Viewing reviewer projection.');
    await page.selectOption('#scenarioPicker', 'unsafe-patch-review-recovery');
    await waitForStatus(page, 'Selected scenario unsafe-patch-review-recovery (Targeted deposit).');

    await page.getByRole('button', { name: 'Make ENGI branch' }).click();
    await waitForStatus(page, 'Created engi/remediation-need_unsafe-patch-review-recovery');

    const verificationSurface = await surfaceByTitleInSection(page, 'evaluations', 'Verification report');
    await verificationSurface.getByRole('button', { name: 'Raw' }).click();
    await activeRawPanelPre(verificationSurface).waitFor();
    const verificationRawText = await activeRawPanelPre(verificationSurface).textContent();
    assert.match(String(verificationRawText), /"useTier": "reject"/);
    assert.match(String(verificationRawText), /"policyRestrictions"/);

    const exclusionsSurface = await surfaceBySubtitleInSection(page, 'branchArtifacts', '.engi/materialization-exclusions.json');
    await exclusionsSurface.getByRole('button', { name: 'Raw' }).click();
    await activeRawPanelPre(exclusionsSurface).waitFor();
    const exclusionsRawText = await activeRawPanelPre(exclusionsSurface).textContent();
    assert.match(String(exclusionsRawText), /"exclusionClass"/);
    assert.match(String(exclusionsRawText), /Use tier reject does not authorize patch branch materialization/);

    const proofSurface = await surfaceBySubtitleInSection(page, 'settlement', '.engi/system-proof-bundle.json');
    await proofSurface.getByRole('button', { name: 'Raw' }).click();
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

    await page.getByRole('button', { name: 'Make ENGI branch' }).click();
    await waitForStatus(page, 'Created engi/remediation-need_auth-issuer-rollback');

    assert.ok(await sectionSurfaceTitleCount(page, 'branchArtifacts', 'Prompt family registry') >= 1);
    assert.ok(await sectionSurfaceTitleCount(page, 'branchArtifacts', 'Inference proofs') >= 1);
    assert.ok(await sectionSurfaceTitleCount(page, 'branchArtifacts', 'Prompt completeness family proof') >= 1);
    assert.ok(await sectionSurfaceTitleCount(page, 'branchArtifacts', 'Inference synthesis family proof') >= 1);

    const registrySurface = await surfaceBySubtitleInSection(page, 'branchArtifacts', '.engi/prompt-family-registry.json');
    await registrySurface.getByRole('button', { name: 'Raw' }).click();
    await activeRawPanelPre(registrySurface).waitFor();
    const registryRawText = await activeRawPanelPre(registrySurface).textContent();
    assert.match(String(registryRawText), /"closureCriteria"/);
    assert.match(String(registryRawText), /"ENGI_NEED\.md"/);

    const inferenceSurface = await surfaceBySubtitleInSection(page, 'branchArtifacts', '.engi/inference-proofs.json');
    await inferenceSurface.getByRole('button', { name: 'Raw' }).click();
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

    await page.getByRole('button', { name: 'Make ENGI branch' }).click();
    await waitForStatus(page, 'Created engi/remediation-need_auth-many-asset-normalization');

    assert.ok(await sectionSurfaceTitleCount(page, 'branchArtifacts', 'Static measurement report') >= 1);
    assert.ok(await sectionSurfaceTitleCount(page, 'branchArtifacts', 'Static code-analysis closure proof') >= 1);
    assert.ok(await sectionSurfaceTitleCount(page, 'branchArtifacts', 'Authorization and sensitive-flow family proof') >= 1);
    assert.ok(await sectionSurfaceTitleCount(page, 'settlement', 'Settlement source-to-shares family proof') >= 1);

    const staticProofSurface = await surfaceBySubtitleInSection(page, 'branchArtifacts', '.engi/static-measurement-proof.json');
    await staticProofSurface.getByRole('button', { name: 'Raw' }).click();
    await activeRawPanelPre(staticProofSurface).waitFor();
    const staticRawText = await activeRawPanelPre(staticProofSurface).textContent();
    assert.match(String(staticRawText), /static_code_analysis\.stage_domain_purity/);
    assert.match(String(staticRawText), /"allTheoremsPassed": true/);

    const authProofSurface = await surfaceBySubtitleInSection(page, 'branchArtifacts', '.engi/authorization-and-sensitive-flow-proof.json');
    await authProofSurface.getByRole('button', { name: 'Raw' }).click();
    await activeRawPanelPre(authProofSurface).waitFor();
    const authRawText = await activeRawPanelPre(authProofSurface).textContent();
    assert.match(String(authRawText), /authorization_and_sensitive_flow\.policy_assignment_closure/);
    assert.match(String(authRawText), /authorization_and_sensitive_flow\.no_unauthorized_public_flow/);

    const settlementParticipationSurface = await surfaceBySubtitleInSection(page, 'settlement', '.engi/settlement-participation.json');
    await settlementParticipationSurface.getByRole('button', { name: 'Raw' }).click();
    await activeRawPanelPre(settlementParticipationSurface).waitFor();
    const settlementParticipationRawText = await activeRawPanelPre(settlementParticipationSurface).textContent();
    assert.match(String(settlementParticipationRawText), /"zero-credit-participating"/);

    const settlementProofSurface = await surfaceBySubtitleInSection(page, 'settlement', '.engi/settlement-source-to-shares-proof.json');
    await settlementProofSurface.getByRole('button', { name: 'Raw' }).click();
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

    await page.getByRole('button', { name: 'Make ENGI branch' }).click();
    await waitForStatus(page, 'Created engi/remediation-need_privacy-boundary-proof-export');

    const reviewerSummary = await readSummary(page);
    assert.equal(reviewerSummary['Projection'], 'reviewer');
    assert.ok(await page.locator('#branchArtifacts').getByText('Proof witness manifest').count() >= 1);
    assert.ok(await page.locator('#branchArtifacts').getByText('.engi/proof-contract.json').count() >= 1);
    assert.equal(await page.locator('#branchArtifacts details summary').getByText('.engi/source-material/').count(), 0);

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

    await page.getByRole('button', { name: 'Make ENGI branch' }).click();
    await waitForStatus(page, 'Created engi/remediation-need_privacy-boundary-proof-export');

    const internalSummary = await readSummary(page);
    assert.equal(internalSummary['Projection'], 'internal');
    assert.equal(internalSummary['Visible proof families'], '9');
    assert.ok(Number(internalSummary['Visible branch artifacts']) > 0);
    assert.ok(await page.locator('#branchArtifacts').getByText('raw branch files available').count() >= 1);
    assert.ok(await page.locator('#branchArtifacts details summary').getByText('.engi/source-material/').count() >= 1);

    await page.selectOption('#projectionPicker', 'reviewer');
    await waitForStatus(page, 'Viewing reviewer projection.');

    const reviewerSummary = await readSummary(page);
    assert.equal(reviewerSummary['Projection'], 'reviewer');
    assert.equal(reviewerSummary['Visible proof families'], '9');
    assert.ok(Number(reviewerSummary['Visible branch artifacts']) < Number(internalSummary['Visible branch artifacts']));
    assert.ok(await page.locator('#branchArtifacts').getByText('bounded projection only').count() >= 1);
    assert.equal(await page.locator('#branchArtifacts details summary').getByText('.engi/source-material/').count(), 0);
    assert.ok(await sectionSurfaceTitleCount(page, 'branchArtifacts', 'Proof witness manifest') >= 1);
  });
});
