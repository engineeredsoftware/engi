// moved to app/orbitals/components/models-pane.tsx
"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { trackEvent } from '@bitcode/google-analytics';
import { reportError } from '@bitcode/errors';
// import { modelCallNames } from './models/_legacy_modelCallNames'; // Legacy - not used
import GlobalModelSelection from './models/GlobalModelSelection';
import { SUPPORTED_LLM_MODELS, ProviderId } from '@/utils/model-pricing';
// import ModelCallConfiguration from './models/_legacy_ModelCallConfiguration'; // Legacy - not used
import SystemPromptSection from './models/SystemPromptSection';
import { AfterOnboardingOverlay } from './shared/after-onboarding-overlay';
import OrbitalsInterfacesOrbitalHeader from './headers/OrbitalsInterfacesOrbitalHeader';

interface InterfacesPaneProps {
  onSave: (data: any) => void;
  loading: boolean;
  isOnboardingComplete?: boolean;
  onCompletionStatusChange?: (isComplete: boolean) => void;
  initialModelPreferences?: any;
}

interface ModelOption {
  id: string;
  name: string;
  description: string;
  performance: number;
  cost: number;
  specialization?: string;
  inputUSDPerMTok?: number;
  outputUSDPerMTok?: number;
  inputLimit?: number;
  outputLimit?: number;
}

interface ModelCall {
  name: string;
  phase: string;
  agent: string;
  step: string;
  failsafe: string;
  generation: string;
  model: string;
  systemPrompt?: string;
  fullName: string;
}

export default function InterfacesPane({ 
  onSave, 
  loading: _loading,
  isOnboardingComplete = false,
  onCompletionStatusChange, 
  initialModelPreferences
}: InterfacesPaneProps) {
  const isInterfacesSurface = isOnboardingComplete;

  // Available model options: generated from centralized catalog
  const modelOptions: ModelOption[] = useMemo(() => {
    // Compute robust min/max over known priced models
    const priced = SUPPORTED_LLM_MODELS.flatMap(p => p.models)
      .map(m => ({ m, cost: (m.inputPriceUSDPerMTok ?? NaN) + (m.outputPriceUSDPerMTok ?? NaN) }))
      .filter(x => !Number.isNaN(x.cost));
    const costs = priced.map(x => x.cost);
    const minCost = costs.length ? Math.min(...costs) : 0;
    const maxCost = costs.length ? Math.max(...costs) : 1;
    const span = Math.max(1e-6, maxCost - minCost);

    const opts: ModelOption[] = [];
    for (const prov of SUPPORTED_LLM_MODELS) {
      for (const m of prov.models) {
        const costUSD = (m.inputPriceUSDPerMTok ?? NaN) + (m.outputPriceUSDPerMTok ?? NaN);
        let costScore = 50;
        let perfScore = 50;
        if (!Number.isNaN(costUSD)) {
          const normalized = (costUSD - minCost) / span; // 0=cheapest, 1=most expensive
          // Cost visualization: higher normalized → higher cost score
          costScore = Math.round(1 + normalized * 99);
          // Performance proxy: invert cost; clamp
          perfScore = Math.round(1 + (1 - normalized) * 99);
        }

        opts.push({
          id: m.apiId,
          name: `${prov.provider.toUpperCase()} · ${m.id}`,
          description: m.notes || '',
          performance: perfScore,
          cost: costScore,
          specialization: prov.provider as ProviderId,
          inputUSDPerMTok: m.inputPriceUSDPerMTok,
          outputUSDPerMTok: m.outputPriceUSDPerMTok,
          inputLimit: m.inputLimit,
          outputLimit: m.outputLimit,
        });
      }
    }
    return opts;
  }, []);

  const [modelCalls, setModelCalls] = useState<ModelCall[]>([]);
  const [globalSystemPrompt, setGlobalSystemPrompt] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [tokenCount, setTokenCount] = useState(0);

  // Initialize model calls from names - LEGACY, commented out
  // useEffect(() => {
  //   const calls: ModelCall[] = [];
  //   
  //   modelCallNames.forEach(name => {
  //     const parts = name.match(/^(\w+)Agent(\w+)(Plan|Generate|Refine|Intensify)(Prepare|ChunkSum|StitchComplete)(Reason|Judge|StructuredOutput)$/);
  //     
  //     if (parts) {
  //       const phase = parts[1];
  //       const agent = `${phase}Agent${parts[2]}`;
  //       const step = parts[3];
  //       const failsafe = parts[4];
  //       const generation = parts[5];
  //       
  //       calls.push({
  //         name,
  //         phase,
  //         agent,
  //         step,
  //         failsafe,
  //         generation,
  //         model: 'balanced', // Default model
  //         fullName: name
  //       });
  //     }
  //   });
  //   
  //   setModelCalls(calls);
  // }, []);

  // Load initial preferences
  useEffect(() => {
    if (initialModelPreferences) {
      if (initialModelPreferences.globalSystemPrompt) {
        setGlobalSystemPrompt(initialModelPreferences.globalSystemPrompt);
      }
      if (initialModelPreferences.modelMappings) {
        setModelCalls(prev => prev.map(call => ({
          ...call,
          model: initialModelPreferences.modelMappings[call.name] || call.model
        })));
      }
    }
  }, [initialModelPreferences]);

  // Mark as complete immediately - models are optional
  const hasCalledCompletionRef = useRef(false);
  useEffect(() => {
    if (onCompletionStatusChange && !hasCalledCompletionRef.current) {
      hasCalledCompletionRef.current = true;
      onCompletionStatusChange(true);
    }
  }, [onCompletionStatusChange]);

  const handleModelChange = (callName: string, model: string) => {
    setModelCalls(prev => prev.map(call => 
      call.name === callName ? { ...call, model } : call
    ));
  };

  const applyGlobalModel = (modelId: string) => {
    setModelCalls(prev => prev.map(call => ({ ...call, model: modelId })));
    trackEvent('interfaces_global_applied', { model: modelId });
  };

  const updateTokenCounter = (text: string) => {
    // Simple approximation: ~4 characters per token
    const estimated = Math.ceil(text.length / 4);
    setTokenCount(estimated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const modelMappings = modelCalls.reduce((acc, call) => {
      acc[call.name] = call.model;
      return acc;
    }, {} as Record<string, string>);
    
    onSave({
      globalSystemPrompt,
      modelMappings,
      tokenCount
    });
  };

  return (
    <div data-testid="models-pane-container">
      <motion.div
        className="orbital-step-content models-step"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <OrbitalsInterfacesOrbitalHeader isOnboardingComplete={isOnboardingComplete} />

        {isInterfacesSurface && (
          <div className="mb-6 rounded-[22px] border border-emerald-300/18 bg-emerald-400/10 px-5 py-4 text-white/82 shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-100/76">
              Interfaces defaults
            </div>
            <p className="mt-3 text-sm leading-7 text-white/78">
              Routing, prompts, and execution defaults here shape how transactions, conversations,
              and follow-through behave the next time you work in Bitcode. Update these defaults
              when you need a different provider mix or instruction baseline.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="step-form">
          {/* System Prompt Section */}
          <AfterOnboardingOverlay disabled={!isOnboardingComplete}>
            <SystemPromptSection
              value={globalSystemPrompt}
              onChange={setGlobalSystemPrompt}
              tokenCount={tokenCount}
              updateTokenCounter={updateTokenCounter}
            />
          </AfterOnboardingOverlay>

          {/* Global Model Selection */}
          <AfterOnboardingOverlay disabled={!isOnboardingComplete}>
            <GlobalModelSelection
              modelOptions={modelOptions}
              onApplyGlobalModel={applyGlobalModel}
            />
          </AfterOnboardingOverlay>

          {/* Advanced Configuration - Legacy, completely removed */}

          {/* Hidden submit button for programmatic submission */}
          <button
            type="submit"
            id="models-submit-button"
            style={{ display: 'none' }}
          />

          <button type="submit" className="primary-button save-button">
            {isInterfacesSurface ? 'Save interfaces orbital' : 'Continue'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
