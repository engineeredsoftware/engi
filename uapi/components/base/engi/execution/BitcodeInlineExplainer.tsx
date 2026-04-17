'use client';

import React from 'react';

import { cn } from '@bitcode/styling';
import type { BitcodeExplainer } from './bitcode-transaction-types';

interface BitcodeInlineExplainerProps {
  explainer: BitcodeExplainer;
  side?: 'top' | 'bottom';
  className?: string;
  triggerClassName?: string;
}

export default function BitcodeInlineExplainer({
  explainer,
  side = 'bottom',
  className,
  triggerClassName,
}: BitcodeInlineExplainerProps) {
  const title = explainer.title;
  const summary = explainer.summary;
  const detail = explainer.detail;
  const points = explainer.points || [];
  const references = explainer.references;

  return (
    <span className={cn('group/bitcode-explainer relative inline-flex items-center', className)}>
      <button
        type="button"
        aria-label={`Explain ${title}`}
        onClick={(event) => event.preventDefault()}
        className={cn(
          'inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/12 bg-white/5 text-[0.62rem] font-semibold text-neutral-300 transition hover:border-emerald-300/35 hover:bg-emerald-400/10 hover:text-emerald-100 focus-visible:border-emerald-300/35 focus-visible:bg-emerald-400/10 focus-visible:text-emerald-100 focus-visible:outline-none',
          triggerClassName,
        )}
      >
        ?
      </button>

      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute z-30 w-80 max-w-[calc(100vw-2rem)] rounded-[1.15rem] border border-white/10 bg-[rgba(4,8,18,0.98)] px-4 py-4 text-left opacity-0 shadow-[0_24px_56px_rgba(0,0,0,0.42)] transition duration-150 ease-out group-hover/bitcode-explainer:opacity-100 group-focus-within/bitcode-explainer:opacity-100',
          side === 'bottom'
            ? 'left-1/2 top-full mt-3 -translate-x-1/2'
            : 'bottom-full left-1/2 mb-3 -translate-x-1/2',
        )}
      >
        {explainer.kicker ? (
          <span className="block text-[0.62rem] uppercase tracking-[0.18em] text-emerald-300/80">{explainer.kicker}</span>
        ) : null}
        <strong className="mt-2 block text-sm font-semibold tracking-[0.01em] text-white">{title}</strong>
        <span className="mt-2 block text-sm leading-6 text-neutral-200">{summary}</span>
        {detail ? <span className="mt-2 block text-sm leading-6 text-neutral-400">{detail}</span> : null}
        {points.length ? (
          <ul className="mt-3 space-y-1.5 text-sm leading-6 text-neutral-200">
            {points.map((point) => (
              <li key={`${title}-${point}`} className="flex gap-2">
                <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300/70" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        ) : null}
        {references?.source?.length || references?.canon?.length ? (
          <div className="mt-3 border-t border-white/8 pt-3">
            {references.source?.length ? (
              <div>
                <span className="text-[0.58rem] uppercase tracking-[0.16em] text-neutral-500">Current source</span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {references.source.map((reference) => (
                    <span
                      key={`${title}-source-${reference}`}
                      className="rounded-full border border-white/8 bg-white/5 px-2 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-neutral-300"
                    >
                      {reference}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {references.canon?.length ? (
              <div className={cn(references.source?.length ? 'mt-3' : undefined)}>
                <span className="text-[0.58rem] uppercase tracking-[0.16em] text-neutral-500">Current canon</span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {references.canon.map((reference) => (
                    <span
                      key={`${title}-canon-${reference}`}
                      className="rounded-full border border-emerald-400/18 bg-emerald-400/10 px-2 py-1 text-[0.62rem] uppercase tracking-[0.14em] text-emerald-100"
                    >
                      {reference}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </span>
    </span>
  );
}
