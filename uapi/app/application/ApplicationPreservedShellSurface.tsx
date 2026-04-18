'use client';

import React from 'react';

import ApplicationOperatorCard from './ApplicationOperatorCard';
import ApplicationRuntimeDrawer from './ApplicationRuntimeDrawer';
import { APPLICATION_OPERATOR_EXPLAINERS } from './application-operator-explainers';

export default function ApplicationPreservedShellSurface() {
  return (
    <ApplicationOperatorCard
      id="applicationLowerRuntime"
      kicker="Lower runtime"
      title="Open live runtime detail only when you need exact replay or proof follow-through"
      summary="Stay in the application terminal for normal reading and drafting. Open the live runtime only when you need exact follow-through, replay detail, or mount-level verification."
      explainer={APPLICATION_OPERATOR_EXPLAINERS.sourcePath}
      className="min-w-0"
      childrenClassName="space-y-5"
    >
      <div className="grid gap-3 text-xs uppercase tracking-[0.22em] text-neutral-400 tablet:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
          <p className="text-emerald-300/85">Use this for</p>
          <p className="mt-2 text-neutral-200">exact follow-through + replay checks</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
          <p className="text-emerald-300/85">Keep primary</p>
          <p className="mt-2 text-neutral-200">transactions + selected detail</p>
        </div>
      </div>

      <ApplicationRuntimeDrawer
        title="Open live runtime detail"
        summary="This keeps the live runtime available for inspection and closure follow-through while the main application stays centered on the cleaner master-detail workspace."
      >
        <div className="min-w-0 p-2 tablet:p-4">
        <div id="bitcodeApplicationRoot" className="bitcode-first-gate-root">
          <div className="page">
            <header className="hero" id="hero">
              <p className="eyebrow" id="heroEyebrow">
                Bitcode lower runtime detail
              </p>
              <h1>Inspect the live Bitcode runtime from give through settlement.</h1>
              <p className="lede" id="heroLede">
                Use this lower runtime when you need deterministic follow-through beyond the main application workspace.
              </p>
              <p className="meta hero-tip" id="heroTip">
                The application terminal stays primary. This runtime view is for exact inspection, replay, and closure follow-through.
              </p>
              <div className="hero-actions">
                <label>
                  <span data-explainer-key="needing" data-explainer-side="bottom">
                    Scenario
                  </span>
                  <select id="scenarioPicker" />
                </label>
                <label>
                  <span data-explainer-key="projection" data-explainer-side="bottom">
                    Projection
                  </span>
                  <select id="projectionPicker" defaultValue="buyer">
                    <option value="buyer">buyer</option>
                    <option value="reviewer">reviewer</option>
                    <option value="public">public</option>
                    <option value="internal">internal</option>
                  </select>
                </label>
                <label>
                  <span data-explainer-key="branch-artifacts" data-explainer-side="bottom">
                    Branch mode
                  </span>
                  <select id="branchModePicker" defaultValue="patch">
                    <option value="patch">patch</option>
                    <option value="context">context</option>
                  </select>
                </label>
                <button id="makeBranchButton" type="button">
                  Make Bitcode branch
                </button>
                <button id="tutorialToggleButton" className="ghost" type="button">
                  Hide guide
                </button>
                <button id="resetButton" className="ghost" type="button">
                  Reset application
                </button>
              </div>
              <div id="status" className="status" role="status" aria-live="polite" aria-atomic="true" />
            </header>

            <section className="summary-grid" id="summary" />

            <main className="grid">
              <section className="panel wide" id="panelOperatingPicture">
                <div className="panel-head">
                  <h2 data-explainer-key="operating-picture">0. Operating picture</h2>
                  <span className="badge" data-explainer-key="repo-to-settlement">
                    repo supply -&gt; settlement
                  </span>
                </div>
                <div id="operatingPicture" className="stack" />
              </section>

              <section className="panel" id="panelDepositing">
                <div className="panel-head">
                  <h2 data-explainer-key="depositing">1. Depositing + candidate assets</h2>
                  <span className="badge" data-explainer-key="candidate-asset">
                    artifact-kind-native deposit
                  </span>
                </div>
                <form id="depositForm" className="stack compact">
                  <div className="section-card">
                    <div className="section-head">
                      <h4 data-explainer-key="identity-auth-spine">Authenticated Repo Session</h4>
                      <span className="badge">Modeled GitHub App</span>
                    </div>
                    <div className="stack">
                      <select id="authSessionPicker" name="authSessionId" />
                      <div id="inventorySelectionSummary" className="callout" />
                    </div>
                  </div>
                  <div className="section-card">
                    <div className="section-head">
                      <h4 data-explainer-key="repo-supply">Repo Artifact Inventory</h4>
                      <span className="badge">Selection-first</span>
                    </div>
                    <p className="meta">
                      Selections here define the deposit side of the active profile: either a tight decisive deposit for a
                      bounded need or a broader normalization deposit for a composite need.
                    </p>
                    <div className="mini-grid two-up">
                      <label className="field-stack">
                        <span data-explainer-key="inventory-search">Artifact inventory search</span>
                        <input
                          id="inventorySearchInput"
                          placeholder="Filter by title, path, workflow run, or tag"
                        />
                      </label>
                      <label className="field-stack">
                        <span data-explainer-key="artifact-kind-filter">Artifact kind filter</span>
                        <select id="inventoryKindFilter" name="inventoryKindFilter" defaultValue="all">
                          <option value="all">All artifact kinds</option>
                        </select>
                      </label>
                    </div>
                    <div id="repoInventoryList" className="stack" />
                  </div>
                  <label className="field-stack">
                    <span data-explainer-key="deposit-title-override">Asset title override</span>
                    <input name="title" placeholder="Optional; inferred from selection if omitted" />
                  </label>
                  <label className="field-stack">
                    <span data-explainer-key="author-override">Author override</span>
                    <input name="author" placeholder="Optional; inferred from session if omitted" />
                  </label>
                  <label className="field-stack">
                    <span data-explainer-key="artifact-kind">Artifact kind override</span>
                    <input name="artifactKind" placeholder="Optional; inferred from selection if omitted" />
                  </label>
                  <label className="field-stack">
                    <span data-explainer-key="artifact-type">Artifact type override</span>
                    <input name="artifactType" placeholder="Optional; inferred from selection if omitted" />
                  </label>
                  <label className="field-stack">
                    <span data-explainer-key="source-repo-override">GitHub repo boundary override</span>
                    <input name="sourceRepo" placeholder="Optional; inferred from session if omitted" />
                  </label>
                  <label className="field-stack">
                    <span data-explainer-key="source-commit-override">Commit SHA / ref override</span>
                    <input name="sourceCommit" placeholder="Optional explicit commit or ref" />
                  </label>
                  <label className="field-stack">
                    <span data-explainer-key="workflow-run-override">GitHub workflow run ID override</span>
                    <input name="workflowRunId" placeholder="Optional workflow run binding" />
                  </label>
                  <label className="field-stack">
                    <span data-explainer-key="signing">Signer / issuer DID override</span>
                    <input name="signerAddress" placeholder="Optional signer or issuer DID" />
                  </label>
                  <label className="field-stack">
                    <span data-explainer-key="coverage-tags">Additional tags</span>
                    <input name="tags" placeholder="Comma-separated tags" />
                  </label>
                  <label className="field-stack">
                    <span data-explainer-key="visual-preview">Visual preview override</span>
                    <textarea
                      name="visualPreview"
                      rows={3}
                      placeholder="Human-readable summary used in visual mode"
                    />
                  </label>
                  <label className="field-stack">
                    <span data-explainer-key="operator-note">Operator note</span>
                    <textarea
                      name="operatorNote"
                      rows={3}
                      placeholder="Optional note appended to selected repo artifacts"
                    />
                  </label>
                  <label className="field-stack">
                    <span data-explainer-key="raw-fallback">Raw fallback / supplemental source material</span>
                    <textarea
                      name="content"
                      rows={5}
                      placeholder="Optional if selecting repo artifacts"
                    />
                  </label>
                  <button type="submit">Deposit candidate asset into Bitcode flow</button>
                </form>
                <div id="assets" className="stack" />
              </section>

              <section className="panel" id="panelNeeding">
                <div className="panel-head">
                  <h2 data-explainer-key="needing">2. Needing + measured demand</h2>
                  <span className="badge" data-explainer-key="scenario-preview">
                    scenario preview
                  </span>
                </div>
                <div id="scenario" className="stack" />
              </section>

              <section className="panel wide" id="panelFit">
                <div className="panel-head">
                  <h2 data-explainer-key="deposit-fit">3. Depositing-to-needing fit</h2>
                  <span className="badge" data-explainer-key="deposit-fit">
                    fit before proof
                  </span>
                </div>
                <div id="fit" className="stack" />
              </section>

              <section className="panel wide" id="panelEvaluations">
                <div className="panel-head">
                  <h2 data-explainer-key="verification-rights">4. Ranked candidates + verification determinisms</h2>
                  <span className="badge" data-explainer-key="verification-rights">
                    ranking + use tiers
                  </span>
                </div>
                <div id="evaluations" className="stack" />
              </section>

              <section className="panel" id="panelBranchArtifacts">
                <div className="panel-head">
                  <h2 data-explainer-key="branch-artifacts">5. Asset pack + branch artifacts</h2>
                  <span className="badge private" data-explainer-key="private-remediation-branch">
                    private remediation branch
                  </span>
                </div>
                <div id="branchArtifacts" className="stack" />
              </section>

              <section className="panel" id="panelSettlement">
                <div className="panel-head">
                  <h2 data-explainer-key="settlement">6. Settlement + journal diff</h2>
                  <span className="badge" data-explainer-key="exact-accounting">
                    exact accounting
                  </span>
                </div>
                <div id="settlement" className="stack" />
              </section>

              <section className="panel wide" id="panelLedger">
                <div className="panel-head">
                  <h2 data-explainer-key="ledger-policy">7. Ledger + policy surfaces</h2>
                  <span className="badge" data-explainer-key="bounded-public-proof">
                    bounded proof metadata
                  </span>
                </div>
                <div id="ledger" className="stack" />
              </section>
            </main>
          </div>

          <div id="tutorialLayer" className="tutorial-layer" hidden>
            <section
              id="tutorialCard"
              className="tutorial-card"
              role="dialog"
              aria-modal="false"
              aria-labelledby="tutorialTitle"
              aria-describedby="tutorialBody"
            >
              <div className="tutorial-progress">
                <span id="tutorialStepCounter" className="badge">
                  Step 1 of 10
                </span>
                <button id="tutorialCloseButton" className="ghost tutorial-button" type="button">
                  Dismiss
                </button>
              </div>
              <p id="tutorialKicker" className="tutorial-kicker">
                Stepwise flow guide
              </p>
              <h2 id="tutorialTitle">Start with the current workspace posture</h2>
              <p id="tutorialBody" className="tutorial-body" />
              <p id="tutorialTargetHint" className="tutorial-target-hint" />
              <div className="tutorial-actions">
                <button id="tutorialPrevButton" className="ghost tutorial-button" type="button">
                  Back
                </button>
                <button id="tutorialNextButton" className="tutorial-button" type="button">
                  Next step
                </button>
              </div>
            </section>
          </div>
        </div>
        </div>
      </ApplicationRuntimeDrawer>
    </ApplicationOperatorCard>
  );
}
