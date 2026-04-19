import type { Metadata } from 'next';

import ApplicationPageClient from './ApplicationPageClient';

export const metadata: Metadata = {
  title: 'Bitcode Application',
  description:
    'Bitcode transactions for deliverables, proofs, history, conversations, and orbitals.',
  alternates: {
    canonical: '/application',
  },
};

export default function ApplicationPage() {
  return <ApplicationPageClient />;
}
