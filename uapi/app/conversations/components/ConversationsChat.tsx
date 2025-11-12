"use client";

import React from 'react';
import ConversationsChatShell from './chat/ConversationsChatShell';

interface ConversationsChatProps {
  messages: any[];
  onSend: (text: string, tokens?: any[]) => void;
  disabled?: boolean;
  placeholder?: string;
  currentConversationId?: string;
  containerRef?: React.Ref<HTMLDivElement>;
  renderTokenInMessage?: (token: any) => React.ReactNode;
  processLogOutputDetails?: Record<string, any>;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  className?: string;
}

export default function ConversationsChat(props: ConversationsChatProps) {
  return <ConversationsChatShell {...props} />;
}
