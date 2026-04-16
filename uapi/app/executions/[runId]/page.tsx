import type { Metadata } from 'next';

import { ExecutionDetailsView } from '@/app/executions/components/ExecutionsDetailsView';

type ExecutionRunPageProps = {
  params: {
    runId: string;
  };
};

export const metadata: Metadata = {
  title: '$BTD • Execution',
  description: 'Application-owned Bitcode execution details route.',
};

export default function ExecutionRunPage({ params }: ExecutionRunPageProps) {
  return (
    <div className="px-4 tablet:px-6 desktop:px-8">
      <ExecutionDetailsView runId={decodeURIComponent(params.runId)} />
    </div>
  );
}
