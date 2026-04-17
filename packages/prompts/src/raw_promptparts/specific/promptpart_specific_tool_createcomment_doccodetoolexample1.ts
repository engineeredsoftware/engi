/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Basic usage example for Create Comment Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "comment_clarity", "test": "Does the example in '{{content}}' clearly demonstrate straightforward comment creation? Rate 0-1" },
 *   { "name": "collaboration_value", "test": "Is the example in '{{content}}' representative of valuable team collaboration scenarios? Rate 0-1" },
 *   { "name": "platform_integration", "test": "Does '{{content}}' show effective platform integration for comments? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@bitcode/prompts';

export const PROMPTPART_SPECIFIC_TOOL_CREATECOMMENT_DOCCODETOOLEXAMPLE1: PromptPart = 
  'Code review feedback: createComment({ target_context: "PR-123", content: "Great refactoring of the authentication logic! Consider extracting the token validation into a separate utility function for better testability.", comment_type: "suggestion", target_line: 45, mentions: ["@auth-team"], sentiment_tone: "professional" }) → Creates review comment with positive sentiment analysis, automatically mentions relevant team members, and suggests code improvement with constructive tone optimization' as PromptPart;