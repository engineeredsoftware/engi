/**
 * Deliverable Pipeline - Use Computer Tool
 *
 * Executes shell commands in a controlled environment and returns
 * stdout, stderr, exitCode, and durationMs. Intended for running
 * project scripts (test/build/lint/type-check), simple git status,
 * or quick validations during agents like Implementation:Correct.
 */

import { Tool } from '@engi/tools-generics';
import { z } from 'zod';
import { useComputerTool, UseComputerInputSchema, UseComputerOutputSchema } from '@engi/generic-tools/use-computer/src/index';

// Reuse generic schemas

/**
 * @doc-code-tool
 * intent: "Run a shell command with timeout; return stdout/stderr/exitCode/duration"
 */
export class DeliverablePipelineUseComputerTool extends Tool<typeof UseComputerInputSchema> {
  name = 'deliverable-pipeline-use-computer-tool';
  description = 'Execute a shell command with timeout and capture stdio.';
  inputSchema = UseComputerInputSchema;

  async use(input: z.infer<typeof UseComputerInputSchema>) {
    return await useComputerTool.use(input);
  }
}

export const deliverablePipelineUseComputerTool = new DeliverablePipelineUseComputerTool();
