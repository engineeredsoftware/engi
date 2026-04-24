/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Bitcode need semantics promptpart for the retained analyze-task-semantics compatibility tool"
 * current_version: "V26.5.compat"
 * versions: []
 * benchmarks: [
 *   { "name": "bitcode_need_precision", "test": "Does '{{content}}' use Bitcode need, written-asset, asset-pack, and delivery-mechanism semantics where applicable? Rate 0-1" },
 *   { "name": "compatibility_boundary", "test": "Does '{{content}}' preserve compatibility naming only as a wrapper rather than product meaning? Rate 0-1" },
 *   { "name": "implementation_ready", "test": "Is '{{content}}' concrete enough for DocCodeToolPrompt runtime use? Rate 0-1" }
 * ]
 */

import type { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_TOOL_ANALYZETASKSEMANTICS_DOCCODETOOLEXAMPLE1: PromptPart =
  "Example 1 - Pull request written asset: analyzeNeedSemantics({ expressedNeed: \"Fix the OAuth redirect regression and open a PR\", repositoryContext: { stack: [\"Next.js\", \"Supabase\"] }, targetDimensions: [\"intent\", \"writtenAsset\", \"deliveryMechanism\", \"sourceToSharesService\"] }) -> identifies the need as auth regression repair, the stable written asset as code changes plus tests, the pull request as the delivery mechanism, and the source-to-shares service questions the customer/operator can audit." as PromptPart;
