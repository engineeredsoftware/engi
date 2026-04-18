import type { Metadata } from 'next';

import ApplicationPageClient from './ApplicationPageClient';

export const metadata: Metadata = {
  title: '$BTD • Bitcode Application',
  description:
    'Bitcode operator workspace for transactions, deliverables, proofs, history, conversations, and settings.',
  alternates: {
    canonical: '/application',
  },
};

export default function ApplicationPage() {
  return <ApplicationPageClient />;
}
