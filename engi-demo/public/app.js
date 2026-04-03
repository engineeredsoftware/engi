import { telemetry, telemetryError, telemetrySpan } from './telemetry.js';

const assetsEl = document.getElementById('assets');
const receiptsEl = document.getElementById('receipts');
const balancesEl = document.getElementById('balances');
const benchmarkPanelEl = document.getElementById('benchmarkPanel');
const schemasEl = document.getElementById('schemas');
const attestationEl = document.getElementById('attestation');
const rankingPanelEl = document.getElementById('rankingPanel');
const conservationPanelEl = document.getElementById('conservationPanel');
const proofLogPanelEl = document.getElementById('proofLogPanel');
const proofSummaryStatsEl = document.getElementById('proofSummaryStats');
const orgEl = document.getElementById('orgId');
const bundleResultEl = document.getElementById('bundleResult');
const guidedDemoStatusEl = document.getElementById('guidedDemoStatus');
const guidedDemoTooltipEl = document.getElementById('guidedDemoTooltip');
const densityModeButtonEl = document.getElementById('densityModeButton');
const densityNoteEl = document.getElementById('densityNote');
const proofGroupEl = document.getElementById('proofGroup');
const assetCountEl = document.getElementById('assetCount');
const receiptCountEl = document.getElementById('receiptCount');
const bundleCountEl = document.getElementById('bundleCount');
const allocatedUnitsEl = document.getElementById('allocatedUnits');

const sectionEls = {
  deposits: document.getElementById('section-deposits'),
  read: document.getElementById('section-read'),
  value: document.getElementById('section-value'),
  receipts: document.getElementById('section-receipts'),
  ranking: document.getElementById('section-ranking'),
  conservation: document.getElementById('section-conservation'),
  schemas: document.getElementById('section-schemas'),
  attestation: document.getElementById('section-attestation'),
  proofLog: document.getElementById('section-proof-log')
};

let latestBundle = null;
let latestComparison = null;
let latestRanking = null;
let latestConservation = null;
let lightMode = false;
let guidedDemo = null;

async function api(path, options = {}) {
  return telemetrySpan('client.api', {
    path,
    method: options.method || 'GET',
    body: typeof options.body === 'string' ? options.body : null
  }, async () => {
    const response = await fetch(path, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    const json = await response.json();
    if (!response.ok) throw new Error(json.error || 'Request failed');
    return { status: response.status, json };
  }).then((result) => result.json);
}

function clearSpotlights() {
  Object.values(sectionEls).forEach((el) => el?.classList.remove('spotlight', 'value-spotlight'));
}

function hideTooltip() {
  guidedDemoTooltipEl.hidden = true;
  guidedDemoTooltipEl.innerHTML = '';
}

function anchorForSection(name) {
  if (name === 'proof') {
    return proofGroupEl?.querySelector('summary .card') || proofGroupEl;
  }
  const section = sectionEls[name];
  if (!section) return null;
  return section.querySelector('.panel-head') || section;
}

function placeTooltip(anchorEl) {
  if (!anchorEl || guidedDemoTooltipEl.hidden) return;
  const rect = anchorEl.getBoundingClientRect();
  const tooltipWidth = guidedDemoTooltipEl.offsetWidth || 320;
  const left = Math.min(window.innerWidth - tooltipWidth - 16, Math.max(16, rect.left));
  const top = Math.min(window.innerHeight - guidedDemoTooltipEl.offsetHeight - 16, Math.max(16, rect.bottom + 12));
  guidedDemoTooltipEl.style.left = `${left}px`;
  guidedDemoTooltipEl.style.top = `${top}px`;
}

function showTooltip(sectionName, title, body) {
  guidedDemoTooltipEl.innerHTML = `<strong>${escapeHtml(title)}</strong><p>${escapeHtml(body)}</p>`;
  guidedDemoTooltipEl.hidden = false;
  placeTooltip(anchorForSection(sectionName));
}

function spotlight(sectionNames, options = {}) {
  telemetry('client.spotlight', { sectionNames, options });
  clearSpotlights();
  const names = Array.isArray(sectionNames) ? sectionNames : [sectionNames];
  names.forEach((name) => {
    const el = sectionEls[name];
    if (!el) return;
    el.classList.add('spotlight');
    if (options.value) el.classList.add('value-spotlight');
  });

  const scrollTargetName = options.scrollTarget || names[0];
  const anchor = anchorForSection(scrollTargetName);
  anchor?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  placeTooltip(anchor);
}

function setStatus(text, options = {}) {
  const controls = options.controls || '';
  telemetry('client.setStatus', { text, hasControls: !!controls, guidedStep: guidedDemo?.step || null });
  guidedDemoStatusEl.innerHTML = `<div class="status-note">${escapeHtml(text)}</div>${controls}`;
}

function guidedControls({ nextLabel = 'Next step', showNext = true, endLabel = 'End guided demo' } = {}) {
  return `
    <div class="row guided-demo-controls">
      ${showNext ? `<button type="button" id="guidedDemoNextButton" class="ghost">${escapeHtml(nextLabel)}</button>` : '<span></span>'}
      <button type="button" id="guidedDemoEndButton" class="ghost">${escapeHtml(endLabel)}</button>
    </div>
  `;
}

function bindGuidedControlHandlers({ onNext, onEnd } = {}) {
  document.getElementById('guidedDemoNextButton')?.addEventListener('click', () => onNext?.());
  document.getElementById('guidedDemoEndButton')?.addEventListener('click', () => onEnd?.());
}

function endGuidedDemo(message = 'Guided demo ended.') {
  telemetry('client.guided.end', { message, previousStep: guidedDemo?.step || null });
  guidedDemo = null;
  clearSpotlights();
  hideTooltip();
  setStatus(message);
}

function applyDensityMode() {
  document.body.classList.toggle('light-mode', lightMode);
  densityModeButtonEl.textContent = `Mode: ${lightMode ? 'light' : 'heavy'}`;
  densityNoteEl.hidden = !lightMode;
  proofGroupEl.open = !lightMode;
}

function assetCard(asset) {
  return `
    <div class="card">
      <div class="row"><strong>${escapeHtml(asset.title)}</strong><span class="badge">${escapeHtml(asset.sourceType)}</span></div>
      <p class="meta">${escapeHtml(asset.author)} · ${escapeHtml((asset.tags || []).join(', '))}</p>
      <p>${escapeHtml(asset.preview)}</p>
      <div class="kv">
        <span class="meta">public commitment</span><span>${asset.assetRoot}</span>
        <span class="meta">measurement</span><span>q=${asset.measurement.quantityBp} · quality=${asset.measurement.qualityBp} · valence=${asset.measurement.valenceBp} · total=${asset.measurement.totalBp}</span>
        <span class="meta">verification</span><span>${asset.verification.compileOk ? 'compile' : 'no-compile'} / ${asset.verification.testsOk ? 'tests' : 'no-tests'} / ${asset.verification.proofOk ? 'proof' : 'no-proof'}</span>
        <span class="meta">what stays private</span><span>full content body and chunk payloads remain sealed until licensed issuance</span>
      </div>
    </div>
  `;
}

function receiptCard(receipt) {
  const important = {
    type: receipt.type,
    receiptId: receipt.receiptId,
    bundleId: receipt.bundleId,
    assetId: receipt.assetId,
    meteredUnits: receipt.meteredUnits,
    totalUnits: receipt.totalUnits,
    upliftBp: receipt.upliftBp,
    issuedAt: receipt.issuedAt,
    receiptHash: receipt.receiptHash,
  };
  return `
    <div class="card compact-proof-card">
      <div class="row"><strong>${escapeHtml(receipt.type)}</strong><span class="badge">${escapeHtml(receipt.receiptId || 'receipt')}</span></div>
      <p class="meta">${escapeHtml(receipt.schema?.publicClaim || 'Inspectable public artifact')}</p>
      <pre>${escapeHtml(JSON.stringify(important, null, 2))}</pre>
      <details>
        <summary class="meta">Show full receipt payload</summary>
        <pre>${escapeHtml(JSON.stringify(receipt, null, 2))}</pre>
      </details>
    </div>
  `;
}

function schemaCard([name, schema]) {
  return `
    <div class="card">
      <div class="row"><strong>${escapeHtml(name)}</strong><span class="badge">${escapeHtml(schema.predicateType)}</span></div>
      <p>${escapeHtml(schema.publicClaim)}</p>
      <p class="meta">Required fields: ${escapeHtml(schema.required.join(', '))}</p>
    </div>
  `;
}

function attestationCard(attestation, policyRelease) {
  return `
    <div class="card">
      <strong>Current deployment snapshot</strong>
      <div class="kv">
        <span class="meta">deployment id</span><span>${escapeHtml(attestation.deploymentId)}</span>
        <span class="meta">git commit</span><span>${escapeHtml(attestation.gitCommit)}</span>
        <span class="meta">image digest</span><span>${escapeHtml(attestation.imageDigest)}</span>
        <span class="meta">verifier digest</span><span>${escapeHtml(attestation.verifierDigest)}</span>
        <span class="meta">policy digest</span><span>${escapeHtml(attestation.policyDigest)}</span>
        <span class="meta">build system</span><span>${escapeHtml(attestation.provenance.buildSystem)}</span>
      </div>
      <p class="meta">Bound to policy release ${escapeHtml(policyRelease.version)} (${escapeHtml(policyRelease.policyHash)})</p>
      <pre>${escapeHtml(JSON.stringify(attestation, null, 2))}</pre>
    </div>
  `;
}

function policyCard(policy) {
  return `
    <div class="card compact-proof-card">
      <div class="row"><strong>Policy release</strong><span class="badge">${escapeHtml(policy.version)}</span></div>
      <div class="kv">
        <span class="meta">policy hash</span><span>${escapeHtml(policy.policyHash)}</span>
        <span class="meta">weights</span><span>quantity=${policy.scoringWeights.quantity}, quality=${policy.scoringWeights.quality}, valence=${policy.scoringWeights.valence}</span>
      </div>
      <p class="meta">Trusted boundary: ${escapeHtml(policy.trustedBoundary.join(' • '))}</p>
      <p class="meta">Untrusted boundary: ${escapeHtml(policy.untrustedBoundary.join(' • '))}</p>
      <details>
        <summary class="meta">Show full policy payload</summary>
        <pre>${escapeHtml(JSON.stringify(policy, null, 2))}</pre>
      </details>
    </div>
  `;
}

function renderBalances(balances, licenses, utilityLedger) {
  balancesEl.innerHTML = `
    <div class="card compact-proof-card">
      <strong>Contributor balances</strong>
      <p class="meta">Off-chain prototype units awarded from licensed read events.</p>
      <pre>${escapeHtml(JSON.stringify(balances, null, 2))}</pre>
    </div>
    <div class="card compact-proof-card">
      <strong>License budgets</strong>
      <p class="meta">Only licensed readers can trigger private bundle issuance.</p>
      <pre>${escapeHtml(JSON.stringify(licenses, null, 2))}</pre>
    </div>
    <div class="card compact-proof-card">
      <strong>Observed uplift ledger</strong>
      <p class="meta">Illustrative utility receipts show observed benchmark uplift from licensed consumption. They are not yet fed back into asset measurement in this prototype.</p>
      <details>
        <summary class="meta">Show observed uplift ledger</summary>
        <pre>${escapeHtml(JSON.stringify(utilityLedger, null, 2))}</pre>
      </details>
    </div>
  `;
}

function renderBenchmarkPanel(comparison) {
  if (!comparison) {
    benchmarkPanelEl.innerHTML = `
      <div class="card">
        <strong>Observed benchmark uplift</strong>
        <p class="meta">Emit an illustrative utility receipt to show benchmark lift for the buyer system. Baseline means without the licensed bundle; treatment means with the licensed bundle. In this prototype the scores are operator-entered basis-point results, not an automatically computed benchmark harness or a measurement update.</p>
      </div>
    `;
    return;
  }

  const baselinePct = Math.max(0, Math.min(100, comparison.baselineBp / 100));
  const treatmentPct = Math.max(0, Math.min(100, comparison.treatmentBp / 100));

  benchmarkPanelEl.innerHTML = `
    <div class="card highlight-card">
      <div class="row">
        <strong>Observed benchmark uplift</strong>
        <span class="badge">illustrative utility receipt</span>
      </div>
      <div class="uplift-banner">
        <strong>Observed benchmark uplift: ${comparison.upliftBp} bp.</strong>
        <p class="meta">This section illustrates buyer-system performance on the target task. Baseline means without the licensed bundle; treatment means with the licensed bundle. In this prototype the scores are operator-entered benchmark results, and the resulting utility receipt is not yet fed back into asset measurement.</p>
      </div>
      <div class="kv">
        <span class="meta">bundle id</span><span>${escapeHtml(comparison.bundleId)}</span>
        <span class="meta">benchmark</span><span>${escapeHtml(comparison.benchmark)}</span>
        <span class="meta">task</span><span>${escapeHtml(comparison.task)}</span>
        <span class="meta">baseline</span><span>${comparison.baselineBp} bp — without licensed bundle</span>
        <span class="meta">treatment</span><span>${comparison.treatmentBp} bp — with licensed bundle</span>
        <span class="meta">uplift</span><span class="good">${comparison.upliftBp} bp = treatment − baseline</span>
      </div>
      <div class="benchmark-bars">
        <div class="bar-row">
          <div class="bar-label"><span>Baseline (without licensed bundle)</span><span>${comparison.baselineBp} bp</span></div>
          <div class="bar-track"><div class="bar-fill baseline" style="width:${baselinePct}%"></div></div>
        </div>
        <div class="bar-row">
          <div class="bar-label"><span>Treatment (with licensed bundle)</span><span>${comparison.treatmentBp} bp</span></div>
          <div class="bar-track"><div class="bar-fill treatment" style="width:${treatmentPct}%"></div></div>
        </div>
      </div>
      <div class="mini-grid benchmark-story-grid">
        <div class="card compact-proof-card">
          <strong>Baseline outcome (without licensed bundle)</strong>
          <p>${escapeHtml(comparison.baselineOutcome)}</p>
        </div>
        <div class="card compact-proof-card">
          <strong>Treatment outcome (with licensed bundle)</strong>
          <p>${escapeHtml(comparison.treatmentOutcome)}</p>
        </div>
      </div>
      <div class="card compact-proof-card">
        <strong>Why the licensed bundle helped</strong>
        <p>${escapeHtml(comparison.whyItHelped)}</p>
      </div>
      <div class="card compact-proof-card">
        <strong>Buyer impact</strong>
        <p>${escapeHtml(comparison.businessImpact)}</p>
      </div>
      <p>${escapeHtml(comparison.interpretation)}</p>
      <div class="card compact-proof-card">
        <strong>How scoring works in this prototype</strong>
        <p>Baseline and treatment are operator-entered benchmark scores in basis points from 0 to 10000. Uplift is computed as treatment minus baseline, clamped into the same range, and then recorded as an illustrative utility receipt.</p>
      </div>
      <details>
        <summary class="meta">Show full benchmark payload</summary>
        <pre>${escapeHtml(JSON.stringify(comparison, null, 2))}</pre>
      </details>
    </div>
  `;
}

function renderRankingPanel(ranking) {
  if (!ranking?.length) {
    rankingPanelEl.innerHTML = `
      <div class="card">
        <strong>Ranking explanation</strong>
        <p class="meta">Issue a licensed read to see why specific chunks were selected.</p>
      </div>
    `;
    return;
  }
  rankingPanelEl.innerHTML = ranking.map((item) => `
    <div class="card">
      <div class="row"><strong>${escapeHtml(item.title)}</strong><span class="badge">${escapeHtml(item.chunkId)}</span></div>
      <div class="kv">
        <span class="meta">overlap</span><span>${item.overlap}</span>
        <span class="meta">lexical score</span><span>${item.lexicalBp}</span>
        <span class="meta">asset measurement</span><span>${item.assetMeasurementBp}</span>
        <span class="meta">final score</span><span>${item.finalScoreBp}</span>
        <span class="meta">contribution</span><span>${item.contributionBp} bp</span>
      </div>
      <p class="meta">${escapeHtml(item.explanation)}</p>
    </div>
  `).join('');
}

function renderConservationPanel(conservation) {
  if (!conservation) {
    conservationPanelEl.innerHTML = `
      <div class="card">
        <strong>Conservation check</strong>
        <p class="meta">Issue a licensed read to verify that metered units equal allocated units.</p>
      </div>
    `;
    return;
  }
  conservationPanelEl.innerHTML = `
    <div class="card">
      <div class="row"><strong>Allocation conservation</strong><span class="badge ${conservation.conserved ? 'private' : ''}">${conservation.conserved ? 'conserved' : 'mismatch'}</span></div>
      <div class="kv">
        <span class="meta">bundle id</span><span>${escapeHtml(conservation.bundleId)}</span>
        <span class="meta">metered units</span><span>${conservation.meteredUnits}</span>
        <span class="meta">allocated units</span><span>${conservation.allocatedUnits}</span>
        <span class="meta">difference</span><span>${conservation.difference}</span>
      </div>
      <pre>${escapeHtml(JSON.stringify(conservation, null, 2))}</pre>
    </div>
  `;
}

function renderProofLog(proofLog) {
  proofLogPanelEl.className = 'stack compact-list';
  proofLogPanelEl.innerHTML = (proofLog?.length ? proofLog : [{ step: 0, summary: 'No public proof events yet.' }]).map((item) => `
    <div class="card compact-proof-card">
      <div class="row"><strong>Step ${item.step}</strong><span class="badge">${escapeHtml(item.type || 'pending')}</span></div>
      <p>${escapeHtml(item.summary)}</p>
      ${item.receiptId ? `<p class="meta">${escapeHtml(item.receiptId)} · ${escapeHtml(item.issuedAt || '')}</p>` : ''}
    </div>
  `).join('');
}

function renderProofSummary(state) {
  const proofReceipts = state.receipts || [];
  const latestEvent = state.proofLog?.[0] || null;
  const conserved = latestConservation?.conserved;
  const policyVersion = state.policyRelease?.version || 'unknown';
  const latestType = latestEvent?.type || 'none yet';

  proofSummaryStatsEl.innerHTML = `
    <div class="proof-stat">
      <span class="proof-stat-label">Public receipts</span>
      <strong class="proof-stat-value">${proofReceipts.length}</strong>
    </div>
    <div class="proof-stat">
      <span class="proof-stat-label">Allocation conservation</span>
      <strong class="proof-stat-value">${conserved == null ? 'pending' : (conserved ? 'verified' : 'mismatch')}</strong>
    </div>
    <div class="proof-stat">
      <span class="proof-stat-label">Policy binding</span>
      <strong class="proof-stat-value">${escapeHtml(policyVersion)}</strong>
    </div>
    <div class="proof-stat">
      <span class="proof-stat-label">Latest proof event</span>
      <strong class="proof-stat-value">${escapeHtml(latestType)}</strong>
    </div>
  `;
}

function renderBundle(result) {
  latestBundle = result;
  if (!result) {
    bundleResultEl.innerHTML = '';
    return;
  }

  const chunksHtml = result.privateBundle.chunks.map((chunk) => `
    <div class="chunk-card">
      <div class="row">
        <strong>${escapeHtml(chunk.title)}</strong>
        <span class="badge private">${escapeHtml(chunk.chunkId)}</span>
      </div>
      <p class="meta">${escapeHtml(chunk.author)} · ${escapeHtml(chunk.assetId)}</p>
      <p>${escapeHtml(chunk.body)}</p>
      <p class="meta">chunk hash: ${escapeHtml(chunk.chunkHash)}</p>
    </div>
  `).join('');

  bundleResultEl.innerHTML = `
    <div class="card">
      <div class="row">
        <strong>Private bundle issued</strong>
        <span class="badge private">licensed reader only</span>
      </div>
      <p class="meta">Bundle id: <span class="good">${escapeHtml(result.privateBundle.bundleId)}</span>. Use this in the observed benchmark uplift form.</p>
      <div class="kv">
        <span class="meta">query</span><span>${escapeHtml(result.privateBundle.query)}</span>
        <span class="meta">bundle root</span><span>${escapeHtml(result.privateBundle.bundleRoot)}</span>
        <span class="meta">publicly revealed</span><span>query hash, chunk refs, allocation, issuance metadata</span>
        <span class="meta">privately revealed</span><span>selected chunk bodies only, to the licensed reader</span>
      </div>
      <div class="bundle-chunks">${chunksHtml}</div>
    </div>
  `;
}

function updateSummary(state) {
  const bundleReceipts = state.receipts.filter((receipt) => receipt.type === 'bundle_issuance');
  const allocatedUnits = Object.values(state.balances).reduce((sum, value) => sum + Number(value || 0), 0);
  assetCountEl.textContent = String(state.assets.length);
  receiptCountEl.textContent = String(state.receipts.length);
  bundleCountEl.textContent = String(bundleReceipts.length);
  allocatedUnitsEl.textContent = String(allocatedUnits);
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

async function refresh() {
  return telemetrySpan('client.refresh', {
    latestBundleId: latestBundle?.privateBundle?.bundleId || null,
    latestComparisonBundleId: latestComparison?.bundleId || null,
    latestRankingCount: latestRanking?.length || 0,
    latestConservationBundleId: latestConservation?.bundleId || null
  }, async () => {
    const state = await api('/api/state');
    assetsEl.innerHTML = state.assets.map(assetCard).join('');
  receiptsEl.innerHTML = state.receipts.map(receiptCard).join('');
  schemasEl.innerHTML = Object.entries(state.receiptSchemas).map(schemaCard).join('');
  attestationEl.innerHTML = `${policyCard(state.policyRelease)}${attestationCard(state.attestation, state.policyRelease)}`;
  renderProofLog(state.proofLog);
  renderProofSummary(state);
  orgEl.innerHTML = state.licenses.map((license) => `<option value="${license.orgId}">${license.orgName} · ${license.unitsRemaining} units</option>`).join('');
    renderBalances(state.balances, state.licenses, state.utilityLedger);
    renderBenchmarkPanel(latestComparison);
    renderRankingPanel(latestRanking);
    renderConservationPanel(latestConservation);
    updateSummary(state);
    telemetry('client.refresh.rendered', {
      assetCount: state.assets.length,
      receiptCount: state.receipts.length,
      licenseCount: state.licenses.length,
      utilityCount: Object.keys(state.utilityLedger || {}).length
    });
    return state;
  });
}

async function runGuidedStep(step) {
  telemetry('client.guided.step.enter', {
    step,
    previousStep: guidedDemo?.step || null,
    lightMode,
    latestBundleId: latestBundle?.privateBundle?.bundleId || null
  });
  guidedDemo = { active: true, step };

  if (step === 1) {
    spotlight('deposits');
    showTooltip('deposits', 'Step 1/4 — Openly writable', 'Start here: deposits reveal the public commitment surface while the underlying content body remains sealed.');
    setStatus(
      'Step 1/4 — Openly writable: start on public deposits and commitments. Advance when you are ready to show licensed reading.',
      { controls: guidedControls({ nextLabel: 'Continue to licensed read' }) }
    );
    bindGuidedControlHandlers({ onNext: () => runGuidedStep(2), onEnd: () => endGuidedDemo('Guided demo stopped.') });
    return;
  }

  if (step === 2) {
    const state = await api('/api/state');
    const query = state.demoScenario?.query || 'enterprise auth migration rollback for monorepo services with issuer mismatch';
    const orgId = state.demoScenario?.defaultOrgId || 'demo-ai-lab';
    const result = await api('/api/license-query', {
      method: 'POST',
      body: JSON.stringify({ orgId, query })
    });
    latestRanking = result.ranking;
    latestConservation = result.conservation;
    renderBundle(result);
    renderRankingPanel(latestRanking);
    renderConservationPanel(latestConservation);
    document.querySelector('#utilityForm input[name="bundleId"]').value = result.privateBundle.bundleId;
    await refresh();

    spotlight('read');
    showTooltip('read', 'Step 2/4 — Measurably readable', 'This licensed query produces a need-matched private bundle for a concrete engineering incident instead of exposing the whole corpus.');
    setStatus(
      'Step 2/4 — Measurably readable: the private bundle is now issued. Advance when you are ready to inspect the proof surfaces.',
      { controls: guidedControls({ nextLabel: 'Continue to proof surfaces' }) }
    );
    bindGuidedControlHandlers({ onNext: () => runGuidedStep(3), onEnd: () => endGuidedDemo('Guided demo stopped.') });
    return;
  }

  if (step === 3) {
    if (lightMode) {
      proofGroupEl.open = true;
    }
    spotlight(['ranking', 'conservation', 'receipts', 'schemas', 'attestation', 'proofLog'], { scrollTarget: 'proof' });
    showTooltip('proof', 'Step 3/4 — Provable', 'The proof section explains why these chunks were selected and shows receipts, conservation, schema intent, and deployment/policy binding.');
    setStatus(
      'Step 3/4 — Provable: inspect the proof section. Advance when you are ready for the observed benchmark uplift payoff.',
      { controls: guidedControls({ nextLabel: 'Continue to observed uplift' }) }
    );
    bindGuidedControlHandlers({ onNext: () => runGuidedStep(4), onEnd: () => endGuidedDemo('Guided demo stopped.') });
    return;
  }

  if (step === 4) {
    const bundleId = document.querySelector('#utilityForm input[name="bundleId"]').value || latestBundle?.privateBundle?.bundleId;
    const utility = await api('/api/utility', {
      method: 'POST',
      body: JSON.stringify({
        bundleId,
        benchmark: 'production-auth-remediation',
        baselineBp: 4200,
        treatmentBp: 6700
      })
    });
    latestComparison = utility.comparison;
    renderBenchmarkPanel(latestComparison);
    await refresh();

    spotlight('value', { value: true });
    showTooltip('value', 'Step 4/4 — Valuable', 'End here: the observed benchmark uplift is the payoff beat, illustrating before-vs-after buyer performance without implying a measurement update in this prototype.');
    setStatus(
      'Step 4/4 — Valuable: final beat. The observed benchmark uplift panel illustrates before-vs-after buyer performance during a production auth incident.',
      { controls: guidedControls({ showNext: false, endLabel: 'Finish guided demo' }) }
    );
    bindGuidedControlHandlers({ onEnd: () => endGuidedDemo('Guided demo complete.') });
  }
}

document.getElementById('depositForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formEl = event.currentTarget;
  const form = new FormData(formEl);
  telemetry('client.deposit.submit', {
    guidedStep: guidedDemo?.step || null,
    title: form.get('title'),
    author: form.get('author'),
    tags: String(form.get('tags') || '').split(',').map((s) => s.trim()).filter(Boolean),
    contentLength: String(form.get('content') || '').length,
    compileOk: form.get('compileOk') === 'on',
    testsOk: form.get('testsOk') === 'on',
    proofOk: form.get('proofOk') === 'on'
  });
  await api('/api/deposits', {
    method: 'POST',
    body: JSON.stringify({
      title: form.get('title'),
      author: form.get('author'),
      tags: String(form.get('tags') || '').split(',').map((s) => s.trim()).filter(Boolean),
      content: form.get('content'),
      compileOk: form.get('compileOk') === 'on',
      testsOk: form.get('testsOk') === 'on',
      proofOk: form.get('proofOk') === 'on'
    })
  });
  spotlight('deposits');
  formEl?.reset();
  await refresh();

  if (guidedDemo?.active && guidedDemo.step === 1) {
    telemetry('client.guided.step1.depositDetected', {
      guidedStep: guidedDemo.step,
      assetTitleJustSubmitted: form.get('title')
    });
    showTooltip('deposits', 'Step 1/4 — Openly writable', 'Deposit captured. The public commitment surface updated while the deposited content body remains sealed.');
    setStatus('Step 1/4 complete — asset deposited. Advancing to licensed read…');
    setTimeout(() => {
      telemetry('client.guided.step1.advanceTimerFired', {
        guidedActive: !!guidedDemo?.active,
        guidedStep: guidedDemo?.step || null
      });
      if (guidedDemo?.active && guidedDemo.step === 1) {
        runGuidedStep(2).catch((error) => {
          telemetryError('client.guided.step1.advanceFailed', error, { guidedStep: guidedDemo?.step || null });
          clearSpotlights();
          hideTooltip();
          setStatus(`Guided demo failed: ${error.message}`);
        });
      }
    }, 400);
    return;
  }

  setStatus('New asset deposited. Public commitment updated; sealed body stored privately.');
});

document.getElementById('queryForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  telemetry('client.query.submit', {
    guidedStep: guidedDemo?.step || null,
    orgId: form.get('orgId'),
    query: form.get('query')
  });
  const result = await api('/api/license-query', {
    method: 'POST',
    body: JSON.stringify({
      orgId: form.get('orgId'),
      query: form.get('query')
    })
  });
  latestRanking = result.ranking;
  latestConservation = result.conservation;
  renderBundle(result);
  renderRankingPanel(latestRanking);
  renderConservationPanel(latestConservation);
  spotlight(['read', 'ranking', 'conservation', 'receipts']);
  setStatus(`Licensed issuance complete. Private bundle ${result.privateBundle.bundleId} delivered; public issuance + allocation receipts emitted. Next, finish the demo with the observed benchmark uplift.`);
  document.querySelector('#utilityForm input[name="bundleId"]').value = result.privateBundle.bundleId;
  await refresh();
});

document.getElementById('utilityForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  telemetry('client.utility.submit', {
    guidedStep: guidedDemo?.step || null,
    bundleId: form.get('bundleId'),
    benchmark: form.get('benchmark'),
    baselineBp: form.get('baselineBp'),
    treatmentBp: form.get('treatmentBp')
  });
  const result = await api('/api/utility', {
    method: 'POST',
    body: JSON.stringify({
      bundleId: form.get('bundleId'),
      benchmark: form.get('benchmark'),
      baselineBp: Number(form.get('baselineBp')),
      treatmentBp: Number(form.get('treatmentBp'))
    })
  });
  latestComparison = result.comparison;
  renderBenchmarkPanel(latestComparison);
  spotlight('value', { value: true });
  setStatus(`Final demo beat: illustrative utility receipt emitted with observed uplift ${result.receipt.upliftBp} bp on ${result.receipt.benchmark}. In this prototype, this is demo evidence, not a measurement update.`);
  await refresh();
});

densityModeButtonEl.addEventListener('click', () => {
  lightMode = !lightMode;
  applyDensityMode();
});

document.getElementById('guidedDemoButton').addEventListener('click', async () => {
  telemetry('client.guided.start', { lightMode });
  try {
    await api('/api/reset', { method: 'POST', body: '{}' });
    latestBundle = null;
    latestComparison = null;
    latestRanking = null;
    latestConservation = null;
    renderBundle(null);
    renderBenchmarkPanel(null);
    renderRankingPanel(null);
    renderConservationPanel(null);
    hideTooltip();
    await refresh();
    await runGuidedStep(1);
  } catch (error) {
    clearSpotlights();
    hideTooltip();
    setStatus(`Guided demo failed: ${error.message}`);
  }
});

document.getElementById('resetButton').addEventListener('click', async () => {
  telemetry('client.reset.click', { guidedStep: guidedDemo?.step || null });
  await api('/api/reset', { method: 'POST', body: '{}' });
  guidedDemo = null;
  latestBundle = null;
  latestComparison = null;
  latestRanking = null;
  latestConservation = null;
  clearSpotlights();
  hideTooltip();
  renderBundle(null);
  renderBenchmarkPanel(null);
  renderRankingPanel(null);
  renderConservationPanel(null);
  setStatus('Demo reset to seeded ENGI scenario.');
  await refresh();
});

window.addEventListener('scroll', () => {
  const highlighted = guidedDemoTooltipEl.hidden ? null : document.querySelector('.panel.spotlight, .proof-group .spotlight');
  if (highlighted) {
    placeTooltip(document.querySelector('.panel.spotlight .panel-head, .proof-group .spotlight') || highlighted);
  }
}, { passive: true });

window.addEventListener('resize', () => {
  if (!guidedDemoTooltipEl.hidden) {
    placeTooltip(document.querySelector('.panel.spotlight .panel-head, .proof-group summary .card'));
  }
});

renderBenchmarkPanel(null);
renderRankingPanel(null);
renderConservationPanel(null);
applyDensityMode();
window.addEventListener('error', (event) => {
  telemetryError('client.window.error', event.error || new Error(event.message), {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno
  });
});

window.addEventListener('unhandledrejection', (event) => {
  telemetryError('client.window.unhandledrejection', event.reason instanceof Error ? event.reason : new Error(String(event.reason)), {
    reason: String(event.reason)
  });
});

refresh().catch((error) => {
  telemetryError('client.bootstrap.refreshFailed', error);
  document.body.innerHTML = `<pre>${escapeHtml(error.message)}</pre>`;
});
