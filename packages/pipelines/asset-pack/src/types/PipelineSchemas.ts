import {
  AssetPackDeliveryMechanismTemplate,
  AssetPackWrittenAssetType,
} from './AssetPackWrittenAssetType';

/**
 * V26 AssetPack synthesis keeps compatibility payload fields where routes still
 * require them, while canonical package-owned fields use written-asset and
 * delivery-mechanism semantics.
 */

export interface DeliverableArtifacts {
  filesCreated: string[];
  filesModified: string[];
  testsAdded: number;
  testsPassing?: number;
  documentation: string[];
}

export interface DeliverableMetrics {
  duration: number;
  tokensUsed: number;
  creditsUsed: number;
  confidence: number;
}

export interface DeliverableResultMeta {
  prUrl?: string;
  branch?: string;
  deploymentUrl?: string;
  title?: string;
  mechanism?: string;
  payload?: Record<string, unknown>;
}

export type DeliveryMechanismMeta = DeliverableResultMeta;
export type WrittenAssetResultMeta = DeliverableResultMeta;

export interface DeliverableOutput {
  success: boolean;
  summary?: string;
  deliverable?: DeliverableResultMeta;
  deliveryMechanism?: DeliveryMechanismMeta;
  writtenAsset?: WrittenAssetResultMeta;
  artifacts?: Partial<DeliverableArtifacts>;
  metrics?: Partial<DeliverableMetrics>;
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

export interface DeliverablePostprocessed {
  executionId: string;
  kind: 'deliverable';
  semanticKind?: 'asset-pack-written-asset';
  title: string;
  repository?: string;
  summary?: string;
  deliveryMechanism?: DeliveryMechanismMeta;
  artifacts?: Partial<DeliverableArtifacts> | null;
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
export interface DeliverableRepositoryRef {
  url: string;
  owner?: string;
  name?: string;
  branch?: string;
}

export interface DeliverableRequirements {
  testCoverage?: number;
  documentationRequired?: boolean;
  securityScanRequired?: boolean;
}

export interface DeliverableInput {
  definitionOfNeed?: string;
  need?: string;
  repository: DeliverableRepositoryRef;
  requirements?: DeliverableRequirements;
  deliveryTarget?: 'pr' | 'branch' | 'deployment';
  deliveryMechanismTemplate?: AssetPackDeliveryMechanismTemplate;
  deliverableType?: string;
  writtenAssetType?: string;
}

export type AssetPackSynthesisInput = DeliverableInput;
export type AssetPackWrittenAssetOutput = DeliverableOutput;
export type AssetPackWrittenAssetPostprocessed = DeliverablePostprocessed;
