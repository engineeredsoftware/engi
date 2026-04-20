#!/bin/bash

# PROMPT PRIMITIVES EVOLUTION REVIEW
# Interactive review for the systematic evolution of all generic-tools with prompt primitives

set -euo pipefail

# Source the base review framework
source "$(dirname "$0")/../base-review.sh"

# Sub-review A: Prompt Primitive Architecture
sub_review_a() {
    local sub_id="$1"
    local title="Prompt Primitive Architecture Review"
    local description="Evaluating the abstraction level and structure of specific capability prompts"
    
    local code_snippets=(
        "packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_multimodalprocessing_doccodetoolcapabilities.ts|1|17|Multimodal Processing Capabilities"
        "packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_repositorysetup_doccodetoolcapabilities.ts|1|17|Repository Setup Capabilities"
        "packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_systemtextsearch_doccodetoolcapabilities.ts|1|17|System Text Search Capabilities"
    )
    
    run_sub_review "$sub_id" "$title" "$description" \
        "${code_snippets[@]}" \
        --questions \
        "Are the specific capabilities prompts at the right abstraction level - detailed enough for tool understanding but not implementation-specific?" \
        "Do the tool groupings and usage patterns align with how agents should strategically use these tools?" \
        "Are the 'Integration Pattern' and 'Context Awareness' sections providing the right level of orchestration guidance?"
}

# Sub-review B: Tool Implementation Pattern
sub_review_b() {
    local sub_id="$1"
    local title="Tool Implementation Pattern Review"
    local description="Analyzing the complete tool evolution pattern and metadata structure"
    
    local code_snippets=(
        "packages/generic-tools/multimodal-processing/src/index.ts|398|435|Complete Tool Evolution Example"
        "packages/generic-tools/multimodal-processing/src/index.ts|83|96|Metadata Structure Example"
        "packages/generic-tools/code-refactor/src/index.ts|96|109|Tool Chaining Metadata"
    )
    
    run_sub_review "$sub_id" "$title" "$description" \
        "${code_snippets[@]}" \
        --questions \
        "Is the metadata object with promptPrimitives, usageContexts, and toolChaining the right level of intelligence for agent tool selection?" \
        "Does the pattern of embedding system + specific prompts in the tool description provide optimal context for LLM tool usage?" \
        "Are the prerequisite/followup/parallel tool relationships accurate and useful for workflow orchestration?"
}

# Sub-review C: System Integration Consistency  
sub_review_c() {
    local sub_id="$1"
    local title="System Integration Consistency Review"
    local description="Validating consistent integration of system prompts across all tools"
    
    local code_snippets=(
        "packages/prompts/src/raw_promptparts/generic/promptpart_generic_agent_system_capabilities.ts|1|29|Foundation System Capabilities"
        "packages/generic-tools/multimodal-processing/src/index.ts|399|403|System Prompt Integration Pattern"
        "packages/generic-tools/files-maintaining/src/index.ts|38|42|Consistent Integration Example"
    )
    
    run_sub_review "$sub_id" "$title" "$description" \
        "${code_snippets[@]}" \
        --questions \
        "Is the systematic inclusion of system prompts in every tool description the right approach for consistent tool behavior?" \
        "Are we achieving 'maximum abstraction integration' or should the system prompts be more/less prominent in individual tools?" \
        "Is the evolution pattern consistent enough to scale across all remaining ~20 tool packages?"
}

# Sub-review D: Production Quality Assessment
sub_review_d() {
    local sub_id="$1"
    local title="Production Quality Assessment"
    local description="Evaluating the depth and quality of evolved tool descriptions for production agent usage"
    
    local code_snippets=(
        "packages/generic-tools/multimodal-processing/src/index.ts|405|417|Strategic Usage and Integration Pattern"
        "packages/generic-tools/code-refactor/src/index.ts|54|69|Context Awareness Description"
        "packages/generic-tools/files-maintaining/src/index.ts|46|57|Production-Grade Capabilities"
    )
    
    run_sub_review "$sub_id" "$title" "$description" \
        "${code_snippets[@]}" \
        --questions \
        "Is the current level of detail (capabilities, strategic usage, integration patterns, context awareness) optimal for production agent usage?" \
        "Will agents be able to effectively discover and select appropriate tools based on the current prompt primitive integration?" \
        "Can this evolution pattern efficiently scale to the remaining ~20 packages without becoming unwieldy?"
}

# Sub-review E: Architectural Alignment Validation
sub_review_e() {
    local sub_id="$1"
    local title="Architectural Alignment Validation"
    local description="Ensuring the evolved architecture aligns with Bitcode's 5-year development philosophy and goals"
    
    local code_snippets=(
        "packages/generic-tools/multimodal-processing/src/index.ts|420|434|Complete Metadata Schema"
        "packages/prompts/src/raw_promptparts/specific/promptpart_specific_tool_websearch_doccodetoolcapabilities.ts|1|17|Advanced Capability Structure"
        "packages/generic-tools/lsp-query/src/index.ts|10|22|Prompt Primitives Import Pattern"
    )
    
    run_sub_review "$sub_id" "$title" "$description" \
        "${code_snippets[@]}" \
        --questions \
        "Does this evolved architecture properly reflect Bitcode's 5-year development philosophy of layered abstraction and intelligent primitives?" \
        "Will this prompt primitive integration enable the 'state-of-the-art agentic architecture' goal or do we need deeper integration?" \
        "Is this architecture sustainable for the full ecosystem or should we adjust the pattern before continuing?"
}

# Main execution
main() {
    run_review \
        "PROMPT PRIMITIVES EVOLUTION REVIEW" \
        "Comprehensive review of the systematic evolution of generic-tools with prompt primitives integration for maximum abstraction leverage and production-grade excellence" \
        "Prompt Primitive Architecture" "sub_review_a" \
        "Tool Implementation Pattern" "sub_review_b" \
        "System Integration Consistency" "sub_review_c" \
        "Production Quality Assessment" "sub_review_d" \
        "Architectural Alignment Validation" "sub_review_e"
}

# Run if executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi
