import type { Metadata } from 'next';

import ExecutionsPage from '@/app/executions/components/ExecutionsPage';

export const metadata: Metadata = {
  title: 'Bitcode Activity',
  description:
    'Retained /executions compatibility route converging on Bitcode activity, with transactions first and broader notifications or public/personal system activity following in later closure.',
  alternates: {
    canonical: '/executions',
  },
};

export default function ExecutionsRoutePage() {
  return <ExecutionsPage />;
}
