/**
 * @doc-comment-developing-promptpartdevelopment
 * domain: examples
 * intent: "Advanced usage example for Create Or Update File Tool"
 * current_version: "GA1.02.0"
 * versions: []
 * benchmarks: [
 *   { "name": "advanced_features", "test": "Does the example in '{{content}}' showcase advanced file management features? Rate 0-1" },
 *   { "name": "conflict_handling", "test": "Does '{{content}}' demonstrate sophisticated conflict resolution capabilities? Rate 0-1" },
 *   { "name": "template_usage", "test": "Are template and variable substitution features highlighted in '{{content}}'? Rate 0-1" }
 * ]
 */

import { PromptPart } from '@engi/prompts';

export const PROMPTPART_SPECIFIC_TOOL_CREATEORUPDATEFILE_DOCCODETOOLEXAMPLE2: PromptPart = 
  'Template-based component generation: createOrUpdateFile({ file_path: "src/components/{{componentName}}.tsx", content: componentTemplate, operation_mode: "create", template_variables: { componentName: "UserProfile", author: "dev-team", timestamp: "2024-08-02" }, validation_rules: ["typescript-syntax", "react-component"], conflict_resolution: "fail", atomic: true, metadata: { "generator": "component-scaffolder", "version": "GA1.01.0" } }) → Creates React component file with template expansion, TypeScript validation, and prevents overwriting existing files' as PromptPart;