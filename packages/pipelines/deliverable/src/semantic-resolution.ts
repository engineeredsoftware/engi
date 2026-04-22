import { DeliverableType } from './types/DeliverableType';

const DEFAULT_WRITTEN_ASSET_TYPE = DeliverableType.CodeChange;

function firstString(value: unknown): string | undefined {
  if (Array.isArray(value)) {
    return typeof value[0] === 'string' ? value[0] : undefined;
  }
  return typeof value === 'string' ? value : undefined;
}

export function normalizeWrittenAssetType(
  candidate: unknown,
  fallback: DeliverableType = DEFAULT_WRITTEN_ASSET_TYPE
): DeliverableType {
  const raw = firstString(candidate);
  if (!raw) return fallback;

  const normalized = raw.toLowerCase();
  if (normalized.includes('review')) {
    return normalized.includes('design')
      ? DeliverableType.DesignDocumentReview
      : DeliverableType.CodeChangeReview;
  }
  if (normalized.includes('design')) return DeliverableType.DesignDocument;
  if (normalized.includes('code')) return DeliverableType.CodeChange;
  return fallback;
}

export function resolveWrittenAssetType(
  input: any,
  fallback: DeliverableType = DEFAULT_WRITTEN_ASSET_TYPE
): DeliverableType {
  return normalizeWrittenAssetType(
    input?.writtenAssetType ??
      input?.writtenAsset?.type ??
      input?.deliverableType ??
      input?.deliverable?.type ??
      input?.type ??
      input?.classification,
    fallback
  );
}

export function resolveWrittenAssetTypeFromExecution(
  execution: any,
  fallback: DeliverableType = DEFAULT_WRITTEN_ASSET_TYPE
): DeliverableType {
  return normalizeWrittenAssetType(
    execution?.findUp?.('pipeline', 'writtenAssetType') ??
      execution?.get?.('pipeline', 'writtenAssetType') ??
      execution?.findUp?.('pipeline', 'deliverableType') ??
      execution?.get?.('pipeline', 'deliverableType') ??
      execution?.findUp?.('setup', 'writtenAssetType') ??
      execution?.get?.('setup', 'writtenAssetType') ??
      execution?.findUp?.('setup', 'deliverableType') ??
      execution?.get?.('setup', 'deliverableType'),
    fallback
  );
}

export function resolveExpressedNeed(input: any, fallback = ''): string {
  const candidate =
    input?.need ??
    input?.definitionOfDone ??
    input?.taskDescription ??
    input?.task ??
    fallback;

  if (Array.isArray(candidate)) {
    return candidate.filter((entry) => typeof entry === 'string').join('\n');
  }

  return typeof candidate === 'string' ? candidate : fallback;
}

export function resolveExpressedNeedFromExecution(execution: any, fallback = ''): string {
  return resolveExpressedNeed(
    {
      need:
        execution?.get?.('need', 'description') ??
        execution?.get?.('pipeline', 'expressedNeed'),
      taskDescription:
        execution?.get?.('task', 'description') ??
        execution?.get?.('setup/task', 'description'),
    },
    fallback
  );
}

export function resolveNeedComprehensionFromExecution(execution: any): any {
  return (
    execution?.get?.('setup/need', 'comprehension') ??
    execution?.get?.('setup/task', 'comprehension')
  );
}
