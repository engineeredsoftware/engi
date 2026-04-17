'use client';

import { useEffect, useMemo, useState } from 'react';

import { normalizeApplicationSupplySelection, type ApplicationSupplySelectionState } from './application-supply-selection';
import { useApplicationShellBridge } from './application-shell-bridge';
import { jumpToShellSection } from './application-shell-reading';

export default function ApplicationSupplySelectionPanel() {
  const { snapshot, runControl } = useApplicationShellBridge();
  const [searchValue, setSearchValue] = useState('');
  const selection = useMemo<ApplicationSupplySelectionState | null>(
    () => normalizeApplicationSupplySelection(snapshot),
    [snapshot],
  );

  useEffect(() => {
    setSearchValue(selection?.searchTerm || '');
  }, [selection?.searchTerm]);

  if (!selection) {
    return (
      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(4,8,18,0.95))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
        <p className="text-[0.72rem] uppercase tracking-[0.34em] text-neutral-400">Application supply selection</p>
        <p className="mt-4 text-sm leading-6 text-neutral-300">Reading the mounted Bitcode supply-selection state…</p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(4,8,18,0.95))] px-6 py-6 shadow-[0_30px_100px_rgba(0,0,0,0.42)]">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-[0.72rem] uppercase tracking-[0.34em] text-neutral-400">Application supply selection</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white tablet:text-[2.05rem]">
            Native give-side intake control
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-300 tablet:text-base">
            Bind an authenticated session, search the available supply, and select the material you want Bitcode to
            carry forward into Give. The application keeps the controls close while the underlying shell keeps the exact
            intake semantics stable.
          </p>
        </div>

        <div className="grid gap-3 text-xs uppercase tracking-[0.22em] text-neutral-400 tablet:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Selected refs</p>
            <p className="mt-2 text-neutral-200">{selection.selectedCount}</p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
            <p className="text-emerald-300/85">Filtered inventory</p>
            <p className="mt-2 text-neutral-200">{selection.filteredCount}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="grid gap-4 lg:grid-cols-3">
          <label className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
            <span className="text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">Auth session</span>
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
          </label>

          <label className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
            <span className="text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">Artifact kind</span>
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
          </label>

          <label className="rounded-[1.5rem] border border-white/8 bg-black/20 px-4 py-4">
            <span className="text-[0.66rem] uppercase tracking-[0.24em] text-neutral-400">Inventory search</span>
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
          </label>
        </div>

        <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Source continuity</p>
          <p className="mt-3 text-sm leading-6 text-neutral-300">
            These controls drive the live Bitcode intake path directly. Work here in the operator workspace, then open
            the exact deposit section only when you need the lower source path.
          </p>
          <button
            type="button"
            onClick={() => jumpToShellSection('panelDepositing')}
            className="mt-4 rounded-[1.3rem] border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:border-emerald-300/50 hover:bg-emerald-400/15"
          >
            Open live deposit section
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
    </section>
  );
}
