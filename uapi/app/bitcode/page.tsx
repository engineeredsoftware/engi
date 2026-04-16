import type { Metadata } from 'next';

import ClientLayout from '@/app/ClientLayout';

import BitcodePageClient from './BitcodePageClient';

export const metadata: Metadata = {
  title: '$BTD • Bitcode Application',
  description:
    'Application-native Bitcode route for the V26 productionizing transition away from homepage demo embedding.',
  alternates: {
    canonical: '/bitcode',
  },
};

export default function BitcodePage() {
  return (
    <ClientLayout>
      <BitcodePageClient />
    </ClientLayout>
  );
}
