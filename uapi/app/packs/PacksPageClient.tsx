'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowDownWideNarrow, ArrowUpWideNarrow, Package, RefreshCw, Search, ShieldCheck } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import type {
  PackActivityDetailProjection,
  PackActivityRecord,
  PackActivitySummary,
  PackActivityType,
  PackActivitySortDirection,
  PackActivitySortKey,
} from '@/components/base/bitcode/activity/pack-activity-model';

type PacksActivityPayload = {
  ok: boolean;
  records: PackActivityRecord[];
  detail: PackActivityDetailProjection | null;
  summary: PackActivitySummary;
  error?: string;
};

const TYPE_OPTIONS: Array<{ value: PackActivityType | 'all'; label: string }> = [
  { value: 'all', label: 'All activity' },
  { value: 'deposit-option', label: 'Deposit options' },
  { value: 'depository-assetpack', label: 'Depository AssetPacks' },
  { value: 'read-need-fit-preview', label: 'Read previews' },
  { value: 'settled-assetpack', label: 'Settled AssetPacks' },
  { value: 'settlement', label: 'Settlement' },
  { value: 'compensation', label: 'Compensation' },
  { value: 'delivery', label: 'Delivery' },
  { value: 'repair', label: 'Repair' },
  { value: 'execution', label: 'Executions' },
  { value: 'notification', label: 'Notifications' },
];

const SORT_OPTIONS: Array<{ value: PackActivitySortKey; label: string }> = [
  { value: 'timestamp', label: 'Time' },
  { value: 'title', label: 'Title' },
  { value: 'value', label: 'Value' },
  { value: 'settlementState', label: 'Settlement' },
  { value: 'compensationState', label: 'Compensation' },
  { value: 'deliveryState', label: 'Delivery' },
  { value: 'repairState', label: 'Repair' },
];

function readParam(params: URLSearchParams, key: string, fallback = '') {
  return String(params.get(key) || fallback);
}

function formatTimestamp(value: string | null) {
  if (!value) return 'No timestamp';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatCount(value: number) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 1 }).format(value);
}

function formatType(value: PackActivityType) {
  return TYPE_OPTIONS.find((option) => option.value === value)?.label || value;
}

function statusPill(value: string | null, fallback = 'not recorded') {
  const label = value || fallback;
  return (
    <span className="inline-flex min-h-7 items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.68rem] uppercase tracking-[0.16em] text-neutral-300">
      {label}
    </span>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-white/10 pt-4">
      <h3 className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-emerald-200/80">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function PacksPageClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const routeParams = useMemo(() => new URLSearchParams(searchParamsString), [searchParamsString]);
  const [records, setRecords] = useState<PackActivityRecord[]>([]);
  const [detail, setDetail] = useState<PackActivityDetailProjection | null>(null);
  const [summary, setSummary] = useState<PackActivitySummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const search = readParam(routeParams, 'q');
  const type = readParam(routeParams, 'type', 'all') as PackActivityType | 'all';
  const state = readParam(routeParams, 'state', 'all');
  const sort = readParam(routeParams, 'sort', 'timestamp') as PackActivitySortKey;
  const direction = readParam(routeParams, 'direction', 'desc') as PackActivitySortDirection;
  const detailId = readParam(routeParams, 'detailId');

  const writeParams = useCallback(
    (updates: Record<string, string | null>) => {
      const next = new URLSearchParams(routeParams);
      for (const [key, value] of Object.entries(updates)) {
        if (!value || value === 'all') next.delete(key);
        else next.set(key, value);
      }
      const query = next.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, routeParams, router],
  );

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const params = new URLSearchParams(routeParams);
    params.set('limit', params.get('limit') || '80');

    try {
      const response = await fetch(`/api/packs/activity?${params.toString()}`, {
        headers: { Accept: 'application/json' },
      });
      const payload = (await response.json()) as PacksActivityPayload;
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'Unable to read pack activity.');
      }
      setRecords(payload.records || []);
      setDetail(payload.detail || null);
      setSummary(payload.summary || null);
    } catch (loadError) {
      setRecords([]);
      setDetail(null);
      setSummary(null);
      setError(loadError instanceof Error ? loadError.message : 'Unable to read pack activity.');
    } finally {
      setIsLoading(false);
    }
  }, [routeParams]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const selectedId = detail?.id || detailId || records[0]?.id || null;
  const hasRows = records.length > 0;
  const topTypes = useMemo(
    () =>
      summary
        ? Object.entries(summary.types)
            .filter(([, count]) => count > 0)
            .slice(0, 4)
        : [],
    [summary],
  );

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(101,254,183,0.12),transparent_30%),linear-gradient(180deg,#050915_0%,#02050d_100%)] px-4 pb-24 pt-32 text-neutral-100 tablet:px-6 desktop:px-8">
      <div className="mx-auto grid w-full max-w-[1800px] gap-5">
        <header className="grid gap-5 border border-emerald-400/15 bg-[linear-gradient(135deg,rgba(7,14,26,0.96),rgba(4,9,18,0.92))] px-5 py-5 shadow-[0_30px_100px_rgba(0,0,0,0.34)] laptop:grid-cols-[1fr_auto] laptop:items-end">
          <div>
            <p className="flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.34em] text-emerald-300/80">
              <Package className="h-4 w-4" aria-hidden="true" />
              Packs
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white tablet:text-4xl">
              Pack activity
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-300 tablet:text-base">
              Search AssetPack proposals, Depository admissions, previews, settlements, compensation, delivery, proof roots, and repair state.
            </p>
          </div>
          <div className="grid gap-2 text-xs uppercase tracking-[0.18em] text-neutral-300 tablet:grid-cols-4 laptop:min-w-[620px]">
            <div className="border border-white/10 bg-white/[0.045] px-4 py-3">
              <p className="text-neutral-500">Rows</p>
              <p className="mt-1 text-lg font-semibold text-white">{formatCount(summary?.total || records.length)}</p>
            </div>
            <div className="border border-white/10 bg-white/[0.045] px-4 py-3">
              <p className="text-neutral-500">Settlement</p>
              <p className="mt-1 text-lg font-semibold text-white">{formatCount(summary?.settlementReady || 0)}</p>
            </div>
            <div className="border border-white/10 bg-white/[0.045] px-4 py-3">
              <p className="text-neutral-500">Delivery</p>
              <p className="mt-1 text-lg font-semibold text-white">{formatCount(summary?.deliveryReady || 0)}</p>
            </div>
            <div className="border border-white/10 bg-white/[0.045] px-4 py-3">
              <p className="text-neutral-500">Repair</p>
              <p className="mt-1 text-lg font-semibold text-white">{formatCount(summary?.repairOpen || 0)}</p>
            </div>
          </div>
        </header>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(420px,0.9fr)]">
          <div className="min-w-0 border border-white/10 bg-white/[0.035]">
            <div className="grid gap-3 border-b border-white/10 p-4 laptop:grid-cols-[minmax(220px,1fr)_170px_150px_150px_auto]">
              <label className="relative min-w-0">
                <span className="sr-only">Search pack activity</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" aria-hidden="true" />
                <input
                  value={search}
                  onChange={(event) => writeParams({ q: event.currentTarget.value })}
                  className="h-11 w-full border border-white/10 bg-black/30 pl-10 pr-3 text-sm text-neutral-100 outline-none transition placeholder:text-neutral-600 focus:border-emerald-300/45"
                  placeholder="Search titles, measurements, values, proof roots"
                />
              </label>
              <select
                value={type}
                onChange={(event) => writeParams({ type: event.currentTarget.value })}
                className="h-11 border border-white/10 bg-black/30 px-3 text-sm text-neutral-200 outline-none focus:border-emerald-300/45"
                aria-label="Activity type"
              >
                {TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <input
                value={state === 'all' ? '' : state}
                onChange={(event) => writeParams({ state: event.currentTarget.value || null })}
                className="h-11 border border-white/10 bg-black/30 px-3 text-sm text-neutral-200 outline-none placeholder:text-neutral-600 focus:border-emerald-300/45"
                placeholder="State"
                aria-label="State filter"
              />
              <select
                value={sort}
                onChange={(event) => writeParams({ sort: event.currentTarget.value })}
                className="h-11 border border-white/10 bg-black/30 px-3 text-sm text-neutral-200 outline-none focus:border-emerald-300/45"
                aria-label="Sort column"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    Sort: {option.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => writeParams({ direction: direction === 'asc' ? 'desc' : 'asc' })}
                className="inline-flex h-11 items-center justify-center gap-2 border border-emerald-400/25 bg-emerald-400/10 px-4 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-emerald-100 transition hover:border-emerald-300/45 hover:bg-emerald-400/16"
              >
                {direction === 'asc' ? <ArrowUpWideNarrow className="h-4 w-4" /> : <ArrowDownWideNarrow className="h-4 w-4" />}
                {direction}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-0 text-left">
                <thead className="text-[0.66rem] uppercase tracking-[0.18em] text-neutral-500">
                  <tr>
                    <th className="border-b border-white/10 px-4 py-3 font-medium">Pack</th>
                    <th className="border-b border-white/10 px-4 py-3 font-medium">Type</th>
                    <th className="border-b border-white/10 px-4 py-3 font-medium">Value</th>
                    <th className="border-b border-white/10 px-4 py-3 font-medium">Settlement</th>
                    <th className="border-b border-white/10 px-4 py-3 font-medium">Delivery</th>
                    <th className="border-b border-white/10 px-4 py-3 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-sm text-neutral-400">
                        Reading pack activity...
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-sm text-red-200">
                        {error}
                      </td>
                    </tr>
                  ) : hasRows ? (
                    records.map((record) => (
                      <tr
                        key={record.id}
                        aria-selected={record.id === selectedId}
                        className={`transition ${record.id === selectedId ? 'bg-emerald-400/[0.08]' : 'hover:bg-white/[0.035]'}`}
                      >
                        <td className="max-w-[420px] border-b border-white/8 px-4 py-4 align-top">
                          <button
                            type="button"
                            onClick={() => writeParams({ detailId: record.id })}
                            className="block w-full text-left outline-none transition focus-visible:ring-2 focus-visible:ring-emerald-300/55"
                            aria-label={`Inspect ${record.assetPackTitle || record.title}`}
                          >
                            <span className="block truncate text-sm font-medium text-white">{record.assetPackTitle || record.title}</span>
                            <span className="mt-1 line-clamp-2 block text-xs leading-5 text-neutral-400">{record.description}</span>
                            <span className="mt-2 block font-mono text-[0.66rem] text-neutral-600">{record.id}</span>
                          </button>
                        </td>
                        <td className="border-b border-white/8 px-4 py-4 align-top text-xs text-neutral-300">
                          {formatType(record.type)}
                        </td>
                        <td className="border-b border-white/8 px-4 py-4 align-top text-xs text-neutral-300">
                          {record.values[0]
                            ? `${record.values[0].amount} ${record.values[0].unit}`
                            : record.measurements[0]
                              ? `${record.measurements[0].value} ${record.measurements[0].unit || ''}`
                              : 'not measured'}
                        </td>
                        <td className="border-b border-white/8 px-4 py-4 align-top">{statusPill(record.settlementState)}</td>
                        <td className="border-b border-white/8 px-4 py-4 align-top">{statusPill(record.deliveryState)}</td>
                        <td className="border-b border-white/8 px-4 py-4 align-top text-xs text-neutral-400">
                          {formatTimestamp(record.timestamp)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-4 py-10 text-sm text-neutral-400">
                        No pack activity matched the current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-4 py-3">
              <div className="flex flex-wrap gap-2 text-[0.68rem] uppercase tracking-[0.16em] text-neutral-500">
                {topTypes.length ? topTypes.map(([activityType, count]) => (
                  <span key={activityType} className="border border-white/10 bg-white/[0.035] px-2.5 py-1">
                    {formatType(activityType as PackActivityType)} {count}
                  </span>
                )) : <span>No active type totals</span>}
              </div>
              <button
                type="button"
                onClick={() => void refresh()}
                className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] px-3 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-neutral-300 transition hover:border-emerald-300/30 hover:text-emerald-100"
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                Refresh
              </button>
            </div>
          </div>

          <aside className="min-w-0 border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))] p-5">
            {detail ? (
              <div className="grid gap-5">
                <div>
                  <p className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-emerald-200/80">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    Source-safe detail
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">{detail.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-300">{detail.description}</p>
                </div>

                <DetailSection title="Overview">
                  <dl className="grid gap-3 text-sm tablet:grid-cols-2">
                    <div>
                      <dt className="text-neutral-500">Type</dt>
                      <dd className="mt-1 text-neutral-100">{formatType(detail.type)}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-500">State</dt>
                      <dd className="mt-1 text-neutral-100">{detail.overview.state || 'not recorded'}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-500">Repository</dt>
                      <dd className="mt-1 text-neutral-100">{detail.overview.repository || 'not recorded'}</dd>
                    </div>
                    <div>
                      <dt className="text-neutral-500">Time</dt>
                      <dd className="mt-1 text-neutral-100">{formatTimestamp(detail.timestamp)}</dd>
                    </div>
                  </dl>
                </DetailSection>

                <DetailSection title="Measurements">
                  <div className="grid gap-2">
                    {detail.measurements.length ? detail.measurements.map((measurement) => (
                      <div key={`${measurement.id}:${measurement.value}`} className="flex items-center justify-between gap-3 border border-white/10 bg-black/18 px-3 py-2 text-sm">
                        <span className="text-neutral-400">{measurement.label}</span>
                        <span className="font-mono text-neutral-100">{measurement.value} {measurement.unit || ''}</span>
                      </div>
                    )) : <p className="text-sm text-neutral-500">No source-safe measurements recorded.</p>}
                  </div>
                </DetailSection>

                <DetailSection title="State readback">
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center justify-between gap-3">{statusPill(detail.states.settlement, 'settlement not recorded')}</div>
                    <div className="flex items-center justify-between gap-3">{statusPill(detail.states.compensation, 'compensation not recorded')}</div>
                    <div className="flex items-center justify-between gap-3">{statusPill(detail.states.delivery, 'delivery not recorded')}</div>
                    <div className="flex items-center justify-between gap-3">{statusPill(detail.states.repair, 'repair not recorded')}</div>
                  </div>
                </DetailSection>

                <DetailSection title="Proof roots">
                  <div className="grid gap-2">
                    {detail.proofRoots.length ? detail.proofRoots.map((proofRoot) => (
                      <div key={`${proofRoot.id}:${proofRoot.root}`} className="border border-white/10 bg-black/18 px-3 py-2">
                        <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">{proofRoot.label}</p>
                        <p className="mt-1 break-all font-mono text-xs text-emerald-100">{proofRoot.root}</p>
                      </div>
                    )) : <p className="text-sm text-neutral-500">No proof roots recorded.</p>}
                  </div>
                </DetailSection>
              </div>
            ) : (
              <div className="py-12 text-sm text-neutral-400">
                Select pack activity to inspect measurements, proof roots, settlement, compensation, delivery, and repair state.
              </div>
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}
