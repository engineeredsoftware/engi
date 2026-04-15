'use client';

import { useState } from 'react';
import {
  ArrowTopRightOnSquareIcon,
  CommandLineIcon,
  QueueListIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

import EngiPill from '@/components/base/engi/branding/engi-pill';

type MarketingEmbeddedDemoSectionProps = {
  demoUrl: string;
};

const embeddedHighlights = [
  {
    title: 'Start with the chain',
    description: 'Read repo supply, measured need, and deposit-to-need fit first. Those panels tell you what is being evaluated and why the run can proceed.',
    Icon: QueueListIcon,
  },
  {
    title: 'Run a branch',
    description: 'Switch scenario, branch mode, and projection principal, then create a branch. The demonstration fills the artifact chain in the same order an operator would inspect it.',
    Icon: CommandLineIcon,
  },
  {
    title: 'Inspect the closure',
    description: 'After the run, move through proof, disclosure, and settlement. Buyer, reviewer, and public views expose different surfaces, so toggling them explains the rights boundary directly.',
    Icon: ShieldCheckIcon,
  },
] as const;

export default function MarketingEmbeddedDemoSection({
  demoUrl,
}: MarketingEmbeddedDemoSectionProps) {
  const [isFrameLoaded, setIsFrameLoaded] = useState(false);

  return (
    <section
      id="engi-demo-live"
      aria-labelledby="engi-demo-live-title"
      className="relative z-20 border-t border-white/8 bg-[linear-gradient(180deg,#02060d_0%,#04101a_12%,#02060d_100%)]"
    >
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(103,254,183,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(103,254,183,0.06)_1px,transparent_1px)] [background-size:120px_120px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />

      <div className="relative mx-auto max-w-[1380px] px-4 py-16 phone:px-5 tablet:px-6 laptop:px-8 laptop:py-20 desktop:px-12">
        <div className="grid gap-8 laptop:grid-cols-[minmax(320px,0.92fr)_minmax(0,1.08fr)] laptop:items-start">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <EngiPill className="border-emerald-300/26 bg-emerald-400/10 text-emerald-50">
                Interactive Walkthrough
              </EngiPill>
              <span className="rounded-full border border-cyan-300/14 bg-cyan-400/8 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-cyan-100/72">
                operator surface
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.26em] text-emerald-200/66">
                Live V23 system walkthrough
              </p>
              <h2
                id="engi-demo-live-title"
                className="max-w-[14ch] text-[2.15rem] font-semibold leading-[0.96] tracking-[-0.025em] text-white phone:text-[2.6rem] tablet:text-[3rem]"
              >
                Run ENGI from supply to settlement.
              </h2>
              <p className="max-w-[34rem] text-[16px] leading-7 text-white/78 tablet:text-[17px]">
                Use the embedded surface like an operator console. Begin with repo supply and
                measured need, create a branch, then inspect fit, proof, disclosure, and
                NGI-denominated settlement in order. The layout is meant to be walked top to
                bottom.
              </p>
            </div>

            <div className="grid gap-3">
              {embeddedHighlights.map(({ title, description, Icon }) => (
                <article
                  key={title}
                  className="rounded-[24px] border border-white/8 bg-white/[0.04] p-4 shadow-[0_20px_60px_rgba(2,8,17,0.22)] backdrop-blur-xl"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/16 bg-emerald-400/8 text-emerald-200/86">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-emerald-50/66">{description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="rounded-[24px] border border-orange-300/12 bg-orange-400/[0.04] p-4 shadow-[0_16px_40px_rgba(80,30,0,0.18)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-100/76">
                Interaction guide
              </p>
              <p className="mt-2 text-sm leading-6 text-orange-50/76">
                Start by scanning the left navigation and the opening surfaces for repo supply,
                need, and fit. Then run a branch, switch projection principals, and compare what
                remains visible at each disclosure boundary. Open standalone if you want a wider
                inspection view while keeping the same walkthrough order.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-black/35 shadow-[0_30px_100px_rgba(0,0,0,0.42)] backdrop-blur-xl">
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
            <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-emerald-400/14 blur-3xl" />
            <div className="absolute -left-12 bottom-8 h-36 w-36 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative border-b border-white/8 px-4 py-4 phone:px-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-200/62">
                    Interactive runtime
                  </p>
                  <p className="mt-1 text-sm text-white/82">
                    Operator walkthrough with live branch, proof, disclosure, and settlement surfaces
                  </p>
                </div>
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-300/18 bg-emerald-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-50 transition-colors hover:border-emerald-300/36 hover:bg-emerald-400/14"
                >
                  Open standalone
                  <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative p-3 phone:p-4">
              <div className="relative overflow-hidden rounded-[24px] border border-white/8 bg-[#02060d]">
                {!isFrameLoaded && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(103,254,183,0.18),transparent_32%),linear-gradient(180deg,rgba(2,6,13,0.92),rgba(2,6,13,0.96))]">
                    <div className="rounded-[22px] border border-white/10 bg-black/30 px-5 py-4 text-center shadow-[0_18px_50px_rgba(0,0,0,0.3)] backdrop-blur-xl">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-200/66">
                        Loading
                      </p>
                      <p className="mt-2 text-sm text-white/84">
                        Waiting for the ENGI walkthrough to become interactive.
                      </p>
                    </div>
                  </div>
                )}

                <iframe
                  src={demoUrl}
                  title="ENGI V23 walkthrough"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  onLoad={() => setIsFrameLoaded(true)}
                  className="block h-[980px] w-full bg-[#02060d] phone:h-[1120px] laptop:h-[1180px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
