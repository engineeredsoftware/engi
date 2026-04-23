/**\n * @doc-comment-developing-promptdevelopment\n * domain: agent\n * intent: "(fill intent)"\n * current_version: "GA1.45.0"\n * dependencies: { }\n * benchmarks: [\n *   { "name": "technical_accuracy", "test": "Concrete directives and purpose", "score": 0.46 },\n *   { "name": "implementation_ready", "test": "Usable by registry formatter", "score": 0.46 }\n * ]\n */
/**
 * NEED COMPREHENSION DOC-CODE-TOOL PROMPTS BARREL EXPORT
 *
 * Central export for retained task-comprehension compatibility prompts.
 * The compatibility class names remain stable, but the prompt content now
 * describes canonical Bitcode need, asset-pack, written-asset, and
 * shipping-wrapper inference.
 */

export * from './AnalyzeTaskSemanticsDocCodeToolPrompt';
export * from './ExtractRequirementsDocCodeToolPrompt';
export * from './IdentifyConstraintsDocCodeToolPrompt';
export * from './GenerateSuccessCriteriaDocCodeToolPrompt';
export * from './ValidateTaskComprehensionDocCodeToolPrompt';
export * from './AnalyzeImplementationComplexityDocCodeToolPrompt';
