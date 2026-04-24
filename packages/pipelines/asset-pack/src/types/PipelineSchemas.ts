import {
  AssetPackDeliveryMechanismTemplate,
  AssetPackWrittenAssetType,
} from './AssetPackWrittenAssetType';

/**
 * V26 AssetPack synthesis keeps compatibility payload fields where routes still
 * require them, while canonical package-owned fields use written-asset and
 * shippable / delivery-mechanism semantics. A Shippable is the
 * connected-interface object delivered by Finish after AssetPack evidence
 * exists; deliverable names below are compatibility aliases only.
 */

export interface AssetPackArtifacts {
  filesCreated: string[];
  filesModified: string[];
  testsAdded: number;
  testsPassing?: number;
  documentation: string[];
}

export interface AssetPackMetrics {
  duration: number;
  tokensUsed: number;
  creditsUsed: number;
  confidence: number;
}

export interface AssetPackResultMeta {
  prUrl?: string;
  branch?: string;
  deploymentUrl?: string;
  title?: string;
  mechanism?: string;
  payload?: Record<string, unknown>;
}

export type ShippableMeta = AssetPackResultMeta;
export type DeliveryMechanismMeta = ShippableMeta;
export type WrittenAssetResultMeta = AssetPackResultMeta;

export interface AssetPackSynthesisArtifactsMeta {
  summary?: string;
  fileChanges?: unknown;
  proofEvidence?: string[];
  reviewNotes?: string[];
  [key: string]: unknown;
}

export interface AssetPackOutput {
  success: boolean;
  summary?: string;
  shippable?: ShippableMeta;
  shippables?: AssetPackSynthesisArtifactsMeta;
  /** Compatibility mirror only. Finish delivers `shippable`/`shippables`. */
  deliverable?: AssetPackResultMeta;
  deliveryMechanism?: DeliveryMechanismMeta;
  writtenAsset?: WrittenAssetResultMeta;
  assetPackSynthesisArtifacts?: AssetPackSynthesisArtifactsMeta;
  writtenAssets?: AssetPackSynthesisArtifactsMeta;
  artifacts?: Partial<AssetPackArtifacts>;
  metrics?: Partial<AssetPackMetrics>;
  /** Compatibility mirror only. `writtenAssetType` is the canonical V26 field. */
  deliverableType?: AssetPackWrittenAssetType;
  writtenAssetType?: AssetPackWrittenAssetType;
  deliveryMechanismTemplate?: AssetPackDeliveryMechanismTemplate;
  need?: string;
  semanticKind?: 'asset-pack-written-asset';
}

export type AssetPackWrittenAssetTypeValue =
  | 'need-satisfaction-asset-pack';
export type WrittenAssetTypeValue = AssetPackWrittenAssetTypeValue;
export type AssetPackDeliveryMechanismTemplateValue = AssetPackDeliveryMechanismTemplate;

export interface AssetPackPostprocessed {
  executionId: string;
  kind: 'shippable';
  semanticKind?: 'asset-pack-written-asset';
  title: string;
  repository?: string;
  summary?: string;
  shippable?: ShippableMeta;
  shippables?: AssetPackSynthesisArtifactsMeta | null;
  deliveryMechanism?: DeliveryMechanismMeta;
  assetPackSynthesisArtifacts?: AssetPackSynthesisArtifactsMeta | null;
  artifacts?: Partial<AssetPackArtifacts> | null;
  /** Compatibility mirror only. `writtenAssetType` is the canonical V26 field. */
  deliverableType?: AssetPackWrittenAssetType;
  writtenAssetType?: AssetPackWrittenAssetType;
  deliveryMechanismTemplate?: AssetPackDeliveryMechanismTemplate;
  need?: string;
  assetPack?: {
    need?: string;
    writtenAssetType?: AssetPackWrittenAssetType;
    deliveryMechanismTemplate?: AssetPackDeliveryMechanismTemplate;
  };
  validationReady?: {
    approved: boolean;
    assessment?: unknown | null;
    confidence?: number | null;
  };
}
export interface AssetPackRepositoryRef {
  url: string;
  owner?: string;
  name?: string;
  branch?: string;
}

export interface AssetPackRequirements {
  testCoverage?: number;
  documentationRequired?: boolean;
  securityScanRequired?: boolean;
}

export interface AssetPackInput {
  definitionOfNeed?: string;
  need?: string;
  repository: AssetPackRepositoryRef;
  requirements?: AssetPackRequirements;
  deliveryTarget?: 'pr' | 'branch' | 'deployment';
  deliveryMechanismTemplate?: AssetPackDeliveryMechanismTemplate;
  /** Compatibility mirror only. `writtenAssetType` is the canonical V26 field. */
  deliverableType?: string;
  writtenAssetType?: string;
}

export type AssetPackSynthesisInput = AssetPackInput;
export type AssetPackWrittenAssetOutput = AssetPackOutput;
export type AssetPackWrittenAssetPostprocessed = AssetPackPostprocessed;
export type ShippableOutput = AssetPackOutput;
export type ShippablePostprocessed = AssetPackPostprocessed;

export type DeliverableArtifacts = AssetPackArtifacts;
export type DeliverableMetrics = AssetPackMetrics;
export type DeliverableResultMeta = AssetPackResultMeta;
export type DeliverableOutput = AssetPackOutput;
export type DeliverablePostprocessed = AssetPackPostprocessed;
export type DeliverableRepositoryRef = AssetPackRepositoryRef;
export type DeliverableRequirements = AssetPackRequirements;
export type DeliverableInput = AssetPackInput;
