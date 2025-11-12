/**
 * Conversation Business Logic
 * 
 * All conversation-related business logic lives here
 * Uses ORM models for database access
 * 
 * Architecture:
 * - Message-level attachments (not conversation-level)
 * - Universal attachment system (VCS, File, URL, Integration, Pipeline Execution)
 * - Pipeline executions attached to assistant messages
 * - User scoping for all operations
 */

// Export all conversation operations
export * from './conversations';
export * from './messages';
export * from './attachments';
export * from './streaming';
