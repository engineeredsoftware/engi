'use client';

import React, { type ReactNode } from 'react';

import ApplicationOperatorCard from './ApplicationOperatorCard';

interface ApplicationWorkspaceRailCardProps {
  kicker: string;
  title: string;
  summary?: string;
  children: ReactNode;
  tone?: 'default' | 'emerald';
}

export default function ApplicationWorkspaceRailCard({
  kicker,
  title,
  summary,
  children,
  tone = 'default',
}: ApplicationWorkspaceRailCardProps) {
  return (
    <ApplicationOperatorCard
      kicker={kicker}
      title={title}
      summary={summary}
      tone={tone}
      size="compact"
      childrenClassName="mt-5"
    >
      {children}
    </ApplicationOperatorCard>
  );
}
