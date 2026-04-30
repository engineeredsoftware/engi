'use client';

import { useEffect, useMemo, useState } from 'react';

import BitcodeChipCloud from '@/components/base/bitcode/execution/BitcodeChipCloud';
import BitcodeInlineExplainer from '@/components/base/bitcode/execution/BitcodeInlineExplainer';
import BitcodeMetricGrid from '@/components/base/bitcode/execution/BitcodeMetricGrid';

import ApplicationWorkspaceCard from './ApplicationWorkspaceCard';
import {
  buildApplicationSupplySelectionDraft,
  type ApplicationActivityRecordDraft,
} from './application-activity-history';
import {
  APPLICATION_INLINE_EXPLAINERS,
  APPLICATION_WORKSPACE_EXPLAINERS,
} from './application-workspace-explainers';
import { normalizeApplicationSupplySelection, type ApplicationSupplySelectionState } from './application-supply-selection';
import { useApplicationShellBridge } from './application-shell-bridge';
import { jumpToShellSection } from './application-shell-reading';

interface ApplicationSupplySelectionPanelProps {
  onRecordActivity?: (draft: ApplicationActivityRecordDraft) => Promise<unknown>;
}

export default function ApplicationSupplySelectionPanel({
  onRecordActivity,
}: ApplicationSupplySelectionPanelProps) {
  const { snapshot, runControl } = useApplicationShellBridge();
  const [searchValue, setSearchValue] = useState('');
  const [recordMessage, setRecordMessage] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const selection = useMemo<ApplicationSupplySelectionState | null>(
    () => normalizeApplicationSupplySelection(snapshot),
    [snapshot],
  );

  useEffect(() => {
    setSearchValue(selection?.searchTerm || '');
  }, [selection?.searchTerm]);

  const selectedEntryLabels = useMemo(
    () => selection?.filteredEntries.filter((entry) => entry.selected).slice(0, 6).map((entry) => entry.title) || [],
    [selection],
  );

  const handleRecordSelection = async () => {
    if (!selection || !onRecordActivity) return;

    setIsRecording(true);
    setRecordMessage(null);

    try {
      await onRecordActivity(buildApplicationSupplySelectionDraft(selection));
      setRecordMessage('Selected give-side supply recorded into the Bitcode activity ledger.');
    } catch (error) {
      setRecordMessage(error instanceof Error ? error.message : 'Unable to record give-side selection.');
    } finally {
      setIsRecording(false);
    }
  };

  if (!selection) {
    return (
      <ApplicationWorkspaceCard
        id="applicationSupplySelection"
        kicker="Give-side supply"
        title="Search and select supply for the current give draft"
        summary="Loading repository-bound supply, selected inventory, and intake controls."
        explainer={APPLICATION_WORKSPACE_EXPLAINERS.supplyInventory}
      >
        <p className="text-sm leading-6 text-neutral-300">Loading give-side supply…</p>
      </ApplicationWorkspaceCard>
    );
  }

  return (
    <ApplicationWorkspaceCard
      id="applicationSupplySelection"
      kicker="Give-side supply"
      title="Search and select supply for the current give draft"
      summary="Bind the active auth session, narrow the available inventory, and keep only the supply you want in the current give draft before moving into deposit and need."
      explainer={APPLICATION_WORKSPACE_EXPLAINERS.supplyInventory}
      headerAside={
        <BitcodeMetricGrid
          metrics={[
            { label: 'Selected refs', value: String(selection.selectedCount) },
            { label: 'Filtered inventory', value: String(selection.filteredCount) },
            { label: 'Auth sessions', value: String(selection.authSessions.length) },
            { label: 'Artifact kinds', value: String(selection.kindOptions.length) },
          ]}
          columnsClassName="tablet:grid-cols-2"
          itemClassName="rounded-2xl border border-white/8 bg-black/20 px-4 py-4"
          labelClassName="text-[0.62rem] uppercase tracking-[0.16em] text-emerald-300/85"
          valueClassName="text-sm font-semibold text-neutral-200"
        />
      }
    >
      {recordMessage ? (
        <div className="mt-4 rounded-[1.3rem] border border-white/8 bg-white/5 px-4 py-4 text-sm leading-6 text-neutral-200">
          {recordMessage}
        </div>
      ) : null}

      <div className="mt-6 grid gap-4">
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
            <span className="flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">
              <span>Auth session</span>
              <BitcodeInlineExplainer explainer={APPLICATION_INLINE_EXPLAINERS.authSession} />
            </span>
            <select
              value={selection.selectedAuthSessionId}
              onChange={(event) => {
                void runControl((controls) => controls.setAuthSession?.(event.target.value));
              }}
              className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition focus:border-emerald-400/40"
            >
              {selection.authSessions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
            <span className="flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">
              <span>Artifact kind</span>
              <BitcodeInlineExplainer explainer={APPLICATION_INLINE_EXPLAINERS.artifactKind} />
            </span>
            <select
              value={selection.selectedKind}
              onChange={(event) => {
                void runControl((controls) => controls.setInventoryKind?.(event.target.value));
              }}
              className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition focus:border-emerald-400/40"
            >
              {selection.kindOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
            <span className="flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">
              <span>Inventory search</span>
              <BitcodeInlineExplainer explainer={APPLICATION_INLINE_EXPLAINERS.inventorySearch} />
            </span>
            <input
              value={searchValue}
              onChange={(event) => {
                const nextValue = event.target.value;
                setSearchValue(nextValue);
                void runControl((controls) => controls.setInventorySearch?.(nextValue));
              }}
              placeholder="Search repo supply..."
              className="mt-3 w-full rounded-xl border border-white/10 bg-[rgba(10,15,30,0.88)] px-3 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-emerald-400/40"
            />
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
          <div className="flex items-center gap-2">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Flow continuity</p>
            <BitcodeInlineExplainer explainer={APPLICATION_WORKSPACE_EXPLAINERS.giveNeedChain} />
          </div>
          <p className="mt-3 text-sm leading-6 text-neutral-300">
            Selected supply stays attached to the current give flow. Continue into Give when you are ready to describe
            issuer, provenance, and intent.
          </p>
          {selectedEntryLabels.length ? (
            <BitcodeChipCloud
              chips={selectedEntryLabels}
              className="mt-4"
              chipClassName="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-200"
            />
          ) : null}
          <button
            type="button"
            onClick={() => jumpToShellSection('applicationDepositComposer')}
            className="mt-4 rounded-[1.3rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15"
          >
            Continue to Give flow
          </button>
          <button
            type="button"
            disabled={isRecording}
            onClick={() => {
              void handleRecordSelection();
            }}
            className="mt-3 rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-neutral-100 transition hover:border-white/18 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isRecording ? 'Recording selection…' : 'Record give selection'}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {selection.filteredEntries.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => {
              void runControl((controls) => controls.toggleInventoryEntry?.(entry.id));
            }}
            className={`rounded-[1.35rem] border px-4 py-4 text-left transition ${
              entry.selected
                ? 'border-emerald-400/35 bg-emerald-400/10'
                : 'border-white/8 bg-black/20 hover:border-white/16 hover:bg-white/5'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{entry.title}</p>
                <p className="mt-1 text-[0.68rem] uppercase tracking-[0.2em] text-neutral-500">{entry.kind}</p>
              </div>
              <span
                className={`rounded-full border px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] ${
                  entry.selected
                    ? 'border-emerald-300/35 bg-emerald-300/15 text-emerald-100'
                    : 'border-white/10 bg-white/5 text-neutral-200'
                }`}
              >
                {entry.selected ? 'selected' : 'available'}
              </span>
            </div>
            {entry.subtitle ? <p className="mt-3 text-sm leading-6 text-neutral-300">{entry.subtitle}</p> : null}
            {entry.tags.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {entry.tags.slice(0, 4).map((tag) => (
                  <span
                    key={`${entry.id}-${tag}`}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-neutral-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </button>
        ))}
      </div>
    </ApplicationWorkspaceCard>
  );
}
