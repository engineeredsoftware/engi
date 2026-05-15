import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_GENERATEREADSATISFACTIONCRITERIA_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_generatereadsatisfactioncriteria_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_GENERATEREADSATISFACTIONCRITERIA_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_generatereadsatisfactioncriteria_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_GENERATEREADSATISFACTIONCRITERIA_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_generatereadsatisfactioncriteria_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_GENERATEREADSATISFACTIONCRITERIA_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_generatereadsatisfactioncriteria_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_GENERATEREADSATISFACTIONCRITERIA_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_generatereadsatisfactioncriteria_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_GENERATEREADSATISFACTIONCRITERIA_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_generatereadsatisfactioncriteria_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_GENERATEREADSATISFACTIONCRITERIA_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_generatereadsatisfactioncriteria_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_GENERATEREADSATISFACTIONCRITERIA_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_generatereadsatisfactioncriteria_doccodetoolexample3';
import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

/**
 * GENERATE READ SATISFACTION CRITERIA DOC-CODE-TOOL PROMPT
 *
 * Canonical Bitcode prompt owner for read-satisfaction criteria. It consumes
 * canonical read-first raw PromptParts through the public prompt boundary, but
 * the package-level prompt owner is read-first and turns requirements and
 * constraints into measurable read-satisfaction criteria for written assets,
 * proofs, persistence, and delivery mechanisms.
 */
export class GenerateReadSatisfactionCriteriaDocCodeToolPrompt extends DocCodeToolPrompt {
  constructor() {
    super();

    this.set('metadata:label', PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL);
    this.set('purpose:label', PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL);
    this.set('capabilities:label', PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL);
    this.set('parameters:label', PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL);
    this.set('output:label', PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL);
    this.set('examples:label', PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL);

    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_GENERATEREADSATISFACTIONCRITERIA_DOCCODETOOLNAME);
    this.set('metadata:category', 'read-comprehension' as PromptPart);
    this.set(
      'metadata:version',
      'BITCODE_V26_GENERATE_READ_SATISFACTION_CRITERIA_DOC_CODE_TOOL_PROMPT_REGISTRY.1' as PromptPart
    );
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);

    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_GENERATEREADSATISFACTIONCRITERIA_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_GENERATEREADSATISFACTIONCRITERIA_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_GENERATEREADSATISFACTIONCRITERIA_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_GENERATEREADSATISFACTIONCRITERIA_DOCCODETOOLOUTPUT);

    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_GENERATEREADSATISFACTIONCRITERIA_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_GENERATEREADSATISFACTIONCRITERIA_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_GENERATEREADSATISFACTIONCRITERIA_DOCCODETOOLEXAMPLE3);
  }
}

export const GENERATE_READ_SATISFACTION_CRITERIA_DOC_CODE_TOOL_PROMPT =
  new GenerateReadSatisfactionCriteriaDocCodeToolPrompt();
