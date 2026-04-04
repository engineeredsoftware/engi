const summaryEl = document.getElementById('summary');
const scenarioEl = document.getElementById('scenario');
const assetsEl = document.getElementById('assets');
const evaluationsEl = document.getElementById('evaluations');
const branchArtifactsEl = document.getElementById('branchArtifacts');
const settlementEl = document.getElementById('settlement');
const ledgerEl = document.getElementById('ledger');
const statusEl = document.getElementById('status');
const scenarioPickerEl = document.getElementById('scenarioPicker');
const authSessionPickerEl = document.getElementById('authSessionPicker');
const inventorySearchInputEl = document.getElementById('inventorySearchInput');
const inventoryKindFilterEl = document.getElementById('inventoryKindFilter');
const repoInventoryListEl = document.getElementById('repoInventoryList');
const inventorySelectionSummaryEl = document.getElementById('inventorySelectionSummary');

const DEFAULT_SURFACE_MODE = 'visual';
let surfaceCounter = 0;
let selectedScenarioId = '';
let selectedAuthSessionId = '';
let selectedInventoryEntryIds = new Set();
let inventorySearchTerm = '';
let selectedInventoryKind = 'all';
let lastLoadedState = null;

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

function countValues(items = []) {
  return items.reduce((acc, item) => {
    const key = String(item ?? '').trim();
    if (!key) return acc;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function formatCountMap(counts = {}, fallback = 'None') {
  const entries = Object.entries(counts);
  return entries.length
    ? entries.map(([key, value]) => `${escapeHtml(key)} (${escapeHtml(value)})`).join(' • ')
    : `<span class="meta">${fallback}</span>`;
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

function syncScenarioPicker(state) {
  const scenarios = state.needScenarios || [];
  if (!scenarios.length || !scenarioPickerEl) return;
  const desiredScenarioId = state.latestRun?.scenarioId || selectedScenarioId || scenarios[0].scenarioId;
  if (scenarioPickerEl.options.length !== scenarios.length) {
    scenarioPickerEl.innerHTML = scenarios.map((scenario) => `
      <option value="${escapeHtml(scenario.scenarioId)}">${escapeHtml(`${scenario.scenarioFamily} · ${scenario.repo}`)}</option>
    `).join('');
  }
  scenarioPickerEl.value = scenarios.some((scenario) => scenario.scenarioId === desiredScenarioId)
    ? desiredScenarioId
    : scenarios[0].scenarioId;
  selectedScenarioId = scenarioPickerEl.value;
}

function currentScenario(state) {
  const scenarios = state.needScenarios || [];
  return scenarios.find((scenario) => scenario.scenarioId === (selectedScenarioId || scenarioPickerEl?.value)) || scenarios[0] || null;
}

function syncAuthSessionPicker(state) {
  const sessions = state.githubAppSessions || [];
  if (!authSessionPickerEl || !sessions.length) return;
  const scenario = currentScenario(state);
  const scenarioSession = sessions.find((session) => session.repo === scenario?.repo);
  const desiredAuthSessionId = state.latestRun?.buyer?.installationId
    ? sessions.find((session) => session.installationId === state.latestRun.buyer.installationId && session.repo === state.latestRun.buyer.repo)?.authSessionId
    : selectedAuthSessionId || scenarioSession?.authSessionId || sessions[0].authSessionId;
  if (authSessionPickerEl.options.length !== sessions.length) {
    authSessionPickerEl.innerHTML = sessions.map((session) => `
      <option value="${escapeHtml(session.authSessionId)}">${escapeHtml(`${session.repo} · ${session.installationId}`)}</option>
    `).join('');
  }
  authSessionPickerEl.value = sessions.some((session) => session.authSessionId === desiredAuthSessionId)
    ? desiredAuthSessionId
    : sessions[0].authSessionId;
  selectedAuthSessionId = authSessionPickerEl.value;
  const activeSession = sessions.find((session) => session.authSessionId === selectedAuthSessionId);
  const validEntryIds = new Set((state.repoArtifactInventory || [])
    .filter((entry) => entry.repo === activeSession?.repo)
    .map((entry) => entry.inventoryEntryId));
  selectedInventoryEntryIds = new Set([...selectedInventoryEntryIds].filter((entryId) => validEntryIds.has(entryId)));
}

function activeAuthSession(state) {
  const sessions = state.githubAppSessions || [];
  return sessions.find((session) => session.authSessionId === selectedAuthSessionId) || sessions[0] || null;
}

function activeInventoryEntries(state) {
  const session = activeAuthSession(state);
  const entries = state.repoArtifactInventory || [];
  return session ? entries.filter((entry) => entry.repo === session.repo) : entries;
}

function syncInventoryKindFilter(state) {
  if (!inventoryKindFilterEl) return;
  const kinds = ['all', ...new Set(activeInventoryEntries(state).map((entry) => entry.artifactKind))];
  if (inventoryKindFilterEl.options.length !== kinds.length) {
    inventoryKindFilterEl.innerHTML = kinds.map((kind) => `<option value="${escapeHtml(kind)}">${escapeHtml(kind === 'all' ? 'All artifact kinds' : labelize(kind))}</option>`).join('');
  }
  inventoryKindFilterEl.value = kinds.includes(selectedInventoryKind) ? selectedInventoryKind : 'all';
  selectedInventoryKind = inventoryKindFilterEl.value;
}

function filteredInventoryEntries(state) {
  const search = inventorySearchTerm.trim().toLowerCase();
  return activeInventoryEntries(state).filter((entry) => {
    if (selectedInventoryKind !== 'all' && entry.artifactKind !== selectedInventoryKind) return false;
    if (!search) return true;
    const haystack = [
      entry.title,
      entry.summary,
      entry.sourcePath,
      ...(entry.sourcePaths || []),
      entry.workflowRunId,
      entry.workflowPath,
      entry.artifactName,
      ...(entry.tags || [])
    ].join(' ').toLowerCase();
    return haystack.includes(search);
  });
}

function renderInventorySelectionSummary(state) {
  if (!inventorySelectionSummaryEl) return;
  const session = activeAuthSession(state);
  const selectedEntries = activeInventoryEntries(state).filter((entry) => selectedInventoryEntryIds.has(entry.inventoryEntryId));
  const artifactKindCounts = countValues(selectedEntries.map((entry) => entry.artifactKind));
  const originKindCounts = countValues(selectedEntries.map((entry) => entry.originKind));
  inventorySelectionSummaryEl.innerHTML = session ? `
    <strong>${escapeHtml(session.repo)}</strong>
    <span class="meta">GitHub App ${escapeHtml(session.appSlug)} · installation ${escapeHtml(session.installationId)} · account ${escapeHtml(session.installationAccountLogin)}</span>
    <div class="kv-grid">
      ${kvRow('Auth session', session.authSessionId)}
      ${kvRow('Repository ID', session.repositoryId)}
      ${kvRow('Account ID', session.installationAccountId || '—')}
      ${kvRow('Permissions root', session.permissionsRoot || '—')}
      ${kvRow('Token boundary', session.tokenBoundary?.mintingState || '—')}
      ${kvRow('Writable scopes', formatList(session.tokenBoundary?.writableScopes || []), { html: true })}
    </div>
    <span class="meta">Selected ${selectedEntries.length} inventory ${selectedEntries.length === 1 ? 'artifact' : 'artifacts'}.</span>
    <span class="meta">Artifact kinds: ${formatCountMap(artifactKindCounts)}</span>
    <span class="meta">Origin kinds: ${formatCountMap(originKindCounts)}</span>
  ` : '<span class="meta">No authenticated repo session available.</span>';
}

function renderRepoInventory(state) {
  if (!repoInventoryListEl) return;
  const entries = filteredInventoryEntries(state);
  if (!entries.length) {
    repoInventoryListEl.innerHTML = '<div class="card"><p class="meta">No repo artifacts match the current session/filter.</p></div>';
    renderInventorySelectionSummary(state);
    return;
  }
  repoInventoryListEl.innerHTML = entries.map((entry) => {
    const selected = selectedInventoryEntryIds.has(entry.inventoryEntryId);
    return `
      <button type="button" class="inventory-card ${selected ? 'selected' : ''}" data-inventory-entry-id="${escapeHtml(entry.inventoryEntryId)}">
        <div class="row wrap-gap">
          <div>
            <strong>${escapeHtml(entry.title)}</strong>
            <p class="meta">${escapeHtml(entry.originKind)} · ${escapeHtml(entry.artifactKind)} · ${escapeHtml(entry.artifactType)}</p>
          </div>
          <div class="badge-row">
            <span class="badge ${selected ? 'private' : ''}">${selected ? 'Selected' : 'Select'}</span>
            <span class="badge">${escapeHtml(entry.workflowRunId || entry.sourcePath || entry.artifactName || 'repo artifact')}</span>
          </div>
        </div>
        <p>${escapeHtml(entry.summary)}</p>
        <div class="badge-row">
          ${chipList(entry.tags || [])}
        </div>
        <div class="kv-grid">
          ${kvRow('Selection label', entry.provenance?.selectionLabel || '—')}
          ${kvRow('Address', formatList([entry.sourcePath, ...(entry.sourcePaths || []).filter((path) => path !== entry.sourcePath), entry.artifactName, entry.workflowRunId].filter(Boolean)), { html: true })}
          ${kvRow('Addressing scope', entry.addressing?.addressingScope || '—')}
          ${kvRow('Content root', entry.contentRoot || '—')}
          ${kvRow('Stacks', formatList(entry.declaredStacks || []), { html: true })}
          ${kvRow('Constraints', formatList(entry.declaredConstraints || []), { html: true })}
          ${kvRow('Signer', entry.signerAddress || '—')}
          ${kvRow('Auth session', entry.authSessionId || '—')}
          ${kvRow('Installation ID', entry.installationId || '—')}
        </div>
      </button>
    `;
  }).join('');
  renderInventorySelectionSummary(state);
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

function renderPromptSurfaceCollectionVisual(promptSurfaces = []) {
  return `
    <div class="visual-stack">
      <div class="mini-grid three-up compact-metrics">
        ${metricTile('Prompt templates', promptSurfaces.length)}
        ${metricTile('Output fields', new Set(promptSurfaces.flatMap((surface) => surface.lineage?.outputFields || [])).size)}
        ${metricTile('Downstream artifacts', new Set(promptSurfaces.flatMap((surface) => surface.lineage?.downstreamArtifacts || [])).size)}
      </div>
      <div class="object-list">
        ${promptSurfaces.map((surface) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <div>
                <strong>${escapeHtml(surface.promptId || 'Prompt')}</strong>
                <p class="meta">${escapeHtml(surface.purpose || '')}</p>
              </div>
              <div class="badge-row">${statusBadge(surface.evaluatorSurface?.mode || 'inferred')} ${statusBadge(surface.templateVersion || 'template')}</div>
            </div>
            <div class="callout">
              <strong>Interpolated prompt</strong>
              <pre>${escapeHtml(surface.interpolatedPrompt || '')}</pre>
            </div>
            <div class="mini-grid two-up">
              <div class="section-card">
                <div class="section-head"><h4>Context lineage</h4><span class="badge">${(surface.contextInputs || []).length} inputs</span></div>
                <div class="object-list nested">
                  ${(surface.contextInputs || []).map((input) => `
                    <div class="mini-card">
                      <strong>${escapeHtml(input.field || 'field')}</strong>
                      <p class="meta wrap-anywhere">${escapeHtml(input.source || 'source')}</p>
                      <p>${escapeHtml(Array.isArray(input.value) ? input.value.join(' • ') : input.value ?? '—')}</p>
                      <p class="meta wrap-anywhere">Refs: ${escapeHtml((input.evidenceRefs || []).join(' • ') || '—')}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
              <div class="section-card">
                <div class="section-head"><h4>Downstream lineage</h4><span class="badge">Output binding</span></div>
                <div class="kv-grid">
                  ${kvRow('Output fields', formatList(surface.lineage?.outputFields || []), { html: true })}
                  ${kvRow('Downstream artifacts', formatList(surface.lineage?.downstreamArtifacts || []), { html: true })}
                  ${kvRow('Evidence refs', formatList(surface.lineage?.evidenceRefs || []), { html: true })}
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderExternalBoundaryManifestVisual(manifest) {
  const interfaces = manifest?.interfaces || [];
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Boundary interfaces', interfaces.length)}
        ${metricTile('Modeled local', interfaces.filter((entry) => /modeled|local/i.test(entry.status || '')).length)}
        ${metricTile('Stand-in local', interfaces.filter((entry) => /stand-in/i.test(entry.status || '')).length)}
        ${metricTile('Live external required', interfaces.filter((entry) => entry.profileB?.requiredForLive).length)}
      </div>
      <div class="object-list">
        ${interfaces.map((entry) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <div>
                <strong>${escapeHtml(entry.label || entry.interfaceId)}</strong>
                <p class="meta">${escapeHtml(entry.interfaceId || '')}</p>
              </div>
              <div class="badge-row">${statusBadge(entry.status)} ${boolBadge(entry.profileB?.requiredForLive, 'Required live', 'Optional')}</div>
            </div>
            <div class="mini-grid two-up">
              <div class="section-card">
                <div class="section-head"><h4>Profile A</h4><span class="badge">Implemented here</span></div>
                <div class="kv-grid">
                  ${kvRow('Surface', entry.profileA?.surface || '—')}
                  ${kvRow('Artifact refs', formatList(entry.profileA?.artifactRefs || []), { html: true })}
                </div>
              </div>
              <div class="section-card">
                <div class="section-head"><h4>Profile B</h4><span class="badge">External boundary</span></div>
                <div class="kv-grid">
                  ${kvRow('Contract', formatList(entry.profileB?.contract || []), { html: true })}
                  ${kvRow('Boundary artifacts', formatList(entry.profileB?.boundaryArtifacts || []), { html: true })}
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderIdentityBindingsVisual(bindings = []) {
  const classCounts = countValues(bindings.map((binding) => binding.principalClass));
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Bindings', bindings.length)}
        ${metricTile('Issuer principals', classCounts['issuer-principal'] || 0)}
        ${metricTile('GitHub sessions', classCounts['github-app-session-principal'] || 0)}
        ${metricTile('Installations', classCounts['github-app-installation-principal'] || 0)}
      </div>
      <div class="object-list">
        ${bindings.map((binding) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <div>
                <strong>${escapeHtml(binding.principalId || 'principal')}</strong>
                <p class="meta">${escapeHtml(binding.principalClass || 'unknown')}</p>
              </div>
              <div class="badge-row">${statusBadge(binding.authSource)} <span class="badge">${escapeHtml(binding.bindingRoot || '—')}</span></div>
            </div>
            <div class="kv-grid">
              ${kvRow('Bound refs', formatList(binding.boundRefs || []), { html: true })}
              ${kvRow('Selection refs', formatList(binding.selectedInventoryEntryIds || []), { html: true })}
              ${kvRow('Surface roots', formatList(Object.entries(binding.surfaceRoots || {}).filter(([, value]) => value).map(([key, value]) => `${key}:${value}`)), { html: true })}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderGitHubBoundaryVisual(surface) {
  const selectedAuthSessions = surface?.selectedAuthSessions || [];
  const selectedInventoryProofs = surface?.selectedInventoryProofs || [];
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Selected auth sessions', selectedAuthSessions.length)}
        ${metricTile('Selected assets', selectedInventoryProofs.length)}
        ${metricTile('Buyer installation', surface?.modeledBindings?.buyerInstallationId || '—')}
        ${metricTile('Required auth fields', (surface?.authPayloadShape?.requiredFields || []).length)}
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>Buyer binding</h4><span class="badge">Repo boundary</span></div>
          <div class="kv-grid">
            ${kvRow('Repo', surface?.modeledBindings?.repo || '—')}
            ${kvRow('Repository ID', surface?.modeledBindings?.repositoryId || '—')}
            ${kvRow('Benchmark run', surface?.modeledBindings?.benchmarkRunId || '—')}
            ${kvRow('Workflow path', surface?.modeledBindings?.benchmarkWorkflowPath || '—')}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>Auth payload shape</h4><span class="badge">Modeled only</span></div>
          <div class="kv-grid">
            ${kvRow('Mechanism', surface?.authPayloadShape?.authMechanism || '—')}
            ${kvRow('Selection', surface?.authPayloadShape?.repositorySelection || '—')}
            ${kvRow('Required fields', formatList(surface?.authPayloadShape?.requiredFields || []), { html: true })}
          </div>
        </div>
      </div>
      <div class="object-list">
        ${selectedAuthSessions.map((session) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <div>
                <strong>${escapeHtml(session.authSessionId || 'session')}</strong>
                <p class="meta">${escapeHtml(session.repo || '')}</p>
              </div>
              <div class="badge-row"><span class="badge">${escapeHtml(session.installationId || '—')}</span><span class="badge">${escapeHtml(session.tokenBoundary?.mintingState || '—')}</span></div>
            </div>
            <div class="kv-grid">
              ${kvRow('Account', session.installationAccountLogin || '—')}
              ${kvRow('Repository ID', session.repositoryId || '—')}
              ${kvRow('Permissions root', session.permissionsRoot || '—')}
              ${kvRow('Auth payload hash', session.authPayloadHash || '—')}
            </div>
          </div>
        `).join('')}
      </div>
      <div class="object-list">
        ${selectedInventoryProofs.map((proof) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <div>
                <strong>${escapeHtml(proof.assetId || 'asset')}</strong>
                <p class="meta">${escapeHtml(proof.selectionLabel || '')}</p>
              </div>
              <div class="badge-row"><span class="badge">${escapeHtml(proof.selectedInventoryRoot || '—')}</span></div>
            </div>
            <div class="kv-grid">
              ${kvRow('Inventory refs', formatList((proof.selectedInventoryEntries || []).map((entry) => `${entry.inventoryEntryId}:${entry.primaryAddressRef}`)), { html: true })}
              ${kvRow('Addressing root', proof.addressingRoot || '—')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderArtifactUploadManifestVisual(manifest) {
  const uploads = manifest?.uploads || [];
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Uploads', manifest?.uploadCount ?? uploads.length)}
        ${metricTile('Inventory-backed', manifest?.inventoryBackedUploadCount ?? uploads.filter((upload) => (upload.artifactSelectionSurface?.selectedInventoryEntryIds || []).length > 0).length)}
        ${metricTile('Artifact kinds', Object.keys(manifest?.artifactKindCounts || {}).length)}
        ${metricTile('Selection roots', uploads.filter((upload) => upload.selectionRoot).length)}
      </div>
      <div class="callout">
        <strong>Artifact-kind coverage</strong>
        <span>${formatCountMap(manifest?.artifactKindCounts || {})}</span>
      </div>
      <div class="object-list">
        ${uploads.map((upload) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <div>
                <strong>${escapeHtml(upload.title || upload.assetId)}</strong>
                <p class="meta">${escapeHtml(upload.artifactKind || '')} · ${escapeHtml(upload.artifactType || '')}</p>
              </div>
              <div class="badge-row"><span class="badge">${escapeHtml(upload.selectionRoot || 'raw-fallback')}</span></div>
            </div>
            <div class="kv-grid">
              ${kvRow('Inventory refs', formatList(upload.artifactSelectionSurface?.selectedInventoryEntryIds || []), { html: true })}
              ${kvRow('Addressing root', upload.addressingRoot || '—')}
              ${kvRow('Auth payload hash', upload.authPayloadHash || '—')}
              ${kvRow('Signing payload hash', upload.signingSurface?.payloadHash || '—')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderSelectedSourceMaterialManifestVisual(manifest) {
  const selectedSourceMaterial = manifest?.selectedSourceMaterial || [];
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Selected assets', selectedSourceMaterial.length)}
        ${metricTile('Branch mode', manifest?.branchMode || '—')}
        ${metricTile('Inventory-backed', selectedSourceMaterial.filter((entry) => (entry.selectedInventoryEntryIds || []).length > 0).length)}
        ${metricTile('Units', selectedSourceMaterial.reduce((sum, entry) => sum + (entry.selectedUnits || []).length, 0))}
      </div>
      <div class="object-list">
        ${selectedSourceMaterial.map((entry) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <div>
                <strong>${escapeHtml(entry.title || entry.assetId)}</strong>
                <p class="meta">${escapeHtml(entry.useTier || '')} · ${escapeHtml(entry.artifactKind || '')}</p>
              </div>
              <div class="badge-row"><span class="badge">${escapeHtml(entry.selectionRoot || '—')}</span></div>
            </div>
            <div class="kv-grid">
              ${kvRow('Selection label', entry.selectionLabel || '—')}
              ${kvRow('Inventory refs', formatList(entry.selectedInventoryEntryIds || []), { html: true })}
              ${kvRow('Addressing root', entry.addressingRoot || '—')}
              ${kvRow('Auth payload hash', entry.authPayloadHash || '—')}
              ${kvRow('Signing payload hash', entry.signingPayloadHash || '—')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderProfileCompositionVisual(profileState) {
  const profiles = profileState?.profiles || profileState?.profileCompositions?.profiles || [];
  const guidance = profileState?.demoOperatorGuidance || {};
  return `
    <div class="visual-stack">
      <div class="callout">
        <strong>Profile switching semantics</strong>
        <span>${escapeHtml(guidance.audienceMeaning || profileState?.profiles?.find?.((entry) => entry.profileId === 'B')?.whyNotSwitchable || 'Profile A is demo-active; Profile B is described but not switchable here because external integrations are not faked.')}</span>
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>Operator walkthrough</h4><span class="badge">Demo script</span></div>
          <div class="badge-row">${chipList(guidance.recommendedWalkthrough || [])}</div>
          ${guidance.whyOnlyAIsLive ? `<p class="meta">${escapeHtml(guidance.whyOnlyAIsLive)}</p>` : ''}
        </div>
        <div class="section-card">
          <div class="section-head"><h4>Audience takeaway</h4><span class="badge">What profiles mean</span></div>
          <p>${escapeHtml(guidance.audienceMeaning || '—')}</p>
        </div>
      </div>
      <div class="mini-grid two-up">
        ${profiles.map((profile) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <strong>${escapeHtml(profile.label || profile.profileId)}</strong>
              <div class="badge-row">${statusBadge(profile.profileId === 'A' ? 'active in demo' : 'external boundary')} ${boolBadge(profile.switchableInDemo, 'Switchable', 'Not switchable')}</div>
            </div>
            <div class="kv-grid">
              ${kvRow('Who this is', profile.identity?.whoItIs || '—')}
              ${kvRow('How to demonstrate', profile.identity?.operatorRole || '—')}
              ${kvRow('Audience should understand', profile.identity?.audienceMeaning || '—')}
              ${kvRow('Composition', formatList(profile.composition || []), { html: true })}
              ${kvRow('External writes', boolBadge(profile.metadata?.externalWrites, 'Yes', 'No'), { html: true })}
              ${kvRow('GitHub live calls', boolBadge(profile.metadata?.githubLiveCalls, 'Yes', 'No'), { html: true })}
              ${kvRow('Settlement mode', profile.metadata?.settlementMode || '—')}
              ${kvRow('Model execution', profile.metadata?.modelExecution || '—')}
            </div>
            ${profile.whyNotSwitchable ? `<p class="meta">${escapeHtml(profile.whyNotSwitchable)}</p>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderScoreGroupVisual(group, tone = '') {
  const accumulation = group?.accumulation || [];
  const sequence = group?.sequence || [];
  return `
    <div class="section-card ${tone}">
      <div class="row wrap-gap">
        <strong>${escapeHtml(labelize(group?.groupId || 'score-group'))}</strong>
        <div class="badge-row"><span class="badge">final ${escapeHtml(Number(group?.finalScore || 0).toFixed(3))}</span><span class="badge">${escapeHtml(formatCount(sequence.length, 'step'))}</span></div>
      </div>
      <div class="detail-table">
        ${sequence.map((step) => `
          <div class="detail-row">
            <span class="meta">${escapeHtml(step.step)}</span>
            <strong>${escapeHtml(step.label)}</strong>
            <span>${escapeHtml(Number(step.value || 0).toFixed(3))}</span>
            <span class="meta wrap-anywhere">${escapeHtml((step.refs || []).slice(0, 4).join(' • ') || '—')}</span>
          </div>
        `).join('')}
      </div>
      ${accumulation.length ? `<div class="detail-block"><summary>Accumulation</summary><div class="detail-table">${accumulation.map((step) => `<div class="detail-row"><span class="meta">${escapeHtml(step.label || step.code)}</span><strong>${escapeHtml(step.contribution ?? step.mass ?? '—')}</strong><span>cum ${escapeHtml(step.cumulative ?? '—')}</span><span class="meta">${escapeHtml(step.weight != null ? `weight ${step.weight}` : 'penalty')}</span></div>`).join('')}</div></div>` : ''}
      <div class="kv-grid">${Object.entries(group?.verifiedInputs || {}).slice(0, 6).map(([key, value]) => kvRow(labelize(key), Array.isArray(value) ? formatList(value.slice(0, 6), 'None') : value, { html: Array.isArray(value) })).join('')}</div>
    </div>
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
                <p class="meta wrap-anywhere">${escapeHtml(spec.source || 'derived')}</p>
                ${spec.policy ? `<p>${escapeHtml(spec.policy)}</p>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </div>
      <div class="section-card">
        <div class="section-head"><h4>Recall channels + hand-offs</h4><span class="badge">V8 contracts</span></div>
        <div class="detail-table">
          ${(need.recallChannelContracts || []).map((channel) => `
            <div class="detail-row">
              <strong>${escapeHtml(channel.channelId)}</strong>
              <span>${escapeHtml(channel.signalFamily)}</span>
              <span class="meta wrap-anywhere">${escapeHtml(channel.searchedBy || '—')}</span>
              <span class="meta wrap-anywhere">${escapeHtml((channel.downstreamUses || []).join(' • '))}</span>
            </div>
          `).join('')}
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
          <p class="meta">${escapeHtml(asset.author)} · ${escapeHtml(asset.artifactKind)} · ${escapeHtml(asset.artifactType || 'untyped')}</p>
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
            ${kvRow('Upload kind/type', `${escapeHtml(asset.uploadSurface?.artifactKind || asset.artifactKind)} / ${escapeHtml(asset.uploadSurface?.artifactType || asset.artifactType || '—')}`, { html: true })}
            ${kvRow('Upload surfaces', formatList((asset.uploadSurface?.surfaces || []).map((surface) => `${surface.role}:${surface.surfaceId}`), 'None'), { html: true })}
          </div>
        </div>
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>Artifact Selection</h4><span class="badge">V10 intake surface</span></div>
          <div class="kv-grid">
            ${kvRow('Intake mode', asset.artifactSelectionSurface?.intakeMode || '—')}
            ${kvRow('Selection label', asset.artifactSelectionSurface?.selectionLabel || '—')}
            ${kvRow('Auth session', asset.artifactSelectionSurface?.authSessionId || '—')}
            ${kvRow('Inventory refs', formatList(asset.artifactSelectionSurface?.selectedInventoryEntryIds || []), { html: true })}
            ${kvRow('Inventory root', asset.artifactSelectionSurface?.selectedInventoryRoot || '—')}
            ${kvRow('Artifact kind counts', formatCountMap(asset.artifactSelectionSurface?.selectedArtifactKindCounts || {}), { html: true })}
            ${kvRow('Origin kinds', formatList(asset.artifactSelectionSurface?.selectedOriginKinds || []), { html: true })}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>Addressing</h4><span class="badge">Explicit repo address</span></div>
          <div class="kv-grid">
            ${kvRow('Scope', asset.addressingSurface?.addressingScope || '—')}
            ${kvRow('Repo', asset.addressingSurface?.repo || asset.githubBoundary?.sourceRepo || '—')}
            ${kvRow('Repository ID', asset.addressingSurface?.repositoryId || '—')}
            ${kvRow('Primary address', asset.addressingSurface?.primaryAddressRef || '—')}
            ${kvRow('Ref / commit', [asset.addressingSurface?.ref, asset.addressingSurface?.commit].filter(Boolean).join(' @ ') || '—')}
            ${kvRow('Source paths', formatList(asset.addressingSurface?.sourcePaths || []), { html: true })}
            ${kvRow('Addressing root', asset.addressingSurface?.addressingRoot || '—')}
          </div>
        </div>
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>Signing</h4><span class="badge">Address separate from signing</span></div>
          <div class="kv-grid">
            ${kvRow('Signer address', asset.signingSurface?.signerAddress || asset.identitySurface?.signerAddress || '—')}
            ${kvRow('Algorithm', asset.signingSurface?.signingAlgorithm || '—')}
            ${kvRow('Key source', asset.signingSurface?.keySource || '—')}
            ${kvRow('Payload hash', asset.signingSurface?.payloadHash || '—')}
            ${kvRow('Signed addressing root', asset.signingSurface?.signedAddressingRoot || '—')}
            ${kvRow('Signed selection root', asset.signingSurface?.signedSelectionRoot || '—')}
            ${kvRow('Attestation hash', asset.signingSurface?.attestationHash || '—')}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>GitHub App Auth</h4><span class="badge">Installation-scoped</span></div>
          <div class="kv-grid">
            ${kvRow('Mechanism', asset.githubAppAuthSurface?.authMechanism || '—')}
            ${kvRow('Auth session', asset.githubAppAuthSurface?.authSessionId || '—')}
            ${kvRow('Installation ID', asset.githubAppAuthSurface?.installationId || '—')}
            ${kvRow('Account', asset.githubAppAuthSurface?.installationAccountLogin || '—')}
            ${kvRow('Account ID', asset.githubAppAuthSurface?.installationAccountId || '—')}
            ${kvRow('Repository ID', asset.githubAppAuthSurface?.repositoryId || '—')}
            ${kvRow('Permissions root', asset.githubAppAuthSurface?.permissionsRoot || '—')}
            ${kvRow('Auth payload hash', asset.githubAppAuthSurface?.authPayloadHash || '—')}
            ${kvRow('Token boundary', asset.githubAppAuthSurface?.tokenBoundary?.mintingState || '—')}
            ${kvRow('Permissions', formatList(Object.entries(asset.githubAppAuthSurface?.permissions || {}).map(([key, value]) => `${key}:${value}`)), { html: true })}
            ${kvRow('Profile A boundary', asset.githubAppAuthSurface?.profileABoundary || '—')}
            ${kvRow('Profile B boundary', asset.githubAppAuthSurface?.profileBBoundary || '—')}
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
  const strongestScoreDrivers = item.ranking?.explainability?.strongestScoreDrivers || [];
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
        <p>${escapeHtml((strongestScoreDrivers[0]?.label || 'Top driver') + (strongestScoreDrivers[0] ? `: ${strongestScoreDrivers[0].value}` : ''))}</p>
      </div>
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Need match', scoreBar(item.ranking.needMatch.finalScore), 'metric', { html: true })}
        ${metricTile('Benchmark impact', scoreBar(item.ranking.benchmarkImpact.finalScore), 'metric', { html: true })}
        ${metricTile('Actionability', scoreBar(item.ranking.actionability.finalScore), 'metric', { html: true })}
        ${metricTile('Penalty mass', scoreBar(item.ranking.penaltyMass || 0), penalties.length ? 'warn' : '', { html: true })}
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>Recall + strongest signals</h4><span class="badge">Why it ranked</span></div>
          <div class="kv-grid">
            ${kvRow('Recall score', item.recall?.recallScore ?? '—')}
            ${kvRow('Whole asset need score', item.ranking.wholeAssetNeedScore ?? '—')}
            ${kvRow('Recall channels', formatList((item.recall?.fusion?.contributingChannels || []).map((entry) => entry.channelId || entry)), { html: true })}
            ${kvRow('Artifact type', item.uploadSurface?.artifactType || item.artifactType || '—')}
          </div>
          <div class="badge-row">${strongestScoreDrivers.map((signal) => `<span class="badge">${escapeHtml(signal.label)} ${escapeHtml(signal.value)}</span>`).join(' ') || '<span class="meta">No strongest score drivers recorded.</span>'}</div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>Verification + rights</h4><span class="badge">Use-tier gate</span></div>
          <div class="kv-grid">
            ${kvRow('Proof logs', sufficiency.evidenceCoverage?.proofLogCount ?? '—')}
            ${kvRow('Benchmark bound to GitHub run', boolBadge(sufficiency.benchmarkEvidenceBoundToGitHubRun, 'Bound', 'Unbound'), { html: true })}
            ${kvRow('Recommended tier', statusBadge(sufficiency.recommendedUseTier), { html: true })}
            ${kvRow('Policy tier cap', statusBadge(verification.issuerPolicyStatus?.policyTierCap), { html: true })}
            ${kvRow('Branch materialization', boolBadge(rights.branchMaterializationAllowed, 'Allowed', 'Blocked'), { html: true })}
            ${kvRow('Settlement allowed', boolBadge(rights.settlementAllowed, 'Allowed', 'Blocked'), { html: true })}
          </div>
        </div>
      </div>
      <div class="mini-grid three-up">
        ${renderScoreGroupVisual(item.ranking.scoreGroups?.needMatch, 'accent-blue')}
        ${renderScoreGroupVisual(item.ranking.scoreGroups?.benchmarkImpact, 'accent-green')}
        ${renderScoreGroupVisual(item.ranking.scoreGroups?.penaltyMass, penalties.length ? 'accent-orange' : 'accent-slate')}
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
              ${kvRow('Verification receipts', formatCount((entry.receiptRefs || []).length, 'receipt'))}
              ${kvRow('Policy tier cap', statusBadge(entry.policyRestrictions?.policyTierCap || entry.issuerPolicyStatus?.policyTierCap), { html: true })}
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
  const selectedAssetIds = preview.selectedAssetIds || [];
  const participatingAssetIds = preview.settlementParticipatingAssetIds || [];
  const creditedAssetIds = preview.creditedAssetIds || [];
  const zeroCreditAssetIds = preview.zeroCreditAssetIds || [];
  const allocations = preview.allocations || [];
  return `
    <div class="visual-stack">
      <div class="highlight-card">
        <div class="row wrap-gap">
          <strong>${escapeHtml(preview.bundleId || 'Settlement preview')}</strong>
          <div class="badge-row">${statusBadge(preview.branchMode)} ${statusBadge(preview.assetPackLockHash ? 'asset-pack-lock bound' : 'unbound')}</div>
        </div>
        <p class="meta">Need ${escapeHtml(preview.needId || '—')} · ${formatCount(participatingAssetIds.length, 'participating asset')} · ${formatCount(creditedAssetIds.length, 'credited asset')}</p>
      </div>
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Metered micro-units', preview.meteredMicroUnits || '—')}
        ${metricTile('Selected branch assets', selectedAssetIds.length)}
        ${metricTile('Settlement participants', participatingAssetIds.length)}
        ${metricTile('Credited assets', creditedAssetIds.length)}
        ${metricTile('Zero-credit participants', zeroCreditAssetIds.length, zeroCreditAssetIds.length ? 'warn' : '')}
      </div>
      <div class="mini-grid three-up compact-metrics">
        ${metricTile('Preview allocations', allocations.length)}
        ${metricTile('Lock hash', preview.assetPackLockHash ? truncate(preview.assetPackLockHash, 18) : '—')}
        ${metricTile('Branch mode', preview.branchMode || '—')}
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>Selection semantics</h4><span class="badge">Branch vs settlement</span></div>
          <div class="kv-grid">
            ${kvRow('Selected branch assets', formatList(selectedAssetIds), { html: true })}
            ${kvRow('Settlement participants', formatList(participatingAssetIds), { html: true })}
            ${kvRow('Credited settlement assets', formatList(creditedAssetIds), { html: true })}
            ${kvRow('Zero-credit participants', formatList(zeroCreditAssetIds, 'None'), { html: true })}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>Operator meaning</h4><span class="badge">Intentional distinction</span></div>
          <p>${escapeHtml(preview.semanticsNote || 'Selected assets, settlement participants, and credited assets can differ.')}</p>
        </div>
      </div>
      <div class="section-card">
        <div class="section-head"><h4>Allocation preview</h4><span class="badge">Bundle shares</span></div>
        <div class="object-list nested">
          ${allocations.map((allocation) => `
            <div class="mini-card">
              <div class="row wrap-gap">
                <strong>${escapeHtml(allocation.title || allocation.assetId || 'Asset')}</strong>
                <div class="badge-row">
                  <span class="badge">${escapeHtml(allocation.settledShareBp ?? allocation.shareBp ?? '—')} bp</span>
                  ${statusBadge(allocation.creditedMicroUnits === '0' ? 'zero credited units' : 'credited')}
                </div>
              </div>
              <p class="meta wrap-anywhere">${escapeHtml(allocation.assetId || '')}</p>
              <div class="kv-grid">
                ${kvRow('Use tier', allocation.useTier || '—')}
                ${kvRow('Credited micro-units', allocation.creditedMicroUnits || '0')}
              </div>
              <p class="meta">${escapeHtml((allocation.rationale || []).join(' • '))}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderSourceToSharesVisual(sourceToShares) {
  const entries = sourceToShares?.sourceContributionEntries || [];
  const normalizationLedger = sourceToShares?.normalizationLedger || [];
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Contribution entries', entries.length)}
        ${metricTile('Bundle share score', sourceToShares?.bundleShareScore?.bundleShareScore || '—')}
        ${metricTile('Normalization', sourceToShares?.basisPointNormalization?.method || '—')}
        ${metricTile('Tie-break order', (sourceToShares?.basisPointNormalization?.remainderDistributionOrder || []).length)}
      </div>
      <div class="section-card">
        <div class="section-head"><h4>Contribution basis</h4><span class="badge">Source to shares</span></div>
        <div class="object-list nested">
          ${entries.map((entry) => `
            <div class="mini-card">
              <div class="row wrap-gap">
                <strong>${escapeHtml(entry.title || entry.assetId || 'Asset')}</strong>
                <div class="badge-row">
                  <span class="badge">${escapeHtml(`${entry.rawShareBp ?? 0} bp`)}</span>
                  ${statusBadge(entry.clipped ? 'clipped to zero' : 'positive contribution')}
                </div>
              </div>
              <p class="meta wrap-anywhere">${escapeHtml(entry.assetId || '')}</p>
              <div class="kv-grid">
                ${kvRow('Raw contribution units', entry.rawContributionUnits || '0')}
                ${kvRow('Clipped contribution units', entry.clippedContributionUnits || '0')}
                ${kvRow('Clipping receipt', entry.clippingReceiptId || '—')}
                ${kvRow('Selected unit refs', formatList(entry.selectedUnitRefs || []), { html: true })}
                ${kvRow('Need evidence', formatList([...(entry.coveredNeedEvidence?.failureModes || []), ...(entry.coveredNeedEvidence?.constraints || []), ...(entry.coveredNeedEvidence?.touchedPaths || [])], 'None'), { html: true })}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="section-card">
        <div class="section-head"><h4>Normalization ledger</h4><span class="badge">Deterministic tie-break</span></div>
        <div class="object-list nested">
          ${normalizationLedger.map((entry) => `
            <div class="mini-card">
              <div class="row wrap-gap">
                <strong>${escapeHtml(entry.assetId || 'Asset')}</strong>
                <span class="badge">${escapeHtml(`rank ${entry.tieBreakRank ?? '—'}`)}</span>
              </div>
              <div class="kv-grid">
                ${kvRow('Floor share bp', entry.floorShareBp ?? '—')}
                ${kvRow('Remainder units', entry.remainderUnits || '0')}
                ${kvRow('Awarded remainder bp', entry.remainderAwardedBp ?? 0)}
                ${kvRow('Final share bp', entry.finalShareBp ?? '—')}
              </div>
            </div>
          `).join('') || '<p class="meta">No normalization ledger.</p>'}
        </div>
      </div>
    </div>
  `;
}

function renderSettlementParticipationVisual(participation) {
  const records = participation?.records || [];
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Selected', participation?.selectedAssetCount || 0)}
        ${metricTile('Participating', participation?.settlementParticipatingCount || 0)}
        ${metricTile('Credited', participation?.positivelyCreditedCount || 0)}
        ${metricTile('Zero-credit', participation?.zeroCreditParticipatingCount || 0, (participation?.zeroCreditParticipatingCount || 0) ? 'warn' : '')}
      </div>
      <div class="object-list">
        ${records.map((record) => `
          <div class="section-card">
            <div class="row wrap-gap">
              <div>
                <strong>${escapeHtml(record.title || record.assetId || 'Asset')}</strong>
                <p class="meta wrap-anywhere">${escapeHtml(record.assetId || '')}</p>
              </div>
              <div class="badge-row">
                ${statusBadge(record.selected ? 'selected' : 'excluded')}
                ${statusBadge(record.zeroCreditParticipating ? 'zero-credit participating' : record.positivelyCredited ? 'positively credited' : record.settlementParticipating ? 'participating' : 'excluded')}
              </div>
            </div>
            <div class="kv-grid">
              ${kvRow('Use tier', record.useTier || '—')}
              ${kvRow('Raw share bp', record.rawShareBp ?? 0)}
              ${kvRow('Settled share bp', record.settledShareBp ?? 0)}
              ${kvRow('Credited micro-units', record.creditedMicroUnits || '0')}
            </div>
            ${record.exclusionReason ? `<p class="meta">${escapeHtml(record.exclusionReason)}</p>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderAccountingPrecisionVisual(report) {
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Contribution inputs', (report?.contributionInputs || []).length)}
        ${metricTile('Clipping receipts', (report?.clippingDecisions || []).length)}
        ${metricTile('Allocation rows', (report?.microUnitAllocation?.allocations || []).length)}
        ${metricTile('Source-to-shares closure rows', (report?.sourceMaterialToSharesClosure || []).length)}
      </div>
      <div class="section-card">
        <div class="section-head"><h4>Exact accounting invariants</h4><span class="badge">Replayable</span></div>
        <div class="badge-row">
          ${Object.entries(report?.exactAccountingInvariants || {}).map(([key, value]) => `<span class="badge ${value ? 'private' : 'bad'}">${escapeHtml(labelize(key))}: ${escapeHtml(value)}</span>`).join(' ')}
        </div>
      </div>
      <div class="mini-grid two-up">
        <div class="section-card">
          <div class="section-head"><h4>Basis-point normalization</h4><span class="badge">Source to shares</span></div>
          ${surfaceVisualFallback(report?.basisPointNormalization || {})}
        </div>
        <div class="section-card">
          <div class="section-head"><h4>Micro-unit allocation</h4><span class="badge">Exact remainder order</span></div>
          ${surfaceVisualFallback(report?.microUnitAllocation || {})}
        </div>
      </div>
      <div class="section-card">
        <div class="section-head"><h4>Source material to shares closure</h4><span class="badge">Unit refs to credited micro-units</span></div>
        ${surfaceVisualFallback(report?.sourceMaterialToSharesClosure || [])}
      </div>
    </div>
  `;
}

function renderMaterializationProofVisual(proof) {
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Selected assets', (proof?.witnessRefs?.selectedAssetIds || []).length)}
        ${metricTile('Materialized assets', (proof?.witnessRefs?.materializedAssetIds || []).length)}
        ${metricTile('Excluded assets', (proof?.witnessRefs?.excludedAssetIds || []).length)}
        ${metricTile('Locked units', (proof?.witnessRefs?.lockedUnitRefs || []).length)}
      </div>
      <div class="badge-row">
        ${statusBadge(proof?.allSelectedAssetsMaterialized ? 'selected assets materialized' : 'selected assets missing')}
        ${statusBadge(proof?.allExclusionsExplained ? 'exclusions explained' : 'unexplained exclusions')}
      </div>
      ${surfaceVisualFallback(proof || {})}
    </div>
  `;
}

function renderMaterializationVisibilityVisual(proof) {
  return `
    <div class="visual-stack">
      <div class="mini-grid four-up compact-metrics">
        ${metricTile('Selected assets', (proof?.witnessRefs?.selectedAssetIds || []).length)}
        ${metricTile('Materialized assets', (proof?.witnessRefs?.materializedSourceAssetIds || []).length)}
        ${metricTile('Unit refs', (proof?.witnessRefs?.materializedUnitRefs || []).length)}
        ${metricTile('Public artifacts', (proof?.witnessRefs?.publicArtifactPaths || []).length)}
      </div>
      <div class="badge-row">
        ${statusBadge(proof?.allSelectedAssetsHaveMaterializedSourceBindings ? 'selected assets materialized' : 'selected assets missing')}
        ${statusBadge(proof?.noUnexpectedMaterializedSourceBindings ? 'no unexpected materialization' : 'unexpected materialization')}
        ${statusBadge(proof?.allMaterializedUnitsClosedOverLock ? 'unit refs closed' : 'unit refs open')}
        ${statusBadge(proof?.noPrivateArtifactsLeakIntoPublicProjection ? 'public projection bounded' : 'public projection leaked')}
      </div>
      ${surfaceVisualFallback(proof || {})}
    </div>
  `;
}

function renderScenarioCorpusVisual(scenarios = [], activeScenarioId = '') {
  return `
    <div class="object-list">
      ${scenarios.map((scenario) => `
        <div class="section-card">
          <div class="row wrap-gap">
            <div>
              <strong>${escapeHtml(scenario.scenarioFamily || scenario.scenarioId || 'Scenario')}</strong>
              <p class="meta">${escapeHtml(scenario.repo || '')}</p>
            </div>
            <div class="badge-row">
              ${statusBadge(scenario.scenarioId === activeScenarioId ? 'active scenario' : 'seeded scenario')}
              <span class="badge">${escapeHtml(scenario.parserKind || 'parser')}</span>
            </div>
          </div>
          <p>${escapeHtml(scenario.taskSeed || '—')}</p>
          <div class="kv-grid">
            ${kvRow('Coverage tags', chipList(scenario.coverageTags || []), { html: true })}
            ${kvRow('Failing cases', formatList(scenario.failingCases || []), { html: true })}
            ${kvRow('Weak dimensions', formatList(scenario.weakDimensions || []), { html: true })}
          </div>
        </div>
      `).join('')}
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
  const proofContract = bundle.proofContract || {};
  const theoremChecks = bundle.settlementProof?.theoremChecks || {};
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
          <div class="section-head"><h4>Proof contract + evidence chain</h4><span class="badge">Final closure</span></div>
          <div class="kv-grid">
            ${kvRow('Contract ID', proofContract.contractId || '—')}
            ${kvRow('Theorem checks declared', formatList(proofContract.theoremChecks || []), { html: true })}
          </div>
          <div class="object-list nested">
            ${(proofContract.evidenceChain || []).map((entry) => `
              <div class="mini-card">
                <strong>${escapeHtml(entry.stage || 'stage')}</strong>
                <p>${escapeHtml(entry.claim || '')}</p>
                <p class="meta wrap-anywhere">${escapeHtml((entry.artifactRefs || []).join(' • '))}</p>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="section-card">
          <div class="section-head"><h4>Theorem / invariant checks</h4><span class="badge">Evidence-bound</span></div>
          <div class="badge-row">
            ${Object.entries(theoremChecks).map(([key, value]) => `<span class="badge ${value ? 'private' : 'bad'}">${escapeHtml(labelize(key))}: ${escapeHtml(value)}</span>`).join(' ')}
          </div>
          <div class="kv-grid">
            ${kvRow('Prompt templates', (bundle.promptImplementationSurface?.promptTemplates || []).length)}
            ${kvRow('Prompt lineage rows', (bundle.promptImplementationSurface?.promptLineage || []).length)}
            ${kvRow('Asset bindings', (proofContract.artifactBindings?.selectedAssets || []).length)}
          </div>
        </div>
      </div>
      <div class="section-card">
        <div class="section-head"><h4>Prompt / evaluator surface</h4><span class="badge">Profile B hand-off</span></div>
        ${surfaceVisualFallback(bundle.promptImplementationSurface || {})}
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
  const settled = latestRun?.settlementPreview?.creditedAssetIds?.length
    ?? latestRun?.journalDiff?.credits?.filter((entry) => entry.delta !== '0').length
    ?? 0;
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
  const activeScenarioId = selectedScenarioId || state.latestRun?.scenarioId || state.needScenarios[0]?.scenarioId;
  const scenario = state.needScenarios.find((entry) => entry.scenarioId === activeScenarioId) || state.needScenarios[0];
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
      <p class="meta">V9 keeps the visual read first, but now also proves prompt completeness, static measurement receipts, and projection enforcement without hiding the buyer-safe JSON view.</p>
    </div>
    ${renderJsonSurface({
      title: latestNeed ? 'Measured need' : 'Seed need scenario',
      subtitle: 'Need / measurement / benchmark target surface',
      eyebrow: 'V9 artifact',
      help: 'Visual groups the GitHub-bound need into task, parser, failure-mode, and derivation sections. Raw shows the exact pretty-printed object.',
      data: source,
      visual: renderNeedVisual,
      accent: 'accent-blue'
    })}
    ${renderJsonSurface({
      title: 'Scenario corpus',
      subtitle: 'Seeded GitHub-shaped scenario families available in this demo',
      eyebrow: 'Corpus surface',
      help: 'The corpus now covers auth rollback, proof-heavy Rust, config policy, unsafe review, deployment drift, privacy-boundary proof export, a polyglot gateway rollback, and a normalization-heavy auth scenario for source-to-shares replay.',
      data: state.needScenarios,
      visual: (scenarios) => renderScenarioCorpusVisual(scenarios, activeScenarioId),
      accent: 'accent-green'
    })}
    ${renderJsonSurface({
      title: 'Profile composition + demo semantics',
      subtitle: 'Why Profile A is live here and Profile B is not switchable in-demo',
      eyebrow: 'V9 artifact',
      help: 'Profile A is implemented locally in this repo. Profile B is specified as an external boundary and intentionally not faked.',
      data: state.profileCompositions || state.conformanceProfiles?.profileCompositions || {},
      visual: renderProfileCompositionVisual,
      accent: 'accent-orange'
    })}
    ${source.promptSurfaces?.length ? renderJsonSurface({
      title: 'Prompt surfaces + lineage',
      subtitle: 'Templates, interpolated context, and downstream derivation bindings',
      eyebrow: 'Prompt artifact',
      help: 'V9 keeps prompts first-class and now adds explicit completeness proofing, contract hashes, and downstream artifact bindings.',
      data: source.promptSurfaces,
      visual: renderPromptSurfaceCollectionVisual,
      accent: 'accent-purple'
    }) : ''}
    ${measurementPayload ? renderJsonSurface({
      title: 'Need derivation + parser validation',
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
      eyebrow: 'V9 artifact',
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
      title: 'Identity bindings',
      subtitle: '.engi/identity-bindings.json',
      data: run.identityBindings,
      raw: branchFiles['.engi/identity-bindings.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-orange'
    },
    {
      title: 'GitHub boundary surface',
      subtitle: '.engi/github-boundary.json',
      data: run.githubBoundarySurface,
      raw: branchFiles['.engi/github-boundary.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-slate'
    },
    {
      title: 'Artifact upload manifest',
      subtitle: '.engi/artifact-upload-manifest.json',
      data: run.artifactUploadManifest,
      raw: branchFiles['.engi/artifact-upload-manifest.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-slate'
    },
    {
      title: 'Profile composition surface',
      subtitle: '.engi/profile-composition.json',
      data: run.profileCompositionSurface,
      raw: branchFiles['.engi/profile-composition.json'],
      visual: renderProfileCompositionVisual,
      accent: 'accent-orange'
    },
    {
      title: 'Prompt surfaces',
      subtitle: '.engi/prompt-surfaces.json',
      data: run.promptSurfaces,
      raw: branchFiles['.engi/prompt-surfaces.json'],
      visual: renderPromptSurfaceCollectionVisual,
      accent: 'accent-purple'
    },
    {
      title: 'Code analysis / static heuristics registry',
      subtitle: '.engi/static-heuristics-registry.json',
      data: run.staticHeuristicsRegistry || run.codeAnalysisFactRegistry,
      raw: branchFiles['.engi/static-heuristics-registry.json'] || branchFiles['.engi/code-analysis-fact-registry.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-blue'
    },
    {
      title: 'Verification receipts',
      subtitle: '.engi/verification-receipts.json',
      data: run.verificationReceipts,
      raw: branchFiles['.engi/verification-receipts.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-orange'
    },
    {
      title: 'Static code-analysis closure proof',
      subtitle: '.engi/static-measurement-proof.json',
      data: run.staticMeasurementProof,
      raw: branchFiles['.engi/static-measurement-proof.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'Materialization proof',
      subtitle: '.engi/materialization-proof.json',
      data: run.materializationProof,
      raw: branchFiles['.engi/materialization-proof.json'],
      visual: renderMaterializationProofVisual,
      accent: 'accent-purple'
    },
    {
      title: 'Materialization visibility proof',
      subtitle: '.engi/materialization-visibility-proof.json',
      data: run.materializationVisibilityProof,
      raw: branchFiles['.engi/materialization-visibility-proof.json'],
      visual: renderMaterializationVisibilityVisual,
      accent: 'accent-purple'
    },
    {
      title: 'Materialization exclusions',
      subtitle: '.engi/materialization-exclusions.json',
      data: run.materializationExclusions,
      raw: branchFiles['.engi/materialization-exclusions.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-slate'
    },
    {
      title: 'Proof witness manifest',
      subtitle: '.engi/proof-witness-manifest.json',
      data: run.proofWitnessManifest,
      raw: branchFiles['.engi/proof-witness-manifest.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-purple'
    },
    {
      title: 'Scenario corpus manifest',
      subtitle: '.engi/scenario-fixture-manifest.json',
      data: run.scenarioFixtureManifest,
      raw: branchFiles['.engi/scenario-fixture-manifest.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-green'
    },
    {
      title: 'Test coverage report',
      subtitle: '.engi/test-coverage-report.json',
      data: run.testCoverageReport,
      raw: branchFiles['.engi/test-coverage-report.json'],
      visual: surfaceVisualFallback,
      accent: 'accent-green'
    },
    {
      title: 'External boundary manifest',
      subtitle: '.engi/external-boundary-manifest.json',
      data: run.externalBoundaryManifest,
      raw: branchFiles['.engi/external-boundary-manifest.json'],
      visual: renderExternalBoundaryManifestVisual,
      accent: 'accent-slate'
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
      <p class="meta">This is the artifact-heavy heart of the V9 demo. The buyer projection can inspect rich private-safe artifacts, but raw source material and unrestricted branch files remain withheld by projection policy.</p>
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
      title: 'Source-to-shares chain',
      subtitle: '.engi/source-to-shares.json',
      eyebrow: 'Accounting artifact',
      help: 'This is the explicit path from source contribution basis to raw share basis points, including clipping receipts and normalization order.',
      data: run.sourceToSharesArtifact,
      raw: branchFiles['.engi/source-to-shares.json'],
      visual: renderSourceToSharesVisual,
      accent: 'accent-green'
    }),
    renderJsonSurface({
      title: 'Settlement participation',
      subtitle: '.engi/settlement-participation.json',
      eyebrow: 'Accounting artifact',
      help: 'Every evaluated asset is classified as selected, settlement-participating, credited, zero-credit participating, or excluded.',
      data: run.settlementParticipationArtifact,
      raw: branchFiles['.engi/settlement-participation.json'],
      visual: renderSettlementParticipationVisual,
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
      title: 'Accounting precision report',
      subtitle: '.engi/accounting-precision-report.json',
      eyebrow: 'Accounting artifact',
      help: 'V9 precision closure now records clipping, tie-break policy, and exact micro-unit allocation as replayable accounting surfaces.',
      data: run.accountingPrecisionReport,
      raw: branchFiles['.engi/accounting-precision-report.json'],
      visual: renderAccountingPrecisionVisual,
      accent: 'accent-purple'
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
  const state = await api('/api/state?principal=buyer');
  lastLoadedState = state;
  syncScenarioPicker(state);
  syncAuthSessionPicker(state);
  syncInventoryKindFilter(state);
  renderRepoInventory(state);
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
    const result = await api('/api/make-engi-branch', {
      method: 'POST',
      body: JSON.stringify({ principal: 'buyer', scenarioId: selectedScenarioId || scenarioPickerEl?.value || undefined })
    });
    await refresh();
    setStatus(`Created ${result.latestRun.branchName || result.latestRun.branchArtifacts?.branchName} and settled bundle ${result.latestRun.boundedPublicProof?.bundleId || result.latestRun.journalDiff?.bundleId}.`);
  } catch (error) {
    setStatus(error.message);
  }
});

scenarioPickerEl?.addEventListener('change', () => {
  selectedScenarioId = scenarioPickerEl.value;
  if (lastLoadedState) {
    syncAuthSessionPicker(lastLoadedState);
    syncInventoryKindFilter(lastLoadedState);
    renderRepoInventory(lastLoadedState);
    renderScenario(lastLoadedState);
  }
  setStatus(`Selected scenario ${selectedScenarioId}.`);
});

authSessionPickerEl?.addEventListener('change', () => {
  selectedAuthSessionId = authSessionPickerEl.value;
  if (lastLoadedState) {
    syncInventoryKindFilter(lastLoadedState);
    renderRepoInventory(lastLoadedState);
  }
  setStatus(`Bound intake to authenticated repo session ${selectedAuthSessionId}.`);
});

inventoryKindFilterEl?.addEventListener('change', () => {
  selectedInventoryKind = inventoryKindFilterEl.value;
  if (lastLoadedState) renderRepoInventory(lastLoadedState);
});

inventorySearchInputEl?.addEventListener('input', () => {
  inventorySearchTerm = inventorySearchInputEl.value || '';
  if (lastLoadedState) renderRepoInventory(lastLoadedState);
});

document.getElementById('resetButton').addEventListener('click', async () => {
  try {
    selectedInventoryEntryIds = new Set();
    await api('/api/reset', { method: 'POST', body: '{}' });
    await refresh();
    setStatus('Demo reset to seeded Spec V10 scenario.');
  } catch (error) {
    setStatus(error.message);
  }
});

document.addEventListener('click', (event) => {
  const inventoryCard = event.target.closest('[data-inventory-entry-id]');
  if (!inventoryCard) return;
  const entryId = inventoryCard.dataset.inventoryEntryId;
  if (!entryId) return;
  if (selectedInventoryEntryIds.has(entryId)) selectedInventoryEntryIds.delete(entryId);
  else selectedInventoryEntryIds.add(entryId);
  if (lastLoadedState) renderRepoInventory(lastLoadedState);
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
        artifactType: form.get('artifactType'),
        authSessionId: authSessionPickerEl?.value || form.get('authSessionId'),
        inventoryEntryIds: [...selectedInventoryEntryIds],
        sourceRepo: form.get('sourceRepo'),
        sourceCommit: form.get('sourceCommit'),
        workflowRunId: form.get('workflowRunId'),
        signerAddress: form.get('signerAddress'),
        visualPreview: form.get('visualPreview'),
        operatorNote: form.get('operatorNote'),
        tags: String(form.get('tags') || '').split(',').map((entry) => entry.trim()).filter(Boolean),
        content: form.get('content')
      })
    });
    selectedInventoryEntryIds = new Set();
    inventorySearchTerm = '';
    selectedInventoryKind = 'all';
    event.currentTarget.reset();
    await refresh();
    setStatus('Candidate asset deposited from the V10 intake surface. Re-run “Make ENGI branch” to fold it into ranking and verification.');
  } catch (error) {
    setStatus(error.message);
  }
});

refresh().then(() => {
  setStatus('Ready. Select repo artifacts or use raw fallback, then run “Make ENGI branch” to execute the full Spec V10 intake/auth flow. Artifact surfaces default to Visual mode and can flip to Raw JSON at any time.');
}).catch((error) => {
  document.body.innerHTML = `<pre>${escapeHtml(error.message)}</pre>`;
});
