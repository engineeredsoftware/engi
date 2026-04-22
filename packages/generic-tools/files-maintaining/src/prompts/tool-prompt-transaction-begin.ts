import { createPromptPart, PromptPart } from '@bitcode/prompts/parts/PromptPart';
import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_begintransaction_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_begintransaction_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_begintransaction_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_begintransaction_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_USAGE_BESTFOR_DETAILCONTENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_begintransaction_usage_bestfor_detailcontent';
import { PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_METADATA_NAME_DETAILCONTENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_begintransaction_metadata_name_detailcontent';
import { PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_METADATA_CATEGORY_DETAILCONTENT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_begintransaction_metadata_category_detailcontent';
import { PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_USAGE_BESTFOR_LABEL } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_begintransaction_usage_bestfor_label';

import { DocCodeToolPrompt } from '@bitcode/tools-generics';

/**
 * @doc-comment-developing-promptdevelopment
 * domain: tool
 * intent: "Document transaction orchestration helper with doc-code prompt structure"
 * current_version: "GA1.50.0"
 * versions: []
 */
class BeginTransactionDocCodeToolPrompt extends DocCodeToolPrompt {
  constructor() {
    super();

    // Align labels with doc-code-tool sections
    this.set('metadata:label', PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL);
    this.set('sections:purpose:label', PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL);
    this.set('sections:capabilities:label', PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL);
    this.set('sections:parameters:label', PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL);
    this.set('sections:output:label', PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL);

    // Metadata
    const name = PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_METADATA_NAME_DETAILCONTENT;
    const category = PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_METADATA_CATEGORY_DETAILCONTENT;
    const version = createPromptPart('GA1.50.0');
    const priority = createPromptPart('high');
    const stability = createPromptPart('stable');
    this.setMetadata(name, category, version, priority, stability);

    // Core documentation sourced from granular PromptParts
    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_DOCCODETOOLOUTPUT);

    // Guidance on when to choose this helper
    this.set('sections:best_for:label', PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_USAGE_BESTFOR_LABEL);
    this.set('sections:best_for:content', PROMPTPART_SPECIFIC_TOOL_BEGINTRANSACTION_USAGE_BESTFOR_DETAILCONTENT);
  }
}

export const BEGIN_TRANSACTION_TOOL_PROMPT = new BeginTransactionDocCodeToolPrompt();
