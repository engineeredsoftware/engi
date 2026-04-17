'use client';

import React, { type ReactNode } from 'react';

interface ApplicationRuntimeDrawerProps {
  title: string;
  summary: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function ApplicationRuntimeDrawer({
  title,
  summary,
  children,
  defaultOpen = false,
}: ApplicationRuntimeDrawerProps) {
  return (
    <details
      open={defaultOpen}
      className="group/runtime-drawer rounded-[1.6rem] border border-white/8 bg-black/20 px-5 py-5"
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-emerald-300/80">Lower runtime detail</p>
          <h4 className="mt-2 text-lg font-semibold tracking-tight text-white">{title}</h4>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-300">{summary}</p>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.66rem] uppercase tracking-[0.18em] text-neutral-200 transition group-open/runtime-drawer:border-emerald-400/25 group-open/runtime-drawer:bg-emerald-400/10 group-open/runtime-drawer:text-emerald-100">
          <span className="group-open/runtime-drawer:hidden">Open</span>
          <span className="hidden group-open/runtime-drawer:inline">Close</span>
        </span>
      </summary>

      <div className="mt-5">{children}</div>
    </details>
  );
}
