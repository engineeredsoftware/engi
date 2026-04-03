import { clampBp } from './engi-core.js';
import { telemetry, telemetrySpan } from './telemetry.js';

export function explainRankedChunks(query, rankedChunks, assets) {
  return telemetrySpan('engi.explainRankedChunks', {
    query,
    rankedChunkCount: rankedChunks.length,
    assetCount: assets.length
  }, () => {
    const assetMap = new Map(assets.map((asset) => [asset.assetId, asset]));
    const totalScore = rankedChunks.reduce((sum, item) => sum + Number(item.scoreBp || 0), 0) || 1;

    return rankedChunks.map((item) => {
      const asset = assetMap.get(item.assetId);
      const assetMeasurementBp = asset?.measurement?.totalBp || 0;
      const lexicalBp = clampBp(Math.round((Number(item.scoreBp || 0) - (assetMeasurementBp * 0.45)) / 0.55));
      const contributionBp = Math.floor((Number(item.scoreBp || 0) * 10000) / totalScore);
      const explanation = {
        query,
        assetId: item.assetId,
        title: item.title,
        chunkId: item.chunkId,
        overlap: item.overlap,
        lexicalBp,
        assetMeasurementBp,
        finalScoreBp: item.scoreBp,
        contributionBp,
        explanation: `Chunk matched ${item.overlap} query terms; lexical match and asset measurement were blended into the final score.`
      };
      telemetry('engi.explainRankedChunks.entry', explanation);
      return explanation;
    });
  });
}
