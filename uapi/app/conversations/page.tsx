import type { Metadata } from 'next';

import ConversationsRouteClient from './ConversationsRouteClient';

export const metadata: Metadata = {
  title: 'Bitcode Conversations',
  alternates: {
    canonical: '/conversations',
  },
};

export default function ConversationsPage() {
  return <ConversationsRouteClient />;
}
