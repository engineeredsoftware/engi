'use client';

import type { ApplicationCommandState } from './application-command-state';
import { deriveApplicationFlowGuide } from './application-flow-guide';
import type { BitcodeTransactionReadiness } from './bitcode-transaction-readiness';

interface ApplicationFlowGuideCardProps {
  commandState: ApplicationCommandState | null;
  continuationTip: string;
  transactionReadiness?: BitcodeTransactionReadiness | null;
}

function toneClasses(status: 'done' | 'current' | 'next') {
  if (status === 'done') return 'border-emerald-400/25 bg-emerald-400/10 text-emerald-100';
  if (status === 'current') return 'border-sky-400/25 bg-sky-400/10 text-sky-100';
  return 'border-white/10 bg-white/5 text-neutral-200';
}

function readinessToneClasses(
  readinessLabel: 'syncing' | 'review-only' | 'draft-only' | 'drafting' | 'saved' | 'ready',
) {
  if (readinessLabel === 'ready') return toneClasses('done');
  if (readinessLabel === 'drafting') return toneClasses('current');
  if (readinessLabel === 'draft-only' || readinessLabel === 'review-only') {
    return 'border-amber-400/25 bg-amber-400/10 text-amber-100';
  }
  return toneClasses('next');
}

export default function ApplicationFlowGuideCard({
  commandState,
  continuationTip,
  transactionReadiness,
}: ApplicationFlowGuideCardProps) {
  const guide = deriveApplicationFlowGuide(commandState, transactionReadiness);

  return (
    <div className="rounded-[1.5rem] border border-white/8 bg-black/20 px-5 py-5">
      <div className="flex items-center gap-2">
        <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Give + Need flow guide</p>
        <span
          className={`rounded-full border px-2 py-1 text-[0.58rem] uppercase tracking-[0.18em] ${readinessToneClasses(guide.readinessLabel)}`}
        >
          {guide.readinessLabel}
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-neutral-200">{guide.statusSummary}</p>
      <p className="mt-3 text-xs leading-6 text-neutral-400">{continuationTip}</p>

      <div className="mt-4 grid gap-3">
        {guide.stages.map((stage, index) => (
          <div
            key={stage.id}
            className={`rounded-[1.1rem] border px-4 py-4 ${toneClasses(stage.status)}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.58rem] uppercase tracking-[0.18em] text-neutral-400/80">
                  {index + 1}. {stage.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-current">{stage.summary}</p>
              </div>
              <span className="rounded-full border border-current/20 bg-black/20 px-2 py-1 text-[0.56rem] uppercase tracking-[0.16em]">
                {stage.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
