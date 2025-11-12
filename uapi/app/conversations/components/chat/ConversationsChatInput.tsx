"use client";

import React from 'react';
import ConversationsEnhancedRichTextInput from '../ConversationsEnhancedRichTextInput';

interface ConversationsChatInputProps {
  onSend: (text: string, tokens?: any[]) => void;
  disabled?: boolean;
  placeholder?: string;
  currentConversationId?: string;
  className?: string;
}

const ConversationsChatInput = React.forwardRef<HTMLTextAreaElement, ConversationsChatInputProps>(function ConversationsChatInput({
  onSend,
  disabled,
  placeholder,
  currentConversationId,
  className = '',
}, ref) {
  return (
    <div className={`conversations-input ${className}`}>
      {/* Rich text input container */}
      <ConversationsEnhancedRichTextInput
        ref={ref as any}
        onSend={onSend}
        currentConversationId={currentConversationId}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
});

export default ConversationsChatInput;
