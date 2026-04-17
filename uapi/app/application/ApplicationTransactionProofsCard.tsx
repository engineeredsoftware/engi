'use client';

import React from 'react';

import BitcodePayloadInspector from '@/components/base/engi/execution/BitcodePayloadInspector';

import type { ApplicationClosureProofFamily } from './application-closure-state';

interface ApplicationTransactionProofsCardProps {
  proofFamilies: ApplicationClosureProofFamily[];
  onOpenVerification: () => void;
  onOpenSettlement: () => void;
  payload: unknown;
}

export default function ApplicationTransactionProofsCard({
  proofFamilies,
  onOpenVerification,
  onOpenSettlement,
  payload,
}: ApplicationTransactionProofsCardProps) {
  return (
    <BitcodePayloadInspector
      kicker="Proof families"
      title="Bounded proof stays in transaction detail"
      summary="Verification and settlement proof families remain readable inside the selected transaction rather than as a separate operator detour."
      payload={payload}
      rawLabel="Proof payload"
    >
      <>
        {proofFamilies.length ? (
          <div className="space-y-3 text-sm">
            {proofFamilies.map((family) => (
              <div
                key={`${family.label}-${family.artifactPath}`}
                className="rounded-[1.1rem] border border-white/8 bg-white/5 px-4 py-4"
              >
                <p className="font-medium text-white">{family.label}</p>
                <p className="mt-1 text-neutral-300">
                  {family.theoremStatus} · replay {family.replayArtifacts}
                </p>
                <p className="mt-1 break-all text-neutral-500">{family.artifactPath}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-[1.1rem] border border-white/8 bg-white/5 px-4 py-4 text-sm leading-6 text-neutral-300">
            No proof families are surfaced on the selected transaction yet. Verification and settlement still remain part
            of the same Bitcode closure path.
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onOpenVerification}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-neutral-200 transition hover:border-emerald-300/35 hover:bg-emerald-400/10"
          >
            Open verification
          </button>
          <button
            type="button"
            onClick={onOpenSettlement}
            className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-2 text-[0.72rem] uppercase tracking-[0.18em] text-emerald-100 transition hover:border-emerald-300/45 hover:bg-emerald-400/15"
          >
            Open settlement
          </button>
        </div>
      </>
    </BitcodePayloadInspector>
  );
}
