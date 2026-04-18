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
        i
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
        <span
          className={cn(
            'absolute left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 border border-white/10 bg-[rgba(4,8,18,0.98)]',
            side === 'bottom' ? '-top-2' : '-bottom-2',
          )}
        />
        {explainer.kicker ? (
          <span className="relative block text-[0.62rem] uppercase tracking-[0.18em] text-emerald-300/80">{explainer.kicker}</span>
        ) : null}
        <strong className="relative mt-2 block text-sm font-semibold tracking-[0.01em] text-white">{title}</strong>
        <span className="relative mt-2 block text-sm leading-6 text-neutral-200">{summary}</span>
        {detail ? (
          <span className="relative mt-3 block border-t border-white/8 pt-3 text-sm leading-6 text-neutral-400">
            {detail}
          </span>
        ) : null}
        {points.length ? (
          <div className="relative mt-3 border-t border-white/8 pt-3">
            <span className="block text-[0.62rem] uppercase tracking-[0.18em] text-emerald-300/75">Use this to</span>
            <ul className="mt-2 space-y-1.5 text-sm leading-6 text-neutral-200">
            {points.map((point) => (
              <li key={`${title}-${point}`} className="flex gap-2">
                <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300/70" />
                <span>{point}</span>
              </li>
            ))}
            </ul>
          </div>
        ) : null}
      </span>
    </span>
  );
}
