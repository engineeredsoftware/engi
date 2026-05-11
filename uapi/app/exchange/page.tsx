import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import PublicShellFrame from '@/app/(root)/components/PublicShellFrame';
import { FEATURE_FLAGS } from '@/config/features';

import ExchangePageClient from './ExchangePageClient';

export const metadata: Metadata = {
  title: 'Bitcode Exchange',
  description:
    'Search Bitcode Exchange activity, select activity rows, and inspect AssetPack evidence, proofs, history, and execution detail.',
  alternates: {
    canonical: '/exchange',
  },
};

export default function ExchangePage() {
  if (FEATURE_FLAGS.DISABLE_EXCHANGE_ROUTE) {
    redirect('/terminal');
  }

  return (
    <PublicShellFrame>
      <Suspense
        fallback={
          <main className="min-h-screen bg-[#02050d] px-4 pb-24 pt-32 text-neutral-100 tablet:px-6 desktop:px-8">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-10 text-sm text-neutral-300">
              Loading Bitcode Exchange…
            </div>
          </main>
        }
      >
        <ExchangePageClient />
      </Suspense>
    </PublicShellFrame>
  );
}
