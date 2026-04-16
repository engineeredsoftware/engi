import type { Metadata } from 'next';

import ExecutionsPage from '@/app/executions/components/ExecutionsPage';

export const metadata: Metadata = {
  title: '$BTD • Executions',
  description:
    'Application-owned Bitcode execution workspace for deliverables, measurement, and run inspection.',
  alternates: {
    canonical: '/executions',
  },
};

export default function ExecutionsRoutePage() {
  return <ExecutionsPage />;
}
