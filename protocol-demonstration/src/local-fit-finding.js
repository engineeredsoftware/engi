// @ts-check

import { createHash } from 'node:crypto';

const LOCAL_VECTOR_DIMENSIONS = 32;
const LOCAL_REVIEW_SCORE = 0.42;
const LOCAL_WORTHY_SCORE = 0.62;
const LOCAL_MINIMUM_BTC_FEE_SATS = 1000;

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
  const vector = Array.from({ length: LOCAL_VECTOR_DIMENSIONS }, () => 0);
  for (const token of tokensFrom(text)) {
    const digest = sha256(token);
    const index = Number.parseInt(digest.slice(0, 8), 16) % LOCAL_VECTOR_DIMENSIONS;
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

function normalizeRead(read) {
  return {
    prompt: String(read?.prompt || ''),
    repositoryFullName: read?.repositoryFullName || null,
    sourceBranch: read?.sourceBranch || null,
    sourceCommit: read?.sourceCommit || null,
    targetArtifactKinds: Array.isArray(read?.targetArtifactKinds) ? read.targetArtifactKinds : [],
    closureCriteria: Array.isArray(read?.closureCriteria) ? read.closureCriteria : [],
  };
}

function isBroadRead(read) {
  const prompt = String(read.prompt || '').toLowerCase();
  return tokensFrom(readCorpus(read)).length < 4 || /\b(anything|everything|all things|fix this)\b/u.test(prompt);
}

function defaultNeedRequirements(read) {
  return [
    read.prompt || 'source-bound Read request',
    read.repositoryFullName ? `repository ${read.repositoryFullName}` : 'repository must be selected',
    read.sourceCommit ? `commit ${read.sourceCommit}` : 'source commit must be selected',
  ];
}

function defaultNeedClosureCriteria(read) {
  return read.closureCriteria.length
    ? read.closureCriteria
    : [
        'candidate is source-bound',
        'proof and measurement evidence are present',
        'preview avoids protected source disclosure before settlement',
      ];
}

function measurementVectorForNeed(read) {
  const promptVolume = Math.max(1, tokensFrom(read.prompt).length);
  const targetVolume = Math.max(1, read.targetArtifactKinds.length);
  const closureVolume = Math.max(1, defaultNeedClosureCriteria(read).length);
  return [
    { dimension: 'semantic_relevance', weight: 0.36, volume: promptVolume },
    { dimension: 'source_binding', weight: 0.24, volume: read.repositoryFullName ? 1 : 0 },
    { dimension: 'artifact_kind_fit', weight: 0.2, volume: targetVolume },
    { dimension: 'closure_specificity', weight: 0.2, volume: closureVolume },
  ];
}

function weightedMeasurementVolume(vector, fitMultiplier = 1) {
  return Number(vector
    .reduce((total, dimension) => total + (dimension.weight * dimension.volume * fitMultiplier), 0)
    .toFixed(6));
}

function buildShareToFeeQuote(need, candidate) {
  const vector = need.pricingMeasurementInputs.measurementVector;
  const weightedVolume = weightedMeasurementVolume(vector, candidate.finalScore);
  return {
    formula: 'sum(measurement.weight * measurement.volume * admitted_fit_quality)',
    measurementWeightUnit: 'local-demonstration-weight',
    weightedAdmittedVolume: weightedVolume,
    sats: Math.max(LOCAL_MINIMUM_BTC_FEE_SATS, Math.round(weightedVolume * 1000)),
    finalityState: 'not_broadcast',
    payer: 'reader',
  };
}

export function synthesizeReadNeedLocally({ read, feedback = [] }) {
  const normalizedRead = normalizeRead(read);
  const closureCriteria = defaultNeedClosureCriteria(normalizedRead);
  const measurementVector = measurementVectorForNeed(normalizedRead);
  const needSeed = stableStringify({
    read: normalizedRead,
    feedback,
    closureCriteria,
    measurementVector,
  });

  return {
    needId: `need-${sha256(needSeed).slice(0, 12)}`,
    reviewState: 'needs_acceptance',
    read: normalizedRead,
    requirements: defaultNeedRequirements(normalizedRead),
    closureCriteria,
    failureModes: [
      'repository_mismatch',
      'source_commit_mismatch',
      'proof_or_measurement_missing',
      'source_preview_before_settlement',
    ],
    targetArtifactKinds: normalizedRead.targetArtifactKinds,
    sourceConstraints: {
      repositoryFullName: normalizedRead.repositoryFullName,
      sourceBranch: normalizedRead.sourceBranch,
      sourceCommit: normalizedRead.sourceCommit,
      protectedSourceDisclosure: 'forbidden_before_settlement',
    },
    proofExpectations: [
      'source-bound candidate ranking root',
      'proof root',
      'measurement evidence',
      'settlement readback before unlock',
    ],
    pricingMeasurementInputs: {
      measurementVector,
      weightedRequestedVolume: weightedMeasurementVolume(measurementVector),
      shareToFeeFormula: 'sum(measurement.weight * measurement.volume) before Fit; multiply by admitted Fit quality before quote',
    },
    feedback: Array.isArray(feedback) ? feedback.map((entry) => String(entry)) : [],
  };
}

export function acceptReadNeedLocally(need) {
  return {
    ...need,
    reviewState: 'accepted',
    review: {
      status: 'accepted',
      nextStage: 'need_fit_search',
    },
  };
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

function synthesizeAssetPack(need, candidate) {
  const read = need.read;
  const sourceRevision = {
    repositoryFullName: candidate.deposit.repositoryFullName,
    branch: candidate.deposit.sourceBranch,
    commit: candidate.deposit.sourceCommit,
  };
  const shareToFeeQuote = buildShareToFeeQuote(need, candidate);
  const proofSeed = stableStringify({
    needId: need.needId,
    read: read.prompt,
    depositId: candidate.depositId,
    sourceRevision,
    score: candidate.finalScore,
  });
  return {
    assetPackId: `asset-pack-${sha256(proofSeed).slice(0, 12)}`,
    title: `AssetPack fit for ${candidate.deposit.title || candidate.depositId}`,
    sourceRevision,
    selectedDepositIds: [candidate.depositId],
    proofRoot: `sha256:${sha256(proofSeed)}`,
    sourceSafePreview: {
      status: 'preview_only',
      protectedSource: 'withheld_until_settlement',
      visibleEvidence: {
        needId: need.needId,
        requirements: need.requirements,
        closureCriteria: need.closureCriteria,
        selectedDepositIds: [candidate.depositId],
        scoreBand: candidate.finalScore >= 0.8 ? 'high' : 'reviewable',
        measurementVector: need.pricingMeasurementInputs.measurementVector,
        shareToFeeQuote,
      },
    },
    journalRoot: `sha256:${sha256(stableStringify({
      assetPack: proofSeed,
      events: ['read-fit-found', 'asset-pack-synthesized', 'settlement-previewed'],
    }))}`,
    journal: [
      {
        event: 'read-fit-found',
        actor: 'reader',
        depositId: candidate.depositId,
        resultState: 'worthy_fit',
      },
      {
        event: 'asset-pack-synthesized',
        actor: 'protocol',
        proofRoot: `sha256:${sha256(proofSeed)}`,
      },
      {
        event: 'settlement-previewed',
        actor: 'protocol',
        serverCustody: false,
      },
    ],
    ledgerPreview: {
      schema: 'bitcode.settlement-boundary',
      status: 'preview_only',
      depositorBoundary: 'depositor keeps ownership of the deposited source evidence',
      readerBoundary: 'reader pays BTC fee only in settlement and receives read rights',
      serverCustody: false,
      btcFee: {
        payer: shareToFeeQuote.payer,
        sats: shareToFeeQuote.sats,
        weightedAdmittedVolume: shareToFeeQuote.weightedAdmittedVolume,
        finalityState: 'not_broadcast',
        serverCustody: false,
      },
    },
    summary: 'Local fit synthesized from a source-bound deposited fixture.',
  };
}

export function createDepository() {
  return [
    {
      depositId: 'deposit-terminal-source',
      title: 'Terminal source-bound deposit',
      summary: 'Repository revision evidence for Deposit, Read/Fit, AssetPack evidence, proof readback, and reconciliation.',
      repositoryFullName: 'engineeredsoftware/ENGI',
      sourceBranch: 'main',
      sourceCommit: 'source-commit',
      artifactKinds: ['repository-revision', 'asset-pack-evidence', 'proof-root', 'reconciliation-readback'],
      contentUnits: [
        {
          path: 'terminal/deposit-read-fit',
          text: 'The local loop records a measured Read, searches deposited source, ranks candidates, and synthesizes a minimal AssetPack fit.',
        },
      ],
      hasWalletOrAttestationProof: true,
      hasAssetMeasurementEvidence: true,
    },
    {
      depositId: 'deposit-unrelated',
      title: 'Unrelated marketing deposit',
      summary: 'Landing page copy and product launch notes.',
      repositoryFullName: 'engineeredsoftware/marketing',
      sourceBranch: 'main',
      sourceCommit: 'marketing-commit',
      artifactKinds: ['marketing-copy'],
      contentUnits: [{ path: 'campaign.md', text: 'Seasonal menu and launch copy.' }],
      hasWalletOrAttestationProof: true,
      hasAssetMeasurementEvidence: true,
    },
  ];
}

export function findNeedFitLocally({ need, deposits = createDepository() }) {
  if (!need || need.reviewState !== 'accepted') {
    return {
      resultState: 'blocked_readiness',
      resultReasons: ['A synthesized Need must be accepted before local Fit search.'],
      need: need || null,
      needId: need?.needId || null,
      candidateRanking: [],
      selectedCandidates: [],
      assetPack: null,
      queryRoot: null,
      rankingRoot: null,
      embeddingPolicy: {
        provider: 'local',
        model: 'deterministic-token-hash',
        dimensions: LOCAL_VECTOR_DIMENSIONS,
        distanceMetric: 'cosine',
      },
    };
  }

  const normalizedRead = normalizeRead(need.read);

  const candidateRanking = deposits
    .map((deposit) => rankDeposit(normalizedRead, deposit))
    .sort((left, right) => right.finalScore - left.finalScore || left.depositId.localeCompare(right.depositId));
  const queryRoot = `sha256:${sha256(stableStringify({
    needId: need.needId,
    read: normalizedRead,
    requirements: need.requirements,
    closureCriteria: need.closureCriteria,
  }))}`;
  const rankingRoot = `sha256:${sha256(stableStringify(candidateRanking.map((candidate) => ({
    depositId: candidate.depositId,
    finalScore: candidate.finalScore,
    blockers: candidate.blockers,
    warnings: candidate.warnings,
  }))))}`;
  const embeddingPolicy = {
    provider: 'local',
    model: 'deterministic-token-hash',
    dimensions: LOCAL_VECTOR_DIMENSIONS,
    distanceMetric: 'cosine',
  };

  if (!deposits.length) {
    return {
      resultState: 'blocked_readiness',
      resultReasons: ['No local deposits are available.'],
      need,
      needId: need.needId,
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
      resultReasons: ['The local Read is too broad to fit without target kinds or closure criteria.'],
      need,
      needId: need.needId,
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
    candidate.finalScore >= LOCAL_REVIEW_SCORE
  ).slice(0, 1);
  const best = selected[0];

  if (!best) {
    return {
      resultState: 'no_worthy_fit',
      resultReasons: ['No local deposit matched the source-bound Read.'],
      need,
      needId: need.needId,
      candidateRanking,
      selectedCandidates: [],
      assetPack: null,
      queryRoot,
      rankingRoot,
      embeddingPolicy,
    };
  }

  if (best.warnings.length || best.finalScore < LOCAL_WORTHY_SCORE) {
    return {
      resultState: 'blocked_readiness',
      resultReasons: [
        'A local deposit matched, but proof, measurement, or score requirements are incomplete.',
        ...best.warnings,
      ],
      need,
      needId: need.needId,
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
    resultReasons: ['A local source-bound deposit was ranked and synthesized as a minimal AssetPack fit.'],
    need,
    needId: need.needId,
    candidateRanking,
    selectedCandidates: selected,
    assetPack: synthesizeAssetPack(need, best),
    queryRoot,
    rankingRoot,
    embeddingPolicy,
  };
}

export function findReadFitLocally({ read, deposits = createDepository(), feedback = [] }) {
  const need = acceptReadNeedLocally(synthesizeReadNeedLocally({ read, feedback }));
  return findNeedFitLocally({ need, deposits });
}
