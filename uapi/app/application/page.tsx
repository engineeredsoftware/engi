import type { Metadata } from 'next';

import ApplicationPageClient from './ApplicationPageClient';

export const metadata: Metadata = {
  title: '$BTD • Bitcode Application',
  description:
    'Application-native Bitcode route for the V26 productionizing transition away from homepage demo embedding.',
  alternates: {
    canonical: '/application',
  },
};

export default function ApplicationPage() {
  return <ApplicationPageClient />;
}
