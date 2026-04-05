import { rankChunksForQuery } from './engi-core.js';
import { explainRankedChunks } from './ranking-explainer.js';
import { telemetrySpan } from './telemetry.js';

/**
 * @param {any} query
 * @param {any[]} assets
 * @returns {any}
 */
export function explainRankChunksForQuery(query, assets) {
  return telemetrySpan('engi.explainRankChunksForQuery', {
    query,
    assetCount: assets.length
  }, () => {
    const rankedChunks = rankChunksForQuery(query, assets);
    const explanations = explainRankedChunks(query, rankedChunks, assets);
    return { rankedChunks, explanations };
  });
}
