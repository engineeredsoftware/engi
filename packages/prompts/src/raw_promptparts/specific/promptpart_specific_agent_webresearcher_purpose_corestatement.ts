/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: agent
 * intent: "Bitcode need-synthesis web research purpose"
 * current_version: "V26"
 * versions: []
 * benchmarks: [
 *   { "name": "purpose_boundary", "test": "States discovery-phase need-synthesis support without product ownership", "score": 1.00 }
 * ]
 */

import { PromptPart } from '../../parts/PromptPart';

export const PROMPTPART_SPECIFIC_AGENT_WEBRESEARCHER_PURPOSE_CORESTATEMENT: PromptPart =
  'Research the web during Bitcode discovery to support need synthesis with source-attributed external evidence, so downstream agents can measure needs, form proof-gap questions, understand third-party interfaces, and plan AssetPacks before downstream systems interpret, mutate, prove, or deliver.' as PromptPart;
