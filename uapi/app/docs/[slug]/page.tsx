import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PublicShellFrame from '@/app/(root)/components/PublicShellFrame';

import DocsArticlePage from '../DocsArticlePage';
import { BITCODE_DOCS_PAGE_SLUGS, getBitcodeDocsPage } from '../bitcode-docs-content';

type DocsRouteProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return BITCODE_DOCS_PAGE_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: DocsRouteProps): Metadata {
  const page = getBitcodeDocsPage(params.slug);

  if (!page) {
    return {
      title: 'Bitcode Docs',
    };
  }

  return {
    title: `${page.title} | Bitcode Docs`,
    description: page.summary,
    alternates: {
      canonical: page.href,
    },
  };
}

export default function DocsRoutePage({ params }: DocsRouteProps) {
  const page = getBitcodeDocsPage(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <PublicShellFrame>
      <DocsArticlePage page={page} />
    </PublicShellFrame>
  );
}
