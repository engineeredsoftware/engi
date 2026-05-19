'use client';

import React from 'react';
import {
  buildTerminalOperationalHealthRead,
  type TerminalOperationalHealthRead,
  type TerminalOperationalHealthSeverity,
  type TerminalOperationalReadinessState,
} from '@bitcode/btd/terminal-operational-health';

const DEFAULT_OPERATIONAL_HEALTH_READ = buildTerminalOperationalHealthRead();

const STATE_TONE: Record<TerminalOperationalReadinessState, string> = {
  ready: 'border-emerald-300/35 bg-emerald-400/10 text-emerald-100',
  review: 'border-amber-300/35 bg-amber-400/10 text-amber-100',
  blocked: 'border-rose-300/35 bg-rose-400/10 text-rose-100',
  disabled: 'border-neutral-500/35 bg-neutral-500/10 text-neutral-200',
  future: 'border-sky-300/30 bg-sky-400/10 text-sky-100',
};

const SEVERITY_TONE: Record<TerminalOperationalHealthSeverity, string> = {
  none: 'border-neutral-500/35 bg-neutral-500/10 text-neutral-200',
  info: 'border-emerald-300/35 bg-emerald-400/10 text-emerald-100',
  warning: 'border-amber-300/35 bg-amber-400/10 text-amber-100',
  critical: 'border-rose-300/35 bg-rose-400/10 text-rose-100',
};

export default function TerminalOperationalHealthPanel({
  healthRead = DEFAULT_OPERATIONAL_HEALTH_READ,
}: {
  healthRead?: TerminalOperationalHealthRead;
}) {
  const activeProvider = healthRead.providers.find((provider) => provider.state === 'ready');
  const bitcoinSettlement = healthRead.settlementNetworks.find(
    (network) => network.id === 'bitcoin-taproot-psbt',
  );

  return (
    <section
      aria-labelledby="terminalOperationalHealthTitle"
      className="rounded-[1.35rem] border border-white/10 bg-[rgba(5,10,20,0.72)] px-4 py-4"
    >
      <div className="flex flex-col gap-3 desktop:flex-row desktop:items-start desktop:justify-between">
        <div className="max-w-4xl">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-emerald-300/75">
            Operations readiness
          </p>
          <h2 id="terminalOperationalHealthTitle" className="mt-1.5 text-lg font-semibold text-white">
            Terminal lanes, telemetry, upgrade, and testnet minting
          </h2>
        </div>
        <div className="grid min-w-[16rem] grid-cols-2 gap-2 text-xs">
          <OperationalPill label="Telemetry" value={healthRead.telemetry.severity} tone={SEVERITY_TONE[healthRead.telemetry.severity]} />
          <OperationalPill label="Provider" value={activeProvider?.provider || 'none'} tone="border-emerald-300/35 bg-emerald-400/10 text-emerald-100" />
        </div>
      </div>

      <div className="mt-4 grid gap-2 tablet:grid-cols-2 desktop:grid-cols-3">
        {healthRead.lanes.map((lane) => (
          <article key={lane.lane} className="min-h-[9.5rem] rounded-[1rem] border border-white/10 bg-white/[0.045] p-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.2em] text-neutral-500">{lane.lane}</p>
                <h3 className="mt-1 text-sm font-semibold text-white">{lane.label}</h3>
              </div>
              <span className={`rounded-full border px-2 py-1 text-[0.62rem] uppercase tracking-[0.16em] ${STATE_TONE[lane.state]}`}>
                {lane.state}
              </span>
            </div>
            <dl className="mt-3 grid gap-2 text-xs text-neutral-300">
              <div className="flex items-center justify-between gap-3">
                <dt className="text-neutral-500">Network</dt>
                <dd className="text-right font-medium text-neutral-100">{lane.bitcoinNetwork} / {lane.ledgerNetwork}</dd>
              </div>
              <div className="flex items-center justify-between gap-3">
                <dt className="text-neutral-500">Value bearing</dt>
                <dd className="text-right font-medium text-neutral-100">{lane.valueBearing ? 'yes' : 'no'}</dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-neutral-500">Approval</dt>
                <dd className="max-w-[13rem] text-right leading-5 text-neutral-200">{lane.approvalPosture}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="mt-4 grid gap-3 desktop:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-3 tablet:grid-cols-2">
          {[healthRead.broadcaster, healthRead.observer].map((subsystem) => (
            <article key={subsystem.id} className="rounded-[1rem] border border-white/10 bg-black/20 p-3">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-white">{subsystem.label}</h3>
                <span className={`rounded-full border px-2 py-1 text-[0.62rem] uppercase tracking-[0.16em] ${SEVERITY_TONE[subsystem.severity]}`}>
                  {subsystem.severity}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-neutral-300">{subsystem.summary}</p>
            </article>
          ))}
        </div>

        <article className="rounded-[1rem] border border-white/10 bg-black/20 p-3">
          <div className="flex flex-col gap-2 tablet:flex-row tablet:items-center tablet:justify-between">
            <h3 className="text-sm font-semibold text-white">Upgrade and generated types</h3>
            <span className={`w-fit rounded-full border px-2 py-1 text-[0.62rem] uppercase tracking-[0.16em] ${STATE_TONE[healthRead.upgrade.generatedTypeRefresh.state === 'current' ? 'ready' : healthRead.upgrade.generatedTypeRefresh.state === 'blocked' ? 'blocked' : 'review']}`}>
              {healthRead.upgrade.generatedTypeRefresh.state}
            </span>
          </div>
          <dl className="mt-3 grid gap-2 text-xs text-neutral-300">
            <OperationalDefinition label="Migration root" value={healthRead.upgrade.migrationRoot} />
            <OperationalDefinition label="Rollback root" value={healthRead.upgrade.rollbackPlanRoot} />
            <OperationalDefinition label="Upgrade state" value={healthRead.upgrade.state} />
          </dl>
        </article>
      </div>

      <div className="mt-4 grid gap-3 desktop:grid-cols-3">
        <article className="rounded-[1rem] border border-white/10 bg-black/20 p-3">
          <h3 className="text-sm font-semibold text-white">VCS scope</h3>
          <div className="mt-3 grid gap-2">
            {healthRead.providers.map((provider) => (
              <OperationalStatusRow key={provider.provider} label={provider.provider} state={provider.state} />
            ))}
          </div>
        </article>

        <article className="rounded-[1rem] border border-white/10 bg-black/20 p-3">
          <h3 className="text-sm font-semibold text-white">Settlement networks</h3>
          <div className="mt-3 grid gap-2">
            {healthRead.settlementNetworks.map((network) => (
              <OperationalStatusRow key={network.id} label={network.id} state={network.state} />
            ))}
          </div>
          {bitcoinSettlement ? (
            <p className="mt-3 text-xs leading-5 text-neutral-400">{bitcoinSettlement.summary}</p>
          ) : null}
        </article>

        <article className="rounded-[1rem] border border-white/10 bg-black/20 p-3">
          <h3 className="text-sm font-semibold text-white">Testnet mint readback</h3>
          <dl className="mt-3 grid gap-2 text-xs text-neutral-300">
            <OperationalDefinition label="AssetPack" value={healthRead.testnetMinting.assetPackId} />
            <OperationalDefinition label="Range" value={`${healthRead.testnetMinting.assetPackRange.rangeStart}-${healthRead.testnetMinting.assetPackRange.rangeEndExclusive}`} />
            <OperationalDefinition label="Anchor" value={healthRead.testnetMinting.ledgerAnchor.finalityState} />
            <OperationalDefinition label="Journal rows" value={String(healthRead.testnetMinting.terminalJournalRows.length)} />
            <OperationalDefinition
              label="Reconciliation"
              value={healthRead.testnetMinting.ledgerDatabaseReconciliation.blocking ? 'repair required' : 'in sync'}
            />
          </dl>
        </article>
      </div>
    </section>
  );
}

function OperationalPill({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className={`rounded-full border px-3 py-2 ${tone}`}>
      <span className="block text-[0.55rem] uppercase tracking-[0.14em] opacity-70">{label}</span>
      <span className="mt-0.5 block truncate text-[0.72rem] font-semibold uppercase tracking-[0.12em]">{value}</span>
    </div>
  );
}

function OperationalDefinition({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-neutral-500">{label}</dt>
      <dd className="max-w-[14rem] truncate text-right font-medium text-neutral-100">{value}</dd>
    </div>
  );
}

function OperationalStatusRow({
  label,
  state,
}: {
  label: string;
  state: TerminalOperationalReadinessState;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-xs">
      <span className="truncate text-neutral-300">{label}</span>
      <span className={`rounded-full border px-2 py-1 text-[0.58rem] uppercase tracking-[0.14em] ${STATE_TONE[state]}`}>
        {state}
      </span>
    </div>
  );
}
