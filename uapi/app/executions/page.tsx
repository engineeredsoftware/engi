import type { Metadata } from 'next';

import ExecutionsPage from '@/app/executions/components/ExecutionsPage';

export const metadata: Metadata = {
  title: 'Bitcode Executions',
  description:
    'Retained /executions compatibility route for Bitcode execution primitives, pipeline runs, and measured-need follow-through inside the broader Bitcode activity family.',
  alternates: {
    canonical: '/executions',
  },
};

export default function ExecutionsRoutePage() {
  return <ExecutionsPage />;
}
