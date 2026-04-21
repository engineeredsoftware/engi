import type { Metadata } from 'next';

import ApplicationPageClient from './ApplicationPageClient';

export const metadata: Metadata = {
  title: 'Bitcode Terminal',
  description:
    'The Bitcode Terminal for agentic executions, need measurement, asset packs, settlements, proofs, conversations, and Auxillaries.',
  alternates: {
    canonical: '/application',
  },
};

export default function ApplicationPage() {
  return <ApplicationPageClient />;
}
