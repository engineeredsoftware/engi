import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: lsp
 * intent: "Bitcode LSP location-output sentence for replayable Need and AssetPack evidence"
 * current_version: "0.50.0"
 * versions: []
  * benchmarks: [
 *   { "name": "technical_accuracy", "test": "Uses concrete technical language", "score": 0.50 },
 *   { "name": "implementation_ready", "test": "Provides clear actionable guidance", "score": 0.50 }
 * ]
 */
export const PROMPTPART_SPECIFIC_LSP_LOCATION_OUTPUT_SENTENCE: PromptPart =
  'Array of location evidence objects with file paths, line and character positions, and contextual code surrounding the measured symbol for Need measurement, AssetPack fit, and proof replay' as PromptPart;
