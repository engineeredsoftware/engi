/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: tool
 * intent: "Capabilities enumeration for VCS list repositories tool"
 * current_version: "V26.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "capability_completeness", "test": "Does '{{content}}' comprehensively list all key capabilities? Rate 0-1", "score": 0.50 },
 *   { "name": "technical_precision", "test": "Are the capabilities described with precise technical language? Rate 0-1", "score": 0.50 },
 *   { "name": "feature_clarity", "test": "Can developers understand exactly what features are available? Rate 0-1", "score": 0.50 }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_VCSLISTREPOSITORIES_DOCCODETOOLCAPABILITIES: PromptPart = 
  'Provider-agnostic repository listing, pagination support, sorting by created/updated/pushed date, direction control (asc/desc), automatic authentication handling, connection fallback, timeout protection' as PromptPart;