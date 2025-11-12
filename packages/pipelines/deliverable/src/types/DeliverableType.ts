/**
 * DeliverableType - Canonical enum of deliverable outputs for the Deliverables Pipeline
 */

export enum DeliverableType {
  CodeChange = 'code-change',
  CodeChangeReview = 'code-change-review',
  DesignDocument = 'design-document',
  DesignDocumentReview = 'design-document-review'
}

export type DeliverableTypeSingleOrMany = DeliverableType | DeliverableType[];

