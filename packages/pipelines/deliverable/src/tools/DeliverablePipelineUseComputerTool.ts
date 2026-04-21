/**
 * Deliverable Pipeline - Use Computer Tool
 *
 * Executes shell commands in a controlled environment and returns
 * stdout, stderr, exitCode, and durationMs. Intended for running
 * project scripts (test/build/lint/type-check), simple git status,
 * or quick validations during agents like Implementation:Correct.
 */

import { Tool } from '@bitcode/tools-generics';
import {
  useComputerTool,
  type UseComputerInput,
  type UseComputerOutput
} from '@bitcode/generic-tools/use-computer/src/index';

/**
 * @doc-code-tool
 * intent: "Run a shell command with timeout; return stdout/stderr/exitCode/duration"
 */
export class DeliverablePipelineUseComputerTool extends Tool<
  (input: UseComputerInput) => Promise<UseComputerOutput>
> {
  use = async (input: UseComputerInput) => {
    return await useComputerTool.use(input);
  };
}

export const deliverablePipelineUseComputerTool = new DeliverablePipelineUseComputerTool();
