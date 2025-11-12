"use client";
// Route-level page component for /executions
// Unifies Deliverables and AI Documents flows behind a single experience.

import React, { Suspense } from 'react';
import { ExecutionsClient } from './ExecutionsPageClient';

export default function ExecutionsPage() {
  return (
    <div className="px-4 tablet:px-6 desktop:px-8">
      <Suspense fallback={null}>
        <ExecutionsClient />
      </Suspense>
    </div>
  );
}

