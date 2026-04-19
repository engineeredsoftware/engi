import type { Metadata } from 'next';

import ExecutionsPage from '@/app/executions/components/ExecutionsPage';

export const metadata: Metadata = {
  title: 'Bitcode Executions',
  description:
    'Retained Bitcode executions route for runs, deliverables, and pipeline inspection during fourth-gate convergence.',
  alternates: {
    canonical: '/executions',
  },
};

export default function ExecutionsRoutePage() {
  return <ExecutionsPage />;
}
