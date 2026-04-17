'use client';

import React, { type ReactNode } from 'react';

interface ApplicationSurfaceSectionProps {
  kicker: string;
  title: string;
  summary: string;
  children: ReactNode;
  tone?: 'default' | 'emerald';
  className?: string;
  childrenClassName?: string;
  headerAside?: ReactNode;
}

export default function ApplicationSurfaceSection({
  kicker,
  title,
  summary,
  children,
  tone = 'default',
  className,
  childrenClassName,
  headerAside,
}: ApplicationSurfaceSectionProps) {
  const toneClassName =
    tone === 'emerald'
      ? 'border-emerald-400/15 bg-[linear-gradient(180deg,rgba(8,14,28,0.96),rgba(4,8,18,0.94))] shadow-[0_30px_100px_rgba(0,0,0,0.42)]'
      : 'border-white/10 bg-[linear-gradient(180deg,rgba(6,10,20,0.96),rgba(4,8,16,0.94))] shadow-[0_30px_100px_rgba(0,0,0,0.38)]';

  return (
    <section className={`overflow-hidden rounded-[2rem] border px-6 py-6 ${toneClassName} ${className || ''}`.trim()}>
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-3xl">
          <p className="text-[0.72rem] uppercase tracking-[0.3em] text-emerald-300/80">{kicker}</p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white tablet:text-[2.05rem]">{title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-300">{summary}</p>
        </div>
        {headerAside ? <div className="shrink-0">{headerAside}</div> : null}
      </div>

      <div className={`mt-6 ${childrenClassName || 'space-y-6'}`.trim()}>{children}</div>
    </section>
  );
}
