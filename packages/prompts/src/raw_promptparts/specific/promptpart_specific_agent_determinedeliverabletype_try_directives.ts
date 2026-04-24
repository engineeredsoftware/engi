import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode compatibility PromptPart for executing delivery-mechanism selection"
 * current_version: "0.50.0"
 * versions: []
 * benchmarks: [
 *   { "name": "execution_precision", "test": "Is execution precise?", "score": 0.36 },
 *   { "name": "operational_clarity", "test": "Are operations clear?", "score": 0.35 },
 *   { "name": "output_quality", "test": "Is output quality high?", "score": 0.34 }
 * ]
 */
export const PROMPTPART_SPECIFIC_AGENT_DETERMINEDELIVERABLETYPE_TRY_DIRECTIVES: PromptPart = 
  'Execute delivery-mechanism selection through Need analysis, destination-marker extraction, Shippable shape checks, AssetPack evidence compatibility assessment, confirmation requirement detection, confidence scoring, and Finish-route metadata generation' as PromptPart;
