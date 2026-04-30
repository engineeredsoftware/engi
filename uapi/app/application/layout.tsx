import type { ReactNode } from 'react';
import React from 'react';

import ClientLayout from '@/app/ClientLayout';

export default function ApplicationLayout({ children }: { children: ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
