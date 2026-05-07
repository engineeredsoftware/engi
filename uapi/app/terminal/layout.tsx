import type { ReactNode } from 'react';
import React from 'react';

import ClientLayout from '@/app/ClientLayout';

export default function TerminalLayout({ children }: { children: ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>;
}
