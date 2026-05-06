import {
  AssetPackDeliveryMechanismTemplate,
  AssetPackWrittenAssetType,
} from './AssetPackWrittenAssetType';

/**
 * V26 AssetPack synthesis uses written-asset and shippable /
 * delivery-mechanism semantics. A Shippable is the connected-interface object
 * delivered by Finish after AssetPack evidence exists.
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
  measuredBtd: number;
  confidence: number;
}

export interface AssetPackResultMeta {
  prUrl?: string;
  branch?: string;
  title?: string;
  mechanism?: AssetPackDeliveryMechanismTemplate;
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
  deliveryMechanism?: DeliveryMechanismMeta;
  writtenAsset?: WrittenAssetResultMeta;
  assetPackSynthesisArtifacts?: AssetPackSynthesisArtifactsMeta;
  writtenAssets?: AssetPackSynthesisArtifactsMeta;
  artifacts?: Partial<AssetPackArtifacts>;
  metrics?: Partial<AssetPackMetrics>;
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
  writtenAssets?: AssetPackSynthesisArtifactsMeta | null;
  artifacts?: Partial<AssetPackArtifacts> | null;
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
  deliveryTarget?: 'pr';
  deliveryMechanismTemplate?: AssetPackDeliveryMechanismTemplate;
  writtenAssetType?: string;
}

export type AssetPackSynthesisInput = AssetPackInput;
export type AssetPackWrittenAssetOutput = AssetPackOutput;
export type AssetPackWrittenAssetPostprocessed = AssetPackPostprocessed;
export type ShippableOutput = AssetPackOutput;
export type ShippablePostprocessed = AssetPackPostprocessed;
