/**
 * @doc-code-tool
 * @prompt BITBUCKET_MCP_DOC_CODE_TOOL_PROMPT
 */

import { Tool } from '@bitcode/tools-generics';
import { BITBUCKET_MCP_DOC_CODE_TOOL_PROMPT } from './prompts/BitbucketMCPDocCodeToolPrompt';

type BitbucketMCPParams = Record<string, any>;

/**
 * Unified Bitbucket MCP operation handler.
 *
 * The retained runtime does not currently expose the historic Bitbucket
 * tool-per-operation surface. Fourth-gate keeps the MCP package explicit,
 * but it fails closed until the provider-specific operations are restored.
 */
async function bitbucketMCPOperation(
  operation: string,
  params: BitbucketMCPParams
): Promise<{
  success: false;
  unavailable: true;
  operation: string;
  error: string;
  metadata: {
    workspace: string | null;
    repository: string | null;
    timestamp: string;
  };
  params: BitbucketMCPParams;
}> {
  return {
    success: false,
    unavailable: true,
    operation,
    error:
      'Bitbucket MCP operations are not available in this retained fourth-gate runtime.',
    metadata: {
      workspace: typeof params.workspace === 'string' ? params.workspace : null,
      repository: typeof params.repoSlug === 'string' ? params.repoSlug : null,
      timestamp: new Date().toISOString(),
    },
    params,
  };
}

export class BitbucketMCPTool extends Tool<typeof bitbucketMCPOperation> {
  use = bitbucketMCPOperation;
}

// Export singleton instance
export const bitbucketMCPTool = new BitbucketMCPTool();
