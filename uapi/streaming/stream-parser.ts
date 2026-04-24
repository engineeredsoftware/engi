import type { ParsedStreamData } from '../types/stream';

export const parseStreamChunk = (chunk: string): ParsedStreamData => {

  const parsedData: ParsedStreamData = {
    text: '',
    status: null,
    error: null,
    completion: null,
    statusMessages: [],
    runId: null
  };

  // Guard
  if (!chunk || typeof chunk !== 'string') {
    console.warn('[Client] Invalid chunk received:', chunk);
    return parsedData;
  }

  // Split by lines
  const lines = chunk
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('data: '))
    .map(line => line.substring(6));

  if (lines.length === 0) return parsedData;

  for (const line of lines) {
    try {
      // Attempt JSON parse
      const data = JSON.parse(line);
      if (!data) continue;

      // Extract runId if present at any level
      if (data.runId) {
        parsedData.runId = data.runId;
      }
      if (typeof data.guide === 'string') {
        parsedData.guide = data.guide;
      }
      
      switch (data.type) {
        // Handle status events (e.g., initialization, progress updates)
        case 'status': {
          // Populate status field for client-side handling
          parsedData.status = {
            step: data.step,
            progress: data.progress,
            message: data.message,
            detail: data.detail,
            executionState: data.executionState
          };
          // Record raw status message for potential UI display
          parsedData.statusMessages.push({
            message: data.message || '',
            detail: data.detail,
            timestamp: data.timestamp,
            correlationId: data.correlationId,
            metadata: data.metadata,
            step: data.step,
            progress: data.progress,
            executionState: data.executionState
          });
          break;
        }
        case 'generation': {
          // Generation log: show LLM invocation and context
          const ctx = data.executionState;
          const fs = ctx?.failsafe;
          const gn = ctx?.generation;
          const tag = ctx ?
            `[${ctx.phase} → ${ctx.agent} → ${ctx.step} → ${fs} → ${gn}]` : '';
          parsedData.text += `🤖 Generation: ${tag} ${data.message}${data.detail ? ` (${data.detail})` : ''}\n`;
          parsedData.type = 'generation';
          parsedData.executionState = ctx;
          if (data.metadata) (parsedData as any).metadata = data.metadata;
          break;
        }
        case 'tool-use': {
          // Tool usage log: show tool name and context
          const ctx = data.executionState;
          const fs = ctx?.failsafe;
          const gn = ctx?.generation;
          const tag = ctx ?
            `[${ctx.phase} → ${ctx.agent} → ${ctx.step} → ${fs} → ${gn}]` : '';
          const toolName = data.metadata?.toolName || 'tool';
          parsedData.text += `🛠 Tool Use: ${tag} ${toolName}${data.detail ? ` (${data.detail})` : ''}\n`;
          parsedData.type = 'tool-use';
          parsedData.executionState = ctx;
          if (data.metadata) (parsedData as any).metadata = data.metadata;
          break;
        }
        case 'thinking': {
          // Agent thinking log: show reasoning/thought and context
          const ctx = data.executionState;
          const fs = ctx?.failsafe;
          const gn = ctx?.generation;
          const tag = ctx ?
            `[${ctx.phase} → ${ctx.agent} → ${ctx.step} → ${fs} → ${gn}]` : '';
          parsedData.text += `💭 Thinking: ${tag} ${data.message || ''}${data.detail ? ` (${data.detail})` : ''}\n`;
          parsedData.type = 'thinking';
          parsedData.executionState = ctx;
          if (data.metadata) (parsedData as any).metadata = data.metadata;
          break;
        }
        case 'error': {
          const errorMsg = data.message || data.error || 'An unknown error occurred';
          parsedData.error = errorMsg;
          parsedData.text += `❌ Error: ${errorMsg}\n`;
          break;
        }
        case 'completion': {
          if (data.result) {
            const topLevelFileChanges = data.fileChanges || null;
            const explicitAssetPackSynthesisArtifacts = data.result.assetPackSynthesisArtifacts || null;
            const explicitWrittenAssets = data.result.writtenAssets || null;
            const explicitDeliveryMechanism = data.result.deliveryMechanism || null;
            const explicitDeliverables = data.result.deliverables || null;
            const actionsFileChanges = data.result.actions?.files || null;

            const semanticFileChanges =
              explicitAssetPackSynthesisArtifacts?.fileChanges ||
              explicitWrittenAssets?.fileChanges ||
              topLevelFileChanges ||
              explicitDeliveryMechanism?.fileChanges ||
              explicitDeliverables?.fileChanges ||
              actionsFileChanges ||
              null;

            const compatibilityFileChanges =
              explicitDeliverables?.fileChanges ||
              topLevelFileChanges ||
              actionsFileChanges ||
              explicitDeliveryMechanism?.fileChanges ||
              explicitWrittenAssets?.fileChanges ||
              explicitAssetPackSynthesisArtifacts?.fileChanges ||
              null;

            const actionsSurface = {
              pullRequest: data.result.actions?.pullRequest || null,
              pullRequestReviews: data.result.actions?.pullRequestReviews || null,
              comments: data.result.actions?.comments || null,
              issues: data.result.actions?.issues || null,
              fileChanges:
                topLevelFileChanges ||
                actionsFileChanges ||
                explicitDeliverables?.fileChanges ||
                explicitDeliveryMechanism?.fileChanges ||
                explicitWrittenAssets?.fileChanges ||
                null,
              summary: data.result.summary || null,
            };

            const writtenAssets =
              explicitWrittenAssets ||
              explicitAssetPackSynthesisArtifacts ||
              explicitDeliverables ||
              (data.result.summary || semanticFileChanges
                ? {
                    ...(data.result.summary ? { summary: data.result.summary } : {}),
                    ...(semanticFileChanges ? { fileChanges: semanticFileChanges } : {}),
                  }
                : null);

            const deliveryMechanism =
              explicitDeliveryMechanism ||
              explicitDeliverables ||
              actionsSurface;

            const deliverables =
              explicitDeliverables ||
              (deliveryMechanism || writtenAssets
                ? {
                    pullRequest: deliveryMechanism?.pullRequest ?? writtenAssets?.pullRequest ?? null,
                    pullRequestReviews:
                      deliveryMechanism?.pullRequestReviews ?? writtenAssets?.pullRequestReviews ?? null,
                    comments: deliveryMechanism?.comments ?? writtenAssets?.comments ?? null,
                    issues: deliveryMechanism?.issues ?? writtenAssets?.issues ?? null,
                    fileChanges: compatibilityFileChanges,
                    summary: writtenAssets?.summary ?? deliveryMechanism?.summary ?? null,
                  }
                : null);

            parsedData.completion = {
              ...data.result,
              display: data.result.summary || data.result.message || 'Task completed',
              deliverables,
              assetPackSynthesisArtifacts: explicitAssetPackSynthesisArtifacts || writtenAssets,
              writtenAssets,
              deliveryMechanism,
              semanticKind: data.result.semanticKind || (explicitAssetPackSynthesisArtifacts || writtenAssets || deliveryMechanism ? 'asset-pack-written-asset' : undefined),
              need: data.result.need || null,
              writtenAssetType: data.result.writtenAssetType || null,
              assetPack: data.result.assetPack || null,
              duration: data.duration || data.result.duration,
              taskType: data.result.taskType,
              processingStats: data.result.processingStats,
              repoSnapshot: data.result.repoSnapshot,
              summary: data.result.summary,
            };
            if (typeof data.guide === 'string') {
              parsedData.guide = data.guide;
            }
          } else {
            if (typeof data.guide === 'string') {
              parsedData.guide = data.guide;
              parsedData.text += `✅ ${data.message || 'Guide completed'} (${data.guide})\n`;
            } else {
              parsedData.text += `✅ ${data.message}\n`;
            }
          }
          break;
        }
        case 'work-update': {
          parsedData.type = 'work-update';
          parsedData.update = data.update;
          parsedData.scope = data.scope;
          if (data.scope === 'iteration') {
            parsedData.text += `📝 Iteration Update: ${data.update?.prose || ''}\n`;
          } else {
            parsedData.text += `📝 Work Update: ${data.update?.prose || ''}\n`;
          }
          break;
        }
      case 'otf_instructions': {
        parsedData.type = 'otf_instructions';
        // instructions array of { id, content, attachments, state, created_at }
        parsedData.instructions = Array.isArray(data.metadata?.instructions)
          ? data.metadata.instructions
          : [];
        break;
      }
      case 'otf_adherence': {
        parsedData.type = 'otf_adherence';
        // metadata: { score, thoughts }
        const { score, thoughts } = data.metadata || {};
        parsedData.adherence = { score, thoughts };
        if (score !== undefined && thoughts) {
          parsedData.text += `📏 Adherence ${score.toFixed(2)}: ${thoughts}\n`;
        }
        break;
      }

      // ---------------------------------------------------------
      // Ad-hoc pipeline events (Conversations quick tasks)
      // ---------------------------------------------------------
      case 'pipeline_event': {
        parsedData.type = 'pipeline_event';
        parsedData.event = data;
        break;
      }
      }
    } catch (error) {
      // Not a JSON payload – treat as raw text token (most likely standard
      // assistant content flush).  We intentionally avoid logging a warning
      // for every non-JSON chunk to keep the console readable during normal
      // operation.
      parsedData.text += line;
    }
  }

  parsedData.text = parsedData.text.trim();
  return parsedData;
};
