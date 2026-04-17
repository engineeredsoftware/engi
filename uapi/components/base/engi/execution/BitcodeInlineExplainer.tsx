'use client';

import React from 'react';

import { cn } from '@bitcode/styling';

interface BitcodeInlineExplainerProps {
  title: string;
  description: string;
  side?: 'top' | 'bottom';
  className?: string;
  triggerClassName?: string;
}

export default function BitcodeInlineExplainer({
  title,
  description,
  side = 'bottom',
  className,
  triggerClassName,
}: BitcodeInlineExplainerProps) {
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
          'pointer-events-none absolute z-30 w-72 max-w-[calc(100vw-2rem)] rounded-[1rem] border border-white/10 bg-[rgba(4,8,18,0.96)] px-4 py-3 text-left opacity-0 shadow-[0_18px_48px_rgba(0,0,0,0.38)] transition duration-150 ease-out group-hover/bitcode-explainer:opacity-100 group-focus-within/bitcode-explainer:opacity-100',
          side === 'bottom'
            ? 'left-1/2 top-full mt-3 -translate-x-1/2'
            : 'bottom-full left-1/2 mb-3 -translate-x-1/2',
        )}
      >
        <span className="block text-[0.64rem] uppercase tracking-[0.16em] text-emerald-300/80">{title}</span>
        <span className="mt-2 block text-sm leading-6 text-neutral-200">{description}</span>
      </span>
    </span>
  );
}
