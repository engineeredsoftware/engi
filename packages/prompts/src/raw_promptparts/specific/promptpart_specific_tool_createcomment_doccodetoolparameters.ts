/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: parameters
 * intent: "Parameter specification for Create Comment Tool"
 * current_version: "V26.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "communication_flexibility", "test": "Do the parameters in '{{content}}' support flexible and sophisticated communication scenarios? Rate 0-1" },
 *   { "name": "context_awareness", "test": "Are context-aware and intelligent communication parameters effectively included in '{{content}}'? Rate 0-1" },
 *   { "name": "collaboration_optimization", "test": "Do parameters support optimized collaboration and team communication workflows in '{{content}}'? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_CREATECOMMENT_DOCCODETOOLPARAMETERS: PromptPart = 
  'target_context: string (PR, issue, commit, or discussion identifier), content: string (comment text with markdown support), comment_type: "review" | "discussion" | "suggestion" | "question" | "approval" (categorization), target_line?: number (specific line reference for code comments), mentions?: string[] (user or team mentions with smart suggestion), thread_id?: string (conversation threading support), visibility: "public" | "team" | "private" (access control), priority?: "low" | "normal" | "high" | "urgent" (comment importance), auto_translate?: boolean (enable multilingual support), sentiment_tone?: "professional" | "friendly" | "direct" (tone optimization), attachments?: File[] (media and document attachments), reply_to?: string (parent comment for threaded discussions), and notification_settings?: object (custom notification preferences)' as PromptPart;