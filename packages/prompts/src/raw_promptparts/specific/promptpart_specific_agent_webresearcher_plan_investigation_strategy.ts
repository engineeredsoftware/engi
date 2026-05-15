/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent-plan
 * intent: "Bitcode read-synthesis web research planning strategy"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "strategy_precision", "test": "Plans bounded discovery source classes and source-quality checks", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_PLAN_INVESTIGATION_STRATEGY: PromptPart =
  'Choose minimal query terms, preferred domains, source classes, timeframe filters, and source-quality checks that can ground discovery-phase Bitcode read synthesis; prefer official and primary sources before broader web context.' as PromptPart;
