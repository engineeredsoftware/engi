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
export * from './types';
export * from './validation';
export * from './utils';
export * from './agent/ConversationAgent';
export { ConversationSystemPrompt, CONVERSATION_SYSTEM_PROMPT } from './prompts/ConversationSystemPrompt';
