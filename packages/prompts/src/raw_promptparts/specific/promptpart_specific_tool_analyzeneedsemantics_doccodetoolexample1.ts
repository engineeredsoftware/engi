/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Bitcode need semantics promptpart for the canonical analyze-need-semantics tool"
 * current_version: "V26.5.bitcode"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_precision", "test": "Does '{{content}}' use Bitcode need, written-asset, asset-pack, and delivery-mechanism semantics where applicable? Rate 0-1" },
 *   { "name": "canonical_boundary", "test": "Does '{{content}}' preserve Bitcode naming as product meaning and isolate delivery mechanisms? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZENEEDSEMANTICS_DOCCODETOOLEXAMPLE1: PromptPart =
  "Example 1 - Source-change need: analyzeNeedSemantics({ expressedNeed: \"Fix the OAuth redirect regression and open a PR\", repositoryContext: { stack: [\"Next.js\", \"Supabase\"] }, targetDimensions: [\"intent\", \"writtenAsset\", \"deliveryMechanism\", \"sourceToSharesService\"] }) -> identifies the need as auth regression repair, the stable written asset as code changes plus tests, the pull request as the delivery mechanism, and the source-to-shares service questions the customer/operator can audit." as PromptPart;
