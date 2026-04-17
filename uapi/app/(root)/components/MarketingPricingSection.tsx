"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { createClient } from '@bitcode/supabase/ssr/client';
import MarketingSectionWrapper from './MarketingSectionWrapper';
// Note: bundle presets removed from the UI – only dynamic Flexible pricing remains.
import { ProcessingIndicator } from '@/components/base/engi/indicators/ProcessingIndicator';
import CreditsPrices from '@/components/base/engi/credits/CreditsPrices';

const MarketingPricingSection: React.FC = () => {
  // Supabase client for auth check
  const supabase = useMemo(() => createClient(), []);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  /*
   * -------------------------------------------------------------------------
   * Dynamic slider limits for the Flexible plan
   * -------------------------------------------------------------------------
   * We determine the minimum / maximum number of credits that can be selected
   * based on the next smaller and larger *available* bundles. This ensures the
   * slider only covers the range where choosing the Flexible (per-credit)
   * option still makes economic sense.
   */
  // Retain bundle definitions for potential future cross-reference but we no
  // longer rely on them for the marketing pricing section layout.
  // Flexible plan per-credit cost
  /* ------------------------------------------------------------------
   * Dynamic per-credit pricing
   * ------------------------------------------------------------------
   * We support two price tiers for the single, unified Flexible plan:
   *   – Flexible  : $0.25 per credit  (default)
   *   – Industrial: $0.22 per credit  (discount once you buy ≥ 111,111 credits
   *                                     or equivalently hit $5,555,555)
   * The UI should seamlessly switch between the two as the user adjusts the
   * credit amount and keep everything – price field, slider, etc – in sync.
   */

  const FLEXIBLE_PRICE_PER_CREDIT = 0.25;
  const INDUSTRIAL_PRICE_PER_CREDIT = 0.22;

  /* ------------------------------------------------------------------
   * Pricing / slider math helpers
   * ------------------------------------------------------------------ */
  const MAX_TOTAL_USD = 10_000;
  // Credits where Flexible pricing hits exactly $10k
  const FLEXIBLE_MAX_CREDITS = Math.floor(MAX_TOTAL_USD / FLEXIBLE_PRICE_PER_CREDIT); // 40 000
  // Industrial bundle size that also maps to ~$10k
  const INDUSTRIAL_CREDITS = Math.floor(MAX_TOTAL_USD / INDUSTRIAL_PRICE_PER_CREDIT); // 45 454

  // Slider directly controls spend USD (0 – 10 000)
  const [spendUSD, setSpendUSD] = useState<number>(5_000);

  const isIndustrialTier = spendUSD === MAX_TOTAL_USD;

  const perCreditCost = isIndustrialTier ? INDUSTRIAL_PRICE_PER_CREDIT : FLEXIBLE_PRICE_PER_CREDIT;
  // Purchase flow state
  const [purchasingPlan, setPurchasingPlan] = useState<string | null>(null);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  // Track authentication state
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);


  // Sync authentication state on mount and on changes
  useEffect(() => {
    // get initial user state
    supabase.auth.getUser()
      .then(({ data: { user } }) => setIsSignedIn(!!user))
      .catch((err) => console.error('Failed to get auth user:', err));
    // listen to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(!!session?.user);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handlePurchase = async (planId: string, credits: number, price: number) => {
    // Initialize purchase, clear errors, set loading
    setPurchaseError(null);
    setPurchasingPlan(planId);
    // Check if user is authenticated; if not, trigger onboarding/login
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setPurchasingPlan(null);
        // start onboarding or login flow
        window.dispatchEvent(new Event('start-onboarding'));
        return;
      }
    } catch (authErr) {
      console.error('Auth check failed:', authErr);
      setPurchasingPlan(null);
      window.dispatchEvent(new Event('start-onboarding'));
      return;
    }
    setSelectedPlan(planId);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, customCredits: ['flexible', 'industrial', 'live_day', 'ultra'].includes(planId) ? credits : undefined }),
      });
      const data = await res.json();
      if (data.url) {
        // Open Stripe Checkout in a new tab
        window.open(data.url, '_blank', 'noopener,noreferrer');
      } else {
        const msg = data.error || 'Failed to create checkout session';
        setPurchaseError(msg);
        setPurchasingPlan(null);
        console.error('Failed to create checkout session:', msg);
      }
    } catch (err: any) {
      const msg = err?.message || 'Error creating checkout session';
      setPurchaseError(msg);
      setPurchasingPlan(null);
      console.error('Error creating checkout session:', err);
    }
  };


  // File-local class constants (SRP/DRY; no visual changes)
  const sectionPad = 'pt-2 tablet:pt-4 laptop:pt-6 desktop:pt-6 pb-16 tablet:pb-20 laptop:pb-24 desktop:pb-28';
  const titleClass = 'text-4xl laptop:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-lime-300 via-emerald-400 to-green-500 bg-clip-text text-transparent drop-shadow-[0_3px_15px_rgba(0,0,0,0.25)] pb-2 laptop:pb-3';
  const subtitleClass = 'text-base laptop:text-lg text-gray-300 max-w-3xl mx-auto mb-8';
  const overlayClass = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30';

  return (
    <MarketingSectionWrapper id="pricing" className={sectionPad}>
      {/* Display purchase errors */}
      {purchaseError && (
        <div className="text-red-500 text-center mb-4">{purchaseError}</div>
      )}
      {/* Loading overlay during checkout redirect */}
      {purchasingPlan && (
        <div className={overlayClass}>
          <ProcessingIndicator label="Redirecting to Checkout" />
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={titleClass}>
            <span className="block">Make Evolution Your</span>
            <span className="block">Edge</span>
          </h2>
          <p className={subtitleClass}>
            Agent Credits ignite self-optimizing, no-code AI—each credit fuels cycles of learning and refinement that compound insight, efficiency, and competitive advantage at enterprise scale.
          </p>
          {/* Pricing card */}
          <div className="mb-12">
            <CreditsPrices
              selectedPlan={selectedPlan}
              onSelectPlan={setSelectedPlan}
              customCredits={spendUSD}
              onChangeCustomCredits={setSpendUSD}
              onPurchase={handlePurchase}
              perCreditCost={perCreditCost}
              isSignedIn={isSignedIn}
            />
          </div>

        </div>
      </div>
    </MarketingSectionWrapper>
  );
};

export default MarketingPricingSection;
