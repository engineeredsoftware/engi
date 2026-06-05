import type { Metadata } from 'next';
import React, { Suspense } from 'react';

import TerminalPageClient from '@/app/terminal/TerminalPageClient';

export const metadata: Metadata = {
  title: 'Bitcode Terminal Operator Workspace',
  description:
    'Retained Bitcode operator workspace for detailed execution inspection, compatibility activity, proofs, and closure history.',
  alternates: {
    canonical: '/terminal',
  },
};

export default function TerminalPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#02050d] px-6 pt-32 text-neutral-100">
          <div className="rounded-2xl border border-emerald-400/15 bg-white/5 px-5 py-5 text-sm text-neutral-300">
            Reading Terminal route state…
          </div>
        </main>
      }
    >
      <TerminalPageClient />
    </Suspense>
  );
}
