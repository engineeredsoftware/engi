#!/usr/bin/env tsx

import * as fs from 'fs';
import * as path from 'path';

// Define all agents and their metadata
const AGENTS = {
  setup: [
    { name: 'clonerepository', display: 'Clone VCS Repository', purpose: 'securely clone VCS repositories from GitHub GitLab or Bitbucket' },
    { name: 'initializelsp', display: 'Initialize LSP', purpose: 'initialize Language Server Protocol for code intelligence and analysis' },
    { name: 'dangerwall', display: 'Danger Wall', purpose: 'detect and prevent dangerous operations that could harm systems or violate policies' },
    { name: 'comprehendtask', display: 'Comprehend Task', purpose: 'understand user requirements context and deliverable expectations' },
    { name: 'determinedeliverabletype', display: 'Determine Deliverable Type', purpose: 'classify deliverable as code-change code-review design-document or design-review' },
    { name: 'analyzecodebase', display: 'Analyze Codebase', purpose: 'analyze codebase structure patterns dependencies and architecture' },
    { name: 'readytoiterate', display: 'Ready to Iterate', purpose: 'determine if sufficient context exists to proceed or short-circuit with refund' }
  ],
  discovery: [
    { name: 'comprehendattachments', display: 'Comprehend Attachments', purpose: 'parse and understand all attached files images and documentation' },
    { name: 'selectfilesparallel', display: 'Select Files Parallel', purpose: 'identify relevant files for modification in parallel across codebase' },
    { name: 'understandrequirements', display: 'Understand Requirements', purpose: 'extract functional and non-functional requirements from task description' },
    { name: 'analyzeparallel', display: 'Analyze Parallel', purpose: 'analyze selected files in parallel for patterns dependencies and constraints' },
    { name: 'planimplementation', display: 'Plan Implementation', purpose: 'create detailed implementation plan with steps milestones and validation criteria' },
    { name: 'assesscomplexity', display: 'Assess Complexity', purpose: 'evaluate technical business integration and testing complexity metrics' }
  ],
  implementation: [
    { name: 'dividepullrequest', display: 'Divide Pull Request', purpose: 'determine all files needing changes for pull request implementation' },
    { name: 'conquerfile', display: 'Conquer File', purpose: 'implement changes in individual files according to plan' },
    { name: 'correctpullrequest', display: 'Correct Pull Request', purpose: 'validate and correct all file changes for consistency and quality' },
    { name: 'reviewpullrequest', display: 'Review Pull Request', purpose: 'perform comprehensive code review with suggestions and feedback' },
    { name: 'createissue', display: 'Create Issue', purpose: 'create detailed design document as GitHub GitLab or Bitbucket issue' },
    { name: 'commentonissue', display: 'Comment on Issue', purpose: 'provide thoughtful review comments on design document issues' }
  ],
  validation: [
    { name: 'validatecodechanges', display: 'Validate Code Changes', purpose: 'validate all code changes meet requirements and quality standards' },
    { name: 'validatereview', display: 'Validate Review', purpose: 'ensure code review feedback is comprehensive and actionable' },
    { name: 'validatedocument', display: 'Validate Document', purpose: 'verify design document completeness accuracy and clarity' },
    { name: 'readytoshipcodechange', display: 'Ready to Ship Code Change', purpose: 'determine if code changes are production ready or need refinement' },
    { name: 'readytoshipcodechangereview', display: 'Ready to Ship Code Change Review', purpose: 'confirm code review meets quality standards for submission' },
    { name: 'readytoshipdesigndocument', display: 'Ready to Ship Design Document', purpose: 'validate design document ready for stakeholder review' },
    { name: 'readytoshipdesigndocumentreview', display: 'Ready to Ship Design Document Review', purpose: 'ensure design review feedback ready for submission' },
    { name: 'readytoship', display: 'Ready to Ship', purpose: 'final validation gate determining ship or short-circuit with refund' }
  ],
  shipping: [
    { name: 'createpullrequest', display: 'Create Pull Request', purpose: 'create pull request with title description and metadata on VCS platform' },
    { name: 'submitreview', display: 'Submit Review', purpose: 'submit code review with comments suggestions and approval status' },
    { name: 'createissue', display: 'Create Issue', purpose: 'create issue with design document on VCS platform' },
    { name: 'addissuecomment', display: 'Add Issue Comment', purpose: 'add review comment to existing issue thread' },
    { name: 'finalizeshipment', display: 'Finalize Shipment', purpose: 'complete deliverable shipment with metrics and confirmation' }
  ]
};

// Part types to generate for each agent
const PART_TYPES = [
  { suffix: 'identity_definition', template: (agent: any, phase: string) => 
    `'You are the DeliverablesPipeline${capitalize(phase)}Phase${agent.display.replace(/\s/g, '')}Agent responsible for ${agent.purpose}'` },
  { suffix: 'purpose_corestatement', template: (agent: any) => 
    `'Core purpose: ${agent.purpose} ensuring quality accuracy and completeness at every step'` },
  { suffix: 'capabilities_list', template: (agent: any) => 
    `'Capabilities: analyze context and requirements, validate inputs and outputs, handle edge cases gracefully, provide detailed feedback, support parallel processing, integrate with VCS platforms, maintain execution state'` },
  { suffix: 'tools_available', template: (agent: any) => 
    `'Available tools: file system operations, code analysis tools, VCS integrations, validation utilities, parallel execution framework, state management, error handling and recovery'` },
  { suffix: 'requirements_context', template: (agent: any) => 
    `'Requirements: execution context from prior phases, user task description, codebase metadata, VCS credentials when applicable, validation criteria, quality thresholds'` }
];

// PTRR step purposes
const PTRR_STEPS = [
  { step: 'plan', purpose: 'analyze context and create strategic approach' },
  { step: 'try', purpose: 'execute initial implementation attempt' },
  { step: 'refine', purpose: 'improve results based on validation feedback' },
  { step: 'retry', purpose: 'ensure completion with guaranteed success' }
];

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function generatePromptPart(phase: string, agent: any, partType: any): string {
  const agentKey = `deliverable${phase}${agent.name}`;
  const fileName = `promptpart_specific_agent_${agentKey}_${partType.suffix}.ts`;
  const constName = `PROMPTPART_SPECIFIC_AGENT_${agentKey.toUpperCase()}_${partType.suffix.toUpperCase()}`;
  
  return `import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpart
 * domain: agent
 * intent: "${partType.suffix.replace(/_/g, ' ')} for ${agent.display} agent"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "${partType.suffix}_clarity", "test": "Clear ${partType.suffix.replace(/_/g, ' ')}?", "score": 0.95 }
 * ]
 */
export const ${constName}: PromptPart = 
  ${partType.template(agent, phase)} as PromptPart;`;
}

function generatePTRRStepPromptPart(phase: string, agent: any, step: any): string {
  const agentKey = `deliverable${phase}${agent.name}`;
  const fileName = `promptpart_specific_agent_${agentKey}_ptrr${step.step}_purpose.ts`;
  const constName = `PROMPTPART_SPECIFIC_AGENT_${agentKey.toUpperCase()}_PTRR${step.step.toUpperCase()}_PURPOSE`;
  
  return `import { PromptPart } from '../../parts/PromptPart';

/**
 * @doc-comment-developing-promptpart
 * domain: agent
 * intent: "PTRR ${step.step} step purpose for ${agent.display} agent"
 * current_version: "GA1.00.0"
 * versions: []
 * benchmarks: [
 *   { "name": "step_${step.step}_clarity", "test": "Clear ${step.step} purpose?", "score": 0.95 }
 * ]
 */
export const ${constName}: PromptPart = 
  'PTRR ${capitalize(step.step)} Step: ${step.purpose} for ${agent.purpose}' as PromptPart;`;
}

// Main generation
async function generateAll() {
  const outputDir = path.join(process.cwd(), 'packages/prompts/src/raw/specific');
  
  let totalGenerated = 0;
  
  for (const [phase, agents] of Object.entries(AGENTS)) {
    for (const agent of agents) {
      // Generate basic part types
      for (const partType of PART_TYPES) {
        const content = generatePromptPart(phase, agent, partType);
        const fileName = `promptpart_specific_agent_deliverable${phase}${agent.name}_${partType.suffix}.ts`;
        const filePath = path.join(outputDir, fileName);
        
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, content);
          console.log(`Created: ${fileName}`);
          totalGenerated++;
        }
      }
      
      // Generate PTRR step purposes
      for (const step of PTRR_STEPS) {
        const content = generatePTRRStepPromptPart(phase, agent, step);
        const fileName = `promptpart_specific_agent_deliverable${phase}${agent.name}_ptrr${step.step}_purpose.ts`;
        const filePath = path.join(outputDir, fileName);
        
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, content);
          console.log(`Created: ${fileName}`);
          totalGenerated++;
        }
      }
    }
  }
  
  console.log(`\nTotal PromptParts generated: ${totalGenerated}`);
  console.log(`Total agents: ${Object.values(AGENTS).flat().length}`);
  console.log(`Parts per agent: ${PART_TYPES.length + PTRR_STEPS.length}`);
}

generateAll().catch(console.error);