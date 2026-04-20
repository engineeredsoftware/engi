'use client';

import React, { type ReactNode } from 'react';

import type { BitcodeExplainer } from '@/components/base/bitcode/execution/bitcode-transaction-types';

import ApplicationWorkspaceCard from './ApplicationWorkspaceCard';

interface ApplicationWorkspaceRailCardProps {
  kicker: string;
  title: string;
  summary?: string;
  children: ReactNode;
  tone?: 'default' | 'emerald';
  explainer?: BitcodeExplainer;
}

export default function ApplicationWorkspaceRailCard({
  kicker,
  title,
  summary,
  children,
  tone = 'default',
  explainer,
}: ApplicationWorkspaceRailCardProps) {
  return (
    <ApplicationWorkspaceCard
      kicker={kicker}
      title={title}
      summary={summary}
      tone={tone}
      size="compact"
      childrenClassName="mt-5"
      explainer={explainer}
    >
      {children}
    </ApplicationWorkspaceCard>
  );
}
