import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_IDENTIFYNEEDCONSTRAINTS_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_identifyneedconstraints_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_IDENTIFYNEEDCONSTRAINTS_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_identifyneedconstraints_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_IDENTIFYNEEDCONSTRAINTS_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_identifyneedconstraints_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_IDENTIFYNEEDCONSTRAINTS_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_identifyneedconstraints_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_IDENTIFYNEEDCONSTRAINTS_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_identifyneedconstraints_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_IDENTIFYNEEDCONSTRAINTS_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_identifyneedconstraints_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_IDENTIFYNEEDCONSTRAINTS_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_identifyneedconstraints_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_IDENTIFYNEEDCONSTRAINTS_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_identifyneedconstraints_doccodetoolexample3';
import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

/**
 * IDENTIFY NEED CONSTRAINTS DOC-CODE-TOOL PROMPT
 *
 * Canonical Bitcode prompt owner for need-constraint analysis. It consumes
 * canonical need-first raw PromptParts through the public prompt boundary, but
 * the package-level prompt owner is need-first and scopes constraints to need
 * satisfaction, repository boundaries, proof obligations, and delivery-mechanism limits.
 */
export class IdentifyNeedConstraintsDocCodeToolPrompt extends DocCodeToolPrompt {
  constructor() {
    super();

    this.set('metadata:label', PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL);
    this.set('purpose:label', PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL);
    this.set('capabilities:label', PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL);
    this.set('parameters:label', PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL);
    this.set('output:label', PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL);
    this.set('examples:label', PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL);

    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_IDENTIFYNEEDCONSTRAINTS_DOCCODETOOLNAME);
    this.set('metadata:category', 'need-comprehension' as PromptPart);
    this.set(
      'metadata:version',
      'BITCODE_V26_IDENTIFY_NEED_CONSTRAINTS_DOC_CODE_TOOL_PROMPT_REGISTRY.1' as PromptPart
    );
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);

    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_IDENTIFYNEEDCONSTRAINTS_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_IDENTIFYNEEDCONSTRAINTS_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_IDENTIFYNEEDCONSTRAINTS_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_IDENTIFYNEEDCONSTRAINTS_DOCCODETOOLOUTPUT);

    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_IDENTIFYNEEDCONSTRAINTS_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_IDENTIFYNEEDCONSTRAINTS_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_IDENTIFYNEEDCONSTRAINTS_DOCCODETOOLEXAMPLE3);
  }
}

export const IDENTIFY_NEED_CONSTRAINTS_DOC_CODE_TOOL_PROMPT =
  new IdentifyNeedConstraintsDocCodeToolPrompt();
