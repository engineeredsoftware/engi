/**
 * Credit bundle definitions and helpers.
 *
 * Migrated from `uapi/utils/credit-plans.ts` so that both the uapi frontend
 * and any other packages can share a single source of truth.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Shape of a purchasable credit bundle. */
export interface CreditBundleConfig {
  id: string;
  name: string;
  credits: number;
  /** Price in USD (without currency symbols). */
  price: number;
  description: string;
  /** Marks the bundle as highlighted / popular in the UI. */
  popular?: boolean;
  /** Associated Stripe product ID when applicable. */
  stripeProductId?: string;
}

// ---------------------------------------------------------------------------
// Bundles
// ---------------------------------------------------------------------------

export const creditBundles: Record<string, CreditBundleConfig> = {
  micro: {
    id: 'micro',
    name: 'Micro',
    credits: 100,
    // $0.15 per credit
    price: 100 * 0.15,
    description: 'Try Bitcode with a small project or quick fix',
  },
  mini: {
    id: 'mini',
    name: 'Mini',
    credits: 1000,
    price: 100,
    description: 'Perfect for individual developers and small tasks',
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    credits: 2500,
    price: 250,
    description: 'Great for small projects and quick fixes',
  },
  production: {
    id: 'production',
    name: 'Production',
    credits: 10000,
    price: 1000,
    description: 'Ideal for mid-sized startups and ongoing development',
  },
  industry: {
    id: 'industry',
    name: 'Industrial',
    credits: 111111,
    // $0.05 per credit
    price: 111111 * 0.05,
    popular: true,
    description: 'Best for growing teams and complex projects',
    stripeProductId: 'prod_SEXOckY4btd7vO',
  },
};

/** Convenience list version for iteration/rendering. */
export const creditBundleList: CreditBundleConfig[] = Object.values(creditBundles);
