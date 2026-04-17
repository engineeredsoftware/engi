// moved to app/orbitals/components/credits-pane.tsx
"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { trackEvent } from '@bitcode/google-analytics';
import { motion } from 'framer-motion';
import { reportError } from '@bitcode/errors';
import CreditsPrices from '@/components/base/engi/credits/CreditsPrices';
import { ProcessingIndicator } from '@/components/base/engi/indicators/ProcessingIndicator';
import { Cog6ToothIcon, MagnifyingGlassIcon, CodeBracketIcon, ShieldCheckIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { createClient } from '@bitcode/supabase/ssr/client';
import { creditBundleList } from '@bitcode/credits';
import { AfterOnboardingOverlay } from './shared/after-onboarding-overlay';
import OrbitalsCreditsOrbitalHeader from './headers/OrbitalsCreditsOrbitalHeader';

interface UsageDataPoint {
  date: string;
  spent: number;
  purchased: number;
  balance: number;
}

interface CreditsPaneProps {
  onSave: (data: any) => void;
  loading: boolean;
  isOnboardingComplete?: boolean;
  onCompletionStatusChange?: (isComplete: boolean) => void;
  initialCredits?: number;
}

interface ModelProvider {
  id: string;
  name: string;
  premium: number;
  description: string;
}
import { SUPPORTED_LLM_MODELS } from '@/utils/model-pricing';

export default function CreditsPane({
  onSave,
  isOnboardingComplete = false,
  onCompletionStatusChange,
  initialCredits = 0
}: CreditsPaneProps) {
  const isSettingsSurface = isOnboardingComplete;
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [customCredits, setCustomCredits] = useState<number>(5000);
  const [currentCredits, setCurrentCredits] = useState(initialCredits);
  const previousCreditsRef = useRef(initialCredits);
  const [purchaseSucceeded, setPurchaseSucceeded] = useState(false);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [selectedProvider] = useState<string>("openai");
  
  // Usage data states
  const [usageData, setUsageData] = useState<UsageDataPoint[]>([]);
  const [usageInterval, setUsageInterval] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [usageLoading, setUsageLoading] = useState(false);
  const [usageError, setUsageError] = useState<string | null>(null);
  
  // Transaction history states
  const [transactions, setTransactions] = useState<any[]>([]);
  const [txLoading, setTxLoading] = useState<boolean>(false);
  const [txError, setTxError] = useState<string | null>(null);
  const [txPage, setTxPage] = useState<number>(1);
  const [txCount, setTxCount] = useState<number>(0);
  const PAGE_SIZE = 10;
  
  // Purchase flow states
  const [purchasingPlan, setPurchasingPlan] = useState<string | null>(null);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  
  const creditPlans = creditBundleList;
  const supabase = useMemo(() => createClient(), []);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  // Model providers – derive premium heuristics from centralized catalog
  const modelProviders: ModelProvider[] = useMemo(() => {
    // Compute average cost per provider across priced models
    const all = SUPPORTED_LLM_MODELS.map(p => {
      const priced = p.models
        .map(m => (m.inputPriceUSDPerMTok ?? NaN) + (m.outputPriceUSDPerMTok ?? NaN))
        .filter(v => !Number.isNaN(v));
      const avg = priced.length ? priced.reduce((a, b) => a + b, 0) / priced.length : NaN;
      return { provider: p.provider, avg };
    });
    const avgs = all.filter(x => !Number.isNaN(x.avg)).map(x => x.avg);
    const globalAvg = avgs.length ? avgs.reduce((a, b) => a + b, 0) / avgs.length : 1;

    return all.map(({ provider, avg }) => {
      const premium = !Number.isNaN(avg) && globalAvg > 0 ? avg / globalAvg : 1.0;
      const name = provider.charAt(0).toUpperCase() + provider.slice(1);
      const description = `${name} models`;
      return { id: provider, name, premium, description } as ModelProvider;
    });
  }, []);

  // Workflow steps
  const agenticWorkflowSteps = [
    { id: 'setup', title: 'Setup', description: 'Bitcode analyzes your repository, understanding your code structure and patterns.', icon: Cog6ToothIcon },
    { id: 'discovery', title: 'Discovery', description: 'Bitcode explores your requirements, researches solutions, and plans the approach.', icon: MagnifyingGlassIcon },
    { id: 'implementation', title: 'Implementation', description: 'Bitcode writes code, tests, and documentation matching standards.', icon: CodeBracketIcon },
    { id: 'validation', title: 'Validation', description: 'Bitcode verifies the solution via tests, reviews, and security checks.', icon: ShieldCheckIcon },
    { id: 'shipping', title: 'Shipping', description: 'Bitcode opens pull requests, handles deployment, and delivers production-ready results.', icon: ArrowRightOnRectangleIcon },
  ];

  // Fetch existing credits and poll for updates
  useEffect(() => {
    const POLL_INTERVAL = 8000;
    let cancelled = false;
    let pollTimeoutId: NodeJS.Timeout | null = null;
    
    const fetchCredits = async () => {
      if (cancelled) return;
      
      try {
        const res = await fetch('/api/orbitals/data');
        if (!res.ok) return;
        const data = await res.json();
        if (typeof data.credits === 'number') {
          const newCredits = data.credits as number;
          
          // Update current credits
          setCurrentCredits(newCredits);
          
          // Check if credits increased (purchase completed)
          if (newCredits > previousCreditsRef.current) {
            const added = newCredits - previousCreditsRef.current;
            setPurchaseSucceeded(true);
            trackEvent('credits_purchase_completed', { added });
          }
          
          // Always update the ref to track the current value
          previousCreditsRef.current = newCredits;
          
          // Update completion status
          onCompletionStatusChange?.(newCredits > 0);
        }
      } catch (e) {
        reportError(e);
      }
      
      // Schedule next poll only if not cancelled
      if (!cancelled) {
        pollTimeoutId = setTimeout(fetchCredits, POLL_INTERVAL);
      }
    };

    // Initial fetch
    fetchCredits();
    
    // Cleanup
    return () => { 
      cancelled = true;
      if (pollTimeoutId) {
        clearTimeout(pollTimeoutId);
      }
    };
  }, []); // Empty deps to run only once on mount

  // Check auth state
  useEffect(() => {
    supabase.auth.getUser()
      .then(({ data: { user } }) => setIsSignedIn(!!user))
      .catch(err => reportError(err));
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(!!session?.user);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Fetch usage data
  useEffect(() => {
    const loadUsage = async () => {
      setUsageLoading(true);
      setUsageError(null);
      try {
        const to = new Date();
        let from = new Date();
        if (usageInterval === 'daily') from.setDate(to.getDate() - 14);
        else if (usageInterval === 'weekly') from.setDate(to.getDate() - 7 * 8);
        else from.setMonth(to.getMonth() - 6);
        
        const params = new URLSearchParams({
          aggregate: usageInterval,
          from: from.toISOString().slice(0, 10),
          to: to.toISOString().slice(0, 10)
        });
        
        const res = await fetch(`/api/orbitals/user/usage?${params.toString()}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        
        const raw: Array<{ period: string; purchased: number; spent: number; balance: number }> = await res.json();
        setUsageData(raw.map(d => ({ 
          date: d.period, 
          spent: d.spent, 
          purchased: d.purchased, 
          balance: d.balance 
        })));
      } catch (err: any) {
        console.error('Error loading usage data:', err);
        setUsageError(err.message || 'Error loading usage data');
      } finally {
        setUsageLoading(false);
      }
    };
    loadUsage();
  }, [usageInterval]);
  
  // Fetch transaction history
  useEffect(() => {
    setTxLoading(true);
    setTxError(null);
    fetch(`/api/orbitals/user/transactions?page=${txPage}&pageSize=${PAGE_SIZE}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(({ transactions: data, count }) => {
        setTransactions(data);
        setTxCount(count);
      })
      .catch(err => {
        console.error('Error loading transactions:', err);
        setTxError(err.message || 'Error loading transactions');
      })
      .finally(() => setTxLoading(false));
  }, [txPage]);

  // Handle purchase
  const handlePurchase = async (planId: string, credits: number, price: number) => {
    setPurchaseError(null);
    setPurchasingPlan(planId);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setPurchasingPlan(null);
        window.dispatchEvent(new Event('start-onboarding'));
        return;
      }
    } catch (authErr) {
      reportError(authErr);
      setPurchasingPlan(null);
      window.dispatchEvent(new Event('start-onboarding'));
      return;
    }
    
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          planId, 
          customCredits: ['flexible', 'industrial', 'ultra'].includes(planId) ? credits : undefined 
        })
      });
      
      const data = await res.json();
      if (data.url) {
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

  // Draw usage chart
  useEffect(() => {
    if (usageData.length === 0 || !chartRef.current) return;
    
    const canvas = chartRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Chart dimensions
    const chartWidth = canvas.width - 80;
    const chartHeight = canvas.height - 60;
    const chartTop = 30;
    const chartLeft = 60;

    // Find max values for scaling
    const maxBalance = Math.max(...usageData.map(d => d.balance));
    const maxSpentOrPurchased = Math.max(
      ...usageData.map(d => Math.max(d.spent, d.purchased))
    );

    // Scale factors
    const yScaleBalance = chartHeight / (maxBalance * 1.2);
    const yScaleActivity = chartHeight / (maxSpentOrPurchased * 1.5);
    const barWidth = (chartWidth / usageData.length) * 0.8;
    const barSpacing = (chartWidth / usageData.length) * 0.2;

    // Draw axes
    ctx.strokeStyle = 'rgba(103, 254, 183, 0.3)';
    ctx.lineWidth = 1;

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(chartLeft, chartTop);
    ctx.lineTo(chartLeft, chartTop + chartHeight);
    ctx.stroke();

    // X-axis
    ctx.beginPath();
    ctx.moveTo(chartLeft, chartTop + chartHeight);
    ctx.lineTo(chartLeft + chartWidth, chartTop + chartHeight);
    ctx.stroke();

    // Y-axis labels and grid
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'right';

    const yLabelCount = 5;
    for (let i = 0; i <= yLabelCount; i++) {
      const value = Math.round((maxBalance * 1.2) * (i / yLabelCount));
      const y = chartTop + chartHeight - (value * yScaleBalance);

      ctx.fillText(value.toString(), chartLeft - 10, y + 4);

      // Grid line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(103, 254, 183, 0.1)';
      ctx.moveTo(chartLeft, y);
      ctx.lineTo(chartLeft + chartWidth, y);
      ctx.stroke();
    }

    // Y-axis label
    ctx.save();
    ctx.translate(20, chartTop + chartHeight / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('Credits', 0, 0);
    ctx.restore();

    // Draw bars and collect points for line
    const points: { x: number, y: number }[] = [];

    usageData.forEach((data, index) => {
      const x = chartLeft + (index * (barWidth + barSpacing)) + barSpacing / 2;
      const barHeight1 = data.spent * yScaleActivity;
      const barHeight2 = data.purchased * yScaleActivity;

      // Spent credits (red)
      ctx.fillStyle = 'rgba(255, 99, 132, 0.7)';
      ctx.fillRect(x, chartTop + chartHeight - barHeight1, barWidth / 2 - 1, barHeight1);

      // Purchased credits (green)
      ctx.fillStyle = 'rgba(75, 192, 192, 0.7)';
      ctx.fillRect(x + barWidth / 2 + 1, chartTop + chartHeight - barHeight2, barWidth / 2 - 1, barHeight2);

      // Balance point
      const balanceY = chartTop + chartHeight - (data.balance * yScaleBalance);
      points.push({ x: x + barWidth / 2, y: balanceY });

      // X-axis labels (dates)
      if (index % 2 === 0 || index === usageData.length - 1) {
        const date = new Date(data.date);
        const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.textAlign = 'center';
        ctx.fillText(dateStr, x + barWidth / 2, chartTop + chartHeight + 20);
      }
    });

    // Draw balance line
    if (points.length > 0) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
      }
      ctx.strokeStyle = 'rgba(103, 254, 183, 0.9)';
      ctx.lineWidth = 3;
      ctx.stroke();

      // Draw points
      points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(103, 254, 183, 0.9)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(15, 25, 40, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }

    // Draw legend
    const legendX = chartLeft + chartWidth - 200;
    const legendY = chartTop + 20;

    // Balance line legend
    ctx.beginPath();
    ctx.moveTo(legendX, legendY);
    ctx.lineTo(legendX + 30, legendY);
    ctx.strokeStyle = 'rgba(103, 254, 183, 0.9)';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.textAlign = 'left';
    ctx.fillText('Balance', legendX + 40, legendY + 4);

    // Spent bar legend
    ctx.fillStyle = 'rgba(255, 99, 132, 0.7)';
    ctx.fillRect(legendX, legendY + 20, 30, 10);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('Spent', legendX + 40, legendY + 24);

    // Purchased bar legend
    ctx.fillStyle = 'rgba(75, 192, 192, 0.7)';
    ctx.fillRect(legendX, legendY + 40, 30, 10);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('Purchased', legendX + 40, legendY + 44);
  }, [usageData]);

  // Notify parent if credits step is complete
  const prevCreditsRef = useRef(currentCredits);
  useEffect(() => {
    const isComplete = currentCredits > 0;
    const wasComplete = prevCreditsRef.current > 0;
    if (onCompletionStatusChange && isComplete !== wasComplete) {
      prevCreditsRef.current = currentCredits;
      onCompletionStatusChange(isComplete);
    }
  }, [currentCredits, onCompletionStatusChange]);

  const handlePromoApply = async () => {
    setPromoLoading(true);
    try {
      // Simulate promo code application
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPromoApplied(true);
      trackEvent('promo_code_applied', { code: promoCode });
    } catch (err) {
      console.error('Error applying promo code:', err);
    } finally {
      setPromoLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const sortedBundles = [...creditBundleList].sort((a, b) => a.credits - b.credits);
    const perCreditCost = 0.1;
    const ultraPrice = customCredits * 0.08;
    const providerPremium = modelProviders.find(p => p.id === selectedProvider)?.premium || 1.0;

    onSave({
      selectedPlan,
      customCredits: selectedPlan === 'ultra' ? customCredits : null,
      totalCredits: selectedPlan === 'ultra'
        ? currentCredits + customCredits
        : currentCredits + (creditPlans.find(plan => plan.id === selectedPlan)?.credits || 0),
      price: selectedPlan === 'ultra'
        ? ultraPrice
        : creditPlans.find(plan => plan.id === selectedPlan)?.price || 0,
      selectedProvider,
      providerPremium
    });
  };

  return (
    <div data-testid="credits-pane-container">
      {/* Success overlay */}
      {purchaseSucceeded && (
        <div className="step-completion-success">
          <div className="success-icon">✓</div>
          <div className="success-ring-outer" />
          <div className="success-ring-middle" />
          <div className="success-ring-inner" />
          <div className="success-glow" />
        </div>
      )}
      
      <motion.div
        className="orbital-step-content credits-step"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <OrbitalsCreditsOrbitalHeader isOnboardingComplete={isOnboardingComplete} />

        <motion.div
          className="current-credits-display"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="credits-icon">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5h-2.35v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.82 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.62-3.42z" />
            </svg>
          </div>
          <div className="credits-info">
            <div className="credits-label-container">
              <span className="credits-label">Current Balance</span>
            </div>
            <span className="credits-amount">{currentCredits.toLocaleString()} Credits</span>
          </div>
        </motion.div>

        {isSettingsSurface && (
          <div className="mb-6 rounded-[22px] border border-white/10 bg-white/[0.045] px-5 py-4 text-sm leading-7 text-white/74 shadow-[0_18px_45px_rgba(0,0,0,0.2)]">
            Use this settings area to top up capacity, review provider premiums, and inspect how
            Bitcode spends credits across repository analysis, execution, and delivery work.
          </div>
        )}

        {/* Primary purchase component */}
        <div className="credit-plans mt-6">
          <CreditsPrices
            selectedPlan={selectedPlan}
            onSelectPlan={setSelectedPlan}
            customCredits={customCredits}
            onChangeCustomCredits={setCustomCredits}
            onPurchase={handlePurchase}
            perCreditCost={0.1}
            isSignedIn={isSignedIn}
            centerFirst
          />
        </div>

        {/* First-time user special content */}
        {!isOnboardingComplete && (
          <div className="first-time-credit-plans">
            <motion.div
              className="onboarding-special-offer-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="roi-calculator">
                {/* What Is A Deliverable */}
                <div className="value-anchor">
                  <div className="anchor-header">
                    <h3>What Is A Deliverable?</h3>
                    <div className="anchor-badge">BITCODE OUTPUT</div>
                  </div>
                  <div className="anchor-content">
                    <div className="anchor-item-vertical">
                      <div className="anchor-icon-wrapper">
                        <div className="anchor-icon enhanced-icon">
                          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm4.51-8.95C17.41 6.04 18 7.23 18 8.5c0 1.27-.59 2.46-1.49 3.45.88.26 1.66.65 2.32 1.12.41-.72.65-1.55.65-2.44C19.48 7.8 17.18 5.5 14.35 5.5c-.26 0-.52.02-.78.06.26.27.5.57.7.89.24 0 .23-.01.24 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="anchor-text-vertical">
                        <strong>Production-Ready Output</strong>
                        <span>Complete solutions with tests, docs, and proper architecture</span>
                      </div>
                    </div>
                    <div className="anchor-item-vertical">
                      <div className="anchor-icon-wrapper">
                        <div className="anchor-icon enhanced-icon">
                          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                            <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                          </svg>
                        </div>
                      </div>
                      <div className="anchor-text-vertical">
                        <strong>1000-10000x Faster</strong>
                        <span>Tasks that take days or weeks completed in minutes</span>
                      </div>
                    </div>
                    <div className="anchor-item-vertical">
                      <div className="anchor-icon-wrapper">
                        <div className="anchor-icon enhanced-icon">
                          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                            <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                          </svg>
                        </div>
                      </div>
                      <div className="anchor-text-vertical">
                        <strong>99% Cost Reduction</strong>
                        <span>$10-100 with Bitcode vs. $1,000-10,000+ with manual labor</span>
                      </div>
                    </div>
                  </div>

                  {/* GitHub task correlation section */}
                  <div className="deliverable-types-container">
                    <h4 className="deliverable-types-title">Deliverables as GitHub Tasks</h4>
                    <p className="deliverable-types-description">
                      Bitcode produces concrete GitHub artifacts that map directly to your development workflow:
                    </p>
                    <div className="deliverable-types-grid">
                      <div className="deliverable-type-item improved">
                        <div className="deliverable-type-header">
                          <div className="deliverable-type-icon">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                              <path d="M6,2A3,3 0 0,1 9,5C9,6.28 8.19,7.38 7.06,7.81C7.15,8.27 7.39,8.83 8,9.63C9,10.92 11,12.83 12,14.17C13,12.83 15,10.92 16,9.63C16.61,8.83 16.85,8.27 16.94,7.81C15.81,7.38 15,6.28 15,5A3,3 0 0,1 18,2A3,3 0 0,1 21,5C21,6.32 20.14,7.45 18.95,7.85C18.87,8.37 18.64,9 18,9.83C17,11.17 15,13.08 14,14.38C13.39,15.17 13.15,15.73 13.06,16.19C14.19,16.62 15,17.72 15,19A3,3 0 0,1 12,22A3,3 0 0,1 9,19C9,17.72 9.81,16.62 10.94,16.19C10.85,15.73 10.61,15.17 10,14.38C9,13.08 7,11.17 6,9.83C5.36,9 5.13,8.37 5.05,7.85C3.86,7.45 3,6.32 3,5A3,3 0 0,1 6,2M6,4A1,1 0 0,0 5,5A1,1 0 0,0 6,6A1,1 0 0,0 7,5A1,1 0 0,0 6,4M18,4A1,1 0 0,0 17,5A1,1 0 0,0 18,6A1,1 0 0,0 19,5A1,1 0 0,0 18,4M12,18A1,1 0 0,0 11,19A1,1 0 0,0 12,20A1,1 0 0,0 13,19A1,1 0 0,0 12,18Z" />
                            </svg>
                          </div>
                          <h5>Issues</h5>
                        </div>
                        <div className="deliverable-type-content">
                          <p>Detailed design documents with requirements analysis, architecture decisions, and implementation plans</p>
                        </div>
                      </div>
                      <div className="deliverable-type-item improved">
                        <div className="deliverable-type-header">
                          <div className="deliverable-type-icon">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                              <path d="M17,12V3A1,1 0 0,0 16,2H3A1,1 0 0,0 2,3V17L6,13H16A1,1 0 0,0 17,12M21,6H19V15H6V17A1,1 0 0,0 7,18H18L22,22V7A1,1 0 0,0 21,6Z" />
                            </svg>
                          </div>
                          <h5>Issue Comments</h5>
                        </div>
                        <div className="deliverable-type-content">
                          <p>Design reviews, clarifications, and technical discussions that refine implementation details</p>
                        </div>
                      </div>
                      <div className="deliverable-type-item improved">
                        <div className="deliverable-type-header">
                          <div className="deliverable-type-icon">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                              <path d="M13,9V3.5L18.5,9M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z" />
                            </svg>
                          </div>
                          <h5>Pull Requests</h5>
                        </div>
                        <div className="deliverable-type-content">
                          <p>Complete implementations with tests, documentation, and CI/CD-ready code</p>
                        </div>
                      </div>
                      <div className="deliverable-type-item improved">
                        <div className="deliverable-type-header">
                          <div className="deliverable-type-icon">
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                          </div>
                          <h5>PR Reviews</h5>
                        </div>
                        <div className="deliverable-type-content">
                          <p>Thorough code reviews with actionable feedback and improvement suggestions</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bitcode workflow */}
                  <div className="engineering-workflow-section">
                    <h4 className="workflow-title">How Bitcode Delivers</h4>
                    <div className="workflow-steps-grid">
                      {agenticWorkflowSteps.map((step) => (
                        <div className="workflow-step" key={step.id}>
                          <div className="workflow-step-icon">
                            <step.icon className="h-6 w-6 text-emerald-400" />
                          </div>
                          <div className="workflow-step-content">
                            <h6>{step.title}</h6>
                            <p>{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="agentic-scale-container">
                    <div className="agentic-scale-icon">
                      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                        <path d="M16,6H13V3H11V6H8V8H11V11H13V8H16M16.67,14.88L15.07,16.48C14.93,16.34 14.78,16.21 14.61,16.1C14.1,15.81 13.53,15.67 12.95,15.67C11.8,15.67 10.83,16.12 10.05,16.96C9.34,17.71 8.89,18.61 8.72,19.67H8.38L6.38,17.67L5.67,18.38L8.67,21.38L11.67,18.38L10.96,17.67L9.2,19.43C9.67,18.5 10.36,17.77 11.26,17.24C11.94,16.83 12.69,16.63 13.5,16.63C14.1,16.63 14.68,16.76 15.22,17.03C15.56,17.19 15.87,17.41 16.13,17.67L17.73,16.07C18.14,15.67 18.14,15 17.73,14.59C17.32,14.18 16.67,14.18 16.27,14.59L16.67,14.88Z" />
                      </svg>
                    </div>
                    <div className="agentic-scale-content">
                      <h5>Unlimited Scaling Potential</h5>
                      <p>Unlike manual-only teams that scale linearly, Bitcode's agent network can scale to thousands of simultaneous tasks, allowing you to parallelize development across multiple projects with consistent quality and dramatically reduced costs.</p>
                    </div>
                  </div>
                </div>

                {/* Why Bitcode Is Worth It */}
                <div className="first-time-value-anchor" style={{ marginTop: "24px", marginBottom: "0" }}>
                  <div className="value-anchor-title">
                    <div className="value-anchor-icon">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2 11.7V16h-4v-2.3C8.48 12.63 7 11.53 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.49-1.51 3.65-3 4.7z" />
                      </svg>
                    </div>
                    <h4>Why Bitcode Is Worth It</h4>
                  </div>
                  <div className="value-anchor-grid">
                    <div className="value-anchor-item">
                      <div className="value-anchor-metric">10-1000x</div>
                      <div className="value-anchor-label">Faster Deliverables</div>
                    </div>
                    <div className="value-anchor-item">
                      <div className="value-anchor-metric">90-99%</div>
                      <div className="value-anchor-label">Cost Reduction</div>
                    </div>
                    <div className="value-anchor-item">
                      <div className="value-anchor-metric">99%+</div>
                      <div className="value-anchor-label">Acceptance Rate</div>
                    </div>
                    <div className="value-anchor-item">
                      <div className="value-anchor-metric">Infinite</div>
                      <div className="value-anchor-label">Scaling Capability</div>
                    </div>
                  </div>

                  {/* Credits never expire */}
                  <div className="credits-never-expire" style={{ marginTop: "20px" }}>
                    <div className="expire-icon">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                      </svg>
                    </div>
                    <div className="expire-text"><span className="credit-benefit">Credits never expire</span> — Purchase once, use anytime</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {!isOnboardingComplete && (
          <div className="onboarding-offers-row">
            <motion.div
              className="onboarding-info special-offer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="offer-header">
                <div className="offer-badge">LIMITED TIME OFFER</div>
                <h3 className="special-offer-title">Special Launch-Month Offer</h3>
                <p className="offer-description">
                  During launch month, you're eligible for a special discount on your first credit purchase.
                  Get 10% more credits with any plan you choose today!
                </p>
              </div>
              <div className="special-offer-badge">
                <span>+10%</span> BONUS CREDITS
              </div>
            </motion.div>

            <motion.div
              className="promo-code-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h3 className="promo-title">Have a Promo Code?</h3>
              <p className="promo-description">Enter your promotional code to receive additional credits or discounts</p>
              <div className="promo-input-container">
                <input
                  type="text"
                  className="promo-input"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button
                  className="promo-apply-button"
                  onClick={handlePromoApply}
                  disabled={promoLoading || !promoCode}
                >
                  {promoLoading ? 'Applying...' : promoApplied ? 'Applied ✓' : 'Apply'}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        <div className="credits-usage-info">
          <h3 className="credits-usage-title">
            {isSettingsSurface ? 'How Bitcode uses credits' : 'Advanced Bitcode Agents: Autonomous Deliverables'}
          </h3>
          <div className="value-proposition">
            <p className="value-proposition p">
              {isSettingsSurface
                ? 'Credits fund repository analysis, execution, validation, and delivery work across Bitcode. Review balance, premium adjustments, and historical consumption here before launching additional work.'
                : "Bitcode's vertically integrated engineering platform transforms software development through specialized systems working in concert. Our advanced pipeline delivers production-ready solutions through a comprehensive process:"}
            </p>
            <div className="value-proposition-grid">
              <div className="value-prop-item">
                <div className="value-prop-item-header">
                  <div className="value-prop-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                    </svg>
                  </div>
                  <h5>{isSettingsSurface ? 'Repository analysis' : 'Deep Analysis'}</h5>
                </div>
                <div className="value-prop-item-content">
                  <p>{isSettingsSurface ? 'Initial repository mapping, planning, and execution setup' : 'Architectural understanding and strategic planning'}</p>
                </div>
              </div>
              <div className="value-prop-item">
                <div className="value-prop-item-header">
                  <div className="value-prop-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                    </svg>
                  </div>
                  <h5>{isSettingsSurface ? 'Execution work' : 'Intelligent Coding'}</h5>
                </div>
                <div className="value-prop-item-content">
                  <p>{isSettingsSurface ? 'Model-backed implementation, edits, and iterative refinement' : 'Clean, maintainable code following best practices'}</p>
                </div>
              </div>
              <div className="value-prop-item">
                <div className="value-prop-item-header">
                  <div className="value-prop-icon">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </div>
                  <h5>{isSettingsSurface ? 'Validation and delivery' : 'Rigorous Validation'}</h5>
                </div>
                <div className="value-prop-item-content">
                  <p>{isSettingsSurface ? 'Testing, review, reconciliation, and final delivery surfaces' : 'Automated testing and quality assurance'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Model Provider Premium display */}
        <div className="model-provider-premium">
          <h3 className="model-selection-title">Model Provider Premium</h3>
          <p className="model-selection-description">
            Different model providers have different pricing structures. Your credit usage will be adjusted based on the model premium.
          </p>

          <div className="model-providers-grid">
            {modelProviders.map(provider => (
              <div key={provider.id} className="model-provider-card">
                <div className="provider-header">
                  <span className="provider-name">{provider.name}</span>
                  <span className="provider-premium">
                    {provider.premium === 1.0 ?
                      "Standard (1x)" :
                      `${provider.premium > 1.0 ? "+" : "-"}${Math.abs((provider.premium - 1) * 100).toFixed(0)}%`}
                  </span>
                </div>
                <span className="provider-description">{provider.description}</span>
                <div className="premium-indicator" style={{ width: `${provider.premium * 50}%` }}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Chart - disabled during onboarding */}
        <AfterOnboardingOverlay disabled={!isOnboardingComplete}>
          <div className="credits-usage-chart-container">
            <h3 className="credits-usage-title">Credit Usage History</h3>
            <div className="usage-interval-switcher">
              {(['daily', 'weekly', 'monthly'] as const).map(interval => (
                <button
                  key={interval}
                  onClick={() => setUsageInterval(interval)}
                  className={usageInterval === interval ? 'interval-button active' : 'interval-button'}
                  disabled={usageLoading}
                >
                  {interval.charAt(0).toUpperCase() + interval.slice(1)}
                </button>
              ))}
            </div>
            <div className="credits-usage-chart">
              <canvas
                ref={chartRef}
                width="800"
                height="400"
                className="usage-chart-canvas"
              />
            </div>
            <div className="credits-usage-summary">
              <div className="summary-item">
                <span className="summary-label">Total Spent ({usageInterval.charAt(0).toUpperCase() + usageInterval.slice(1)})</span>
                <span className="summary-value spent-value">
                  {usageData.reduce((sum, d) => sum + d.spent, 0).toLocaleString()} Credits
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Total Purchased ({usageInterval.charAt(0).toUpperCase() + usageInterval.slice(1)})</span>
                <span className="summary-value purchased-value">
                  {usageData.reduce((sum, d) => sum + d.purchased, 0).toLocaleString()} Credits
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Average {usageInterval.charAt(0).toUpperCase() + usageInterval.slice(1)} Usage</span>
                <span className="summary-value average-value">
                  {usageData.length > 0
                    ? Math.round(usageData.reduce((sum, d) => sum + d.spent, 0) / usageData.length).toLocaleString()
                    : '0'} Credits
                </span>
              </div>
            </div>
          </div>
        </AfterOnboardingOverlay>

        {/* Transaction History - disabled during onboarding */}
        <AfterOnboardingOverlay disabled={!isOnboardingComplete}>
          <div className="credits-transactions-container mt-6">
            <h3 className="credits-usage-title">Transaction History</h3>
            {txLoading ? (
              <ProcessingIndicator />
            ) : txError ? (
              <div className="text-red-500">Error: {txError}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr>
                      <th className="border-b px-4 py-2">Date</th>
                      <th className="border-b px-4 py-2">Description</th>
                      <th className="border-b px-4 py-2">Change</th>
                      <th className="border-b px-4 py-2">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map(tx => (
                      <tr key={tx.id}>
                        <td className="border-b px-4 py-2">{new Date(tx.created_at).toLocaleString()}</td>
                        <td className="border-b px-4 py-2">{tx.description}</td>
                        <td className={`border-b px-4 py-2 ${tx.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {tx.change > 0 ? '+' : ''}{tx.change}
                        </td>
                        <td className="border-b px-4 py-2">{tx.balance}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between items-center mt-2">
                  <button
                    onClick={() => setTxPage(p => Math.max(1, p - 1))}
                    disabled={txPage <= 1}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >Previous</button>
                  <span className="text-sm">Page {txPage} of {Math.max(1, Math.ceil(txCount / PAGE_SIZE))}</span>
                  <button
                    onClick={() => setTxPage(p => p + 1)}
                    disabled={txPage * PAGE_SIZE >= txCount}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >Next</button>
                </div>
              </div>
            )}
          </div>
        </AfterOnboardingOverlay>
      </motion.div>
    </div>
  );
}
