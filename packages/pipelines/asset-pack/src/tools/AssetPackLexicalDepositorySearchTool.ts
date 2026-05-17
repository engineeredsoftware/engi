import { executionContext } from '@bitcode/generic-tools-editing/execution-context';
import { Tool } from '@bitcode/tools-generics';
import {
  buildDepositoryFitResultEvidence,
  runDepositorySearchForPipelineInput,
  type DepositorySearchResult,
} from '../depository-search';

type LexicalDepositorySearchInput = Record<string, unknown> | undefined;

const LEXICAL_DEPOSITORY_SEARCH_DOC_CODE_TOOL_PROMPT = {
  format() {
    return [
      'Tool: lexical-depository-search',
      'Purpose: read back or rerun Bitcode depository candidate recall for the current Read/Fit execution.',
      'Inputs: optional read, repositoryFullName, sourceBranch, sourceCommit, queryTerms, assets, or depositoryAssets.',
      'Output: depository search state, selected candidate ids, query/ranking roots, slim ranking evidence, and fit result evidence.',
      'Use when a PTRR agent needs to verify the already computed Read/Fit depository search result before AssetPack synthesis.',
    ].join('\n');
  },
};

function slimCandidate(candidate: any): Record<string, unknown> {
  return {
    assetId: candidate?.assetId || null,
    title: candidate?.title || null,
    useTier: candidate?.useTier || null,
    finalScore: candidate?.ranking?.finalScore ?? null,
    semanticScore: candidate?.ranking?.semanticScore ?? null,
    blockers: candidate?.verification?.blockers || [],
    warnings: candidate?.verification?.warnings || [],
    matchedTerms: candidate?.recall?.matchedTerms || [],
  };
}

function readStoredSearch(execution: any): DepositorySearchResult | null {
  return (
    execution?.findUp?.('depository/search', 'result') ||
    execution?.get?.('depository/search', 'result') ||
    execution?.findUp?.('pipeline', 'input')?.depositorySearchResult ||
    execution?.get?.('pipeline', 'input')?.depositorySearchResult ||
    null
  );
}

function readPipelineInput(execution: any): Record<string, unknown> {
  return (
    execution?.findUp?.('pipeline', 'input') ||
    execution?.get?.('pipeline', 'input') ||
    {}
  );
}

function summarizeSearch(result: DepositorySearchResult): Record<string, unknown> {
  let fitResult: unknown;
  try {
    fitResult = buildDepositoryFitResultEvidence(result);
  } catch {
    fitResult = {
      schema: 'bitcode.asset-pack.fit-result',
      resultState: result.resultState,
      resultReasons: result.resultReasons,
      selectedCandidateAssetIds: result.selectedCandidateAssetIds,
      queryRoot: result.queryRoot,
      rankingRoot: result.rankingRoot,
      searchedAssetCount: result.searchedAssetCount,
      embeddingPolicy: result.embeddingPolicy,
    };
  }

  return {
    schema: 'bitcode.asset-pack.lexical-depository-search-tool-result',
    resultState: result.resultState,
    resultReasons: result.resultReasons,
    searchedAssetCount: result.searchedAssetCount,
    selectedCandidateAssetIds: result.selectedCandidateAssetIds,
    queryRoot: result.queryRoot,
    rankingRoot: result.rankingRoot,
    embeddingPolicy: result.embeddingPolicy,
    selectedCandidates: result.selectedCandidates.map(slimCandidate),
    blockedCandidates: result.blockedCandidates.map(slimCandidate),
    candidateRanking: result.candidateRanking.slice(0, 10).map(slimCandidate),
    fitResult,
  };
}

/**
 * @doc-code-tool
 * @prompt LEXICAL_DEPOSITORY_SEARCH_DOC_CODE_TOOL_PROMPT
 */
class AssetPackLexicalDepositorySearchTool extends Tool<
  (input?: LexicalDepositorySearchInput) => Promise<Record<string, unknown>>
> {
  name = 'lexical-depository-search';

  use = async (input?: LexicalDepositorySearchInput) => {
    const execution = executionContext.getStore() as any;
    const stored = readStoredSearch(execution);
    if (stored) {
      return {
        ...summarizeSearch(stored),
        readbackSource: 'execution-store',
      };
    }

    const pipelineInput = readPipelineInput(execution);
    const result = await runDepositorySearchForPipelineInput({
      ...pipelineInput,
      ...(input || {}),
    }, execution);

    return {
      ...summarizeSearch(result),
      readbackSource: 'tool-rerun',
    };
  };
}

export const lexicalDepositorySearchTool = new AssetPackLexicalDepositorySearchTool();
(lexicalDepositorySearchTool as any).__docCodePrompt = LEXICAL_DEPOSITORY_SEARCH_DOC_CODE_TOOL_PROMPT;
