/**
 * @bitcode/conversations-generics - Conversation domain types and utilities
 * 
 * This package provides type definitions that exactly match the GA-1 database schema
 * for conversations, messages, and attachments. No database access here - that's in ORM.
 * 
 * GA-1 version: 1.0.0
 * Pattern: domain-types
 * Philosophy: "Types as single source of truth"
 */

// Export all types
export * from './types';

// Export validation utilities
export * from './validation';

// Export business logic helpers
export * from './utils';

// Export conversation agent
export * from './agent/ConversationAgent';

// Export system prompt for Conversations
export { ConversationSystemPrompt, CONVERSATION_SYSTEM_PROMPT } from './prompts/ConversationSystemPrompt';
