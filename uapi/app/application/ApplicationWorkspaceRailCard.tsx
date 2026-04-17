'use client';

import React, { type ReactNode } from 'react';

import type { BitcodeExplainer } from '@/components/base/engi/execution/bitcode-transaction-types';

import ApplicationOperatorCard from './ApplicationOperatorCard';

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
    <ApplicationOperatorCard
      kicker={kicker}
      title={title}
      summary={summary}
      tone={tone}
      size="compact"
      childrenClassName="mt-5"
      explainer={explainer}
    >
      {children}
    </ApplicationOperatorCard>
  );
}
