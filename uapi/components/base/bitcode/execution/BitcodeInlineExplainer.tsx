'use client';

import React, { useCallback, useState } from 'react';

import { cn } from '@bitcode/styling';
import type { BitcodeExplainer } from './bitcode-transaction-types';

type TooltipSide = 'top' | 'bottom';
type TooltipAlign = 'start' | 'center' | 'end';

interface TooltipPlacement {
  side: TooltipSide;
  align: TooltipAlign;
}

interface BitcodeInlineExplainerProps {
  explainer: BitcodeExplainer;
  side?: TooltipSide;
  className?: string;
  triggerClassName?: string;
}

const tooltipViewportMargin = 16;
const tooltipMaxWidth = 320;
const tooltipMinVerticalRoom = 240;

function resolveExplainerPlacement(trigger: HTMLElement, preferredSide: TooltipSide): TooltipPlacement {
  if (typeof window === 'undefined') {
    return { side: preferredSide, align: 'center' };
  }

  const rect = trigger.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const tooltipWidth = Math.min(tooltipMaxWidth, viewportWidth - tooltipViewportMargin * 2);
  const centerX = rect.left + rect.width / 2;
  const spaceAbove = rect.top;
  const spaceBelow = viewportHeight - rect.bottom;

  let align: TooltipAlign = 'center';
  if (centerX - tooltipWidth / 2 < tooltipViewportMargin) {
    align = 'start';
  } else if (centerX + tooltipWidth / 2 > viewportWidth - tooltipViewportMargin) {
    align = 'end';
  }

  let side = preferredSide;
  if (
    preferredSide === 'bottom' &&
    spaceBelow < tooltipMinVerticalRoom &&
    spaceAbove > spaceBelow
  ) {
    side = 'top';
  } else if (
    preferredSide === 'top' &&
    spaceAbove < tooltipMinVerticalRoom &&
    spaceBelow > spaceAbove
  ) {
    side = 'bottom';
  }

  return { side, align };
}

function tooltipPositionClassName({ side, align }: TooltipPlacement) {
  const sideClassName = side === 'bottom' ? 'top-full mt-3' : 'bottom-full mb-3';
  const alignClassName =
    align === 'start'
      ? 'left-0'
      : align === 'end'
        ? 'right-0'
        : 'left-1/2 -translate-x-1/2';

  return `${sideClassName} ${alignClassName}`;
}

function tooltipArrowClassName({ side, align }: TooltipPlacement) {
  const alignClassName =
    align === 'start'
      ? 'left-4'
      : align === 'end'
        ? 'right-4'
        : 'left-1/2 -translate-x-1/2';
  const sideClassName =
    side === 'bottom'
      ? '-top-[7px] border-x-[7px] border-b-[7px] border-x-transparent border-b-[rgba(4,8,18,0.98)]'
      : '-bottom-[7px] border-x-[7px] border-t-[7px] border-x-transparent border-t-[rgba(4,8,18,0.98)]';

  return `${alignClassName} ${sideClassName}`;
}

export default function BitcodeInlineExplainer({
  explainer,
  side = 'bottom',
  className,
  triggerClassName,
}: BitcodeInlineExplainerProps) {
  const [placement, setPlacement] = useState<TooltipPlacement>({ side, align: 'center' });
  const title = explainer.title;
  const summary = explainer.summary;
  const detail = explainer.detail;
  const points = explainer.points || [];
  const sourceRefs = explainer.references?.source || [];
  const canonRefs = explainer.references?.canon || [];

  const updatePlacement = useCallback(
    (event: React.SyntheticEvent<HTMLElement>) => {
      const trigger = event.currentTarget.querySelector('button');
      if (trigger instanceof HTMLElement) {
        setPlacement(resolveExplainerPlacement(trigger, side));
      }
    },
    [side],
  );

  return (
    <span
      className={cn('group/bitcode-explainer relative inline-flex items-center', className)}
      onFocus={updatePlacement}
      onMouseEnter={updatePlacement}
      onTouchStart={updatePlacement}
    >
      <button
        type="button"
        aria-label={`Explain ${title}`}
        onClick={(event) => event.preventDefault()}
        className={cn(
          'inline-flex h-[1.125rem] min-h-[1.125rem] w-[1.125rem] min-w-[1.125rem] shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/5 text-[0.62rem] font-semibold leading-none text-neutral-300 transition hover:border-emerald-300/35 hover:bg-emerald-400/10 hover:text-emerald-100 focus-visible:border-emerald-300/35 focus-visible:bg-emerald-400/10 focus-visible:text-emerald-100 focus-visible:outline-none',
          triggerClassName,
        )}
      >
        i
      </button>

      <span
        role="tooltip"
        className={cn(
          'pointer-events-none absolute z-30 w-[min(20rem,calc(100vw-2rem))] rounded-[1.15rem] border border-white/10 bg-[rgba(4,8,18,0.98)] px-4 py-4 text-left text-sm font-normal normal-case tracking-normal opacity-0 shadow-[0_24px_56px_rgba(0,0,0,0.42)] transition duration-150 ease-out group-hover/bitcode-explainer:opacity-100 group-focus-within/bitcode-explainer:opacity-100',
          tooltipPositionClassName(placement),
        )}
      >
        <span
          className={cn(
            'absolute h-0 w-0',
            tooltipArrowClassName(placement),
          )}
        />
        {explainer.kicker ? (
          <span className="relative block text-[0.62rem] font-medium uppercase tracking-[0.18em] text-emerald-300/80">{explainer.kicker}</span>
        ) : null}
        <strong className="relative mt-2 block text-sm font-semibold tracking-[0.01em] text-white">{title}</strong>
        <span className="relative mt-2 block text-sm font-normal normal-case tracking-normal leading-6 text-neutral-200">{summary}</span>
        {detail ? (
          <span className="relative mt-3 block border-t border-white/8 pt-3 text-sm font-normal normal-case tracking-normal leading-6 text-neutral-400">
            {detail}
          </span>
        ) : null}
        {points.length ? (
          <div className="relative mt-3 border-t border-white/8 pt-3">
            <span className="block text-[0.62rem] uppercase tracking-[0.18em] text-emerald-300/75">Use this to</span>
            <ul className="mt-2 space-y-1.5 text-sm font-normal normal-case tracking-normal leading-6 text-neutral-200">
            {points.map((point) => (
              <li key={`${title}-${point}`} className="flex gap-2">
                <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-300/70" />
                <span>{point}</span>
              </li>
            ))}
            </ul>
          </div>
        ) : null}
        {sourceRefs.length || canonRefs.length ? (
          <div className="relative mt-3 border-t border-white/8 pt-3">
            {sourceRefs.length ? (
              <div className="mt-2">
                <span className="block text-[0.62rem] uppercase tracking-[0.18em] text-emerald-300/75">
                  Current source
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {sourceRefs.map((ref) => (
                    <span
                      key={`${title}-source-${ref}`}
                      className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[0.58rem] uppercase tracking-[0.14em] text-neutral-200"
                    >
                      {ref}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {canonRefs.length ? (
              <div className="mt-2">
                <span className="block text-[0.62rem] uppercase tracking-[0.18em] text-emerald-300/75">
                  Current canon
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {canonRefs.map((ref) => (
                    <span
                      key={`${title}-canon-${ref}`}
                      className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[0.58rem] uppercase tracking-[0.14em] text-neutral-200"
                    >
                      {ref}
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
