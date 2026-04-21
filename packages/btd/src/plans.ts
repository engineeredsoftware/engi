/**
 * BTD bundle definitions and helpers.
 *
 * This remains the shared source of truth for purchasable `$BTD` bundles even
 * while the checkout/storage layer still carries compatibility table names.
 */

/** Shape of a purchasable `$BTD` bundle. */
export interface BtdBundleConfig {
  id: string;
  name: string;
  btdAmount: number;
  /** Price in USD (without currency symbols). */
  price: number;
  description: string;
  /** Marks the bundle as highlighted / popular in the UI. */
  popular?: boolean;
  /** Associated Stripe product ID when applicable. */
  stripeProductId?: string;
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
    stripeProductId: 'prod_SEXOckY4btd7vO',
  },
};

/** Convenience list version for iteration/rendering. */
export const btdBundleList: BtdBundleConfig[] = Object.values(btdBundles);
