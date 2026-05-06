import { access } from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next';

import PublicShellFrame from '../(root)/components/PublicShellFrame';
import PublicDocsPageContent from '../(root)/components/PublicDocsPageContent';
import { MARKETING_OPERATOR_GUIDE_SOURCE } from '../(root)/components/marketing-operator-guide-assets';

export const metadata: Metadata = {
  title: 'Bitcode Docs',
  description:
    'Redirect path into the Bitcode docs hub, including the walkthrough, inline widgets, and direct links into live transactions.',
  alternates: {
    canonical: '/docs',
  },
};

async function resolveOperatorGuideSourcePlayable() {
  try {
    await access(path.join(process.cwd(), MARKETING_OPERATOR_GUIDE_SOURCE.relativeSourcePath));
    return true;
  } catch {
    return false;
  }
}

export default async function OperatorGuidePage() {
  const sourcePlayable = await resolveOperatorGuideSourcePlayable();

  return (
    <PublicShellFrame>
      <PublicDocsPageContent sourcePlayable={sourcePlayable} />
    </PublicShellFrame>
  );
}
