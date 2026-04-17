'use client';

import React from 'react';

import BitcodeDetailCollection from '@/components/base/engi/execution/BitcodeDetailCollection';
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
  const proofItems = proofFamilies.map((family) => ({
    id: `${family.label}-${family.artifactPath}`,
    title: family.label,
    summary: `${family.theoremStatus} · replay ${family.replayArtifacts}`,
    supportingText: family.artifactPath,
  }));

  return (
    <BitcodePayloadInspector
      kicker="Proof families"
      title="Bounded proof stays in transaction detail"
      summary="Verification and settlement proof families remain readable inside the selected transaction rather than as a separate operator detour."
      payload={payload}
      rawLabel="Proof payload"
    >
      <>
        <BitcodeDetailCollection
          items={proofItems}
          emptyMessage="No proof families are surfaced on the selected transaction yet. Verification and settlement still remain part of the same Bitcode closure path."
        />

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
