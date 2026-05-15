import type { Metadata } from 'next';

import ExecutionsPage from '@/app/executions/components/ExecutionsPage';

export const metadata: Metadata = {
  title: 'Bitcode Executions',
  description:
    'Bitcode /executions route for execution primitives, asset-pack pipeline runs, and measured-Read follow-through inside the broader Bitcode activity family.',
  alternates: {
    canonical: '/executions',
  },
};

export default function ExecutionsRoutePage() {
  return <ExecutionsPage />;
}
