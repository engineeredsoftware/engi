/**
 * DeliverableType is a retained compatibility enum for the written-asset kinds
 * emitted by the asset-pack synthesis corridor.
 */

export enum DeliverableType {
  CodeChange = 'code-change',
  CodeChangeReview = 'code-change-review',
  DesignDocument = 'design-document',
  DesignDocumentReview = 'design-document-review'
}

export type DeliverableTypeSingleOrMany = DeliverableType | DeliverableType[];
export type AssetPackWrittenAssetType = DeliverableType;
export type AssetPackWrittenAssetTypeSingleOrMany = DeliverableTypeSingleOrMany;
