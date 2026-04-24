import {
  AssetPackDeliveryMechanismTemplate,
  AssetPackWrittenAssetType,
} from './types/AssetPackWrittenAssetType';

const DEFAULT_WRITTEN_ASSET_TYPE = AssetPackWrittenAssetType.NeedSatisfactionAssetPack;
const DEFAULT_DELIVERY_MECHANISM_TEMPLATE: AssetPackDeliveryMechanismTemplate = 'pull-request';

function firstString(value: unknown): string | undefined {
  if (Array.isArray(value)) {
    return typeof value[0] === 'string' ? value[0] : undefined;
  }
  return typeof value === 'string' ? value : undefined;
}

export function normalizeWrittenAssetType(
  _candidate: unknown,
  fallback: AssetPackWrittenAssetType = DEFAULT_WRITTEN_ASSET_TYPE
): AssetPackWrittenAssetType {
  return fallback;
}

export function normalizeDeliveryMechanismTemplate(
  candidate: unknown,
  fallback: AssetPackDeliveryMechanismTemplate = DEFAULT_DELIVERY_MECHANISM_TEMPLATE
): AssetPackDeliveryMechanismTemplate {
  const raw = firstString(candidate);
  if (!raw) return fallback;

  const normalized = raw.toLowerCase();
  if (normalized.includes('issue') && normalized.includes('comment')) return 'issue-comment';
  if (normalized.includes('design') && (normalized.includes('review') || normalized.includes('comment'))) {
    return 'issue-comment';
  }
  if (normalized.includes('review') || normalized.includes('comment')) return 'review-comment';
  if (normalized.includes('issue') || normalized.includes('design')) return 'issue';
  if (normalized.includes('branch') || normalized.includes('deployment') || normalized.includes('pr') || normalized.includes('pull')) {
    return 'pull-request';
  }
  if (normalized.includes('code')) return 'pull-request';
  return fallback;
}

export function normalizeCompatibilityWrittenAssetRequest(
  candidate: unknown,
  fallback = 'asset-pack'
): string {
  const raw = firstString(candidate);
  if (!raw) return fallback;
  const normalized = raw.toLowerCase();
  if (normalized.includes('review')) {
    return normalized.includes('design') ? 'design-review-request' : 'code-review-request';
  }
  if (normalized.includes('design')) return 'design-asset-request';
  if (normalized.includes('code')) return 'code-asset-request';
  return fallback;
}

export function resolveWrittenAssetType(
  input: any,
  fallback: AssetPackWrittenAssetType = DEFAULT_WRITTEN_ASSET_TYPE
): AssetPackWrittenAssetType {
  return normalizeWrittenAssetType(input, fallback);
}

export function resolveDeliveryMechanismTemplate(input: any): AssetPackDeliveryMechanismTemplate {
  return normalizeDeliveryMechanismTemplate(
    input?.deliveryMechanismTemplate ??
      input?.deliveryMechanism?.template ??
      input?.deliveryMechanism?.type ??
      input?.deliveryTarget ??
      input?.writtenAssetType ??
      input?.writtenAsset?.type ??
      input?.deliverableType ??
      input?.deliverable?.type ??
      input?.type ??
      input?.classification
  );
}

export function resolveWrittenAssetTypeFromExecution(
  execution: any,
  fallback: AssetPackWrittenAssetType = DEFAULT_WRITTEN_ASSET_TYPE
): AssetPackWrittenAssetType {
  return normalizeWrittenAssetType(execution, fallback);
}

export function resolveDeliveryMechanismTemplateFromExecution(
  execution: any,
  fallback: AssetPackDeliveryMechanismTemplate = DEFAULT_DELIVERY_MECHANISM_TEMPLATE
): AssetPackDeliveryMechanismTemplate {
  return normalizeDeliveryMechanismTemplate(
    execution?.findUp?.('pipeline', 'deliveryMechanismTemplate') ??
      execution?.get?.('pipeline', 'deliveryMechanismTemplate') ??
      execution?.findUp?.('pipeline', 'deliveryTarget') ??
      execution?.get?.('pipeline', 'deliveryTarget') ??
      execution?.findUp?.('pipeline', 'writtenAssetRequest') ??
      execution?.get?.('pipeline', 'writtenAssetRequest') ??
      execution?.findUp?.('pipeline', 'deliverableType') ??
      execution?.get?.('pipeline', 'deliverableType') ??
      execution?.findUp?.('setup', 'writtenAssetRequest') ??
      execution?.get?.('setup', 'writtenAssetRequest') ??
      execution?.findUp?.('setup', 'deliverableType') ??
      execution?.get?.('setup', 'deliverableType'),
    fallback
  );
}

export function resolveExpressedNeed(input: any, fallback = ''): string {
  const candidate =
    input?.need ??
    input?.definitionOfNeed ??
    input?.needDefinition ??
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
    },
    fallback
  );
}

export function resolveNeedComprehensionFromExecution(execution: any): any {
  return (
    execution?.get?.('setup/need', 'comprehension') ??
    execution?.get?.('setup/need-comprehension', 'comprehension')
  );
}
