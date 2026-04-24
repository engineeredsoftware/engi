/**
 * Canonical written-asset kind emitted by Bitcode AssetPack synthesis.
 *
 * V26 no longer models AssetPack implementation as the retained four-way
 * delivery-template taxonomy. Specific pull-request, issue, or comment
 * wrappers are delivery mechanisms in Finish, not implementation phase types.
 */
export enum AssetPackWrittenAssetType {
  NeedSatisfactionAssetPack = 'need-satisfaction-asset-pack'
}

export type AssetPackWrittenAssetTypeSingleOrMany =
  | AssetPackWrittenAssetType
  | AssetPackWrittenAssetType[];

export type AssetPackDeliveryMechanismTemplate =
  | 'pull-request'
  | 'review-comment'
  | 'issue'
  | 'issue-comment';
