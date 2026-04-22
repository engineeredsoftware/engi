/**
 * Validation utilities for conversation domain
 *
 * Ensures data integrity before database operations
 */
import { ConversationMessageRole, CreateConversationInput, CreateMessageInput, CreateMessageAttachmentInput } from './types';
/**
 * Validate message role
 */
export declare function isValidMessageRole(role: string): role is ConversationMessageRole;
/**
 * Validate conversation creation input
 */
export declare function validateConversationInput(input: CreateConversationInput): void;
/**
 * Validate message creation input
 */
export declare function validateMessageInput(input: CreateMessageInput): void;
/**
 * Validate message attachment creation input
 */
export declare function validateMessageAttachmentInput(input: CreateMessageAttachmentInput): void;
