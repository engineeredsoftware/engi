'use client';

import React from 'react';

import BitcodeDetailCollection from '@/components/base/engi/execution/BitcodeDetailCollection';
import BitcodePayloadDetailCard from '@/components/base/engi/execution/BitcodePayloadDetailCard';

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
    <BitcodePayloadDetailCard
      kicker="Proof families"
      title="Bounded proof stays in transaction detail"
      summary="Verification and settlement proof families remain readable inside the selected transaction rather than as a separate operator detour."
      payload={payload}
      rawLabel="Proof payload"
      actions={[
        { label: 'Open verification', onClick: onOpenVerification },
        { label: 'Open settlement', onClick: onOpenSettlement, tone: 'accent' },
      ]}
    >
      <>
        <BitcodeDetailCollection
          items={proofItems}
          emptyMessage="No proof families are surfaced on the selected transaction yet. Verification and settlement still remain part of the same Bitcode closure path."
        />
      </>
    </BitcodePayloadDetailCard>
  );
}
