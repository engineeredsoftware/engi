import type { Metadata } from 'next';
import React from 'react';

import TerminalPageClient from '@/app/terminal/TerminalPageClient';

export const metadata: Metadata = {
  title: 'Bitcode Terminal',
  description:
    'The Bitcode Terminal for Give, Need, recent activity, AssetPack results, proofs, and closure history.',
  alternates: {
    canonical: '/terminal',
  },
};

export default function TerminalPage() {
  return <TerminalPageClient />;
}
