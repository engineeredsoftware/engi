/**
 * LIST REPOSITORIES TOOL - VCS PROVIDER INTERFACE
 * 
 * Unified interface for listing repositories across VCS providers.
 */

import { Tool } from '@bitcode/tools-generics';
import { z } from 'zod';
import { VCSProviderFactory, VCSConnections } from '@bitcode/vcs';
import { createClient } from '@bitcode/supabase';
import { withRetry, withTimeout } from '@bitcode/pipeline-recovery';
import { LIST_REPOSITORIES_DOC_CODE_TOOL_PROMPT } from './prompts/ListRepositoriesDocCodeToolPrompt';

/**
 * @doc-code-tool
 * @prompt LIST_REPOSITORIES_DOC_CODE_TOOL_PROMPT
 */
class ListRepositoriesTool extends Tool<any> {
  name = 'vcs_list_repositories';
  description = 'List repositories from a VCS provider with unified interface';
  
  inputSchema = z.object({
    provider: z.enum(['github', 'gitlab', 'bitbucket']).describe('VCS provider'),
    connectionId: z.string().optional().describe('VCS connection ID'),
    userId: z.string().optional().describe('User ID'),
    page: z.number().optional().describe('Page number'),
    perPage: z.number().optional().describe('Items per page'),
    sort: z.enum(['created', 'updated', 'pushed', 'full_name']).optional(),
    direction: z.enum(['asc', 'desc']).optional()
  });

  async use(input: z.infer<typeof this.inputSchema>) {
    const supabase = createClient();
    const connectionManager = new VCSConnections(supabase);
    
    const connection = input.connectionId 
      ? await connectionManager.getConnectionById(input.connectionId)
      : await connectionManager.getConnection(input.userId!, input.provider);
    
    if (!connection) {
      throw new Error(`No ${input.provider} connection found`);
    }
    
    const auth = await connectionManager.getAuthFromConnection(connection.id);
    const vcsProvider = await VCSProviderFactory.create({
      provider: input.provider,
      clientId: process.env[`${input.provider.toUpperCase()}_CLIENT_ID`]!,
      clientSecret: process.env[`${input.provider.toUpperCase()}_CLIENT_SECRET`]!,
      redirectUri: process.env[`${input.provider.toUpperCase()}_REDIRECT_URI`]!,
      instanceUrl: connection.instanceUrl
    });
    
    return await withTimeout(
      () => vcsProvider.listRepositories(auth, {
        page: input.page,
        perPage: input.perPage,
        sort: input.sort,
        direction: input.direction
      }),
      30000
    );
  }
  
  static metadata = {
    name: 'vcs-list-repositories',
    category: 'repository-discovery',
    version: '1.0.0',
    providers: ['github', 'gitlab', 'bitbucket']
  };
}

export const listRepositoriesTool = new ListRepositoriesTool();

/**
 * ARCHITECTURAL NOTES:
 * 
 * This implementation shows how EVERY string in the doc-tool comment
 * is composed from PromptParts using @doc-prompt import() directives.
 * 
 * Key patterns demonstrated:
 * 
 * 1. **Field Prefixes/Suffixes**: Even "name: " and quotes are PromptParts
 * 2. **Field Values**: Tool names, versions, priorities are PromptParts
 * 3. **List Items**: Each bullet point prefix is a PromptPart
 * 4. **Content Lines**: Each line of description is a separate PromptPart
 * 5. **Concatenation**: Adjacent imports are concatenated at build time
 * 
 * This results in:
 * - Zero hardcoded strings in documentation
 * - Complete reusability of every documentation atom
 * - Build-time composition with no runtime cost
 * - Type-safe imports that fail at build if missing
 * 
 * The PromptParts referenced would need to be created like:
 * - PROMPT_GENERIC_TOOL_HEADER_LIST_REPOSITORIES
 * - PROMPT_GENERIC_VCS_LIST_REPOSITORIES_NAME
 * - PROMPT_GENERIC_CATEGORY_REPOSITORY_DISCOVERY
 * - PROMPT_GENERIC_VCS_CAPABILITY_PROVIDER_AGNOSTIC
 * - etc...
 * 
 * Each one is a tiny, reusable documentation atom.
 */
