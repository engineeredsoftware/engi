const summaryEl = document.getElementById('summary');
const scenarioEl = document.getElementById('scenario');
const assetsEl = document.getElementById('assets');
const evaluationsEl = document.getElementById('evaluations');
const branchArtifactsEl = document.getElementById('branchArtifacts');
const settlementEl = document.getElementById('settlement');
const ledgerEl = document.getElementById('ledger');
const statusEl = document.getElementById('status');

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

async function api(path, options = {}) {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  const json = await response.json();
  if (!response.ok) throw new Error(json.error || 'Request failed');
  return json;
}

function setStatus(text) {
  statusEl.textContent = text;
}

function tierBadge(tier) {
  const klass = tier === 'settlement-eligible'
    ? 'private'
    : tier === 'patch-eligible'
      ? ''
      : tier === 'context-only'
        ? 'warn'
        : 'bad';
  return `<span class="badge ${klass}">${escapeHtml(tier)}</span>`;
}

function renderSummary(state) {
  const latestRun = state.latestRun;
  const selected = latestRun?.assetPack?.selectedAssets?.length || 0;
  const settled = latestRun?.journalDiff?.credits?.length || 0;
  const flows = latestRun?.sensitiveDataFlowRecords?.length || 0;
  const authz = latestRun?.authorizationDecisions?.length || 0;

  summaryEl.innerHTML = `
    <div class="summary-card"><span class="meta">Candidate assets</span><strong>${state.assets.length}</strong></div>
    <div class="summary-card"><span class="meta">Need scenarios</span><strong>${state.needScenarios.length}</strong></div>
    <div class="summary-card"><span class="meta">Selected assets in latest pack</span><strong>${selected}</strong></div>
    <div class="summary-card"><span class="meta">Settlement-credited assets</span><strong>${settled}</strong></div>
    <div class="summary-card"><span class="meta">Sensitive-data flow records</span><strong>${flows}</strong></div>
    <div class="summary-card"><span class="meta">Authorization decisions</span><strong>${authz}</strong></div>
  `;
}

function renderScenario(state) {
  const scenario = state.needScenarios[0];
  const latestNeed = state.latestRun?.need;
  const source = latestNeed || scenario;
  scenarioEl.innerHTML = `
    <div class="card">
      <div class="row"><strong>${escapeHtml(source.repo)}</strong><span class="badge">${escapeHtml(source.benchmarkRunId)}</span></div>
      <p>${escapeHtml(source.task)}</p>
      <div class="kv">
        <span class="meta">buyer branch</span><span>${escapeHtml(source.baseRef || source.buyerBranch || '')}</span>
        <span class="meta">workflow</span><span>${escapeHtml(source.benchmarkWorkflowPath)}</span>
        <span class="meta">parser</span><span>${escapeHtml(source.benchmarkParserContract?.parserKind || source.parserKind || '')} ${escapeHtml(source.benchmarkParserContract?.parserVersion || source.parserVersion || '')}</span>
        <span class="meta">fail-closed</span><span>${escapeHtml(source.benchmarkParserContract?.parserFailureContract?.failClosed ?? '')}</span>
        <span class="meta">failing cases</span><span>${escapeHtml((source.failingCases || []).join(' • '))}</span>
        <span class="meta">weak dimensions</span><span>${escapeHtml((source.weakDimensions || []).join(' • '))}</span>
      </div>
      ${latestNeed ? `<details><summary class="meta">Show current need.json</summary><pre>${escapeHtml(JSON.stringify(latestNeed, null, 2))}</pre></details>` : ''}
      ${state.latestRun?.needMeasurement ? `<details><summary class="meta">Show need measurement + parser validation</summary><pre>${escapeHtml(JSON.stringify({
        benchmarkTarget: state.latestRun.benchmarkTarget,
        parserValidation: state.latestRun.parserValidation,
        inferenceProofs: state.latestRun.inferenceProofs
      }, null, 2))}</pre></details>` : ''}
      ${state.latestRun?.canonicalRunEvidence ? `<details><summary class="meta">Show canonical run evidence</summary><pre>${escapeHtml(JSON.stringify(state.latestRun.canonicalRunEvidence, null, 2))}</pre></details>` : ''}
    </div>
  `;
}

function renderAssets(state) {
  assetsEl.innerHTML = state.assets.map((asset) => `
    <div class="card">
      <div class="row"><strong>${escapeHtml(asset.title)}</strong><span class="badge">${escapeHtml(asset.artifactKind)}</span></div>
      <p class="meta">${escapeHtml(asset.author)} · ${escapeHtml((asset.tags || []).join(', '))}</p>
      <p>${escapeHtml(asset.summary)}</p>
      <div class="kv">
        <span class="meta">content root</span><span>${escapeHtml(asset.contentRoot)}</span>
        <span class="meta">repo paths</span><span>${escapeHtml((asset.sourcePaths || []).join(' • '))}</span>
        <span class="meta">declared stacks</span><span>${escapeHtml((asset.declaredStacks || []).join(' • '))}</span>
        <span class="meta">constraints</span><span>${escapeHtml((asset.declaredConstraints || []).join(' • '))}</span>
      </div>
    </div>
  `).join('');
}

function renderEvaluations(state) {
  const items = state.latestRun?.evaluatedCandidates || [];
  if (!items.length) {
    evaluationsEl.innerHTML = '<div class="card"><p class="meta">Run “Make ENGI branch” to compute ranking, verification determinisms, and use tiers.</p></div>';
    return;
  }

  evaluationsEl.innerHTML = items.map((item) => `
    <div class="card">
      <div class="row"><strong>${escapeHtml(item.title)}</strong><div class="tier-row">${tierBadge(item.useTier)}<span class="badge">score ${item.ranking.finalRankingScore}</span></div></div>
      <p class="meta">wholeAssetNeedScore ${escapeHtml(item.ranking.wholeAssetNeedScore)} · recall fusion ${escapeHtml(item.recall?.recallScore ?? '')}</p>
      <div class="split">
        <div>
          <p class="meta">Recall channels + need match</p>
          <pre>${escapeHtml(JSON.stringify({ recall: item.recall, needMatch: item.ranking.needMatch }, null, 2))}</pre>
        </div>
        <div>
          <p class="meta">Benchmark impact + explainability</p>
          <pre>${escapeHtml(JSON.stringify({ benchmarkImpact: item.ranking.benchmarkImpact, explainability: item.ranking.explainability }, null, 2))}</pre>
        </div>
      </div>
      <div class="split">
        <div>
          <p class="meta">Actionability + penalties</p>
          <pre>${escapeHtml(JSON.stringify({ actionability: item.ranking.actionability, rankingPenalties: item.ranking.rankingPenalties, penaltyMass: item.ranking.penaltyMass }, null, 2))}</pre>
        </div>
        <div>
          <p class="meta">Verification determinisms</p>
          <pre>${escapeHtml(JSON.stringify(item.verification, null, 2))}</pre>
        </div>
      </div>
    </div>
  `).join('');
}

function renderBranchArtifacts(state) {
  const run = state.latestRun;
  if (!run) {
    branchArtifactsEl.innerHTML = '<div class="card"><p class="meta">No remediation branch staged yet.</p></div>';
    return;
  }

  branchArtifactsEl.innerHTML = `
    <div class="card">
      <div class="row"><strong>${escapeHtml(run.branchArtifacts.branchName)}</strong><span class="badge private">${escapeHtml(run.branchArtifacts.confidentiality)}</span></div>
      <div class="kv">
        <span class="meta">branch mode</span><span>${escapeHtml(run.branchMode)}</span>
        <span class="meta">need lifecycle</span><span>${escapeHtml(run.needLifecycle)}</span>
        <span class="meta">asset pack</span><span>${escapeHtml(run.assetPack.assetPackId)}</span>
        <span class="meta">selected assets</span><span>${escapeHtml(run.assetPack.selectedAssets.join(' • '))}</span>
      </div>
      <details open>
        <summary class="meta">Show branch artifacts</summary>
        <pre>${escapeHtml(JSON.stringify(Object.keys(run.branchArtifacts.files), null, 2))}</pre>
      </details>
      <details>
        <summary class="meta">Show ENGI_NEED.md</summary>
        <pre>${escapeHtml(run.branchArtifacts.files['ENGI_NEED.md'])}</pre>
      </details>
      <details>
        <summary class="meta">Show .engi/match-report.json</summary>
        <pre>${escapeHtml(run.branchArtifacts.files['.engi/match-report.json'])}</pre>
      </details>
      <details>
        <summary class="meta">Show policy + authorization artifacts</summary>
        <pre>${escapeHtml(JSON.stringify({
          policyRelease: run.policyRelease,
          identityBindings: run.identityBindings,
          authorizationDecisions: run.authorizationDecisions,
          sensitiveDataFlowRecords: run.sensitiveDataFlowRecords,
          deliverablesManifest: run.deliverablesManifest
        }, null, 2))}</pre>
      </details>
    </div>
  `;
}

function renderSettlement(state) {
  const run = state.latestRun;
  if (!run) {
    settlementEl.innerHTML = '<div class="card"><p class="meta">No settlement has executed yet.</p></div>';
    return;
  }
  settlementEl.innerHTML = `
    <div class="card">
      <div class="row"><strong>${escapeHtml(run.journalDiff.bundleId)}</strong><span class="badge">journal diff</span></div>
      <div class="kv">
        <span class="meta">event id</span><span>${escapeHtml(run.journalDiff.eventId)}</span>
        <span class="meta">before root</span><span>${escapeHtml(run.journalDiff.beforeRoot)}</span>
        <span class="meta">after root</span><span>${escapeHtml(run.journalDiff.afterRoot)}</span>
        <span class="meta">debited</span><span>${escapeHtml(run.journalDiff.totals.debited)}</span>
        <span class="meta">credited</span><span>${escapeHtml(run.journalDiff.totals.credited)}</span>
      </div>
      <details open>
        <summary class="meta">Show settlement preview</summary>
        <pre>${escapeHtml(JSON.stringify(run.settlementPreview, null, 2))}</pre>
      </details>
      <details>
        <summary class="meta">Show journal diff</summary>
        <pre>${escapeHtml(JSON.stringify(run.journalDiff, null, 2))}</pre>
      </details>
      <details>
        <summary class="meta">Show system proof bundle</summary>
        <pre>${escapeHtml(JSON.stringify(run.systemProofBundle, null, 2))}</pre>
      </details>
      <details>
        <summary class="meta">Show bounded public proof</summary>
        <pre>${escapeHtml(JSON.stringify(run.boundedPublicProof, null, 2))}</pre>
      </details>
    </div>
  `;
}

function renderLedger(state) {
  ledgerEl.innerHTML = `
    <div class="card">
      <strong>Ledger accounts</strong>
      <pre>${escapeHtml(JSON.stringify(state.ledger.accounts, null, 2))}</pre>
    </div>
    <div class="card">
      <strong>Run history</strong>
      <pre>${escapeHtml(JSON.stringify(state.runHistory, null, 2))}</pre>
    </div>
  `;
}

async function refresh() {
  const state = await api('/api/state');
  renderSummary(state);
  renderScenario(state);
  renderAssets(state);
  renderEvaluations(state);
  renderBranchArtifacts(state);
  renderSettlement(state);
  renderLedger(state);
  return state;
}

document.getElementById('makeBranchButton').addEventListener('click', async () => {
  try {
    setStatus('Measuring need, ranking candidates, staging branch artifacts, and settling journal diff…');
    const result = await api('/api/make-engi-branch', { method: 'POST', body: '{}' });
    await refresh();
    setStatus(`Created ${result.latestRun.branchArtifacts.branchName} and settled bundle ${result.latestRun.journalDiff.bundleId}.`);
  } catch (error) {
    setStatus(error.message);
  }
});

document.getElementById('resetButton').addEventListener('click', async () => {
  try {
    await api('/api/reset', { method: 'POST', body: '{}' });
    await refresh();
    setStatus('Demo reset to seeded Spec V6 scenario.');
  } catch (error) {
    setStatus(error.message);
  }
});

document.getElementById('depositForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  try {
    await api('/api/deposits', {
      method: 'POST',
      body: JSON.stringify({
        title: form.get('title'),
        author: form.get('author'),
        artifactKind: form.get('artifactKind'),
        tags: String(form.get('tags') || '').split(',').map((entry) => entry.trim()).filter(Boolean),
        content: form.get('content')
      })
    });
    event.currentTarget.reset();
    await refresh();
    setStatus('Candidate asset deposited. Re-run “Make ENGI branch” to fold it into ranking and verification.');
  } catch (error) {
    setStatus(error.message);
  }
});

refresh().then(() => {
  setStatus('Ready. Run “Make ENGI branch” to execute the full Spec V6 prototype flow.');
}).catch((error) => {
  document.body.innerHTML = `<pre>${escapeHtml(error.message)}</pre>`;
});
