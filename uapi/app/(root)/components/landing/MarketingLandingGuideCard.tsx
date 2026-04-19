'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';

import { BITCODE_PUBLIC_COPY } from '@/components/base/engi/layout/bitcode-public-copy';

import { animatedMotionStyle, entranceEase } from './marketing-landing-shared';

export const MarketingLandingGuideCard = memo(function MarketingLandingGuideCard() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: entranceEase }}
      className="relative mt-6 max-w-xl overflow-visible rounded-[24px] border border-emerald-300/12 bg-black/25 p-4 pt-5 shadow-[0_20px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl phone:mt-7 phone:pt-6"
      style={animatedMotionStyle}
    >
      <div className="pointer-events-none absolute left-0 top-0 -translate-x-3 -translate-y-1/2 phone:-translate-x-4">
        <div className="inline-flex items-center rounded-full border border-emerald-300/10 bg-emerald-400/[0.05] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-emerald-100/58 shadow-[0_10px_24px_rgba(0,0,0,0.18)] backdrop-blur-xl">
          <span>{BITCODE_PUBLIC_COPY.guide.badge}</span>
        </div>
      </div>

      <div className="border-b border-emerald-300/10 pb-3 laptop:grid laptop:grid-cols-[minmax(0,1fr)_auto] laptop:items-center laptop:gap-4">
        <div className="min-w-0 laptop:pr-2">
          <p className="bg-gradient-to-r from-emerald-200 via-emerald-100 to-white bg-clip-text text-[11px] font-semibold uppercase leading-[1.35] tracking-[0.18em] text-transparent phone:text-[12px] phone:tracking-[0.22em]">
            {BITCODE_PUBLIC_COPY.guide.title}
          </p>
        </div>
        <div className="mt-3 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-emerald-300/10 bg-emerald-400/[0.05] px-2.5 py-1 text-[9px] uppercase leading-4 tracking-[0.18em] text-emerald-100/58 phone:text-[10px] laptop:mt-0 laptop:justify-self-start">
          <span>{BITCODE_PUBLIC_COPY.guide.meta}</span>
        </div>
      </div>

      <p className="mt-3 text-[13px] leading-6 text-emerald-100/72">{BITCODE_PUBLIC_COPY.guide.body}</p>
    </motion.article>
  );
});
