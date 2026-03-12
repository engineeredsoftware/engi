"use client";

import React from 'react';
import { ExecutionsDetailsView } from '@/app/executions/components/ExecutionsDetailsView';

export default function ExecutionRunPage({ params }: { params: { runId: string } }) {
  const { runId } = params;

  return (
    <div className="px-4 tablet:px-6 desktop:px-8 max-w-5xl mx-auto py-6">
      <ExecutionsDetailsView runId={runId} kind="deliverables" />
    </div>
  );
}
