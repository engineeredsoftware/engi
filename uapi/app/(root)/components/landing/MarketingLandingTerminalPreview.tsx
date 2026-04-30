'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowTopRightOnSquareIcon, CircleStackIcon } from '@heroicons/react/24/outline';

import BitcodePill from '@/components/base/bitcode/branding/bitcode-pill';
import { BITCODE_PUBLIC_COPY } from '@/components/base/bitcode/layout/bitcode-public-copy';

import { MarketingLandingDemoRuntimeEmbed } from './MarketingLandingDemoRuntimeEmbed';
import { entranceEase, paintedMotionStyle } from './marketing-landing-shared';

export const MarketingLandingTerminalPreview = memo(function MarketingLandingTerminalPreview() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.12, ease: entranceEase }}
      className="relative min-h-[620px] overflow-hidden rounded-[34px] border border-emerald-300/14 bg-[linear-gradient(145deg,rgba(4,12,22,0.96),rgba(3,8,18,0.98))] p-4 shadow-[0_32px_100px_rgba(2,8,17,0.54)] backdrop-blur-xl laptop:min-h-[760px]"
      style={paintedMotionStyle}
    >
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
      <div className="absolute -right-14 top-8 h-56 w-56 rounded-full bg-emerald-400/12 blur-3xl" />
      <div className="absolute -left-12 bottom-10 h-48 w-48 rounded-full bg-cyan-300/8 blur-3xl" />

      <div className="relative flex h-full flex-col">
        <div className="flex flex-wrap items-start justify-between gap-3 px-1 pb-4">
          <div className="min-w-0">
            <BitcodePill className="border-emerald-300/30 bg-emerald-400/10 text-emerald-100">
              <CircleStackIcon className="h-3.5 w-3.5" />
              {BITCODE_PUBLIC_COPY.terminalPreview.pill}
            </BitcodePill>
            <h2 className="mt-3 max-w-xl text-2xl font-semibold tracking-tight text-white tablet:text-3xl">
              Run the Source Shares demonstration in place.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-emerald-50/64">
              This is the built Bitcode runtime embedded into the homepage. It uses the same compiled bundle as the
              full-page Terminal view, with mock data and no separate demo server.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-100/70">
            {BITCODE_PUBLIC_COPY.terminalPreview.kicker}
            <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
          </span>
        </div>

        <MarketingLandingDemoRuntimeEmbed />
      </div>
    </motion.aside>
  );
});
