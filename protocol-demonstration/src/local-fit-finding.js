// @ts-check

import { createHash } from 'node:crypto';

const DEMONSTRATION_VECTOR_DIMENSIONS = 32;
const DEMONSTRATION_REVIEW_SCORE = 0.42;
const DEMONSTRATION_WORTHY_SCORE = 0.62;

const STOP_WORDS = new Set([
  'the',
  'and',
  'for',
  'with',
  'from',
  'that',
  'this',
  'read',
  'bitcode',
  'source',
]);

function sha256(value) {
  return createHash('sha256').update(String(value)).digest('hex');
}

function stableStringify(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
}

function tokensFrom(value) {
  return [...new Set(String(value || '')
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .filter((token) => token.length > 2 && !STOP_WORDS.has(token)))]
    .sort();
}

function overlapScore(left, right) {
  const leftTokens = Array.isArray(left) ? left : tokensFrom(left);
  const rightTokens = new Set(Array.isArray(right) ? right : tokensFrom(right));
  if (!leftTokens.length || !rightTokens.size) return 0;
  return leftTokens.filter((token) => rightTokens.has(token)).length / leftTokens.length;
}

function hashVector(text) {
  const vector = Array.from({ length: DEMONSTRATION_VECTOR_DIMENSIONS }, () => 0);
  for (const token of tokensFrom(text)) {
    const digest = sha256(token);
    const index = Number.parseInt(digest.slice(0, 8), 16) % DEMONSTRATION_VECTOR_DIMENSIONS;
    vector[index] += Number.parseInt(digest.slice(8, 10), 16) % 2 === 0 ? 1 : -1;
  }
  return vector;
}

function cosine(left, right) {
  let dot = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;
  for (let index = 0; index < Math.min(left.length, right.length); index += 1) {
    dot += left[index] * right[index];
    leftMagnitude += left[index] * left[index];
    rightMagnitude += right[index] * right[index];
  }
  if (!leftMagnitude || !rightMagnitude) return 0;
  return (dot / (Math.sqrt(leftMagnitude) * Math.sqrt(rightMagnitude)) + 1) / 2;
}

function depositCorpus(deposit) {
  return [
    deposit.depositId,
    deposit.title,
    deposit.summary,
    deposit.repositoryFullName,
    deposit.sourceBranch,
    deposit.sourceCommit,
    ...(deposit.artifactKinds || []),
    ...(deposit.contentUnits || []).map((unit) => [unit.path, unit.text].filter(Boolean).join(' ')),
  ].join(' ');
}

function readCorpus(read) {
  return [
    read.prompt,
    read.repositoryFullName,
    ...(read.targetArtifactKinds || []),
    ...(read.closureCriteria || []),
  ].join(' ');
}

function isBroadRead(read) {
  const prompt = String(read.prompt || '').toLowerCase();
  return tokensFrom(readCorpus(read)).length < 4 || /\b(anything|everything|all things|fix this)\b/u.test(prompt);
}

function sourceBlockers(read, deposit) {
  const blockers = [];
  if (read.repositoryFullName && deposit.repositoryFullName !== read.repositoryFullName) {
    blockers.push('repository_mismatch');
  }
  if (read.sourceCommit && deposit.sourceCommit && deposit.sourceCommit !== read.sourceCommit) {
    blockers.push('source_commit_mismatch');
  }
  if (String(deposit.repositoryFullName || '').startsWith('frontier/')) {
    blockers.push('frontier_repository_reference');
  }
  if (String(deposit.repositoryFullName || '').startsWith('mock/')) {
    blockers.push('mock_repository_reference');
  }
  return blockers;
}

function rankDeposit(read, deposit) {
  const query = readCorpus(read);
  const corpus = depositCorpus(deposit);
  const queryTokens = tokensFrom(query);
  const corpusTokens = tokensFrom(corpus);
  const semanticScore = cosine(hashVector(query), hashVector(corpus));
  const lexicalScore = overlapScore(queryTokens, corpusTokens);
  const artifactScore = (read.targetArtifactKinds || []).length
    ? overlapScore(read.targetArtifactKinds, deposit.artifactKinds || [])
    : 0.4;
  const proofScore = deposit.hasWalletOrAttestationProof ? 1 : 0;
  const measurementScore = deposit.hasAssetMeasurementEvidence ? 1 : 0;
  const blockers = sourceBlockers(read, deposit);
  const penalty = blockers.length ? 0.9 : 0;
  const finalScore = Math.max(0, Math.min(1,
    (0.36 * semanticScore) +
    (0.28 * lexicalScore) +
    (0.16 * artifactScore) +
    (0.1 * proofScore) +
    (0.1 * measurementScore) -
    penalty
  ));

  return {
    depositId: deposit.depositId,
    deposit,
    finalScore: Number(finalScore.toFixed(4)),
    semanticScore: Number(semanticScore.toFixed(4)),
    lexicalScore: Number(lexicalScore.toFixed(4)),
    artifactScore: Number(artifactScore.toFixed(4)),
    matchedTerms: queryTokens.filter((token) => corpusTokens.includes(token)),
    blockers,
    warnings: [
      ...(!deposit.hasWalletOrAttestationProof ? ['wallet_or_attestation_proof_missing'] : []),
      ...(!deposit.hasAssetMeasurementEvidence ? ['asset_measurement_evidence_missing'] : []),
    ],
  };
}

function synthesizeAssetPack(read, candidate) {
  const sourceRevision = {
    repositoryFullName: candidate.deposit.repositoryFullName,
    branch: candidate.deposit.sourceBranch,
    commit: candidate.deposit.sourceCommit,
  };
  const proofSeed = stableStringify({
    read: read.prompt,
    depositId: candidate.depositId,
    sourceRevision,
    score: candidate.finalScore,
  });
  return {
    assetPackId: `demo-asset-pack-${sha256(proofSeed).slice(0, 12)}`,
    title: `Demonstration AssetPack fit for ${candidate.deposit.title || candidate.depositId}`,
    sourceRevision,
    selectedDepositIds: [candidate.depositId],
    proofRoot: `sha256:${sha256(proofSeed)}`,
    summary: 'Local demonstration fit synthesized from a source-bound deposited fixture.',
  };
}

export function createDemonstrationDepository() {
  return [
    {
      depositId: 'demo-deposit-terminal-source',
      title: 'Terminal source-bound deposit',
      summary: 'Repository revision evidence for Deposit, Read/Fit, AssetPack evidence, proof readback, and reconciliation.',
      repositoryFullName: 'engineeredsoftware/ENGI',
      sourceBranch: 'main',
      sourceCommit: 'demo-commit',
      artifactKinds: ['repository-revision', 'asset-pack-evidence', 'proof-root', 'reconciliation-readback'],
      contentUnits: [
        {
          path: 'terminal/deposit-read-fit',
          text: 'The local demonstration records a measured Read, searches deposited source, ranks candidates, and synthesizes a minimal AssetPack fit.',
        },
      ],
      hasWalletOrAttestationProof: true,
      hasAssetMeasurementEvidence: true,
    },
    {
      depositId: 'demo-deposit-unrelated',
      title: 'Unrelated marketing deposit',
      summary: 'Landing page copy and product launch notes.',
      repositoryFullName: 'engineeredsoftware/marketing',
      sourceBranch: 'main',
      sourceCommit: 'demo-marketing',
      artifactKinds: ['marketing-copy'],
      contentUnits: [{ path: 'campaign.md', text: 'Seasonal menu and launch copy.' }],
      hasWalletOrAttestationProof: true,
      hasAssetMeasurementEvidence: true,
    },
  ];
}

export function findReadFitLocally({ read, deposits = createDemonstrationDepository() }) {
  const normalizedRead = {
    prompt: String(read?.prompt || ''),
    repositoryFullName: read?.repositoryFullName || null,
    sourceBranch: read?.sourceBranch || null,
    sourceCommit: read?.sourceCommit || null,
    targetArtifactKinds: Array.isArray(read?.targetArtifactKinds) ? read.targetArtifactKinds : [],
    closureCriteria: Array.isArray(read?.closureCriteria) ? read.closureCriteria : [],
  };

  const candidateRanking = deposits
    .map((deposit) => rankDeposit(normalizedRead, deposit))
    .sort((left, right) => right.finalScore - left.finalScore || left.depositId.localeCompare(right.depositId));
  const queryRoot = `sha256:${sha256(stableStringify(normalizedRead))}`;
  const rankingRoot = `sha256:${sha256(stableStringify(candidateRanking.map((candidate) => ({
    depositId: candidate.depositId,
    finalScore: candidate.finalScore,
    blockers: candidate.blockers,
    warnings: candidate.warnings,
  }))))}`;
  const embeddingPolicy = {
    provider: 'local-demonstration',
    model: 'deterministic-token-hash',
    dimensions: DEMONSTRATION_VECTOR_DIMENSIONS,
    distanceMetric: 'cosine',
  };

  if (!deposits.length) {
    return {
      resultState: 'blocked_readiness',
      resultReasons: ['No local demonstration deposits are available.'],
      candidateRanking,
      selectedCandidates: [],
      assetPack: null,
      queryRoot,
      rankingRoot,
      embeddingPolicy,
    };
  }

  if (isBroadRead(normalizedRead)) {
    return {
      resultState: 'blocked_readiness',
      resultReasons: ['The local demonstration Read is too broad to fit without target kinds or closure criteria.'],
      candidateRanking,
      selectedCandidates: [],
      assetPack: null,
      queryRoot,
      rankingRoot,
      embeddingPolicy,
    };
  }

  const selected = candidateRanking.filter((candidate) =>
    !candidate.blockers.length &&
    candidate.finalScore >= DEMONSTRATION_REVIEW_SCORE
  ).slice(0, 1);
  const best = selected[0];

  if (!best) {
    return {
      resultState: 'no_worthy_fit',
      resultReasons: ['No local demonstration deposit matched the source-bound Read.'],
      candidateRanking,
      selectedCandidates: [],
      assetPack: null,
      queryRoot,
      rankingRoot,
      embeddingPolicy,
    };
  }

  if (best.warnings.length || best.finalScore < DEMONSTRATION_WORTHY_SCORE) {
    return {
      resultState: 'blocked_readiness',
      resultReasons: [
        'A local demonstration deposit matched, but proof, measurement, or score requirements are incomplete.',
        ...best.warnings,
      ],
      candidateRanking,
      selectedCandidates: selected,
      assetPack: null,
      queryRoot,
      rankingRoot,
      embeddingPolicy,
    };
  }

  return {
    resultState: 'worthy_fit',
    resultReasons: ['A local demonstration source-bound deposit was ranked and synthesized as a minimal AssetPack fit.'],
    candidateRanking,
    selectedCandidates: selected,
    assetPack: synthesizeAssetPack(normalizedRead, best),
    queryRoot,
    rankingRoot,
    embeddingPolicy,
  };
}
