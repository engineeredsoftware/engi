'use client';

import React from 'react';

import ApplicationWorkspaceCard from './ApplicationWorkspaceCard';
import ApplicationRuntimeDrawer from './ApplicationRuntimeDrawer';
import BitcodeApplicationRuntimeMount from './BitcodeApplicationRuntimeMount';
import { APPLICATION_WORKSPACE_EXPLAINERS } from './application-workspace-explainers';

export default function ApplicationPreservedShellSurface() {
  return (
    <ApplicationWorkspaceCard
      id="applicationLowerRuntime"
      kicker="Closure runtime"
      title="Open the proof and settlement runtime only when deeper closure detail is required"
      summary="Stay in the Bitcode Terminal for normal reading and drafting. Open this runtime only when you need replay detail, mount-level verification, or dense proof follow-through."
      explainer={APPLICATION_WORKSPACE_EXPLAINERS.sourcePath}
      className="min-w-0"
      childrenClassName="space-y-5"
    >
      <div className="grid gap-3 text-xs uppercase tracking-[0.22em] text-neutral-400 tablet:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
          <p className="text-emerald-300/85">Use this for</p>
          <p className="mt-2 text-neutral-200">exact follow-through + replay checks</p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4">
          <p className="text-emerald-300/85">Keep primary</p>
          <p className="mt-2 text-neutral-200">transactions + selected detail</p>
        </div>
      </div>

      <ApplicationRuntimeDrawer
        title="Open proof and settlement runtime"
        summary="This keeps the dense proof and settlement runtime available for inspection and closure follow-through while the main application stays centered on the cleaner Terminal activity read."
      >
        <div className="min-w-0 p-2 tablet:p-4">
          <BitcodeApplicationRuntimeMount />
        </div>
      </ApplicationRuntimeDrawer>
    </ApplicationWorkspaceCard>
  );
}
