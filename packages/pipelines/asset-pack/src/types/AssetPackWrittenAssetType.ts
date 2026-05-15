/**
 * Canonical written-asset kind emitted by Bitcode AssetPack synthesis.
 *
 * V26 no longer models AssetPack implementation as a four-way request-label
 * taxonomy. Commercial AssetPack delivery is GitHub pull-request delivery.
 * Future third-party delivery mechanisms belong to a later spec version and
 * must not be admitted by the V26 runtime surface.
 */
export enum AssetPackWrittenAssetType {
  ReadSatisfactionAssetPack = 'read-satisfaction-asset-pack'
}

export type AssetPackWrittenAssetTypeSingleOrMany =
  | AssetPackWrittenAssetType
  | AssetPackWrittenAssetType[];

export type AssetPackDeliveryMechanismTemplate = 'pull-request';
