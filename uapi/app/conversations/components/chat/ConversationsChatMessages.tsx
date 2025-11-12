"use client";

import React from 'react';
import ConversationsMessageWaterfall from '../ConversationsMessageWaterfall';

interface ConversationsChatMessagesProps {
  messages: any[];
  className?: string;
  containerRef?: React.Ref<HTMLDivElement>;
  embedProcessLogs?: boolean;
  processLogOutputDetails?: Record<string, any>;
  renderTokenInMessage?: (token: any) => React.ReactNode;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

export default function ConversationsChatMessages({
  messages,
  className = '',
  containerRef,
  embedProcessLogs = true,
  processLogOutputDetails,
  renderTokenInMessage,
  onScroll,
}: ConversationsChatMessagesProps) {
  return (
    <div ref={containerRef} className={`conversations-messages custom-scrollbar ${className}`} onScroll={onScroll}>
      <ConversationsMessageWaterfall
        messages={messages}
        renderTokenInMessage={renderTokenInMessage}
        embedProcessLogs={embedProcessLogs}
        processLogOutputDetails={processLogOutputDetails}
      />
    </div>
  );
}
