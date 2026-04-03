const summaryEl = document.getElementById('summary');
const scenarioEl = document.getElementById('scenario');
const assetsEl = document.getElementById('assets');
const evaluationsEl = document.getElementById('evaluations');
const branchArtifactsEl = document.getElementById('branchArtifacts');
const settlementEl = document.getElementById('settlement');
const ledgerEl = document.getElementById('ledger');
const statusEl = document.getElementById('status');

const DEFAULT_SURFACE_MODE = 'visual';
let surfaceCounter = 0;

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function labelize(value) {
  return String(value ?? '')
    .replaceAll(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replaceAll(/[_./:-]+/g, ' ')
    .replace(/\bjson\b/gi, 'JSON')
    .replace(/\bid\b/gi, 'ID')
    .replace(/\burl\b/gi, 'URL')
    .replace(/\bttl\b/gi, 'TTL')
    .replace(/\bapi\b/gi, 'API')
    .replace(/\bgha\b/gi, 'GHA')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/^./, (char) => char.toUpperCase());
}

function truncate(value, max = 120) {
  const text = String(value ?? '');
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

function formatList(items = [], fallback = 'None') {
  return items.length ? items.map((item) => escapeHtml(item)).join(' • ') : `<span class="meta">${fallback}</span>`;
}

function formatCount(count, singular, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function api(path, options = {}) {
  return fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  }).then(async (response) => {
    const json = await response.json();
    if (!response.ok) throw new Error(json.error || 'Request failed');
    return json;
  });
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

function boolBadge(value, yes = 'Yes', no = 'No') {
  return `<span class="badge ${value ? 'private' : 'warn'}">${value ? yes : no}</span>`;
}

function statusBadge(value) {
  const normalized = String(value ?? '').toLowerCase();
  const klass = /(allow|active|settlement|pass|true|public|ready|traceable|replayable|satisfied)/.test(normalized)
    ? 'private'
    : /(warn|context|patch|review|partial|prototype|local)/.test(normalized)
      ? 'warn'
      : /(deny|reject|revoked|blocked|false|private-required|restricted|missing|bad)/.test(normalized)
        ? 'bad'
        : '';
  return `<span class="badge ${klass}">${escapeHtml(value || 'n/a')}</span>`;
}

function metricTile(label, value, tone = '', options = {}) {
  const rendered = options.html ? value : escapeHtml(value);
  return `
    <div class="mini-card ${tone}">
      <span class="meta">${escapeHtml(label)}</span>
      <strong>${rendered}</strong>
    </div>
  `;
}

function kvRow(label, value, options = {}) {
  const rendered = options.html ? value : escapeHtml(value ?? '—');
  return `<div class="kv-row"><span class="meta">${escapeHtml(label)}</span><span>${rendered}</span></div>`;
}

function chipList(items = [], badgeClass = '') {
  if (!items.length) return '<span class="meta">None</span>';
  return items.map((item) => `<span class="badge ${badgeClass}">${escapeHtml(item)}</span>`).join(' ');
}

function scoreBar(value) {
  const numeric = Number(value || 0);
  const pct = Math.max(0, Math.min(100, Math.round(numeric * 100)));
  return `
    <div class="score-bar">
      <div class="score-bar-fill" style="width:${pct}%"></div>
      <span>${escapeHtml(numeric.toFixed(3))}</span>
    </div>
  `;
}

function detailsSection(title, body, open = false) {
  return `
    <details class="detail-block" ${open ? 'open' : ''}>
      <summary>${escapeHtml(title)}</summary>
      ${body}
    </details>
  `;
}

function tryParseJson(value) {
  if (typeof value !== 'string') return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function rawText(data, raw) {
  if (typeof raw === 'string') return raw;
  if (typeof data === 'string') return data;
  return JSON.stringify(data ?? null, null, 2);
}

function surfaceVisualFallback(data, depth = 0) {
  if (data == null) return '<p class="meta">No data.</p>';
  if (typeof data === 'string') return `<pre>${escapeHtml(data)}</pre>`;
  if (typeof data === 'number' || typeof data === 'boolean') return `<strong>${escapeHtml(data)}</strong>`;
  if (Array.isArray(data)) {
    if (!data.length) return '<p class="meta">Empty array.</p>';
    return `
      <div class="object-list ${depth ? 'nested' : ''}">
        ${data.map((item, index) => `
          <div class="mini-card">
            <div class="row"><strong>${escapeHtml(`Item ${index + 1}`)}</strong>${Array.isArray(item) ? `<span class="meta">${formatCount(item.length, 'entry')}</span>` : ''}</div>
            ${surfaceVisualFallback(item, depth + 1)}
          </div>
        `).join('')}
      </div>
    `;
  }

  const entries = Object.entries(data);
  if (!entries.length) return '<p class="meta">Empty object.</p>';

  const primitives = entries.filter(([, value]) => value == null || typeof value !== 'object');
  const nested = entries.filter(([, value]) => value && typeof value === 'object');

  return `
    ${primitives.length ? `<div class="kv-grid">${primitives.map(([key, value]) => kvRow(labelize(key), value)).join('')}</div>` : ''}
    ${nested.length ? `<div class="object-list ${depth ? 'nested' : ''}">${nested.map(([key, value]) => `
      <div class="mini-card">
        <div class="row"><strong>${escapeHtml(labelize(key))}</strong>${Array.isArray(value) ? `<span class="meta">${formatCount(value.length, 'entry')}</span>` : ''}</div>
        ${surfaceVisualFallback(value, depth + 1)}
      </div>
    `).join('')}</div>` : ''}
  `;
}

function renderJsonSurface({ title, subtitle = '', eyebrow = '', help = '', data, raw, visual, defaultMode = DEFAULT_SURFACE_MODE, accent = '' }) {
  const surfaceId = `surface-${++surfaceCounter}`;
  const rawContent = rawText(data, raw);
  const visualContent = typeof visual === 'function' ? visual(data) : surfaceVisualFallback(data);

  return `
    <article class="json-surface ${accent}">
      <div class="json-surface-head">
        <div>
          ${eyebrow ? `<p class="eyebrow meta-inline">${escapeHtml(eyebrow)}</p>` : ''}
          <h3>${escapeHtml(title)}</h3>
          ${subtitle ? `<p class="meta">${escapeHtml(subtitle)}</p>` : ''}
        </div>
        <div class="surface-mode-toggle" role="tablist" aria-label="Toggle ${escapeHtml(title)} view">
          <button type="button" class="surface-mode-button ${defaultMode === 'visual' ? 'active' : ''}" data-surface-target="${surfaceId}" data-mode="visual">Visual</button>
          <button type="button" class="surface-mode-button ${defaultMode === 'raw' ? 'active' : ''}" data-surface-target="${surfaceId}" data-mode="raw">Raw</button>
        </div>
      </div>
      ${help ? `<p class="surface-help">${escapeHtml(help)}</p>` : ''}
      <div id="${surfaceId}" class="surface-body" data-mode="${defaultMode}">
        <div class="surface-panel surface-panel-visual ${defaultMode === 'visual' ? 'active' : ''}">${visualContent}</div>
        <div class="surface-panel surface-panel-raw ${defaultMode === 'raw' ? 'active' : ''}"><pre>${escapeHtml(rawContent)}</pre></div>
      </div>
    </article>
  `;
}

function renderNeedVisual(need) {
  const parser = need.benchmarkParserContract || {};
  const parserFailure = parser.parserFailureContract || {};
  const benchmarkTarget = need.benchmarkTarget || {};
  return `
    <div class="visual-stack">
      <div class="highlight-card">
        <div class="row wrap-gap">
          <strong>${escapeHtml(need.task || need.taskSeed || 'Measured engineering need')}</strong>
          <div class="badge-row">
            ${statusBadge(need.conformanceProfile || need.profileAStatus)}
            ${statusBadge(need.productionIntentProfile || need.profileBStatus)}
          </div>
        </div>
        <p class="meta">${escapeHtml(need.repo || '')} · buyer branch ${escapeHtml(need.baseRef || need.buyerBranch || '—')} · benchmark run ${escapeHtml(need.benchmarkRunId || benchmarkTarget.runId || '—')}</p>
      </div>
      <div class="mini-grid three-up">
        ${metricTile('Need ID', need.needId || '—')}
        ${metricTile('Workflow', need.benchmarkWorkflowPath || parser.expectedCanonicalOutputs?.workflowPath || '—')}
        ${metricTile('Parser', `${parser.parserKind || need.parserKind || '—'} ${parser.parserVersion || need.parserVersion || ''}`.trim())}
      </div>
      <div class="section-card">
        <div class="section-head">
          <h4>Measured target</h4>
          ${boolBadge(parserFailure.failClosed, 'Fail-closed', 'Open failure mode')}
        </div>
        <div class="kv-grid">
          ${kvRow('Benchmark harness', benchmarkTarget.harnessPath || need.benchmarkHarnessPath || '—')}
          ${kvRow('Parser on missing outputs', parserFailure.onMissingCanonicalOutputs || '—')}
          ${kvRow('Parser on malformed outputs', parserFailure.onMalformedOutputs || '—')}
          ${kvRow('Target artifact kinds', formatList(need.targetArtifactKinds || []), { html: true })}
        </div>
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>Failing cases</h4><span class="badge">${(need.failingCases || []).length}</span></div>
          <div class="badge-row">${chipList(need.failingCases || [], 'warn')}</div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>Weak dimensions</h4><span class="badge">${(need.weakDimensions || []).length}</span></div>
          <div class="badge-row">${chipList(need.weakDimensions || [], 'warn')}</div>
        </div>
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>Constraints</h4><span class="badge">Governance</span></div>
          <div class="badge-row">${chipList(need.constraints || [])}</div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>Field derivations</h4><span class="badge">Closure</span></div>
          <div class="object-list nested">
            ${Object.entries(need.fieldDerivations || {}).slice(0, 6).map(([field, spec]) => `
              <div class="mini-card">
                <strong>${escapeHtml(labelize(field))}</strong>
                <p class="meta">${escapeHtml(spec.source || 'derived')}</p>
                ${spec.policy ? `<p>${escapeHtml(spec.policy)}</p>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderNeedMeasurementVisual(payload) {
  return `
    <div class="visual-stack">
      <div class="section-card">
        <div class="section-head"><h4>Measurement package</h4><span class="badge">Need + parser validation</span></div>
        <div class="mini-grid three-up">
          ${metricTile('Inference proofs', (payload.inferenceProofs || []).length)}
          ${metricTile('Field derivations', Object.keys(payload.fieldDerivations || {}).length)}
          ${metricTile('Parser validation checks', Object.keys(payload.parserValidation || {}).length)}
        </div>
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>Benchmark target</h4><span class="badge">Verification evidence</span></div>
          ${surfaceVisualFallback(payload.benchmarkTarget || {})}
        </div>
        <div class="section-card">
          <div class="section-head"><h4>Parser validation</h4><span class="badge">Fail-closed guardrails</span></div>
          ${surfaceVisualFallback(payload.parserValidation || {})}
        </div>
      </div>
      <div class="section-card">
        <div class="section-head"><h4>Inference proof surfaces</h4><span class="badge">${formatCount((payload.inferenceProofs || []).length, 'proof')}</span></div>
        ${surfaceVisualFallback(payload.inferenceProofs || [])}
      </div>
    </div>
  `;
}

function renderAssetVisual(asset) {
  return `
    <div class="visual-stack">
      <div class="row wrap-gap">
        <div>
          <strong>${escapeHtml(asset.title)}</strong>
          <p class="meta">${escapeHtml(asset.author)} · ${escapeHtml(asset.artifactKind)}</p>
        </div>
        <div class="badge-row">
          ${chipList(asset.tags || [])}
        </div>
      </div>
      <p>${escapeHtml(asset.summary || '')}</p>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>Coverage</h4><span class="badge">Repository fit</span></div>
          <div class="kv-grid">
            ${kvRow('Content root', asset.contentRoot || '—')}
            ${kvRow('Source paths', formatList(asset.sourcePaths || []), { html: true })}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>Declared shape</h4><span class="badge">Asset metadata</span></div>
          <div class="kv-grid">
            ${kvRow('Stacks', formatList(asset.declaredStacks || []), { html: true })}
            ${kvRow('Constraints', formatList(asset.declaredConstraints || []), { html: true })}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderEvaluationVisual(item) {
  const verification = item.verification || {};
  const sufficiency = verification.verificationSufficiency || {};
  const rights = item.rights || {};
  const strongestSignals = item.ranking?.explainability?.strongestSignals || [];
  const penalties = item.ranking?.rankingPenalties || [];

  return `
    <div class="visual-stack">
      <div class="highlight-card">
        <div class="row wrap-gap">
          <div>
            <strong>${escapeHtml(item.title)}</strong>
            <p class="meta">${escapeHtml(item.assetId)} · ${escapeHtml(item.artifactKind || '')}</p>
          </div>
          <div class="badge-row">
            ${tierBadge(item.useTier)}
            <span class="badge">score ${escapeHtml(item.ranking.finalRankingScore)}</span>
          </div>
        </div>
        <p>${escapeHtml((strongestSignals[0]?.label || 'Top signal') + (strongestSignals[0] ? `: ${strongestSignals[0].value}` : ''))}</p>
      </div>
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Need match', scoreBar(item.ranking.needMatch.finalScore), 'metric', { html: true })}
        ${metricTile('Benchmark impact', scoreBar(item.ranking.benchmarkImpact.finalScore), 'metric', { html: true })}
        ${metricTile('Actionability', scoreBar(item.ranking.actionability.finalScore), 'metric', { html: true })}
        ${metricTile('Penalty mass', Number(item.ranking.penaltyMass || 0).toFixed(3), penalties.length ? 'warn' : '')}
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>Recall + strongest signals</h4><span class="badge">Why it ranked</span></div>
          <div class="kv-grid">
            ${kvRow('Recall score', item.recall?.recallScore ?? '—')}
            ${kvRow('Whole asset need score', item.ranking.wholeAssetNeedScore ?? '—')}
            ${kvRow('Recall channels', formatList((item.recall?.fusion?.contributingChannels || []).map((entry) => entry.channelId || entry)), { html: true })}
          </div>
          <div class="badge-row">${strongestSignals.map((signal) => `<span class="badge">${escapeHtml(signal.label)} ${escapeHtml(signal.value)}</span>`).join(' ') || '<span class="meta">No strongest signals recorded.</span>'}</div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>Verification + rights</h4><span class="badge">Use-tier gate</span></div>
          <div class="kv-grid">
            ${kvRow('Proof logs', sufficiency.proofLogCount ?? '—')}
            ${kvRow('Benchmark bound to GitHub run', boolBadge(sufficiency.benchmarkEvidenceBoundToGitHubRun, 'Bound', 'Unbound'), { html: true })}
            ${kvRow('Recommended tier', statusBadge(sufficiency.recommendedUseTier), { html: true })}
            ${kvRow('Policy tier cap', statusBadge(verification.issuerPolicyStatus?.policyTierCap), { html: true })}
            ${kvRow('Branch materialization', boolBadge(rights.branchMaterializationAllowed, 'Allowed', 'Blocked'), { html: true })}
            ${kvRow('Settlement allowed', boolBadge(rights.settlementAllowed, 'Allowed', 'Blocked'), { html: true })}
          </div>
        </div>
      </div>
      ${penalties.length ? `<div class="callout warn"><strong>Penalty reasons</strong><div class="badge-row">${penalties.map((penalty) => `<span class="badge warn">${escapeHtml(penalty.code || penalty)}</span>`).join(' ')}</div></div>` : '<div class="callout"><strong>No ranking penalties</strong><span class="meta">This candidate kept a clean ranking path.</span></div>'}
    </div>
  `;
}

function renderVerificationReportVisual(report) {
  const entries = report.assetVerification || [];
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Verified assets', entries.length)}
        ${metricTile('Settlement eligible', entries.filter((entry) => entry.useTier === 'settlement-eligible').length)}
        ${metricTile('Context only', entries.filter((entry) => entry.useTier === 'context-only').length)}
        ${metricTile('Rejected', entries.filter((entry) => entry.useTier === 'reject').length)}
      </div>
      <div class="object-list">
        ${entries.map((entry) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <strong>${escapeHtml(entry.title)}</strong>
              <div class="badge-row">${tierBadge(entry.useTier)} ${statusBadge(entry.issuerPolicyStatus?.status)}</div>
            </div>
            <div class="kv-grid">
              ${kvRow('Issuance verification', entry.issuanceVerification?.status || entry.issuanceVerification?.testsPassed || 'see raw')}
              ${kvRow('Provenance verification', entry.provenanceVerification?.status || 'see raw')}
              ${kvRow('Recommended use tier', statusBadge(entry.verificationSufficiency?.recommendedUseTier), { html: true })}
              ${kvRow('Settlement allowed', boolBadge(entry.rights?.settlementAllowed, 'Allowed', 'Blocked'), { html: true })}
            </div>
            <div class="badge-row">${chipList(entry.verificationSufficiency?.reasons || [], 'warn')}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderAssetPackVisual(lock) {
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Asset pack ID', lock.assetPackId || '—')}
        ${metricTile('Branch mode', lock.branchMode || '—')}
        ${metricTile('Locked assets', (lock.assets || []).length)}
        ${metricTile('Locked units', (lock.units || []).length)}
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>Selected assets</h4><span class="badge">Locked for branch</span></div>
          <div class="object-list nested">
            ${(lock.assets || []).map((asset) => `
              <div class="mini-card">
                <div class="row"><strong>${escapeHtml(asset.title || asset.assetId)}</strong>${tierBadge(asset.useTier || 'selected')}</div>
                <p class="meta">${escapeHtml(asset.assetId)}</p>
                <p>${escapeHtml(asset.materializationRoot || asset.contentRoot || '')}</p>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>Lock integrity</h4><span class="badge">Roots + attestations</span></div>
          <div class="kv-grid">
            ${kvRow('Locked content roots', formatCount((lock.lockedContentRoots || []).length, 'root'))}
            ${kvRow('Locked attestations', formatCount((lock.lockedAttestationHashes || []).length, 'hash'))}
            ${kvRow('Need ID', lock.needId || '—')}
            ${kvRow('Allowed tiers', formatList(lock.allowedUseTiers || []), { html: true })}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderAuthorizationVisual(decisions) {
  const allowCount = decisions.filter((decision) => decision.decision === 'allow').length;
  const denyCount = decisions.filter((decision) => decision.decision !== 'allow').length;
  return `
    <div class="visual-stack">
      <div class="mini-grid three-up compact-metrics">
        ${metricTile('Decisions', decisions.length)}
        ${metricTile('Allows', allowCount, allowCount ? 'private' : '')}
        ${metricTile('Non-allows', denyCount, denyCount ? 'warn' : '')}
      </div>
      <div class="object-list">
        ${decisions.map((decision) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <strong>${escapeHtml(decision.action)}</strong>
              <div class="badge-row">${statusBadge(decision.decision)} ${statusBadge(decision.principalId)}</div>
            </div>
            <div class="kv-grid">
              ${kvRow('Principal', decision.principalId || '—')}
              ${kvRow('Resource', decision.resourceRef || '—')}
              ${kvRow('Policy', decision.policyRef || '—')}
            </div>
            ${decision.reasons?.length ? `<div class="callout"><strong>Why</strong><span>${escapeHtml(truncate(decision.reasons.join(' • '), 220))}</span></div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderSensitiveFlowVisual(records) {
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Flow records', records.length)}
        ${metricTile('Data classes', new Set(records.map((record) => record.dataClass)).size)}
        ${metricTile('Authorized principals', new Set(records.flatMap((record) => record.authorizedPrincipals || [])).size)}
        ${metricTile('Proof refs', new Set(records.flatMap((record) => record.proofRefs || [])).size)}
      </div>
      <div class="object-list">
        ${records.map((record) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <strong>${escapeHtml(record.transformation || record.recordId)}</strong>
              <div class="badge-row">${statusBadge(record.dataClass)}</div>
            </div>
            <div class="kv-grid">
              ${kvRow('From', record.fromSurface || '—')}
              ${kvRow('To', record.toSurface || '—')}
              ${kvRow('Policy', record.policyRef || '—')}
              ${kvRow('Authorized principals', formatList(record.authorizedPrincipals || []), { html: true })}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderPolicyReleaseVisual(policy) {
  return `
    <div class="visual-stack">
      <div class="highlight-card">
        <div class="row wrap-gap">
          <strong>${escapeHtml(policy.releaseId || 'Policy release')}</strong>
          <div class="badge-row">${statusBadge(policy.confidentialityDefault)} ${statusBadge(policy.conformanceProfile)}</div>
        </div>
        <p>${escapeHtml(policy.policyRef || '')}</p>
      </div>
      <div class="mini-grid three-up compact-metrics">
        ${metricTile('Artifact classes', (policy.artifactClasses || []).length)}
        ${metricTile('Retention rules', (policy.retentionRules || []).length)}
        ${metricTile('Selected assets', (policy.selectedAssets || []).length)}
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>Artifact classes</h4><span class="badge">Confidentiality map</span></div>
          <div class="object-list nested">
            ${(policy.artifactClasses || []).map((entry) => `
              <div class="mini-card">
                <strong>${escapeHtml(entry.path)}</strong>
                <p class="meta">${escapeHtml(entry.sensitiveDataClass)}</p>
                <div class="badge-row">${boolBadge(entry.disclosable, 'Disclosable', 'Private')}</div>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>Revocation + retention</h4><span class="badge">Safety controls</span></div>
          <div class="kv-grid">
            ${kvRow('Settlement blocked on revoked issuer', boolBadge(policy.revocationRules?.revokedIssuerBlocksNewSettlement, 'Blocked', 'Open'), { html: true })}
            ${kvRow('Delivery blocked on revoked issuer', boolBadge(policy.revocationRules?.revokedIssuerBlocksNewDelivery, 'Blocked', 'Open'), { html: true })}
          </div>
          <div class="object-list nested">
            ${(policy.retentionRules || []).map((rule) => `
              <div class="mini-card">
                <strong>${escapeHtml(rule.retentionPolicyId)}</strong>
                <p class="meta">TTL ${escapeHtml(rule.ttlDays)} days</p>
                <p>${escapeHtml((rule.appliesTo || []).join(' • '))}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderUnitCatalogVisual(catalog) {
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Units', (catalog.units || []).length)}
        ${metricTile('Assets represented', new Set((catalog.units || []).map((unit) => unit.assetId)).size)}
        ${metricTile('Profiles', [catalog.conformanceProfile, catalog.productionIntentProfile].filter(Boolean).length)}
        ${metricTile('Kinds', new Set((catalog.units || []).map((unit) => unit.unitKind)).size)}
      </div>
      <div class="object-list">
        ${(catalog.units || []).map((unit) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <strong>${escapeHtml(unit.unitId)}</strong>
              <div class="badge-row">${statusBadge(unit.unitKind)} ${statusBadge(unit.useTier)}</div>
            </div>
            <div class="kv-grid">
              ${kvRow('Asset ID', unit.assetId || '—')}
              ${kvRow('Semantic summary', truncate(unit.semanticSummary || '—', 140))}
              ${kvRow('Embedding hand-off ready', boolBadge(unit.semanticInterfaces?.embeddingHandOffReady, 'Ready', 'Not ready'), { html: true })}
              ${kvRow('Unit hash', unit.unitHash || '—')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderTelemetryVisual(telemetry) {
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Telemetry events', (telemetry.events || []).length)}
        ${metricTile('Stages', new Set((telemetry.events || []).map((event) => event.stage)).size)}
        ${metricTile('Profile A', telemetry.conformanceProfile || '—')}
        ${metricTile('Profile B', telemetry.productionIntentProfile || '—')}
      </div>
      <div class="timeline">
        ${(telemetry.events || []).map((event, index) => `
          <div class="timeline-item">
            <div class="timeline-index">${index + 1}</div>
            <div class="timeline-card">
              <div class="row wrap-gap">
                <strong>${escapeHtml(labelize(event.stage || `Event ${index + 1}`))}</strong>
                <span class="badge">${escapeHtml(event.stage || 'event')}</span>
              </div>
              <p class="meta">${escapeHtml(truncate(JSON.stringify(event.details || {}), 180))}</p>
              ${surfaceVisualFallback(event.details || {})}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderSettlementPreviewVisual(preview) {
  return `
    <div class="visual-stack">
      <div class="highlight-card">
        <div class="row wrap-gap">
          <strong>${escapeHtml(preview.bundleId || 'Settlement preview')}</strong>
          <div class="badge-row">${statusBadge(preview.branchMode)} ${statusBadge(preview.assetPackLockHash ? 'asset-pack-lock bound' : 'unbound')}</div>
        </div>
        <p class="meta">Need ${escapeHtml(preview.needId || '—')} · ${formatCount((preview.participatingAssets || preview.settlementParticipatingAssetIds || []).length, 'participating asset')}</p>
      </div>
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Metered micro-units', preview.meteredMicroUnits || '—')}
        ${metricTile('Participating assets', (preview.settlementParticipatingAssetIds || []).length)}
        ${metricTile('Preview allocations', (preview.allocations || []).length)}
        ${metricTile('Lock hash', preview.assetPackLockHash ? truncate(preview.assetPackLockHash, 18) : '—')}
      </div>
      <div class="section-card">
        <div class="section-head"><h4>Allocation preview</h4><span class="badge">Bundle shares</span></div>
        <div class="object-list nested">
          ${(preview.allocations || []).map((allocation) => `
            <div class="mini-card">
              <div class="row wrap-gap">
                <strong>${escapeHtml(allocation.assetId || 'Asset')}</strong>
                <span class="badge">${escapeHtml(allocation.settledShareBp ?? allocation.shareBp ?? '—')} bp</span>
              </div>
              <p class="meta">${escapeHtml((allocation.rationale || []).join(' • '))}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderJournalDiffVisual(diff) {
  const invariants = diff.invariants || {};
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Bundle ID', diff.bundleId || '—')}
        ${metricTile('Event ID', diff.eventId || '—')}
        ${metricTile('Debited', diff.totals?.debited || '—')}
        ${metricTile('Credited', diff.totals?.credited || '—')}
      </div>
      <div class="section-card">
        <div class="section-head"><h4>Journal invariants</h4><span class="badge">Exact accounting</span></div>
        <div class="badge-row">
          ${Object.entries(invariants).map(([key, value]) => `<span class="badge ${value ? 'private' : 'bad'}">${escapeHtml(labelize(key))}: ${escapeHtml(value)}</span>`).join(' ')}
        </div>
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>Debits</h4><span class="badge">${(diff.debits || []).length}</span></div>
          ${surfaceVisualFallback(diff.debits || [])}
        </div>
        <div class="section-card">
          <div class="section-head"><h4>Credits</h4><span class="badge">${(diff.credits || []).length}</span></div>
          ${surfaceVisualFallback(diff.credits || [])}
        </div>
      </div>
    </div>
  `;
}

function renderSystemProofBundleVisual(bundle) {
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Need ID', bundle.needId || '—')}
        ${metricTile('Asset pack ID', bundle.assetPackId || '—')}
        ${metricTile('Measurement proofs', (bundle.assetMeasurementProofs || []).length)}
        ${metricTile('Inferred outputs', (bundle.promptImplementationSurface?.inferredOutputs || []).length)}
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>System proof checks</h4><span class="badge">Closure</span></div>
          <div class="badge-row">
            ${boolBadge(bundle.selectionConsistencyProof?.allSelectedAssetsRespectUseTier, 'Use tiers respected', 'Use tier break')}
            ${boolBadge(bundle.identityAuthorizationProof?.allStateChangingActionsAuthorized, 'State changes authorized', 'Unauthorized state change')}
            ${boolBadge(bundle.sensitiveDataFlowProof?.noUnauthorizedPublicDisclosure, 'No unauthorized public disclosure', 'Disclosure issue')}
            ${boolBadge(bundle.settlementProof?.theoremChecks?.debitsEqualCredits, 'Debits = credits', 'Accounting mismatch')}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>Prompt / evaluator surface</h4><span class="badge">Profile B hand-off</span></div>
          ${surfaceVisualFallback(bundle.promptImplementationSurface || {})}
        </div>
      </div>
    </div>
  `;
}

function renderBoundedProofVisual(proof) {
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Need ID', proof.needId || '—')}
        ${metricTile('Bundle ID', proof.bundleId || '—')}
        ${metricTile('Selected assets', (proof.selectedAssets || []).length)}
        ${metricTile('Redaction status', proof.redactionStatus || '—')}
      </div>
      <div class="callout">
        <strong>Bounded public proof</strong>
        <span>${escapeHtml('This is the redacted inspection surface intended to remain public while private proof artifacts stay private.')}</span>
      </div>
      ${surfaceVisualFallback(proof)}
    </div>
  `;
}

function renderLedgerAccountsVisual(accounts) {
  const entries = Object.entries(accounts || {});
  return `
    <div class="visual-stack">
      <div class="mini-grid three-up compact-metrics">
        ${metricTile('Accounts', entries.length)}
        ${metricTile('Buyer pools', entries.filter(([name]) => name.startsWith('buyer:')).length)}
        ${metricTile('Supplier pending claims', entries.filter(([name]) => name.includes(':pending_claims')).length)}
      </div>
      <div class="object-list nested">
        ${entries.map(([account, balance]) => `
          <div class="mini-card">
            <strong>${escapeHtml(account)}</strong>
            <p class="meta">Balance</p>
            <p>${escapeHtml(balance)}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderRunHistoryVisual(history) {
  return `
    <div class="visual-stack">
      <div class="mini-grid three-up compact-metrics">
        ${metricTile('Runs', history.length)}
        ${metricTile('Settled runs', history.filter((entry) => entry.needLifecycle === 'settled').length)}
        ${metricTile('Unique bundles', new Set(history.map((entry) => entry.bundleId).filter(Boolean)).size)}
      </div>
      <div class="object-list">
        ${history.map((entry) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <strong>${escapeHtml(entry.branchName || 'Run')}</strong>
              <div class="badge-row">${statusBadge(entry.needLifecycle)} ${statusBadge(entry.redactionStatus)}</div>
            </div>
            <div class="kv-grid">
              ${kvRow('Need ID', entry.needId || '—')}
              ${kvRow('Bundle ID', entry.bundleId || '—')}
              ${kvRow('Selected assets', formatList(entry.selectedAssets || []), { html: true })}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
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
    <div class="summary-card"><span class="meta">Active profile</span><strong>${escapeHtml(state.conformanceProfiles?.active || '')}</strong></div>
    <div class="summary-card"><span class="meta">Selected assets in latest pack</span><strong>${selected}</strong></div>
    <div class="summary-card"><span class="meta">Settlement-credited assets</span><strong>${settled}</strong></div>
    <div class="summary-card"><span class="meta">Sensitive-data flow records</span><strong>${flows}</strong></div>
    <div class="summary-card"><span class="meta">Authorization decisions</span><strong>${authz}</strong></div>
    <div class="summary-card"><span class="meta">Default artifact view</span><strong>Visual</strong></div>
  `;
}

function renderScenario(state) {
  const scenario = state.needScenarios[0];
  const latestNeed = state.latestRun?.need;
  const source = latestNeed || scenario;
  const measurementPayload = state.latestRun?.needMeasurement ? {
    ...state.latestRun.needMeasurement,
    benchmarkTarget: state.latestRun.benchmarkTarget,
    parserValidation: state.latestRun.parserValidation,
    inferenceProofs: state.latestRun.inferenceProofs,
    fieldDerivations: state.latestRun.need?.fieldDerivations
  } : null;

  scenarioEl.innerHTML = `
    <div class="card intro-card">
      <div class="row wrap-gap">
        <strong>${escapeHtml(source.repo)}</strong>
        <div class="badge-row">
          ${statusBadge(source.conformanceProfile || source.profileAStatus)}
          ${source.benchmarkRunId ? `<span class="badge">${escapeHtml(source.benchmarkRunId)}</span>` : ''}
        </div>
      </div>
      <p>${escapeHtml(source.task || source.taskSeed || '')}</p>
      <p class="meta">This panel now defaults to a visual read of the measured need, but every artifact below can flip to exact raw JSON for debugging or inspection.</p>
    </div>
    ${renderJsonSurface({
      title: latestNeed ? 'Measured need' : 'Seed need scenario',
      subtitle: 'Need / measurement / benchmark target surface',
      eyebrow: 'V7 artifact',
      help: 'Visual groups the GitHub-bound need into task, parser, failure-mode, and derivation sections. Raw shows the exact pretty-printed object.',
      data: source,
      visual: renderNeedVisual,
      accent: 'accent-blue'
    })}
    ${measurementPayload ? renderJsonSurface({
      title: 'Need measurement + parser validation',
      subtitle: 'Benchmark target, parser validation, and inference proof package',
      eyebrow: 'Measurement artifact',
      help: 'This is where fail-closed parsing, benchmark targeting, and derivation proofs become legible without losing access to the underlying JSON.',
      data: measurementPayload,
      visual: renderNeedMeasurementVisual,
      accent: 'accent-purple'
    }) : ''}
    ${state.latestRun?.canonicalRunEvidence ? renderJsonSurface({
      title: 'Canonical run evidence',
      subtitle: 'Normalized benchmark evidence bound to the GitHub run',
      eyebrow: 'Verification evidence',
      data: state.latestRun.canonicalRunEvidence,
      visual: surfaceVisualFallback,
      accent: 'accent-slate'
    }) : ''}
  `;
}

function renderAssets(state) {
  assetsEl.innerHTML = state.assets.map((asset) => renderJsonSurface({
    title: asset.title,
    subtitle: `${asset.artifactKind} deposited by ${asset.author}`,
    eyebrow: 'Candidate asset',
    help: 'Visual mode lifts out the repo fit, stacks, constraints, and tags. Raw mode preserves the exact public projection for inspection.',
    data: asset,
    visual: renderAssetVisual
  })).join('');
}

function renderEvaluations(state) {
  const items = state.latestRun?.evaluatedCandidates || [];
  if (!items.length) {
    evaluationsEl.innerHTML = '<div class="card"><p class="meta">Run “Make ENGI branch” to compute ranking, verification determinisms, and use tiers.</p></div>';
    return;
  }

  const verificationReport = state.latestRun?.verificationReport;

  evaluationsEl.innerHTML = `
    ${verificationReport ? renderJsonSurface({
      title: 'Verification report',
      subtitle: 'Ranking is separate from verification and rights propagation',
      eyebrow: 'V7 artifact',
      help: 'Visual mode emphasizes allowed downstream use rather than making you read a wall of nested booleans.',
      data: verificationReport,
      visual: renderVerificationReportVisual,
      accent: 'accent-green'
    }) : ''}
    ${items.map((item) => renderJsonSurface({
      title: item.title,
      subtitle: `${item.assetId} · ${item.artifactKind}`,
      eyebrow: 'Evaluated candidate',
      help: 'Visual mode highlights scores, strongest signals, penalties, verification, and branch/settlement rights. Raw preserves the exact candidate evaluation object.',
      data: item,
      visual: renderEvaluationVisual
    })).join('')}
  `;
}

function renderBranchArtifacts(state) {
  const run = state.latestRun;
  if (!run) {
    branchArtifactsEl.innerHTML = '<div class="card"><p class="meta">No remediation branch staged yet.</p></div>';
    return;
  }

  const branchFiles = run.branchArtifacts?.files || {};
  const artifactDefs = [
    {
      title: 'Asset pack lock',
      subtitle: '.engi/asset-pack.lock.json',
      data: run.assetPackLock,
      raw: branchFiles['.engi/asset-pack.lock.json'],
      visual: renderAssetPackVisual,
      accent: 'accent-green'
    },
    {
      title: 'Authorization decisions',
      subtitle: '.engi/authorization-decisions.json',
      data: run.authorizationDecisions,
      raw: branchFiles['.engi/authorization-decisions.json'],
      visual: renderAuthorizationVisual,
      accent: 'accent-orange'
    },
    {
      title: 'Sensitive data flow',
      subtitle: '.engi/sensitive-data-flow.json',
      data: run.sensitiveDataFlowRecords,
      raw: branchFiles['.engi/sensitive-data-flow.json'],
      visual: renderSensitiveFlowVisual,
      accent: 'accent-orange'
    },
    {
      title: 'Policy release',
      subtitle: '.engi/policy-release.json',
      data: run.policyRelease,
      raw: branchFiles['.engi/policy-release.json'],
      visual: renderPolicyReleaseVisual,
      accent: 'accent-purple'
    },
    {
      title: 'Unit catalog',
      subtitle: '.engi/unit-catalog.json',
      data: run.unitCatalog,
      raw: branchFiles['.engi/unit-catalog.json'],
      visual: renderUnitCatalogVisual,
      accent: 'accent-slate'
    },
    {
      title: 'Pipeline telemetry',
      subtitle: '.engi/pipeline-telemetry.json',
      data: run.pipelineTelemetry,
      raw: branchFiles['.engi/pipeline-telemetry.json'],
      visual: renderTelemetryVisual,
      accent: 'accent-slate'
    },
    {
      title: 'Selected source material manifest',
      subtitle: '.engi/selected-source-material.json',
      data: tryParseJson(branchFiles['.engi/selected-source-material.json']) || run.selectedSourceMaterialManifest || {},
      raw: branchFiles['.engi/selected-source-material.json'],
      visual: surfaceVisualFallback
    },
    {
      title: 'Deliverables manifest',
      subtitle: '.engi/deliverables.json',
      data: run.deliverablesManifest,
      raw: branchFiles['.engi/deliverables.json'],
      visual: surfaceVisualFallback
    },
    {
      title: 'Branch file inventory',
      subtitle: 'Materialized artifact paths',
      data: Object.keys(branchFiles),
      raw: JSON.stringify(Object.keys(branchFiles), null, 2),
      visual: (items) => `<div class="badge-row">${items.map((item) => `<span class="badge">${escapeHtml(item)}</span>`).join(' ')}</div>`
    }
  ];

  branchArtifactsEl.innerHTML = `
    <div class="card intro-card">
      <div class="row wrap-gap">
        <strong>${escapeHtml(run.branchArtifacts.branchName)}</strong>
        <div class="badge-row">
          ${statusBadge(run.branchMode)}
          ${statusBadge(run.needLifecycle)}
          <span class="badge private">${escapeHtml(run.branchArtifacts.confidentiality)}</span>
        </div>
      </div>
      <p class="meta">This is the artifact-heavy heart of the V7 demo. Every JSON artifact card below now shares the same Visual|Raw switch so the operator can stay in narrative mode until they want exact bytes.</p>
    </div>
    ${artifactDefs.map((artifact) => renderJsonSurface({
      title: artifact.title,
      subtitle: artifact.subtitle,
      eyebrow: 'Branch artifact',
      help: 'Visual mode is tuned for demo readability; Raw preserves the exact artifact JSON.',
      data: artifact.data,
      raw: artifact.raw,
      visual: artifact.visual,
      accent: artifact.accent || ''
    })).join('')}
    <div class="card">
      <div class="section-head"><h3>Materialized markdown artifacts</h3><span class="badge">Non-JSON reference</span></div>
      ${detailsSection('ENGI_NEED.md', `<pre>${escapeHtml(branchFiles['ENGI_NEED.md'] || '')}</pre>`, true)}
      ${Object.entries(branchFiles).filter(([path]) => path.startsWith('.engi/source-material/')).map(([path, content]) => detailsSection(path, `<pre>${escapeHtml(content)}</pre>`)).join('')}
    </div>
  `;
}

function renderSettlement(state) {
  const run = state.latestRun;
  if (!run) {
    settlementEl.innerHTML = '<div class="card"><p class="meta">No settlement has executed yet.</p></div>';
    return;
  }

  const branchFiles = run.branchArtifacts?.files || {};

  settlementEl.innerHTML = [
    renderJsonSurface({
      title: 'Settlement preview',
      subtitle: '.engi/settlement-preview.json',
      eyebrow: 'Settlement artifact',
      help: 'Visual mode calls out bundle identity, lock binding, participating assets, and allocation preview.',
      data: run.settlementPreview,
      raw: branchFiles['.engi/settlement-preview.json'],
      visual: renderSettlementPreviewVisual,
      accent: 'accent-green'
    }),
    renderJsonSurface({
      title: 'Journal diff',
      subtitle: '.engi/journal-diff.json',
      eyebrow: 'Accounting artifact',
      help: 'The visual read emphasizes exact accounting invariants and the debit/credit structure before you dive into raw JSON.',
      data: run.journalDiff,
      raw: branchFiles['.engi/journal-diff.json'],
      visual: renderJournalDiffVisual,
      accent: 'accent-green'
    }),
    renderJsonSurface({
      title: 'Settlement proof',
      subtitle: '.engi/settlement-proof.json',
      eyebrow: 'Proof artifact',
      data: tryParseJson(branchFiles['.engi/settlement-proof.json']) || run.systemProofBundle?.settlementProof || {},
      raw: branchFiles['.engi/settlement-proof.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    }),
    renderJsonSurface({
      title: 'System proof bundle',
      subtitle: '.engi/system-proof-bundle.json',
      eyebrow: 'Proof bundle',
      help: 'Visual mode summarizes selection, authorization, disclosure, and settlement closure without hiding the exact proof graph.',
      data: run.systemProofBundle,
      raw: branchFiles['.engi/system-proof-bundle.json'],
      visual: renderSystemProofBundleVisual,
      accent: 'accent-purple'
    }),
    renderJsonSurface({
      title: 'Bounded public proof',
      subtitle: 'Redacted proof surface',
      eyebrow: 'Public proof metadata',
      data: run.boundedPublicProof,
      visual: renderBoundedProofVisual,
      accent: 'accent-slate'
    })
  ].join('');
}

function renderLedger(state) {
  ledgerEl.innerHTML = `
    ${renderJsonSurface({
      title: 'Ledger accounts',
      subtitle: 'Current balances after the latest settlement',
      eyebrow: 'Ledger surface',
      data: state.ledger.accounts,
      visual: renderLedgerAccountsVisual,
      accent: 'accent-slate'
    })}
    ${renderJsonSurface({
      title: 'Run history',
      subtitle: 'Public projection of prior runs',
      eyebrow: 'History surface',
      data: state.runHistory,
      visual: renderRunHistoryVisual,
      accent: 'accent-slate'
    })}
  `;
}

async function refresh() {
  surfaceCounter = 0;
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

document.addEventListener('click', (event) => {
  const toggle = event.target.closest('.surface-mode-button');
  if (!toggle) return;
  const target = document.getElementById(toggle.dataset.surfaceTarget);
  if (!target) return;
  const mode = toggle.dataset.mode;
  target.dataset.mode = mode;
  target.querySelectorAll('.surface-panel').forEach((panel) => {
    panel.classList.toggle('active', panel.classList.contains(`surface-panel-${mode}`));
  });
  toggle.parentElement.querySelectorAll('.surface-mode-button').forEach((button) => {
    button.classList.toggle('active', button === toggle);
  });
});

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
    setStatus('Demo reset to seeded Spec V7 scenario.');
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
  setStatus('Ready. Run “Make ENGI branch” to execute the full Spec V7 prototype flow. Artifact surfaces default to Visual mode and can flip to Raw JSON at any time.');
}).catch((error) => {
  document.body.innerHTML = `<pre>${escapeHtml(error.message)}</pre>`;
});
