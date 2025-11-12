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

export interface DeliverableOutput {
  success: boolean;
  summary?: string;
  deliverable?: DeliverableResultMeta;
  artifacts?: Partial<DeliverableArtifacts>;
  metrics?: Partial<DeliverableMetrics>;
  deliverableType?: DeliverableType;
}

export type DeliverableTypeValue = 'code-change' | 'code-change-review' | 'design-document' | 'design-document-review';

export interface DeliverablePostprocessed {
  executionId: string;
  kind: 'deliverable';
  title: string;
  repository?: string;
  summary?: string;
  artifacts?: Partial<DeliverableArtifacts> | null;
  deliverableType?: DeliverableType;
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
  repository: DeliverableRepositoryRef;
  requirements?: DeliverableRequirements;
  deliveryTarget?: 'pr' | 'branch' | 'deployment';
  deliverableType?: string;
}
import { DeliverableType } from './DeliverableType';
