'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { mountBitcodeApplicationShell } from '@engi/bitcode/src/client-entry.js';
import ConversationsOverlay from '@/app/conversations/components/ConversationsOverlay';
import { fetchPipelineExecutionHistory } from '@/networking/api-client';
import { isUserOrbitalMockMode } from '@/lib/mock-review-mode';

import ApplicationCommandDeck from './ApplicationCommandDeck';
import ApplicationClosureNativeSections from './ApplicationClosureNativeSections';
import ApplicationCoreNativeSections from './ApplicationCoreNativeSections';
import ApplicationExperienceFrame from './ApplicationExperienceFrame';
import ApplicationLiveSummaryStrip from './ApplicationLiveSummaryStrip';
import ApplicationSectionAtlas from './ApplicationSectionAtlas';
import ApplicationRunWorkspace from './ApplicationRunWorkspace';
import ApplicationWorkspaceRail from './ApplicationWorkspaceRail';
import { MOCK_RUNS, type WorkspaceRun } from './application-run-data';

const FIRST_GATE_STYLESHEET_ID = 'bitcode-first-gate-stylesheet';
const FIRST_GATE_STYLESHEET_HREF = '/application/first-gate-styles';

export default function ApplicationPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const mockMode = isUserOrbitalMockMode();
  const selectedRunId = searchParams.get('runId');
  const [isConversationOverlayOpen, setIsConversationOverlayOpen] = useState(false);
  const [runs, setRuns] = useState<WorkspaceRun[]>([]);
  const [isLoadingRuns, setIsLoadingRuns] = useState(!mockMode);
  const [runsError, setRunsError] = useState<string | null>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup: (() => void) | undefined;

    let stylesheet = document.getElementById(FIRST_GATE_STYLESHEET_ID) as HTMLLinkElement | null;
    if (!stylesheet) {
      stylesheet = document.createElement('link');
      stylesheet.id = FIRST_GATE_STYLESHEET_ID;
      stylesheet.rel = 'stylesheet';
      stylesheet.href = FIRST_GATE_STYLESHEET_HREF;
      document.head.appendChild(stylesheet);
    }

    void mountBitcodeApplicationShell()
      .then((dispose) => {
        if (disposed) {
          dispose?.();
          return;
        }
        cleanup = dispose;
      })
      .catch((error) => {
        console.error('Failed to mount Bitcode application shell', error);
      });

    return () => {
      disposed = true;
      cleanup?.();
      stylesheet?.remove();
    };
  }, []);

  useEffect(() => {
    let disposed = false;

    if (mockMode) {
      setRuns(MOCK_RUNS);
      setIsLoadingRuns(false);
      setRunsError(null);
      return () => {
        disposed = true;
      };
    }

    setIsLoadingRuns(true);
    setRunsError(null);

    fetchPipelineExecutionHistory()
      .then((history) => {
        if (disposed) return;
        setRuns(
          history.map((run) => ({
            id: run.id,
            created_at: run.created_at,
            status: run.status,
            type: run.type,
            summary: run.summary || run.final_work_summary?.summary || run.final_work_summary?.deliverables?.summary || null,
          })),
        );
      })
      .catch((error) => {
        if (disposed) return;
        setRunsError(error instanceof Error ? error.message : 'Unable to load recent runs.');
      })
      .finally(() => {
        if (!disposed) setIsLoadingRuns(false);
      });

    return () => {
      disposed = true;
    };
  }, [mockMode]);

  useEffect(() => {
    if (!runs.length || selectedRunId) return;
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set('runId', runs[0].id);
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
  }, [pathname, router, runs, searchParams, selectedRunId]);

  const selectedRun = useMemo(
    () => runs.find((run) => run.id === selectedRunId) || runs[0] || null,
    [runs, selectedRunId],
  );

  const handleSelectRun = (runId: string) => {
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.set('runId', runId);
    router.replace(`${pathname}?${nextParams.toString()}`, { scroll: false });
  };

  return (
    <>
      <ConversationsOverlay
        forceOpen={isConversationOverlayOpen}
        forceFullscreen={isConversationOverlayOpen}
        onCloseRequest={() => setIsConversationOverlayOpen(false)}
        showFloatingOrb={false}
      />
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(73,203,146,0.16),transparent_26%),linear-gradient(180deg,#050915_0%,#02050d_100%)] text-neutral-100">
        <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-6 px-4 pb-24 pt-40 tablet:px-6 desktop:px-8">
          <section className="overflow-hidden rounded-[2rem] border border-emerald-400/15 bg-[linear-gradient(135deg,rgba(7,14,26,0.96),rgba(4,9,18,0.92))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.38)]">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <p className="text-[0.72rem] uppercase tracking-[0.34em] text-emerald-300/80">Bitcode application</p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white tablet:text-4xl">
                  Master-detail Bitcode workspace
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-300 tablet:text-base">
                  The preserved Bitcode operator flow remains mounted here while second-gate converges `/application` into
                  the master-detail experience, keeps conversations and orbitals as fullscreen modes, and makes give and
                  need explicit in the application frame.
                </p>
              </div>
              <div className="grid gap-3 text-xs uppercase tracking-[0.22em] text-neutral-400 tablet:grid-cols-3">
                <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                  <p className="text-emerald-300/85">Primary experience</p>
                  <p className="mt-2 text-neutral-200">master detail</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                  <p className="text-emerald-300/85">Fullscreen modes</p>
                  <p className="mt-2 text-neutral-200">conversations + orbitals</p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
                  <p className="text-emerald-300/85">Primary actions</p>
                  <p className="mt-2 text-neutral-200">give + need</p>
                </div>
              </div>
            </div>
          </section>

          <ApplicationExperienceFrame onOpenConversations={() => setIsConversationOverlayOpen(true)} />
          <ApplicationCommandDeck />
          <ApplicationLiveSummaryStrip />
          <ApplicationSectionAtlas />
          <ApplicationCoreNativeSections />
          <ApplicationClosureNativeSections />

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_25rem] xl:items-start">
            <section className="min-w-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[rgba(4,8,18,0.9)] shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
              <div className="border-b border-white/8 px-6 py-5">
                <p className="text-[0.7rem] uppercase tracking-[0.28em] text-neutral-400">Operator workspace</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white">Repo supply to settlement</h2>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-300">
                  First-gate semantics remain intact here while the application-owned frame, overlays, and run-detail
                  workspace converge around the Bitcode system.
                </p>
              </div>

              <div className="p-2 tablet:p-4">
                <div id="bitcodeApplicationRoot" className="bitcode-first-gate-root">
                  <div className="page">
        <header className="hero" id="hero">
          <p className="eyebrow" id="heroEyebrow">
            Bitcode deterministic local prototype
          </p>
          <h1>Operate Bitcode from repo supply to settlement.</h1>
          <p className="lede" id="heroLede">
            Loading current canon posture…
          </p>
          <p className="meta hero-tip" id="heroTip">
            Loading current generated appendix and report posture…
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
              Hide tutorial
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
            Stepwise shell guide
          </p>
          <h2 id="tutorialTitle">Start with current canon posture</h2>
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
            </section>

            <aside className="min-w-0">
              <ApplicationWorkspaceRail
                onOpenConversations={() => setIsConversationOverlayOpen(true)}
                runs={runs}
                isLoadingRuns={isLoadingRuns}
                runsError={runsError}
                selectedRun={selectedRun}
                onSelectRun={handleSelectRun}
                mockMode={mockMode}
              />
            </aside>
          </div>

          <ApplicationRunWorkspace
            runs={runs}
            selectedRun={selectedRun}
            isLoadingRuns={isLoadingRuns}
            runsError={runsError}
            mockMode={mockMode}
            onSelectRun={handleSelectRun}
          />
        </div>
      </div>
    </>
  );
}
