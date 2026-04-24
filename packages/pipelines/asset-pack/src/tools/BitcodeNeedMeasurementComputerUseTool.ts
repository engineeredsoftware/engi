/**
 * Bitcode Need Measurement - Computer Use Tool
 *
 * Internal V26 feature-flagged wrapper for the retained shell primitive.
 * It is admitted only for Need-measurement evidence collection; broader
 * computer-using agent behavior is punted beyond V26.
 */

import { Tool } from '@bitcode/tools-generics';
import {
  useComputerTool,
  type UseComputerInput,
  type UseComputerOutput
} from '@bitcode/generic-tools/use-computer';

/**
 * @doc-code-tool
 * intent: "Run a bounded shell command only when the internal Bitcode Need-measurement computer-use registry admits it"
 */
export class BitcodeNeedMeasurementComputerUseTool extends Tool<
  (input: UseComputerInput) => Promise<UseComputerOutput>
> {
  use = async (input: UseComputerInput) => {
    return await useComputerTool.use(input);
  };
}

export const bitcodeNeedMeasurementComputerUseTool = new BitcodeNeedMeasurementComputerUseTool();
