/**
 * Canonical written-asset kinds emitted by Bitcode AssetPack synthesis.
 */
export enum AssetPackWrittenAssetType {
  CodeChange = 'code-change',
  CodeChangeReview = 'code-change-review',
  DesignDocument = 'design-document',
  DesignDocumentReview = 'design-document-review'
}

export type AssetPackWrittenAssetTypeSingleOrMany =
  | AssetPackWrittenAssetType
  | AssetPackWrittenAssetType[];
