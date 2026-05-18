import { executionContext } from '@bitcode/generic-tools-editing/execution-context';
import { Tool } from '@bitcode/tools-generics';
import {
  runDepositorySearchForPipelineInput,
  type DepositoryCandidate,
  type DepositorySearchResult,
} from '../depository-search';

type VerificationEvidenceInput = Record<string, unknown> | undefined;

const ASSET_PACK_VERIFICATION_DOC_CODE_TOOL_PROMPT = {
  format() {
    return [
      'Tool: bitcode.asset-pack.verification',
      'Purpose: read back source, proof, measurement, and fit-readiness evidence for the current AssetPack Read/Fit execution.',
      'Inputs: optional read, repositoryFullName, sourceBranch, sourceCommit, queryTerms, assets, or depositoryAssets.',
      'Output: verification-only evidence summary, candidate blockers, proof/measurement/readback readiness, query root, ranking root, and selected candidate ids.',
      'Use during risk admission or readiness review when an agent needs evidence without mutating state, delivering assets, or exposing private AssetPack source.',
    ].join('\n');
  },
};

function unique(values: unknown[]): string[] {
  return [
    ...new Set(
      values
        .flatMap((value) => (Array.isArray(value) ? value : [value]))
        .map((value) => String(value || '').trim())
        .filter(Boolean),
    ),
  ].sort();
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

function summarizeCandidate(candidate: DepositoryCandidate): Record<string, unknown> {
  const verification = (candidate.verification || {}) as Record<string, any>;
  return {
    assetId: candidate.assetId,
    title: candidate.title,
    useTier: candidate.useTier,
    sourceBinding: {
      repositoryFullName: candidate.asset?.repositoryFullName || null,
      sourceBranch: candidate.asset?.sourceBranch || null,
      sourceCommit: candidate.asset?.sourceCommit || null,
      contentRoot: candidate.asset?.contentRoot || null,
    },
    scores: {
      finalScore: candidate.ranking?.finalScore ?? null,
      semanticScore: candidate.ranking?.semanticScore ?? null,
      proofScore: candidate.ranking?.proofScore ?? null,
      measurementScore: candidate.ranking?.measurementScore ?? null,
      penaltyMass: candidate.ranking?.penaltyMass ?? null,
    },
    verification: {
      repositoryBound: Boolean(verification.repositoryBound),
      sourceRevisionBound: Boolean(verification.sourceRevisionBound),
      hasWalletOrAttestationProof: Boolean(verification.hasWalletOrAttestationProof),
      hasAssetMeasurementEvidence: Boolean(verification.hasAssetMeasurementEvidence),
      proofRootPresent: Boolean(verification.proofRootPresent),
      reconciliationReadbackPresent: Boolean(verification.reconciliationReadbackPresent),
      blockers: verification.blockers || [],
      warnings: verification.warnings || [],
    },
    recall: {
      matchedTerms: candidate.recall?.matchedTerms || [],
      matchedUnitIds: candidate.recall?.matchedUnitIds || [],
      providerMatchCount: candidate.recall?.providerMatches?.length || 0,
    },
  };
}

function summarizeVerification(result: DepositorySearchResult): Record<string, unknown> {
  const selectedCandidates = result.selectedCandidates.map(summarizeCandidate);
  const blockedCandidates = result.blockedCandidates.map(summarizeCandidate);
  const candidateRanking = result.candidateRanking.slice(0, 10).map(summarizeCandidate);
  const selectedVerification = result.selectedCandidates.map((candidate) => candidate.verification);
  const allVerification = [
    ...result.selectedCandidates,
    ...result.blockedCandidates,
    ...result.rejectedCandidates,
  ].map((candidate) => candidate.verification);

  return {
    schema: 'bitcode.asset-pack.verification-evidence-tool-result',
    resultState: result.resultState,
    resultReasons: result.resultReasons,
    searchedAssetCount: result.searchedAssetCount,
    selectedCandidateAssetIds: result.selectedCandidateAssetIds,
    queryRoot: result.queryRoot,
    rankingRoot: result.rankingRoot,
    embeddingPolicy: result.embeddingPolicy,
    readiness: {
      selectedCandidateCount: result.selectedCandidates.length,
      blockedCandidateCount: result.blockedCandidates.length,
      settlementEligibleCandidateCount: result.selectedCandidates.filter(
        (candidate) => candidate.useTier === 'settlement-eligible',
      ).length,
      sourceBoundCandidateCount: result.selectedCandidates.filter(
        (candidate) => candidate.verification?.repositoryBound && candidate.verification?.sourceRevisionBound,
      ).length,
      proofReadyCandidateCount: result.selectedCandidates.filter(
        (candidate) => candidate.verification?.hasWalletOrAttestationProof && candidate.verification?.proofRootPresent,
      ).length,
      measurementReadyCandidateCount: result.selectedCandidates.filter(
        (candidate) => candidate.verification?.hasAssetMeasurementEvidence,
      ).length,
      readbackReadyCandidateCount: result.selectedCandidates.filter(
        (candidate) =>
          !candidate.verification?.reconciliationReadbackRequired ||
          candidate.verification?.reconciliationReadbackPresent,
      ).length,
      selectedWarnings: unique(selectedVerification.map((verification) => verification?.warnings)),
      selectedBlockers: unique(selectedVerification.map((verification) => verification?.blockers)),
      allWarnings: unique(allVerification.map((verification) => verification?.warnings)),
      allBlockers: unique(allVerification.map((verification) => verification?.blockers)),
    },
    selectedCandidates,
    blockedCandidates,
    candidateRanking,
  };
}

/**
 * @doc-code-tool
 * @prompt ASSET_PACK_VERIFICATION_DOC_CODE_TOOL_PROMPT
 */
class AssetPackVerificationEvidenceTool extends Tool<
  (input?: VerificationEvidenceInput) => Promise<Record<string, unknown>>
> {
  name = 'bitcode.asset-pack.verification';

  use = async (input?: VerificationEvidenceInput) => {
    const execution = executionContext.getStore() as any;
    const stored = readStoredSearch(execution);
    const result = stored || await runDepositorySearchForPipelineInput({
      ...readPipelineInput(execution),
      ...(input || {}),
    }, execution);

    return {
      ...summarizeVerification(result),
      readbackSource: stored ? 'execution-store' : 'tool-rerun',
    };
  };
}

export const assetPackVerificationEvidenceTool = new AssetPackVerificationEvidenceTool();
(assetPackVerificationEvidenceTool as any).__docCodePrompt = ASSET_PACK_VERIFICATION_DOC_CODE_TOOL_PROMPT;
