'use client';

import React, { memo } from 'react';
import Link from 'next/link';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

import BitcodeApplicationRuntimeMount from '@/app/application/BitcodeApplicationRuntimeMount';

const LANDING_RUNTIME_STYLESHEET_ID = 'bitcode-landing-first-gate-stylesheet';
const LANDING_RUNTIME_STYLESHEET_HREF = '/application/first-gate-scoped-styles';

export const MarketingLandingDemoRuntimeEmbed = memo(function MarketingLandingDemoRuntimeEmbed() {
  return (
    <section
      aria-label="Built embedded Bitcode demonstration runtime"
      data-testid="landing-built-demo-embed"
      className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-[28px] border border-emerald-300/12 bg-[linear-gradient(135deg,rgba(6,16,26,0.94),rgba(3,8,18,0.98))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_60px_rgba(0,0,0,0.28)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_0%,rgba(103,254,183,0.16),transparent_32%),radial-gradient(circle_at_88%_18%,rgba(56,189,248,0.10),transparent_34%)]" />
      <div className="relative flex flex-wrap items-start justify-between gap-3 px-1 pb-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-200/78">
            Interactive runtime
          </p>
          <p className="mt-1 max-w-[34rem] text-[12px] leading-5 text-emerald-50/62">
            The homepage mounts the compiled demonstration bundle directly inside the app shell. Open the full page
            when you want the wider operator surface.
          </p>
        </div>
        <Link
          href="/application"
          className="inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-300/14 bg-emerald-400/8 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-50/82 transition hover:border-emerald-200/28 hover:bg-emerald-300/12"
        >
          Full-page demo
          <ArrowTopRightOnSquareIcon className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden rounded-[22px] border border-white/10 bg-[#09101f]">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-[#09101f]/80 to-transparent" />
        <div className="h-[600px] overflow-auto overscroll-contain laptop:h-[660px] desktop:h-[720px]">
          <BitcodeApplicationRuntimeMount
            className="bitcode-landing-runtime-surface min-w-[960px]"
            stylesheetId={LANDING_RUNTIME_STYLESHEET_ID}
            stylesheetHref={LANDING_RUNTIME_STYLESHEET_HREF}
          />
        </div>
      </div>

      <style>{`
        .bitcode-first-gate-root.bitcode-landing-runtime-surface {
          background: transparent;
        }

        .bitcode-first-gate-root.bitcode-landing-runtime-surface .page {
          max-width: none;
          margin: 0;
          padding: 18px;
        }

        .bitcode-first-gate-root.bitcode-landing-runtime-surface .hero {
          margin-bottom: 14px;
        }

        .bitcode-first-gate-root.bitcode-landing-runtime-surface .hero h1 {
          max-width: 720px;
          font-size: 28px;
          line-height: 1.08;
        }

        .bitcode-first-gate-root.bitcode-landing-runtime-surface .lede,
        .bitcode-first-gate-root.bitcode-landing-runtime-surface .hero-tip {
          max-width: 720px;
          font-size: 13px;
          line-height: 1.5;
        }

        .bitcode-first-gate-root.bitcode-landing-runtime-surface .hero-actions {
          gap: 8px;
          margin-top: 12px;
        }

        .bitcode-first-gate-root.bitcode-landing-runtime-surface .hero-actions > label {
          flex-basis: 172px;
        }

        .bitcode-first-gate-root.bitcode-landing-runtime-surface .hero-actions > button {
          min-width: 132px;
        }

        .bitcode-first-gate-root.bitcode-landing-runtime-surface .summary-grid {
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 12px;
        }

        .bitcode-first-gate-root.bitcode-landing-runtime-surface .summary-card {
          padding: 12px;
        }

        .bitcode-first-gate-root.bitcode-landing-runtime-surface .summary-card strong {
          font-size: 22px;
        }

        .bitcode-first-gate-root.bitcode-landing-runtime-surface .grid {
          gap: 12px;
        }

        .bitcode-first-gate-root.bitcode-landing-runtime-surface .panel {
          border-radius: 14px;
          padding: 13px;
        }

        .bitcode-first-gate-root.bitcode-landing-runtime-surface h2 {
          font-size: 16px;
        }

        .bitcode-first-gate-root.bitcode-landing-runtime-surface #flowGuideLayer,
        .bitcode-first-gate-root.bitcode-landing-runtime-surface #flowGuideToggleButton {
          display: none !important;
        }

        @media (max-width: 960px) {
          .bitcode-first-gate-root.bitcode-landing-runtime-surface {
            min-width: 760px;
          }

          .bitcode-first-gate-root.bitcode-landing-runtime-surface .summary-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .bitcode-first-gate-root.bitcode-landing-runtime-surface .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
});
