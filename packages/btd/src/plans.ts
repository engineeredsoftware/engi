/**
 * V28+ Exchange acquisition reference bundles.
 *
 * These are UX planning records for future market discovery and must not be
 * read as fungible checkout SKUs. V27 issuance is owned by proof-backed
 * measureminting and Exchange rights transfers over AssetPack ranges.
 */

/** Shape of a future Exchange `$BTD` acquisition reference bundle. */
export interface BtdBundleConfig {
  id: string;
  name: string;
  /** Approximate range-size discovery hint, not a spendable balance quantity. */
  btdAmount: number;
  /** V28 reference price in USD-equivalent terms, not a V26 checkout amount. */
  price: number;
  description: string;
  /** Marks the bundle as highlighted / popular in the UI. */
  popular?: boolean;
}

export const btdBundles: Record<string, BtdBundleConfig> = {
  micro: {
    id: 'micro',
    name: 'Micro',
    btdAmount: 100,
    price: 100 * 0.15,
    description: 'Try Bitcode with a small project or quick fix',
  },
  mini: {
    id: 'mini',
    name: 'Mini',
    btdAmount: 1000,
    price: 100,
    description: 'Perfect for individual developers and small tasks',
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    btdAmount: 2500,
    price: 250,
    description: 'Great for small projects and quick fixes',
  },
  production: {
    id: 'production',
    name: 'Production',
    btdAmount: 10000,
    price: 1000,
    description: 'Ideal for mid-sized startups and ongoing development',
  },
  industry: {
    id: 'industry',
    name: 'Industrial',
    btdAmount: 111111,
    price: 111111 * 0.05,
    popular: true,
    description: 'Best for growing teams and complex projects',
  },
};

/** Convenience list version for iteration/rendering. */
export const btdBundleList: BtdBundleConfig[] = Object.values(btdBundles);
