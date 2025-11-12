"use client";
// Route component: /executions
// Unified executions page; renders the ExecutionsPage component.

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ExecutionsPage from './components/ExecutionsPage';

export default function ExecutionsPage() {
  const router = useRouter();
  const search = useSearchParams();
  const executionId = search.get('executionId');
  const runId = search.get('runId');

  // Ensure backward-compatible param for embedded pages that still read `runId`
  useEffect(() => {
    if (executionId && !runId) {
      const params = new URLSearchParams(Array.from(search.entries()));
      params.set('runId', executionId);
      router.replace(`/executions?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [executionId, runId]);

  return <ExecutionsPage />;
}
