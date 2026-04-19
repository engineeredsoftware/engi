"use client";

import React from 'react';

import AuxillariesProvider from '@/app/auxillaries/components/AuxillariesProvider';
import { AuthProvider } from '@/components/base/engi/auth/AuthProvider';
import Nav from '@/components/base/engi/layout/nav';
import { QueryProvider } from '@/react-providers/query-provider';

export default function PublicShellFrame({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <AuxillariesProvider>
          <Nav />
          {children}
        </AuxillariesProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
