import {
  AssetPackDeliveryMechanismTemplate,
  AssetPackWrittenAssetType,
} from './AssetPackWrittenAssetType';

/**
 * V26 AssetPack synthesis keeps compatibility payload fields where routes still
 * require them, while canonical package-owned fields use written-asset and
 * delivery-mechanism semantics.
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

export type DeliveryMechanismMeta = AssetPackResultMeta;
export type WrittenAssetResultMeta = AssetPackResultMeta;

export interface AssetPackOutput {
  success: boolean;
  summary?: string;
  deliverable?: AssetPackResultMeta;
  deliveryMechanism?: DeliveryMechanismMeta;
  writtenAsset?: WrittenAssetResultMeta;
  artifacts?: Partial<AssetPackArtifacts>;
  metrics?: Partial<AssetPackMetrics>;
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
  kind: 'deliverable';
  semanticKind?: 'asset-pack-written-asset';
  title: string;
  repository?: string;
  summary?: string;
  deliveryMechanism?: DeliveryMechanismMeta;
  artifacts?: Partial<AssetPackArtifacts> | null;
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
  deliverableType?: string;
  writtenAssetType?: string;
}

export type AssetPackSynthesisInput = AssetPackInput;
export type AssetPackWrittenAssetOutput = AssetPackOutput;
export type AssetPackWrittenAssetPostprocessed = AssetPackPostprocessed;

export type DeliverableArtifacts = AssetPackArtifacts;
export type DeliverableMetrics = AssetPackMetrics;
export type DeliverableResultMeta = AssetPackResultMeta;
export type DeliverableOutput = AssetPackOutput;
export type DeliverablePostprocessed = AssetPackPostprocessed;
export type DeliverableRepositoryRef = AssetPackRepositoryRef;
export type DeliverableRequirements = AssetPackRequirements;
export type DeliverableInput = AssetPackInput;
