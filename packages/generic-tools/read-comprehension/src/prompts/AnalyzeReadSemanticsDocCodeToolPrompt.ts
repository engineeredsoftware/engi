import { PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_metadata_label';
import { PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_purpose_label';
import { PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_capabilities_label';
import { PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_parameters_label';
import { PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_output_label';
import { PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL } from '@bitcode/prompts/raw_promptparts/generic/promptpart_generic_doccode_examples_label';
import { PROMPTPART_SPECIFIC_TOOL_ANALYZEREADSEMANTICS_DOCCODETOOLNAME } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_analyzereadsemantics_doccodetoolname';
import { PROMPTPART_SPECIFIC_TOOL_ANALYZEREADSEMANTICS_DOCCODETOOLPURPOSE } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_analyzereadsemantics_doccodetoolpurpose';
import { PROMPTPART_SPECIFIC_TOOL_ANALYZEREADSEMANTICS_DOCCODETOOLCAPABILITIES } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_analyzereadsemantics_doccodetoolcapabilities';
import { PROMPTPART_SPECIFIC_TOOL_ANALYZEREADSEMANTICS_DOCCODETOOLPARAMETERS } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_analyzereadsemantics_doccodetoolparameters';
import { PROMPTPART_SPECIFIC_TOOL_ANALYZEREADSEMANTICS_DOCCODETOOLOUTPUT } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_analyzereadsemantics_doccodetooloutput';
import { PROMPTPART_SPECIFIC_TOOL_ANALYZEREADSEMANTICS_DOCCODETOOLEXAMPLE1 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_analyzereadsemantics_doccodetoolexample1';
import { PROMPTPART_SPECIFIC_TOOL_ANALYZEREADSEMANTICS_DOCCODETOOLEXAMPLE2 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_analyzereadsemantics_doccodetoolexample2';
import { PROMPTPART_SPECIFIC_TOOL_ANALYZEREADSEMANTICS_DOCCODETOOLEXAMPLE3 } from '@bitcode/prompts/raw_promptparts/specific/promptpart_specific_tool_analyzereadsemantics_doccodetoolexample3';
import { DocCodeToolPrompt } from '@bitcode/tools-generics';
import { PromptPart } from '@bitcode/prompts/parts/PromptPart';

/**
 * ANALYZE READ SEMANTICS DOC-CODE-TOOL PROMPT
 *
 * Canonical Bitcode prompt owner for read semantic analysis. It consumes
 * canonical read-first raw PromptParts through the public prompt boundary, but
 * the package-level prompt owner is read-first and local to the package that owns its use.
 * It establishes read semantics before any asset-pack synthesis proceeds.
 */
export class AnalyzeReadSemanticsDocCodeToolPrompt extends DocCodeToolPrompt {
  constructor() {
    super();

    this.set('metadata:label', PROMPTPART_GENERIC_DOCCODE_METADATA_LABEL);
    this.set('purpose:label', PROMPTPART_GENERIC_DOCCODE_PURPOSE_LABEL);
    this.set('capabilities:label', PROMPTPART_GENERIC_DOCCODE_CAPABILITIES_LABEL);
    this.set('parameters:label', PROMPTPART_GENERIC_DOCCODE_PARAMETERS_LABEL);
    this.set('output:label', PROMPTPART_GENERIC_DOCCODE_OUTPUT_LABEL);
    this.set('examples:label', PROMPTPART_GENERIC_DOCCODE_EXAMPLES_LABEL);

    this.set('metadata:name', PROMPTPART_SPECIFIC_TOOL_ANALYZEREADSEMANTICS_DOCCODETOOLNAME);
    this.set('metadata:category', 'read-comprehension' as PromptPart);
    this.set(
      'metadata:version',
      'BITCODE_V26_ANALYZE_READ_SEMANTICS_DOC_CODE_TOOL_PROMPT_REGISTRY.1' as PromptPart
    );
    this.set('metadata:priority', 'high' as PromptPart);
    this.set('metadata:stability', 'stable' as PromptPart);

    this.setPurpose(PROMPTPART_SPECIFIC_TOOL_ANALYZEREADSEMANTICS_DOCCODETOOLPURPOSE);
    this.setCapabilities(PROMPTPART_SPECIFIC_TOOL_ANALYZEREADSEMANTICS_DOCCODETOOLCAPABILITIES);
    this.setParameters(PROMPTPART_SPECIFIC_TOOL_ANALYZEREADSEMANTICS_DOCCODETOOLPARAMETERS);
    this.setOutput(PROMPTPART_SPECIFIC_TOOL_ANALYZEREADSEMANTICS_DOCCODETOOLOUTPUT);

    this.set('examples:1', PROMPTPART_SPECIFIC_TOOL_ANALYZEREADSEMANTICS_DOCCODETOOLEXAMPLE1);
    this.set('examples:2', PROMPTPART_SPECIFIC_TOOL_ANALYZEREADSEMANTICS_DOCCODETOOLEXAMPLE2);
    this.set('examples:3', PROMPTPART_SPECIFIC_TOOL_ANALYZEREADSEMANTICS_DOCCODETOOLEXAMPLE3);
  }
}

export const ANALYZE_READ_SEMANTICS_DOC_CODE_TOOL_PROMPT =
  new AnalyzeReadSemanticsDocCodeToolPrompt();
