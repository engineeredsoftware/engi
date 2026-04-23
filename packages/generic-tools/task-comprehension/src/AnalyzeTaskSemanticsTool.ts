import { Tool } from '@bitcode/tools-generics';
import { ANALYZE_TASK_SEMANTICS_DOC_CODE_TOOL_PROMPT } from './prompts/AnalyzeTaskSemanticsDocCodeToolPrompt';

/**
 * Analyze need semantics through the retained task-named compatibility API.
 */
async function analyzeTaskSemantics(
  task_description: string,
  context_information?: {
    repository_type?: string;
    technology_stack?: string[];
    existing_attachments?: string[];
  }
) {
  const expressedNeed = task_description.trim();

  return {
    need: {
      expressed_need: expressedNeed,
      primary_intent: expressedNeed || "Unspecified Bitcode need",
      satisfaction_criteria: [
        "Written assets satisfy the expressed need",
        "Asset-pack state remains coherent with repository context",
        "Shipping wrapper boundaries are explicit"
      ]
    },
    semantic_analysis: {
      primary_intent: expressedNeed || "Intent extracted from expressed need",
      scope_boundaries: [
        "Bitcode-owned asset-pack scope",
        "Connected-interface shipping-wrapper scope"
      ],
      semantic_keywords: ["need", "written-asset", "asset-pack", "shipping-wrapper"],
      implied_requirements: [
        "Preserve proof-facing requirements",
        "Keep compatibility names from owning product semantics"
      ],
      complexity_indicators: [
        "Repository/package impact",
        "Proof and verification impact"
      ]
    },
    written_asset_expectations: ["source-bearing written asset", "verification evidence"],
    asset_pack_context: {
      repository_type: context_information?.repository_type,
      technology_stack: context_information?.technology_stack ?? [],
      attachment_names: context_information?.existing_attachments ?? []
    },
    shipping_wrapper_boundaries: ["GitHubPullRequest", "JiraComment", "interface-specific wrapper"],
    task_classification: {
      primary_type: "feature_implementation" as const,
      secondary_types: ["enhancement", "integration"] as const,
      confidence: 0.85
    },
    scope_analysis: {
      estimated_scope: "medium" as const,
      affected_components: ["Component A", "Component B"],
      integration_points: ["Integration 1", "Integration 2"]
    }
  };
}

/**
 * @doc-code-tool
 * @prompt ANALYZE_TASK_SEMANTICS_DOC_CODE_TOOL_PROMPT
 */
export class AnalyzeTaskSemanticsTool extends Tool<typeof analyzeTaskSemantics> {
  use = analyzeTaskSemantics;
}

// Export singleton instance
export const analyzeTaskSemanticsTool = new AnalyzeTaskSemanticsTool();
