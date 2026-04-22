"use client";

import React, { useState, useMemo, useEffect } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { createClient } from '@bitcode/supabase/ssr/client';
import MarketingSectionWrapper from './MarketingSectionWrapper';
// Note: bundle presets removed from the UI – only dynamic Flexible pricing remains.
import { ProcessingIndicator } from '@/components/base/bitcode/indicators/ProcessingIndicator';
import BTDPrices from '@/components/base/bitcode/btd/BTDPrices';

const MarketingPricingSection: React.FC = () => {
  // Supabase client for auth check
  const supabase = useMemo(() => createClient(), []);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  /*
   * -------------------------------------------------------------------------
   * Dynamic slider limits for the Flexible plan
   * -------------------------------------------------------------------------
   * We determine the minimum / maximum amount of $BTD that can be selected
   * based on the next smaller and larger *available* bundles. This ensures the
   * slider only covers the range where choosing the Flexible (per-BTD)
   * option still makes economic sense.
   */
  // Retain bundle definitions for potential future cross-reference but we no
  // longer rely on them for the marketing pricing section layout.
  // Flexible plan per-BTD cost
  /* ------------------------------------------------------------------
   * Dynamic per-BTD pricing
   * ------------------------------------------------------------------
   * We support two price tiers for the single, unified Flexible plan:
   *   – Flexible  : $0.25 per BTD  (default)
   *   – Industrial: $0.22 per BTD  (discount once you buy ≥ 111,111 BTD
   *                                     or equivalently hit $5,555,555)
   * The UI should seamlessly switch between the two as the user adjusts the
   * BTD amount and keep everything – price field, slider, etc – in sync.
   */

  const FLEXIBLE_PRICE_PER_BTD = 0.25;
  const INDUSTRIAL_PRICE_PER_BTD = 0.22;

  /* ------------------------------------------------------------------
   * Pricing / slider math helpers
   * ------------------------------------------------------------------ */
  const MAX_TOTAL_USD = 10_000;
  // Industrial bundle size that also maps to ~$10k
  const INDUSTRIAL_CREDITS = Math.floor(MAX_TOTAL_USD / INDUSTRIAL_PRICE_PER_BTD); // 45 454

  // Slider directly controls spend USD (0 – 10 000)
  const [spendUSD, setSpendUSD] = useState<number>(5_000);

  const isIndustrialTier = spendUSD === MAX_TOTAL_USD;

  const perBtdCost = isIndustrialTier ? INDUSTRIAL_PRICE_PER_BTD : FLEXIBLE_PRICE_PER_BTD;
  // Acquisition flow state
  const [activatingPlan, setActivatingPlan] = useState<string | null>(null);
  const [acquisitionError, setAcquisitionError] = useState<string | null>(null);
  // Track authentication state
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);


  // Sync authentication state on mount and on changes
  useEffect(() => {
    // get initial user state
    supabase.auth.getUser()
      .then(({ data: { user } }: { data: { user: User | null } }) => setIsSignedIn(!!user))
      .catch((err: unknown) => console.error('Failed to get auth user:', err));
    // listen to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event: string, session: Session | null) => {
      setIsSignedIn(!!session?.user);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleAcquireBtd = async (planId: string, btdAmount: number, usdAmount: number) => {
    // Initialize acquisition, clear errors, set loading
    setAcquisitionError(null);
    setActivatingPlan(planId);
    // Check if user is authenticated; if not, trigger onboarding/login
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setActivatingPlan(null);
        // start onboarding or login flow
        window.dispatchEvent(new Event('start-onboarding'));
        return;
      }
    } catch (authErr) {
      console.error('Auth check failed:', authErr);
      setActivatingPlan(null);
      window.dispatchEvent(new Event('start-onboarding'));
      return;
    }
    setSelectedPlan(planId);
    try {
      window.sessionStorage.setItem(
        'bitcode:btd-acquisition-intent',
        JSON.stringify({
          source: 'marketing-pricing',
          planId,
          targetBtd: btdAmount,
          estimatedUsd: usdAmount,
          settlementAsset: 'BTC',
          issuedAsset: 'BTD',
          createdAt: new Date().toISOString(),
        })
      );
      window.location.assign('/auxillaries/btd');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error opening BTD workspace';
      setAcquisitionError(msg);
      setActivatingPlan(null);
      console.error('Error opening BTD workspace:', err);
    }
  };


  // File-local class constants (SRP/DRY; no visual changes)
  const sectionPad = 'pt-2 tablet:pt-4 laptop:pt-6 desktop:pt-6 pb-16 tablet:pb-20 laptop:pb-24 desktop:pb-28';
  const titleClass = 'text-4xl laptop:text-7xl font-extrabold tracking-tight leading-tight bg-gradient-to-r from-lime-300 via-emerald-400 to-green-500 bg-clip-text text-transparent drop-shadow-[0_3px_15px_rgba(0,0,0,0.25)] pb-2 laptop:pb-3';
  const subtitleClass = 'text-base laptop:text-lg text-gray-300 max-w-3xl mx-auto mb-8';
  const overlayClass = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30';

  return (
    <MarketingSectionWrapper id="pricing" className={sectionPad}>
      {/* Display acquisition errors */}
      {acquisitionError && (
        <div className="text-red-500 text-center mb-4">{acquisitionError}</div>
      )}
      {/* Loading overlay while entering the canonical BTD workspace */}
      {activatingPlan && (
        <div className={overlayClass}>
          <ProcessingIndicator label="Opening BTD Workspace" />
        </div>
      )}
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className={titleClass}>
            <span className="block">Make Evolution Your</span>
            <span className="block">Edge</span>
          </h2>
          <p className={subtitleClass}>
            $BTD powers self-optimizing, no-code AI exchange activity. Each share compounds learning, refinement, settlement, and reusable technical intelligence at enterprise scale.
          </p>
          {/* Pricing card */}
          <div className="mb-12">
            <BTDPrices
              selectedPlan={selectedPlan}
              onSelectPlan={setSelectedPlan}
              customBtd={spendUSD}
              onChangeCustomBtd={setSpendUSD}
              onAcquireBtd={handleAcquireBtd}
              perBtdCost={perBtdCost}
              isSignedIn={isSignedIn}
            />
          </div>

        </div>
      </div>
    </MarketingSectionWrapper>
  );
};

export default MarketingPricingSection;
