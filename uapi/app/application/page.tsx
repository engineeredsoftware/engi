import type { Metadata } from 'next';

import ApplicationPageClient from './ApplicationPageClient';

export const metadata: Metadata = {
  title: '$BTD • Bitcode Application',
  description:
    'Application-native Bitcode route carrying the first-gate V26 shell contract directly inside the app.',
  alternates: {
    canonical: '/application',
  },
};

export default function ApplicationPage() {
  return <ApplicationPageClient />;
}
