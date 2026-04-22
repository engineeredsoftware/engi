import { DeliverableType } from './DeliverableType';

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
}

export type WrittenAssetResultMeta = DeliverableResultMeta;

export interface DeliverableOutput {
  success: boolean;
  summary?: string;
  deliverable?: DeliverableResultMeta;
  writtenAsset?: WrittenAssetResultMeta;
  artifacts?: Partial<DeliverableArtifacts>;
  metrics?: Partial<DeliverableMetrics>;
  deliverableType?: DeliverableType;
  writtenAssetType?: DeliverableType;
  need?: string;
  semanticKind?: 'asset-pack-written-asset';
}

export type DeliverableTypeValue = 'code-change' | 'code-change-review' | 'design-document' | 'design-document-review';
export type WrittenAssetTypeValue = DeliverableTypeValue;

export interface DeliverablePostprocessed {
  executionId: string;
  kind: 'deliverable';
  semanticKind?: 'asset-pack-written-asset';
  title: string;
  repository?: string;
  summary?: string;
  artifacts?: Partial<DeliverableArtifacts> | null;
  deliverableType?: DeliverableType;
  writtenAssetType?: DeliverableType;
  need?: string;
  assetPack?: {
    need?: string;
    writtenAssetType?: DeliverableType;
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
  definitionOfDone: string;
  need?: string;
  repository: DeliverableRepositoryRef;
  requirements?: DeliverableRequirements;
  deliveryTarget?: 'pr' | 'branch' | 'deployment';
  deliverableType?: string;
  writtenAssetType?: string;
}

export type AssetPackSynthesisInput = DeliverableInput;
export type AssetPackWrittenAssetOutput = DeliverableOutput;
export type AssetPackWrittenAssetPostprocessed = DeliverablePostprocessed;
