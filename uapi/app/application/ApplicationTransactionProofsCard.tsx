'use client';

import React from 'react';

import type { ApplicationClosureProofFamily } from './application-closure-state';

interface ApplicationTransactionProofsCardProps {
  proofFamilies: ApplicationClosureProofFamily[];
  onOpenVerification: () => void;
  onOpenSettlement: () => void;
}

export default function ApplicationTransactionProofsCard({
  proofFamilies,
  onOpenVerification,
  onOpenSettlement,
}: ApplicationTransactionProofsCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-5">
      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-neutral-400">Proof families</p>
      <h3 className="mt-2 text-lg font-semibold text-white">Bounded proof stays in transaction detail</h3>
      <p className="mt-2 text-sm leading-6 text-neutral-300">
        Verification and settlement proof families remain readable inside the selected transaction rather than as a
        separate operator detour.
      </p>

      {proofFamilies.length ? (
        <div className="mt-4 space-y-3 text-sm">
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
        <div className="mt-4 rounded-[1.1rem] border border-white/8 bg-white/5 px-4 py-4 text-sm leading-6 text-neutral-300">
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
    </div>
  );
}
